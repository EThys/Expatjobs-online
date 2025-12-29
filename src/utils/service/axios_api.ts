import axios, { type AxiosInstance } from 'axios'
import { obfuscateEndpoint, maskSensitiveData, generateGenericRequestName } from './apiObfuscator'

// Configuration pour masquer les requêtes en production
const isDevelopment = import.meta.env.DEV

// Utilitaire de debounce pour éviter les appels API répétés
const debounceMap = new Map<string, number>()

export const debounceApiCall = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,

  delay: number = 300,
  key?: string
) => {
  return (...args: T): Promise<R> => {
    const cacheKey = key || fn.name + JSON.stringify(args)

    if (debounceMap.has(cacheKey)) {
      clearTimeout(debounceMap.get(cacheKey)!)
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(async () => {
        try {
          const result = await fn(...args)
          debounceMap.delete(cacheKey)
          resolve(result)
        } catch (error) {
          debounceMap.delete(cacheKey)
          reject(error)
        }
      }, delay)

      debounceMap.set(cacheKey, timeout)
    })
  }
}

export const useAxiosRequestWithToken = (token: string = ''): AxiosInstance => {
  // Forcer l'URL locale demandée par l'utilisateur
  const baseURL = 'https://expat-jobs-api-928b.onrender.com/api/'
  
  const useAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }
  })

  // Intercepteur de requête - masquer les données sensibles dans les logs
  useAxios.interceptors.request.use(
    (config) => {
      // Masquer les données sensibles dans les logs uniquement
      // Note: On ne modifie PAS les vraies requêtes car l'API en a besoin
      // Il est impossible de masquer complètement les requêtes dans l'onglet Network
      // car c'est le navigateur qui les fait.
      if (isDevelopment) {
        const sanitizedConfig = {
          ...config,
          url: config.url ? obfuscateEndpoint(config.url) : config.url, // Obfusquer seulement dans les logs
          data: config.data ? maskSensitiveData(config.data) : undefined,
          headers: {
            ...config.headers,
            Authorization: config.headers?.Authorization ? 'Bearer ***MASKED***' : undefined
          }
        }
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${sanitizedConfig.url}`, sanitizedConfig)
      }
      
      return config
    },
    (error) => {
      if (isDevelopment) {
        console.error('❌ API Request Error:', error)
      }
      return Promise.reject(error)
    }
  )

  // Intercepteur de réponse - masquer les données sensibles
  useAxios.interceptors.response.use(
    (response) => {
      // Masquer les données sensibles dans les logs uniquement
      // Note: On ne masque PAS les vraies données car l'application en a besoin
      // Les données restent visibles dans Network, mais masquées dans les logs console
      if (isDevelopment) {
        const sanitizedResponse = {
          ...response,
          data: maskSensitiveData(response.data),
          config: {
            ...response.config,
            headers: {
              ...response.config.headers,
              Authorization: response.config.headers?.Authorization ? 'Bearer ***MASKED***' : undefined
            }
          }
        }
        console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, sanitizedResponse)
      }
      
      return response
    },
    (error) => {
      if (isDevelopment) {
        const sanitizedError = {
          ...error,
          response: error.response ? {
            ...error.response,
            data: maskSensitiveData(error.response.data),
            config: {
              ...error.response.config,
              headers: {
                ...error.response.config.headers,
                Authorization: error.response.config.headers?.Authorization ? 'Bearer ***MASKED***' : undefined
              }
            }
          } : undefined
        }
        console.error('❌ API Response Error:', sanitizedError.response?.status, sanitizedError.response?.data || error.message)
      }
      return Promise.reject(error)
    }
  )

  return useAxios
}

export const useAxiosRequestWithTokenForCsv = (token: string = ''): AxiosInstance => {
  // Forcer l'URL locale demandée par l'utilisateur
  const baseURL = 'http://localhost:8080/api/'
  
  const useAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }
  })

  // Appliquer les mêmes intercepteurs pour masquer les données dans les logs
  useAxios.interceptors.request.use(
    (config) => {
      // Obfusquer seulement dans les logs, pas dans les vraies requêtes
      return config
    },
    (error) => Promise.reject(error)
  )

  useAxios.interceptors.response.use(
    (response) => {
      // Les données restent intactes pour l'application
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return useAxios
}
