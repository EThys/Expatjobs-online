export interface IUser {
  id: number
  email: string
  phone: string
  role: string
}

export interface IAuthData {
  jwt: string
  user: IUser
}