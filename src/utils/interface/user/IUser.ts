export interface IUser {
  id: number
  email: string
  phone: string
  role: 'CANDIDATE' | 'RECRUITER' | 'ADMIN'
  createdAt?: string
  updatedAt?: string
}
export interface IUserRegister {
  email: string
  phone: string
  role: string
  password: string
}

export interface IUserAuth {
  password: string
  login: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
