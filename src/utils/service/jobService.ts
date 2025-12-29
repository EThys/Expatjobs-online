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
import axios from 'axios';

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

  const getJobsByCompany = async (
    companyId: number,
    page: number = 0,
    size: number = 20
  ): Promise<IJobResponse> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.searchJobOffers}/by-company/${companyId}`,
        {
          params: { page, size }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des offres de l'entreprise ${companyId}:`, error);
      throw error;
    }
  };

  const getJobsByJobType = async (
    jobType: string,
    page: number = 0,
    size: number = 10
  ): Promise<IJobResponse> => {
    try {
      const mappedJobType = mapUiJobTypeToApi(jobType);
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getJobsByJobType}/${mappedJobType}`,
        {
          params: { page, size }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des offres par type ${jobType}:`, error);
      throw error;
    }
  };

  const getJobsBySalaryMax = async (
    salaryMax: number,
    page: number = 0,
    size: number = 10
  ): Promise<IJobResponse> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getJobsBySalaryMax}/${salaryMax}`,
        {
          params: { page, size }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des offres par salaire max ${salaryMax}:`, error);
      throw error;
    }
  };

  const updateJob = async (id: number, jobData: Partial<IJobCreate>): Promise<IJob> => {
    try {
      // Utiliser l'endpoint direct avec le payload complet incluant l'id et companyId
      const payload = {
        id: id,
        companyId: jobData.companyId,
        title: jobData.title || '',
        description: jobData.description || '',
        location: jobData.location || '',
        salaryMin: jobData.salaryMin || 0,
        salaryMax: jobData.salaryMax || 0,
        jobType: jobData.jobType || 'FULL_TIME',
        experienceLevel: jobData.experienceLevel || 'MID',
        status: jobData.status || 'PUBLISHED',
        sector: jobData.sector || 'IT'
      };
      
      // Utiliser axios directement avec l'URL complète pour cet endpoint spécifique
      const response = await axios.put(
        `https://expat-jobs-api-928b.onrender.com/api/job-offers`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'offre ${id}:`, error);
      throw error;
    }
  };

  const deleteJob = async (id: number): Promise<void> => {
    try {
      // Utiliser l'endpoint DELETE officiel de l'API (aucun body en retour)
      const response = await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deletejobOffers}/${id}`,
        {
          validateStatus: (status) =>
            // le backend renvoie typiquement 200 ou 204, on les accepte comme succès
            (status >= 200 && status < 300) || status === 204,
        }
      );

      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Erreur lors de la suppression: status ${response.status}`);
      }
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
      // Utiliser le payload complet avec l'id
      const payload = {
        id: id,
        skillName: skillData.skillName || '',
        jobOfferId: skillData.jobOfferId || 0,
        experienceYear: skillData.experienceYear || 0
      };
      
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.updatejobSkills}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la compétence ${id}:`, error);
      throw error;
    }
  };

  const deleteSkill = async (id: number): Promise<void> => {
    try {
      await useAxiosRequestWithToken(token).delete(
        `${ApiRoutes.deletejobSkills.replace('{id}', id.toString())}`
      );
    } catch (error) {
      console.error(`Erreur lors de la suppression de la compétence ${id}:`, error);
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
    getJobsByJobType,
    getJobsBySalaryMax,
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