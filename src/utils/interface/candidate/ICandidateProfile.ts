import type { IUser } from '../user/IUser'

export interface ICandidateProfile {
  candidateProfileId: number
  candidate: IUser
  firstName: string
  lastName: string
  location: string
  salaryExpectationMin: number
  salaryExpectationMax: number
  resumeUrl: string
  profilePicture?: string
  bio?: string
  title?: string
}
