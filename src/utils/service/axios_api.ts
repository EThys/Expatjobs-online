import axios, { type AxiosInstance } from 'axios'


export const useAxiosRequestWithToken = (token: string = ''): AxiosInstance => {
  const useAxios: AxiosInstance = axios.create({
    baseURL: 'https://backend.corsatcom.com/api/',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }
  })

  return useAxios
}

export const useAxiosRequestWithTokenForCsv = (token: string = ''): AxiosInstance => {
  const useAxios: AxiosInstance = axios.create({
    baseURL: 'https://backend.corsatcom.com/api/',
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }
  })

  return useAxios
}
