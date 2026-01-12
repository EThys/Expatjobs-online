export interface ICandidateExperience {
  id: number
  profileId: number
  companyName: string
  jobTitle: string
  description: string
  startDate: string
  endDate: string
  currentExperienceStatus?: string
  location?: string
}
