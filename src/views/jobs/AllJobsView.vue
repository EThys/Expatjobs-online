<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <section class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-emerald-800 via-emerald-700 to-teal-600 py-20 px-4 sm:px-6 lg:px-8">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          Trouvez le job 
          <span class="text-emerald-200">de vos rêves</span>
        </h1>

        <p class="text-xl text-emerald-50/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Découvrez des opportunités uniques dans les entreprises les plus innovantes
        </p>

        <div class="max-w-3xl mx-auto">
          <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="flex-1 relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-200 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Développeur, Designer, Marketing, Remote..."
                  class="w-full h-12 px-12 rounded-xl border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:outline-none focus:ring-3 focus:ring-emerald-300/50 text-gray-700 placeholder-gray-500 transition-all duration-300"
                  @keyup.enter="performSearch"
                />
              </div>
              <button
                @click="performSearch"
                :disabled="loading"
                class="h-12 px-8 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 active:scale-95 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 font-semibold shadow-lg shadow-emerald-500/25"
              >
                <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {{ loading ? 'Recherche...' : 'Rechercher' }}
              </button>
            </div>
          </div>
          
          <!-- Filtres rapides -->
          <!-- <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button 
              v-for="filter in quickFilters"
              :key="filter.label"
              @click="applyQuickFilter(filter)"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 text-emerald-50 rounded-full text-sm font-medium transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              {{ filter.label }}
            </button>
          </div> -->
        </div>
      </div>
    </section>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <aside class="lg:w-80 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-200/80">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-800">
                Filtres
              </h3>
              <button 
                @click="resetFilters"
                class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Tout effacer
              </button>
            </div>

            <SearchFilters 
              :filters="filters"
              @filter="applyFilters" 
            />


            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Offres trouvées</span>
                  <span class="font-semibold text-emerald-600">{{ totalElements }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Page actuelle</span>
                  <span class="font-semibold text-gray-700">{{ currentPage + 1 }}/{{ totalPages }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="flex-1 min-w-0">
  
          <div class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200/80">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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


          <div v-else-if="formattedOffres.length > 0" class="grid gap-6">
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

          <div v-if="!loading && totalPages > 1" class="mt-12">
            <div class="bg-white rounded-2xl border border-gray-200/80 p-6">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-600">
                  Page {{ currentPage + 1 }} sur {{ totalPages }} 
                  <span class="text-gray-400 mx-2">•</span>
                  {{ totalElements }} résultat{{ totalElements !== 1 ? 's' : '' }}
                </p>
                
                <nav class="flex items-center space-x-2">
                  <button 
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 0 || paginationLoading"
                    class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg v-if="paginationLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      v-if="typeof page === 'number'"
                      @click="changePage(page - 1)"
                      :disabled="paginationLoading"
                      :class="[
                        'px-4 py-2 rounded-xl font-medium transition-all duration-300 min-w-10 flex items-center justify-center',
                        currentPage === page - 1 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transform scale-105' 
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50'
                      ]"
                    >
                      <svg v-if="paginationLoading && currentPage === page - 1" class="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ page }}
                    </button>
                    <span v-else class="px-2 text-gray-400">
                      ...
                    </span>
                  </template>
                  
                  <button 
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage >= totalPages - 1 || paginationLoading"
                    class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg v-if="paginationLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>

                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>Aller à:</span>
                  <select 
                    v-model="quickPage"
                    @change="goToQuickPage"
                    :disabled="paginationLoading"
                    class="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  >
                    <option v-for="page in totalPages" :key="page" :value="page - 1">
                      Page {{ page }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
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
const toast = useToast();
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

// Pages visibles pour la pagination
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value + 1;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});


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
    
    toast.open({
      message: error.response?.data?.message || 'Erreur lors du chargement des offres',
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
    
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
</style>