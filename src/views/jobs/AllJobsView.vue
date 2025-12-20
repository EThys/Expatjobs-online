<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
    <transition name="page-fade" appear>
      <div class="flex flex-col flex-1" key="all-jobs-page">
        <Navbar />
    
        <main class="flex-grow">
          <PageHero>
      <template #title>
        {{ $t('hero.allJobsView.title').split($t('hero.allJobsView.titleHighlight'))[0] }} <span class="text-emerald-400">{{ $t('hero.allJobsView.titleHighlight') }}</span>
      </template>
      <template #subtitle>
        {{ $t('hero.allJobsView.subtitle') }}
      </template>

      <div class="max-w-3xl mx-auto">
        <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1 relative group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-200 absolute left-4 top-4 transition-colors group-focus-within:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchTerm"
                type="text"
                :placeholder="$t('hero.allJobsView.searchPlaceholder')"
                class="w-full h-12 px-12 rounded-xl border-0 bg-white/10 text-white placeholder-emerald-100/50 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-0 transition-all duration-300"
                @keyup.enter="performSearch"
              />
            </div>
            <button
              @click="performSearch"
              :disabled="loading"
              class="h-12 px-8 bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 active:scale-95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-emerald-500/25 min-w-[140px]"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>{{ $t('hero.allJobsView.searchButton') }}</span>
            </button>
          </div>
        </div>
      </div>
    </PageHero>


    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filters Section - Horizontal Layout -->
      <div class="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-200/80">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-gray-800">
            Filtres de recherche
          </h3>
          <button 
            @click="resetFilters"
            class="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Réinitialiser
          </button>
        </div>

        <SearchFilters 
          :filters="filters"
          @filter="applyFilters" 
        />

        <!-- Stats Row -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex flex-wrap gap-4 text-xs">
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-600">Offres trouvées:</span>
              <span class="font-semibold text-emerald-600">{{ totalElements }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-600">Page:</span>
              <span class="font-semibold text-gray-700">{{ currentPage + 1 }}/{{ totalPages }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Cards Grid -->
      <div class="space-y-8">
  
          <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/80">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-800">
                  Offres d'emploi
                </h2>
                <p class="text-gray-600 mt-2 flex items-center gap-2">
                  <span>{{ totalElements }} offre{{ totalElements !== 1 ? 's' : '' }} disponible{{ totalElements !== 1 ? 's' : '' }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="flex items-center gap-1">
                    <svg v-if="loading" class="animate-spin h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ loading ? 'Chargement...' : 'Prêt' }}
                  </span>
                </p>
              </div>
              
    
              <div class="flex items-center gap-3">
                <select 
                  v-model="sortBy"
                  @change="handleSortChange"
                  class="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                >
                  <option value="newest">Plus récent</option>
                  <option value="salary">Salaire élevé</option>
                  <option value="relevant">Pertinence</option>
                </select>
              </div>
            </div>

          <div v-if="loading" class="space-y-6">
            <div v-for="n in 6" :key="n" class="bg-white rounded-2xl border border-gray-200/80 p-6 shimmer-container">
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 bg-gray-200 rounded-2xl shimmer"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-6 bg-gray-200 rounded shimmer" :style="{ width: Math.random() * 40 + 60 + '%' }"></div>
                  <div class="h-4 bg-gray-200 rounded shimmer" :style="{ width: Math.random() * 30 + 40 + '%' }"></div>
                  <div class="flex gap-4">
                    <div class="h-4 bg-gray-200 rounded shimmer" style="width: 80px"></div>
                    <div class="h-4 bg-gray-200 rounded shimmer" style="width: 100px"></div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <div class="h-6 bg-gray-200 rounded-full shimmer" style="width: 60px"></div>
                    <div class="h-6 bg-gray-200 rounded-full shimmer" style="width: 80px"></div>
                    <div class="h-6 bg-gray-200 rounded-full shimmer" style="width: 70px"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div v-else-if="formattedOffres.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OffreCard
              v-for="offre in sortedOffres"
              :key="offre.id"
              :offre="offre"
              class="transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <div v-else class="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
            <div class="max-w-md mx-auto">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Aucune offre trouvée</h3>
              <p class="text-gray-500 mb-6 leading-relaxed">
                Aucune offre ne correspond à vos critères actuels. Essayez d'élargir votre recherche ou de modifier vos filtres.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  @click="resetFilters"
                  class="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                >
                  Réinitialiser les filtres
                </button>
                <button 
                  @click="showAllJobs"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Voir toutes les offres
                </button>
              </div>
            </div>
          </div>

          <Pagination
            v-if="!loading && totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="paginationLoading"
            @change="changePage"
          />
        </div>
      </div>
      </div>
    </main>
    </div>
  </transition>
  <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNotif } from '@/composables/useNotif';
import PageHero from '@/components/shared/PageHero.vue';
import Pagination from '@/components/shared/Pagination.vue';
//@ts-ignore
import SearchFilters from '@/components/filter/SearchFilters.vue';
//@ts-ignore
import OffreCard from '@/components/cards/OffreCard.vue';
//@ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../../components/footer/FooterComponent.vue'
//@ts-ignore
import { useJobService } from '@/utils/service/jobService'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
//@ts-ignore
import type { IJob, IJobResponse, IJobOffers } from '@/utils/interface/IJobOffers'
import { JobType, ExperienceLevel } from '@/utils/interface/IJobOffers'
import { getToken } from '@/stores/authStorage';

// Services
const { notifyError } = useNotif();
const route = useRoute();
const jobService = useJobService();
const companyService = useCompanyService();

const offres = ref<IJob[]>([]);
const loading = ref(false);
const paginationLoading = ref(false);
const currentPage = ref(0);
const totalPages = ref(0);
const totalElements = ref(0);
const searchTerm = ref('');
const sortBy = ref('newest');
const quickPage = ref(0);

const token = getToken();

// Cache pour les entreprises
const companyCache = new Map<number, any>();

const quickFilters = ref([
  { label: ' Remote', filters: { remoteOnly: true } },
  { label: 'CDI', filters: { typeContrat: 'FULL_TIME' } },
  { label: 'Tech', filters: { searchTerm: 'développeur' } },
  { label: 'Senior', filters: { experienceLevel: 'SENIOR' } },
  { label: '50k+', filters: { salaireMin: '50000' } }
]);

const filters = ref({
  localisation: "",
  typeContrat: "",
  experienceLevel: "",
  salaireMin: "",
  remoteOnly: false
});

// Mapping des types de contrat venant de l'URL (home) vers nos valeurs internes / API
const mapUrlJobTypeToFilter = (typeFromUrl: string | null | undefined): string => {
  if (!typeFromUrl) return '';
  // On n'accepte que les valeurs de l'enum JobType
  const validValues = Object.values(JobType) as string[];
  return validValues.includes(typeFromUrl) ? typeFromUrl : '';
};

const enrichJobsWithCompanyData = async (jobs: IJob[]): Promise<IJob[]> => {
  try {
    const enrichedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (companyCache.has(job.companyId)) {
          const cachedCompany = companyCache.get(job.companyId);
          return {
            ...job,
            company: cachedCompany
          };
        }

        try {
          const company = await companyService.getCompanyById(job.companyId);
          const companyData = {
            id: company.id,
            name: company.name,
            location: company.location,
            webSiteUrl: company.webSiteUrl
          };
          
          companyCache.set(job.companyId, companyData);
          return {
            ...job,
            company: companyData
          };
        } catch (error) {
          console.warn(`Impossible de récupérer l'entreprise pour l'offre ${job.id}:`, error);
          const fallbackCompany = {
            id: job.companyId,
            name: `Entreprise #${job.companyId}`,
            location: 'Non spécifié'
          };
          
          companyCache.set(job.companyId, fallbackCompany);
          return {
            ...job,
            company: fallbackCompany
          };
        }
      })
    );
    
    return enrichedJobs;
  } catch (error) {
    console.error('Erreur lors de l\'enrichissement des offres:', error);
    return jobs;
  }
};


