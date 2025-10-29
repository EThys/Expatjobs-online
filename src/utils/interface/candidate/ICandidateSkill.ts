export interface ICandidateSkill {
  id: number;
  profileId: number;
  skillName: string;
  experienceYears: number;
  proficiency?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
}