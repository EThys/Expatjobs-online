export interface ICandidateEducation {
  id: number;
  profileId: number;
  institutionName: string;
  degree: string;
  fieldStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
}