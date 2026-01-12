// interfaces/candidate/ICandidateUpdate.ts
export interface ICandidateProfileUpdate {
  firstName: string
  lastName: string
  location: string
  salaryExpectationMin: number
  salaryExpectationMax: number
  bio?: string
  title?: string
}

export interface ICandidateExperienceUpdate {
  id?: number
  companyName: string
  jobTitle: string
  description: string
  startDate: string
  endDate: string
  currentExperienceStatus: string
  location?: string
}

export interface ICandidateEducationUpdate {
  id?: number
  institutionName: string
  degree: string
  fieldStudy: string
  startDate: string
  endDate: string
  description?: string
}

export interface ICandidateSkillUpdate {
  id?: number
  skillName: string
  experienceYears: number
  proficiency?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
}
