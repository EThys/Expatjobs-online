import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useJobService } from '@/utils/service/jobService';
import { useCompanyService } from '@/utils/service/CompagnyService';
import type { IJob, IJobCreate, IJobOffers, ISkill } from '@/utils/interface/IJobOffers';

export const useJobStore = defineStore('jobs', () => {
    const jobService = useJobService();
    const companyService = useCompanyService();

    // State
    const jobs = ref<IJobOffers[]>([]);
    const currentJob = ref<IJobOffers | null>(null);
    const myJobs = ref<(IJob & { skills?: ISkill[] })[]>([]);
    const similarJobs = ref<IJobOffers[]>([]);

    const loading = ref(false);
    const error = ref<string | null>(null);

    // Pagination State for All Jobs
    const totalPages = ref(0);
    const totalElements = ref(0);
    const currentPage = ref(0);

    // Helper to enrich job with company
    const enrichJob = async (job: IJob): Promise<IJobOffers> => {
        let companyData: any = undefined;
        try {
            if (job.companyId) {
                const company = await companyService.getCompanyById(job.companyId);
                companyData = {
                    id: company.id,
                    name: company.name,
                    location: company.location,
                    webSiteUrl: company.webSiteUrl,
                    logoUrl: company.logoUrl
                };
            }
        } catch (err) {
            console.warn(`Could not fetch company for job ${job.id}`, err);
            companyData = {
                id: job.companyId,
                name: `Entreprise #${job.companyId}`,
                location: job.location || 'Non spécifié'
            };
        }

        return {
            ...job,
            jobType: job.jobType as unknown as string, // Cast Enum to string compatibility
            company: companyData
        };
    };

    // Helper to enrich job with skills
    const enrichJobWithSkills = async (job: IJob): Promise<IJob & { skills?: ISkill[] }> => {
        let skills: ISkill[] = [];
        try {
            const skillsResponse = await jobService.getSkillsByJob(job.id);
            skills = skillsResponse.content || [];
        } catch (e) {
            console.warn(`Error fetching skills for job ${job.id}`, e);
        }

        return {
            ...job,
            skills: skills
        };
    };

    // Actions
    const fetchAllJobs = async (page = 0, size = 10, sort = 'createdAt,desc') => {
        loading.value = true;
        error.value = null;
        try {
            const response = await jobService.getAllJobs(page, size, sort);

            const enrichedContent = await Promise.all((response.content || []).map(enrichJob));
            jobs.value = enrichedContent;

            totalPages.value = response.totalPages || 0;
            totalElements.value = response.totalElements || 0;
            currentPage.value = response.number || 0;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors du chargement des offres';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const searchJobs = async (params: any, page = 0, size = 10) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await jobService.searchJobs(
                params,
                undefined,
                undefined,
                undefined,
                page,
                size
            );

            const enrichedContent = await Promise.all((response.content || []).map(enrichJob));
            jobs.value = enrichedContent;

            totalPages.value = response.totalPages || 0;
            totalElements.value = response.totalElements || 0;
            currentPage.value = response.number || 0;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la recherche';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const fetchJobsByJobType = async (jobType: string, page = 0, size = 10) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await jobService.getJobsByJobType(jobType, page, size);

            const enrichedContent = await Promise.all((response.content || []).map(enrichJob));
            jobs.value = enrichedContent;

            totalPages.value = response.totalPages || 0;
            totalElements.value = response.totalElements || 0;
            currentPage.value = response.number || 0;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la récupération des offres par type';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const fetchJobsBySalaryMax = async (salaryMax: number, page = 0, size = 10) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await jobService.getJobsBySalaryMax(salaryMax, page, size);

            const enrichedContent = await Promise.all((response.content || []).map(enrichJob));
            jobs.value = enrichedContent;

            totalPages.value = response.totalPages || 0;
            totalElements.value = response.totalElements || 0;
            currentPage.value = response.number || 0;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la récupération des offres par salaire max';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const fetchJobById = async (id: number) => {
        loading.value = true;
        error.value = null;
        try {
            // 1. Fetch Job Raw Data
            const jobData = await jobService.getJobById(id);

            // 2. Fetch Skills
            let skills: any[] = [];
            try {
                const skillsResponse = await jobService.getSkillsByJob(id);
                skills = skillsResponse.content || [];
            } catch (e) {
                console.warn('Error fetching skills', e);
            }

            // 3. Enrich with Company
            const enriched = await enrichJob(jobData);

            // 4. Set State
            currentJob.value = {
                ...enriched,
                skills: skills // skills expected as ISkillCreate[] which is compatible enough
            };

        } catch (err: any) {
            error.value = err.message || 'Erreur lors du chargement de l\'offre';
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchMyJobs = async (userId: number) => {
        loading.value = true;
        error.value = null;
        try {
            // 1. Récupérer les entreprises de l'utilisateur
            const companiesResponse = await companyService.getCompaniesByUser(userId);
            
            // Gérer le cas où l'API retourne un objet unique ou un tableau
            const companies = Array.isArray(companiesResponse) 
                ? companiesResponse 
                : (companiesResponse ? [companiesResponse] : []);
            
            if (companies.length === 0) {
                myJobs.value = [];
                return;
            }

            // 2. Pour chaque entreprise, récupérer ses offres
            const allJobsPromises = companies.map(async (company) => {
                try {
                    // Récupérer les offres de cette entreprise
                    const response = await jobService.getJobsByCompany(company.id, 0, 100);
                    return response.content || [];
                } catch (err) {
                    console.warn(`Erreur lors de la récupération des offres pour l'entreprise ${company.id}:`, err);
                    return [];
                }
            });

            // 3. Attendre toutes les réponses et combiner les résultats
            const allJobsArrays = await Promise.all(allJobsPromises);
            const allJobs = allJobsArrays.flat();

            // 4. Enrichir chaque offre avec ses skills
            const enrichedJobs = await Promise.all(
                allJobs.map(job => enrichJobWithSkills(job))
            );

            // 5. Assigner les offres enrichies
            myJobs.value = enrichedJobs;

        } catch (err: any) {
            // Gérer les erreurs 404/204 gracieusement (pas d'entreprises)
            if (err.response?.status === 404 || err.response?.status === 204) {
                myJobs.value = [];
                return;
            }
            
            error.value = err.message || 'Erreur lors du chargement de vos offres';
            console.error('❌ Erreur fetchMyJobs:', err);
            myJobs.value = [];
        } finally {
            loading.value = false;
        }
    };

    const createJob = async (jobData: IJobCreate) => {
        loading.value = true;
        error.value = null;
        try {
            const newJob = await jobService.createJob(jobData);
            myJobs.value.push(newJob);
            return newJob;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la création';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateJob = async (id: number, jobData: Partial<IJobCreate>) => {
        loading.value = true;
        error.value = null;
        try {
            const updated = await jobService.updateJob(id, jobData);

            const index = myJobs.value.findIndex(j => j.id === id);
            if (index !== -1) myJobs.value[index] = updated;

            if (currentJob.value?.id === id) {
                // Re-fetch to ensure enrichment or just patch
                // For simplicity, we patch what we can
                currentJob.value = {
                    ...currentJob.value,
                    ...updated,
                    jobType: updated.jobType as unknown as string
                } as IJobOffers;
            }

            return updated;
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la mise à jour';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteJob = async (id: number) => {
        loading.value = true;
        error.value = null;
        try {
            await jobService.deleteJob(id);
            myJobs.value = myJobs.value.filter(j => j.id !== id);
            if (currentJob.value?.id === id) {
                currentJob.value = null;
            }
        } catch (err: any) {
            error.value = err.message || 'Erreur lors de la suppression';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchSimilarJobs = async (excludeId: number) => {
        try {
            const response = await jobService.getAllJobs(0, 4);
            if (response && response.content) {
                const raws = response.content
                    .filter(j => j.id !== excludeId)
                    .slice(0, 3);

                // Enrich them
                similarJobs.value = await Promise.all(raws.map(enrichJob));
            }
        } catch (err) {
            console.warn('Erreur chargement similar jobs', err);
            similarJobs.value = [];
        }
    };

    return {
        jobs,
        currentJob,
        myJobs,
        similarJobs,
        loading,
        error,
        totalPages,
        totalElements,
        currentPage,

        fetchAllJobs,
        fetchJobById,
        fetchMyJobs,
        searchJobs,
        fetchJobsByJobType,
        fetchJobsBySalaryMax,
        createJob,
        updateJob,
        deleteJob,
        fetchSimilarJobs
    };
});
