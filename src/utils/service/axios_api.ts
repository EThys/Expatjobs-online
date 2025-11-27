import axios, { type AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// Configuration pour masquer les requêtes en production
const isDevelopment = import.meta.env.DEV

// Utilitaire de debounce pour éviter les appels API répétés
const debounceMap = new Map<string, NodeJS.Timeout>()

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
  const useAxios: AxiosInstance = axios.create({
    baseURL: 'https://expat-jobs-api-928b.onrender.com/api/',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`

    }
  })

  // Intercepteur de requête - seulement en développement
  if (isDevelopment) {
    useAxios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        console.error('❌ API Request Error:', error)
        return Promise.reject(error)
      }
    )

    // Intercepteur de réponse - seulement en développement
    useAxios.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error('❌ API Response Error:', error.response?.status, error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  return useAxios
}

export const useAxiosRequestWithTokenForCsv = (token: string = ''): AxiosInstance => {
  const useAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }
  })

  return useAxios
}
