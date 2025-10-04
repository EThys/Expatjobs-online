export interface IUser {
  userId: Number,
  firstName: String,
  email:String,
  password:String,
  phone:String,
  role:String,
  lastName: String,
  location: String,
  salaryExpectationMin: Number,
  salaryExpectationMax: Number,
  resumeUrl: String
}

export interface IUserRegister {
  email: String,
  phone: String,
  role:String,
  password: String,

}

export interface IUserAuth {
  password: string
  email: string
  phone:string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
