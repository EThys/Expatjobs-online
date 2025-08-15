export interface IUser {
  UserId: Number
  UserName: String
  UserPassword: String
  UserEmail: String
  Role:String
  user: {
    AgencyId:Number
    Role:String
    UserEmail:String
    UserId:Number
    UserName:String
    UserPassword:String
    UserPhone:String
  }
}

export interface IUserRegister {
  email: string
  password: string
  userName: String
}

export interface IUserAuth {
  UserPassword: string
  UserEmail: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
