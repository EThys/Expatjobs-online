import type { ICandidateEducation } from './ICandidateEducation'
import type { ICandidateExperience } from './ICandidateExperience'
import type { ICandidateProfile } from './ICandidateProfile'
import type { ICandidateSkill } from './ICandidateSkill'

export interface ICandidateData {
  profile: ICandidateProfile
  experiences: ICandidateExperience[]
  educations: ICandidateEducation[]
  skills: ICandidateSkill[]
}
