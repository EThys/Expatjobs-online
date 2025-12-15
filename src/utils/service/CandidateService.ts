import { useAxiosRequestWithToken } from './axios_api';
import { ApiRoutes } from './endpoints/api';
import { getToken } from '@/stores/token';
import type { ICandidateProfile} from '@/utils/interface/candidate/ICandidateProfile'
import type { ICandidateEducation} from '@/utils/interface/candidate/ICandidateEducation'
import type { ICandidateExperience} from '@/utils/interface/candidate/ICandidateExperience'
import type { ICandidateSkill} from '@/utils/interface/candidate/ICandidateSkill'
import type { ICandidateData} from '@/utils/interface/candidate/ICandidateData'

export const useCandidateService = () => {
  const storedToken = getToken();
  const token = (storedToken as any)?.token || (typeof storedToken === 'string' ? storedToken : '');

  // ==================== CANDIDATE PROFILES ====================

  const createCandidateProfile = async (profileData: Partial<ICandidateProfile> & { userId?: number }): Promise<ICandidateProfile> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addCandidateProfile}`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création du profil candidat:', error);
      throw error;
    }
  };

  const getAllCandidateProfiles = async (
    page: number = 0,
    size: number = 20,
    sort: string = 'createdAt,desc'
  ): Promise<any> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getAllCandidateProfiles}`,
        {
          params: {
            page,
            size,
            sort
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des profils candidats:', error);
      throw error;
    }
  };

  const getCandidateProfileById = async (id: number): Promise<ICandidateProfile> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateProfileById}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération du profil candidat ${id}:`, error);
      throw error;
    }
  };

  const getCandidateProfileByUserId = async (userId: number): Promise<ICandidateProfile | null> => {
    try {
      // L'API n'a pas d'endpoint direct par userId, on récupère la liste et on filtre
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getAllCandidateProfiles}`,
        { params: { page: 0, size: 200 } }
      );

      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      const found = list.find((p: ICandidateProfile) => p?.candidate?.id === userId);
      if (!found) {
        console.warn(`⚠️ Aucun profil trouvé pour l'utilisateur ${userId}`);
        return null;
      }
      return found;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération du profil utilisateur ${userId}:`, error);
      throw error;
    }
  };

  const getOrCreateCandidateProfile = async (userId: number): Promise<ICandidateProfile> => {
    const existing = await getCandidateProfileByUserId(userId);
    if (existing) return existing;

    // L'API impose firstName/lastName non vides : on crée un profil minimal
    const created = await createCandidateProfile({
      userId,
      firstName: 'FirstName',
      lastName: 'LastName',
      location: '',
      salaryExpectationMin: 10,
      salaryExpectationMax: 10,
      resumeUrl: ''
    });
    return created;
  };

  const getCandidateProfilesBySalaryMin = async (
    salaryExpectation: number,
    page: number = 0,
    size: number = 20
  ): Promise<any> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateProfilesSalaryMinGte}/${salaryExpectation}`,
        { params: { page, size } }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du filtrage par salaire minimum:', error);
      throw error;
    }
  };

  const getCandidateProfilesBySalaryMax = async (
    salaryExpectation: number,
    page: number = 0,
    size: number = 20
  ): Promise<any> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateProfilesSalaryMaxLte}/${salaryExpectation}`,
        { params: { page, size } }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du filtrage par salaire maximum:', error);
      throw error;
    }
  };

  const getCandidateProfilesByLocation = async (
    location: string,
    page: number = 0,
    size: number = 20
  ): Promise<any> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateProfilesByLocation}/${encodeURIComponent(location)}`,
        { params: { page, size } }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du filtrage par localisation:', error);
      throw error;
    }
  };

  const updateCandidateProfile = async (userId: number, profileData: Partial<ICandidateProfile>): Promise<ICandidateProfile> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updateCandidateProfile}`,
        { userId, ...profileData }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour du profil candidat ${userId}:`, error);
      throw error;
    }
  };

  const deleteCandidateProfile = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deleteCandidateProfile}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression du profil candidat ${id}:`, error);
      throw error;
    }
  };

  // ==================== CANDIDATE EXPERIENCES ====================

  const createCandidateExperience = async (experienceData: Omit<ICandidateExperience, 'id'>): Promise<ICandidateExperience> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addCandidateExperience}`,
        experienceData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'expérience:', error);
      throw error;
    }
  };

  const getExperiencesByProfile = async (profileId: number): Promise<ICandidateExperience[]> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateExperienceById}/by-candidate/${profileId}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des expériences du profil ${profileId}:`, error);
      throw error;
    }
  };

  const updateCandidateExperience = async (id: number, experienceData: Partial<ICandidateExperience>): Promise<ICandidateExperience> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updateCandidateExperience}/${id}`,
        experienceData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'expérience ${id}:`, error);
      throw error;
    }
  };

  const deleteCandidateExperience = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deleteCandidateExperience}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de l'expérience ${id}:`, error);
      throw error;
    }
  };

  // ==================== CANDIDATE EDUCATION ====================

  const createCandidateEducation = async (educationData: Omit<ICandidateEducation, 'id'>): Promise<ICandidateEducation> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addCandidateEducation}`,
        educationData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de la formation:', error);
      throw error;
    }
  };

  const getEducationsByProfile = async (profileId: number): Promise<ICandidateEducation[]> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateEducationById}/by-candidate/${profileId}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des formations du profil ${profileId}:`, error);
      throw error;
    }
  };

  const updateCandidateEducation = async (id: number, educationData: Partial<ICandidateEducation>): Promise<ICandidateEducation> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updateCandidateEducation}/${id}`,
        educationData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de la formation ${id}:`, error);
      throw error;
    }
  };

  const deleteCandidateEducation = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deleteCandidateEducation}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de la formation ${id}:`, error);
      throw error;
    }
  };

  // ==================== CANDIDATE SKILLS ====================

  const createCandidateSkill = async (skillData: Omit<ICandidateSkill, 'id'>): Promise<ICandidateSkill> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addCandidateSkills}`,
        skillData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de la compétence:', error);
      throw error;
    }
  };

  const getSkillsByProfile = async (profileId: number): Promise<ICandidateSkill[]> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getCandidateSkillById}/by-candidate/${profileId}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des compétences du profil ${profileId}:`, error);
      throw error;
    }
  };

  const createCandidateSkillsBatch = async (skillsData: Omit<ICandidateSkill, 'id'>[]): Promise<ICandidateSkill[]> => {
    try {
      const promises = skillsData.map(skill => createCandidateSkill(skill));
      return await Promise.all(promises);
    } catch (error) {
      console.error('❌ Erreur lors de la création des compétences en lot:', error);
      throw error;
    }
  };

  const updateCandidateSkill = async (id: number, skillData: Partial<ICandidateSkill>): Promise<ICandidateSkill> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updateCandidateSkill}/${id}`,
        skillData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de la compétence ${id}:`, error);
      throw error;
    }
  };

  const deleteCandidateSkill = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deleteCandidateSkill}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de la compétence ${id}:`, error);
      throw error;
    }
  };

  // ==================== COMPLETE CANDIDATE DATA ====================

  const getCompleteCandidateData = async (userId: number): Promise<ICandidateData> => {
    try {
      const profileDetails = await getOrCreateCandidateProfile(userId);
      const resolvedProfileId = profileDetails.candidateProfileId;

      const [experiences, educations, skills] = await Promise.all([
        getExperiencesByProfile(resolvedProfileId),
        getEducationsByProfile(resolvedProfileId),
        getSkillsByProfile(resolvedProfileId)
      ]);

      return {
        profile: profileDetails,
        experiences,
        educations,
        skills
      };
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des données complètes du candidat ${userId}:`, error);
      throw error;
    }
  };

  const createCompleteCandidateProfile = async (candidateData: {
    profile: Partial<ICandidateProfile>;
    experiences?: Omit<ICandidateExperience, 'id'>[];
    educations?: Omit<ICandidateEducation, 'id'>[];
    skills?: Omit<ICandidateSkill, 'id'>[];
  }): Promise<ICandidateData> => {
    try {
      // Créer le profil principal
      const profile = await createCandidateProfile(candidateData.profile);

      // Créer les expériences, formations et compétences en parallèle
      const [experiences, educations, skills] = await Promise.all([
        candidateData.experiences 
          ? Promise.all(candidateData.experiences.map(exp => 
              createCandidateExperience({ ...exp, profileId: profile.candidateProfileId })
            ))
          : Promise.resolve([]),
        candidateData.educations 
          ? Promise.all(candidateData.educations.map(edu => 
              createCandidateEducation({ ...edu, profileId: profile.candidateProfileId })
            ))
          : Promise.resolve([]),
        candidateData.skills 
          ? createCandidateSkillsBatch(candidateData.skills.map(skill => 
              ({ ...skill, profileId: profile.candidateProfileId })
            ))
          : Promise.resolve([])
      ]);

      return {
        profile,
        experiences,
        educations,
        skills
      };
    } catch (error) {
      console.error('❌ Erreur lors de la création du profil candidat complet:', error);
      throw error;
    }
  };

  return {
    // Candidate Profiles
    createCandidateProfile,
    getAllCandidateProfiles,
    getCandidateProfileById,
    getCandidateProfileByUserId,
    getOrCreateCandidateProfile,
    getCandidateProfilesBySalaryMin,
    getCandidateProfilesBySalaryMax,
    getCandidateProfilesByLocation,
    updateCandidateProfile,
    deleteCandidateProfile,

    // Candidate Experiences
    createCandidateExperience,
    getExperiencesByProfile,
    updateCandidateExperience,
    deleteCandidateExperience,

    // Candidate Education
    createCandidateEducation,
    getEducationsByProfile,
    updateCandidateEducation,
    deleteCandidateEducation,

    // Candidate Skills
    createCandidateSkill,
    getSkillsByProfile,
    createCandidateSkillsBatch,
    updateCandidateSkill,
    deleteCandidateSkill,

    // Complete Candidate Data
    getCompleteCandidateData,
    createCompleteCandidateProfile
  };
};