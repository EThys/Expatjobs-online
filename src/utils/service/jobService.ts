import { useAxiosRequestWithToken } from './axios_api';
import { ApiRoutes } from './endpoints/api';
import type { 
  IJobResponse, 
  IJob, 
  IJobCreate, 
  ISkillResponse, 
  ISkill, 
  ISkillCreate 
} from '@/utils/interface/IJobOffers';
import { getToken } from '@/stores/token';
import { useCompanyService } from './CompagnyService';

export const useJobService = () => {
  const token = getToken() as string;

  // ==================== HELPERS ====================

  /**
   * Mappe les valeurs utilisées dans l'UI vers les valeurs attendues par l'API.
   * Exemple : "CDI" -> "FULL_TIME"
   */
  const mapUiJobTypeToApi = (jobType?: string): string | undefined => {
    if (!jobType) return undefined;

    const normalized = jobType.toUpperCase();
    const mapping: Record<string, string> = {
      CDI: 'FULL_TIME',
      CDD: 'CONTRACT',
      FREELANCE: 'FREELANCE',
      'FULL_TIME': 'FULL_TIME',
      'PART_TIME': 'PART_TIME',
      'INTERNSHIP': 'INTERNSHIP',
      'CONTRACT': 'CONTRACT',
      'FREELANCE': 'FREELANCE'
    };

    return mapping[normalized] || jobType;
  };

  const cleanParams = (params: Record<string, unknown>): Record<string, unknown> => {
    const cleaned: Record<string, unknown> = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (
        value !== undefined &&
        value !== null &&
        // @ts-ignore - on veut filtrer les strings vides
        !(typeof value === 'string' && value.trim() === '')
      ) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  };

  // ==================== JOBS ====================

  const enrichJobWithCompany = async (job: any): Promise<any> => {
    try {
      const companyService = useCompanyService();
      const company = await companyService.getCompanyById(job.companyId);
      
      return {
        ...job,
        company: {
          id: company.id,
          name: company.name,
          location: company.location,
          webSiteUrl: company.webSiteUrl
        }
      };
    } catch (error) {
      console.error('Erreur lors de l\'enrichissement de l\'offre:', error);
      // On retourne l'offre telle quelle si on ne peut pas enrichir
      return job;
    }
  };

  const createJob = async (jobData: IJobCreate): Promise<IJob> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addjobOffers}`,
        jobData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'offre:', error);
      throw error;
    }
  };

  const getAllJobs = async (
    page: number = 0,
    size: number = 10,
    sort: string = 'createdAt,desc'
  ): Promise<IJobResponse> => {
    try {
      const response = await useAxiosRequestWithToken().get(
        `${ApiRoutes.getAlljobOffers}`,
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
      console.error('❌ Erreur lors de la récupération des offres:', error);
      throw error;
    }
  };

  const getJobById = async (id: number): Promise<IJob> => {
    try {
      const response = await useAxiosRequestWithToken().get(
        `${ApiRoutes.showjobOffers}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de l'offre ${id}:`, error);
      throw error;
    }
  };

  /**
   * Recherche avancée d'offres en utilisant l'endpoint /api/job-offers/search.
   *
   * Pour compatibilité avec l'existant, on accepte soit :
   *  - les anciens paramètres positionnels (searchTerm, location, jobType, experienceLevel, page, size)
   *  - un objet avec tous les paramètres de l'API : { title, location, sector, salaryMin, salaryMax, jobType, status, companyId, experienceLevel, page, size }
   */
  const searchJobs = async (
    searchOrParams:
      | string
      | {
          title?: string;
          sector?: string;
          salaryMin?: number;
          salaryMax?: number;
          jobType?: string;
          status?: string;
          location?: string;
          companyId?: number;
          experienceLevel?: string;
          page?: number;
          size?: number;
        },
    location?: string,
    jobType?: string,
    experienceLevel?: string,
    page: number = 0,
    size: number = 10
  ): Promise<IJobResponse> => {
    try {
      let rawParams: Record<string, unknown>;

      if (typeof searchOrParams === 'string') {
        // Ancienne signature utilisée notamment dans AllJobsView
        const searchTerm = searchOrParams.trim();
        rawParams = {
          title: searchTerm || undefined,
          location,
          jobType: mapUiJobTypeToApi(jobType),
          experienceLevel,
          page,
          size
        };
      } else {
        // Nouvelle signature avec objet de paramètres
        const {
          title,
          sector,
          salaryMin,
          salaryMax,
          jobType: jt,
          status,
          location: loc,
          companyId,
          experienceLevel: exp,
          page: p = page,
          size: s = size
        } = searchOrParams;

        rawParams = {
          title,
          sector,
          salaryMin,
          salaryMax,
          jobType: mapUiJobTypeToApi(jt),
          status,
          location: loc,
          companyId,
          experienceLevel: exp,
          page: p,
          size: s
        };
      }

      const params = cleanParams(rawParams);

      const response = await useAxiosRequestWithToken().get(
        `${ApiRoutes.searchJobOffers}/search`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche des offres:', error);
      throw error;
    }
  };

  const getJobsByCompany = async (companyId: number): Promise<IJob[]> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.searchJobOffers}/company/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des offres de l'entreprise ${companyId}:`, error);
      throw error;
    }
  };

  const updateJob = async (id: number, jobData: Partial<IJobCreate>): Promise<IJob> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updatejobOffers}/${id}`,
        jobData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'offre ${id}:`, error);
      throw error;
    }
  };

  const deleteJob = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deletejobOffers}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de l'offre ${id}:`, error);
      throw error;
    }
  };

  // ==================== SKILLS ====================

  const getSkillsByJob = async (jobId: number): Promise<ISkillResponse> => {
  try {
    const response = await useAxiosRequestWithToken().get(
      `${ApiRoutes.getJobSkillsByJobOffer}?jobOfferId=${jobId}`

    );
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des compétences pour l'offre ${jobId}:`, error);
    throw error;
  }
};


  const createSkill = async (skillData: ISkillCreate): Promise<ISkill> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.showjobSkills}`,
        skillData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de la compétence:', error);
      throw error;
    }
  };

  const createSkillsBatch = async (skillsData: ISkillCreate[]): Promise<ISkill[]> => {
    try {
      const promises = skillsData.map(skill => createSkill(skill));
      return await Promise.all(promises);
    } catch (error) {
      console.error('❌ Erreur lors de la création des compétences en lot:', error);
      throw error;
    }
  };

  const getAllSkills = async (
    page: number = 0,
    size: number = 100,
    sort: string = 'skillName,asc'
  ): Promise<ISkillResponse> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getAlljobSkills}`,
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
      console.error('❌ Erreur lors de la récupération des compétences:', error);
      throw error;
    }
  };

  const updateSkill = async (id: number, skillData: Partial<ISkillCreate>): Promise<ISkill> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updatejobSkills}/${id}`,
        skillData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de la compétence ${id}:`, error);
      throw error;
    }
  };

  const deleteSkill = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deletejobSkills}/${id}`
      );
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de la compétence ${id}:`, error);
      throw error;
    }
  };

  return {
    // Jobs
    createJob,
    getAllJobs,
    getJobById,
    searchJobs,
    getJobsByCompany,
    updateJob,
    deleteJob,
    
    // Skills
    getSkillsByJob,
    createSkill,
    createSkillsBatch,
    getAllSkills,
    updateSkill,
    deleteSkill
  };
};