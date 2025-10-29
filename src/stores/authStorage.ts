import type { IAuthData, IUser } from '@/utils/interface/IAuth'

export function setAuthData(authData: IAuthData): void {
  localStorage.setItem('auth_data', JSON.stringify(authData))
}

export function getAuthData(): IAuthData | null {
  const authString = localStorage.getItem('auth_data')
  return authString ? JSON.parse(authString) : null
}

export function clearAuthData(): void {
  localStorage.removeItem('auth_data')
}

export function getToken(): string | null {
  const authData = getAuthData()
  return authData ? authData.jwt : null
}

export function getUser(): IUser | null {
  const authData = getAuthData()
  return authData ? authData.user : null
}