const applyQuickFilter = (filter: any) => {
  filters.value = { ...filters.value, ...filter.filters };
  if (filter.filters.searchTerm) {
    searchTerm.value = filter.filters.searchTerm;
  }
  currentPage.value = 0;
  fetchJobs();
};

const showAllJobs = () => {
  resetFilters();
  fetchJobs();
};

const handleSortChange = () => {
  console.log('🔄 Sorting by:', sortBy.value);
};

// Pagination handled by component


const sortedOffres = computed(() => {
  const offres = [...formattedOffres.value];
  
  switch (sortBy.value) {
    case 'salary':
      return offres.sort((a, b) => {
        const aSalary = extractSalaryNumber(a.salaire);
        const bSalary = extractSalaryNumber(b.salaire);
        return bSalary - aSalary;
      });
    case 'newest':
      return offres.sort((a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime());
    case 'relevant':
    default:
      return offres.sort((a, b) => {
        // Priorité aux offres urgentes et featured
        let scoreA = 0;
        let scoreB = 0;
        
        if (a.urgent) scoreA += 2;
        if (a.featured) scoreA += 1;
        if (b.urgent) scoreB += 2;
        if (b.featured) scoreB += 1;
        
        return scoreB - scoreA;
      });
  }
});

// Extraire le nombre du salaire
const extractSalaryNumber = (salary: string): number => {
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Appliquer les filtres
const applyFilters = (newFilters: any) => {
  console.log('🔄 Applying filters:', newFilters);
  filters.value = { ...newFilters };
  currentPage.value = 0;
  fetchJobs();
};

const resetFilters = () => {
  console.log('🔄 Resetting filters');
  filters.value = {
    localisation: "",
    typeContrat: "",
    experienceLevel: "",
    salaireMin: "",
    remoteOnly: false
  };
  searchTerm.value = '';
  sortBy.value = 'newest';
  currentPage.value = 0;
  fetchJobs();
};

// Initialiser la page à partir des paramètres de l'URL (q, location, type)
const initFromQuery = async (isInitial = false) => {
  const q = (route.query.q as string) || '';
  const location = (route.query.location as string) || '';
  const type = (route.query.type as string) || '';

  searchTerm.value = q;
  filters.value.localisation = location;
  filters.value.typeContrat = mapUrlJobTypeToFilter(type);

  currentPage.value = 0;

  const hasAnyQuery =
    q.trim() !== '' ||
    location.trim() !== '' ||
    filters.value.typeContrat !== '';

  if (hasAnyQuery) {
    await fetchJobs(0);
  } else if (isInitial) {
    await fetchJobs();
  }
};

// Récupérer les offres depuis l'API
const fetchJobs = async (page: number = currentPage.value) => {
  try {
    if (page === currentPage.value) {
      loading.value = true;
    } else {
      paginationLoading.value = true;
    }
    
    console.log('📡 Fetching jobs...', {
      page,
      searchTerm: searchTerm.value,
      filters: filters.value
    });

    let response: IJobResponse;
    
    const hasSearch = searchTerm.value.trim() !== '';
    const hasFilters = filters.value.localisation !== '' || 
                      filters.value.typeContrat !== '' || 
                      filters.value.experienceLevel !== '' ||
                      filters.value.salaireMin !== '';

    if (hasSearch || hasFilters) {
      console.log('🔍 Using search with filters');
      response = await jobService.searchJobs({
        title: searchTerm.value.trim() || undefined,
        location: filters.value.localisation || undefined,
        jobType: filters.value.typeContrat || undefined,
        experienceLevel: filters.value.experienceLevel || undefined,
        salaryMin: filters.value.salaireMin ? Number(filters.value.salaireMin) : undefined,
        page,
        size: 10
      });
    } else {
      console.log('📋 Getting all jobs');
      response = await jobService.getAllJobs(page, 10);
    }

    console.log('✅ API Response:', response);

    if (!response) {
      throw new Error('Réponse API vide');
    }

    if (!Array.isArray(response.content)) {
      console.warn('⚠️ Response.content is not an array:', response.content);
      offres.value = [];
    } else {
      // Enrichir les offres avec les données de l'entreprise
      offres.value = await enrichJobsWithCompanyData(response.content);
    }

    currentPage.value = response.number !== undefined ? response.number : page;
    totalPages.value = response.totalPages !== undefined ? response.totalPages : 1;
    totalElements.value = response.totalElements !== undefined ? response.totalElements : offres.value.length;
    quickPage.value = currentPage.value;

  } catch (error: any) {
    console.error('❌ Erreur API:', error);
    
    notifyError(error.response?.data?.message || 'Erreur lors du chargement des offres');
    
    offres.value = [];
    totalPages.value = 0;
    totalElements.value = 0;
  } finally {
    loading.value = false;
    paginationLoading.value = false;
  }
};

const performSearch = () => {
  console.log('🔍 Performing search:', searchTerm.value);
  currentPage.value = 0;
  fetchJobs();
};

const changePage = (page: number) => {
  console.log('📄 Changing page to:', page);
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
    fetchJobs(page);
  }
};

const goToQuickPage = () => {
  console.log('🚀 Going to page:', quickPage.value);
  changePage(quickPage.value);
};

// Formater les données pour l'OffreCard
const formatOffreForCard = (job: IJobOffers) => {
  const formatted = {
    id: job.id,
    titre: job.title || 'Titre non spécifié',
    entreprise: job.company?.name || `Entreprise #${job.companyId}`,
    localisation: job.location || 'Non spécifié',
    typeContrat: formatJobType(job.jobType),
    salaire: formatSalary(job.salaryMin, job.salaryMax),
    competences: job.skills?.map(skill => skill.skillName) || [job.sector, job.experienceLevel].filter(Boolean) as string[],
    datePublication: formatDate(job.createdAt),
    urgent: job.status === 'URGENT',
    remote: job.location ? job.location.toLowerCase().includes('remote') : false,
    featured: job.experienceLevel === 'SENIOR' || job.status === 'FEATURED',
    description: job.description,
    experienceLevel: job.experienceLevel,
    sector: job.sector,
    companyInfo: job.company || {
      id: job.companyId,
      name: `Entreprise #${job.companyId}`,
      location: job.location
    }
  };

  return formatted;
};

// Helper pour formater le salaire
const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return 'Salaire à négocier';
  if (!min) return `Jusqu'à ${max?.toLocaleString()} €`;
  if (!max) return `À partir de ${min?.toLocaleString()} €`;
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`;
};

// Helper pour formater le type de job
const formatJobType = (jobType: JobType | string): string => {
  const types: { [key: string]: string } = {
    'FULL_TIME': 'CDI',
    'PART_TIME': 'Temps partiel',
    'CONTRACT': 'CDD',
    'FREELANCE': 'Freelance',
    'INTERNSHIP': 'Stage',
    'HYBRID': 'Hybride'
  };
  return types[jobType] || jobType || 'Non spécifié';
};

// Helper pour formater la date
const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date inconnue';
  
  try {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Aujourd\'hui';
    if (diffDays === 2) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  } catch (error) {
    return 'Date inconnue';
  }
};

const formattedOffres = computed(() => {
  const filtered = offres.value.filter(job => {
    if (filters.value.salaireMin) {
      const salaireMinFilter = parseInt(filters.value.salaireMin);
      if (!job.salaryMin || job.salaryMin < salaireMinFilter) {
        return false;
      }
    }
    
    if (filters.value.remoteOnly) {
      if (!job.location || !job.location.toLowerCase().includes('remote')) {
        return false;
      }
    }
    
    return true;
  });

  return filtered.map(formatOffreForCard);
});

onMounted(() => {
  console.log('🚀 Component mounted with route query:', route.query);
  initFromQuery(true);
});

// Si l'utilisateur revient sur la page avec de nouveaux paramètres (ex: nouvelle recherche depuis la home)
watch(
  () => route.query,
  () => {
    initFromQuery();
  }
);
</script>

<style scoped>

@keyframes blobSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.05); }
}

@keyframes blobFast {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-25px, 20px) scale(1.03); }
}

.animate-blob-slow {
  animation: blobSlow 12s ease-in-out infinite;
}

.animate-blob-fast {
  animation: blobFast 15s ease-in-out infinite;
}

.shimmer-container {
  position: relative;
  overflow: hidden;
}

.shimmer {
  position: relative;
  overflow: hidden;
  background-color: #e5e7eb;
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Effet d'apparition global de la page */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>