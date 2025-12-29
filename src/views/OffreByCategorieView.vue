<template>
  <div class="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
    <Navbar />
    <main class="flex-grow">
      <div class="categories-page">
        <PageHero>
      <template #title>
        {{ $t('hero.categoriesView.title').split($t('hero.categoriesView.titleHighlight'))[0] }} <span class="text-emerald-400">{{ $t('hero.categoriesView.titleHighlight') }}</span>
      </template>
      <template #subtitle>
        <span v-html="$t('hero.categoriesView.subtitle')"></span>
      </template>

      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Search Bar -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-2xl">
          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1 relative group">
              <MagnifyingGlassIcon class="w-5 h-5 text-emerald-200 absolute left-4 top-3.5 group-focus-within:text-emerald-400 transition-colors" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('hero.categoriesView.searchPlaceholder')"
                class="w-full h-12 pl-12 pr-4 rounded-xl border-0 bg-white/10 text-white placeholder-emerald-100/50 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-0 transition-all duration-300"
                @input="handleSearch"
              />
            </div>
            
            <div class="flex-1 relative group">
              <MapPinIcon class="w-5 h-5 text-emerald-200 absolute left-4 top-3.5 group-focus-within:text-emerald-400 transition-colors" />
              <input
                v-model="locationQuery"
                type="text"
                :placeholder="$t('hero.categoriesView.locationPlaceholder')"
                class="w-full h-12 pl-12 pr-4 rounded-xl border-0 bg-white/10 text-white placeholder-emerald-100/50 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-0 transition-all duration-300"
                @input="handleSearch"
              />
            </div>

            <button 
              class="h-12 px-8 bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 active:scale-95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-emerald-500/25 min-w-[140px]"
              @click="performSearch"
              :disabled="loading"
            >
              <span v-if="!loading">{{ $t('hero.searchButton') || 'Rechercher' }}</span>
              <svg
                v-else
                class="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div class="text-2xl font-bold text-white mb-1">{{ totalElements }}+</div>
            <div class="text-xs text-emerald-200 font-medium uppercase tracking-wide">{{ $t('hero.categoriesView.stats.activeOffers') }}</div>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div class="text-2xl font-bold text-white mb-1">{{ jobCategories.length }}+</div>
            <div class="text-xs text-emerald-200 font-medium uppercase tracking-wide">{{ $t('hero.categoriesView.stats.domains') }}</div>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div class="text-2xl font-bold text-white mb-1">100+</div>
            <div class="text-xs text-emerald-200 font-medium uppercase tracking-wide">{{ $t('hero.categoriesView.stats.companies') }}</div>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div class="text-2xl font-bold text-white mb-1">24h</div>
            <div class="text-xs text-emerald-200 font-medium uppercase tracking-wide">{{ $t('hero.categoriesView.stats.responseTime') }}</div>
          </div>
        </div>
      </div>
    </PageHero>

    <section class="categories-section py-8">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/80">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Explorez par Catégories</h2>
              <p class="text-sm text-gray-600 mt-1">Trouvez le poste qui correspond à vos compétences</p>
            </div>
            
            <button 
              v-if="jobCategories.length > initialCategoriesCount"
              @click="toggleCategories" 
              class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center gap-2"
            >
              <span>{{ showAllCategories ? 'Voir moins' : 'Voir plus' }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 transition-transform duration-200" 
                :class="{ 'rotate-180': showAllCategories }"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </button>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="category in displayedCategories" 
              :key="category.id" 
              @click="filterByCategory(category.id)"
              :class="[
                'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                selectedCategory === category.id
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
              ]"
              :style="selectedCategory === category.id ? { backgroundColor: category.color } : {}"
            >
              <component :is="category.icon" class="w-4 h-4" />
              <span>{{ category.name }}</span>
              <span 
                v-if="getJobsCountByCategory[category.id]"
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                ]"
              >
                {{ getJobsCountByCategory[category.id] }}+
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="results-section">
      <div class="container">
        <div class="results-header">
          <div class="results-info">
            <h2 class="section-title">
              {{ selectedCategoryData ? selectedCategoryData.name : 'Toutes les catégories' }}
            </h2>
            <p class="results-count">
              <span v-if="loading">Chargement...</span>
              <span v-else>
                {{ displayedJobs.length }} offre{{ displayedJobs.length !== 1 ? 's' : '' }} affichée{{ displayedJobs.length !== 1 ? 's' : '' }}
                <span v-if="totalElements > displayedJobs.length">
                  sur {{ totalElements }} trouvée{{ totalElements !== 1 ? 's' : '' }}
                </span>
              </span>
            </p>
          </div>
          
          <div class="results-actions">
            <button 
              v-if="selectedCategory || searchQuery || locationQuery" 
              class="clear-filter"
              @click="clearAllFilters"
            >
              Effacer les filtres
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading-container">
          <div class="loading-grid">
            <div v-for="n in 6" :key="n" class="job-card loading">
              <div class="card-header">
                <div class="company-logo shimmer"></div>
                <div class="job-meta">
                  <div class="job-type shimmer" style="width: 80px; height: 24px"></div>
                  <div class="salary-range shimmer" style="width: 100px; height: 20px"></div>
                </div>
              </div>
              <div class="card-body">
                <div class="job-title shimmer" style="width: 70%; height: 24px; margin-bottom: 10px"></div>
                <div class="company-info">
                  <div class="company-name shimmer" style="width: 120px; height: 16px"></div>
                  <div class="location shimmer" style="width: 100px; height: 16px"></div>
                </div>
                <div class="job-excerpt">
                  <div class="shimmer" style="width: 100%; height: 16px; margin-bottom: 8px"></div>
                  <div class="shimmer" style="width: 80%; height: 16px"></div>
                </div>
              </div>
              <div class="card-footer">
                <div class="skills">
                  <div class="skill-tag shimmer" style="width: 60px; height: 24px"></div>
                  <div class="skill-tag shimmer" style="width: 70px; height: 24px"></div>
                </div>
                <div class="apply-button shimmer" style="width: 80px; height: 32px"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="displayedJobs.length > 0" class="jobs-grid">
          <div v-for="(job, index) in displayedJobs" :key="job.id || index" class="job-card">
            <div class="card-header">
              <div class="company-logo">
                <img 
                  :src="job.logo" 
                  :alt="`Logo ${job.company}`"
                  loading="lazy" 
                  @error="(e: Event) => handleImageError(e, job.companyData || {} as ICompany)"
                  class="logo-image"
                />
              </div>
              <div class="job-meta">
                <span class="job-type" :class="job.type">{{ job.typeLabel }}</span>
                <span class="salary-range">{{ job.salary }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="job-title">{{ job.title }}</h3>
              <div class="company-info">
                <span class="company-name">{{ job.company }}</span>
                <span class="location">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ job.location }}
                </span>
              </div>

              <div class="job-categories">
                <span 
                  v-for="categoryBadge in getCategoryBadges(job)" 
                  :key="categoryBadge.id"
                  class="category-badge"
                  :style="{ backgroundColor: categoryBadge.color + '20', color: categoryBadge.color, borderColor: categoryBadge.color }"
                >
                  {{ categoryBadge.name }}
                </span>
              </div>
              
              <p class="job-excerpt">{{ job.excerpt }}</p>
            </div>
            <div class="card-footer">
              <div class="skills">
                <span v-for="(skill, i) in job.skills" :key="i" class="skill-tag">{{ skill }}</span>
              </div>
              <router-link :to="`/detail/jobs/${job.id}`" class="apply-button">
                Postuler
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-content">
            <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Aucune offre trouvée</h3>
            <p v-if="selectedCategory || searchQuery || locationQuery">
              Aucune offre ne correspond à vos critères de recherche.
            </p>
            <p v-else>
              Aucune offre n'est disponible pour le moment.
            </p>
            <button class="clear-filters-btn" @click="clearAllFilters">
              Effacer tous les filtres
            </button>
          </div>
        </div>

        <!-- PAGINATION -->
          <Pagination
            v-if="!loading && totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="loading"
            @change="changePage"
          />
      </div>
    </section>
    </div>
    </main>
  </div>
  <Footer/>
  
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//@ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue'
import PageHero from '@/components/shared/PageHero.vue'
import Pagination from '@/components/shared/Pagination.vue'
import Footer from '../components/footer/FooterComponent.vue'
//@ts-ignore
import { useJobService } from '@/utils/service/jobService'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
//@ts-ignore
import type { IJob, IJobResponse } from '@/utils/interface/IJobOffers'
import type { ICompany } from '@/utils/interface/ICompagny'

import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CodeBracketIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  BanknotesIcon,
  BeakerIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  CogIcon,
  WrenchIcon,
  HomeIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

// Services
const jobService = useJobService();
const companyService = useCompanyService();

const displayedJobs = ref<any[]>([])
const loading = ref(false)
const paginationLoading = ref(false)
const selectedCategory = ref<string>('')
const searchQuery = ref('')
const locationQuery = ref('')
const showAllCategories = ref(false)


const currentPage = ref(0)
const itemsPerPage = 12
const totalPages = ref(0)
const totalElements = ref(0) // Total from API
const quickPage = ref(0)

// Cache
const companyCache = new Map<number, any>();
const initialCategoriesCount = 8


const displayedCategories = computed(() => {
  if (showAllCategories.value) {
    return jobCategories.value
  }
  return jobCategories.value.slice(0, initialCategoriesCount)
})

// Removed computed properties that were based on allJobs (client-side)
// Now we rely on API response for counts if needed, but for now we just show results

const selectedCategoryData = computed(() => {
  if (!selectedCategory.value) return null;
  return jobCategories.value.find(cat => cat.id === selectedCategory.value);
})

// Note: Accurate "Counts by category" for *all* jobs is expensive to calculate with server-side pagination 
// unless the API provides a facet endpoint. 
// For now, we will track counts based on the current search context OR 
// we would need a separate API call to get stats. 
// To keep it simple and performant, we might hide the exact count per category in the grid 
// or implement a separate "stats" fetch if critical.
// For this refactor, I'll initialize with 0 or remove the count display in the grid if it's misleading.
// The template uses `getJobsCountByCategory`, let's implement a basic version or mock it.
const getJobsCountByCategory = ref<Record<string, number>>({});

const toggleCategories = () => {
  showAllCategories.value = !showAllCategories.value
}

const getDomainFromUrl = (url: string): string => {
  if (!url) return ''
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    const domain = new URL(fullUrl).hostname.replace('www.', '')
    return domain
  } catch {
    return url
  }
}

const getCompanyLogo = (company: ICompany): string => {
  if (!company) return getFallbackLogo(company)
  
  if (company.webSiteUrl) {
    try {
      const domain = getDomainFromUrl(company.webSiteUrl)
      return `https://logo.clearbit.com/${domain}?size=120&format=png`
    } catch {
      return getFallbackLogo(company)
    }
  }
  return getFallbackLogo(company)
}

// Cache pour les logos fallback générés
const fallbackLogoCache = new Map<string, string>();

// Générateur de SVG pour fallback logo
const generateSVGLogo = (letter: string, color: string): string => {
  const cacheKey = `${letter}-${color}`;
  
  if (fallbackLogoCache.has(cacheKey)) {
    return fallbackLogoCache.get(cacheKey)!;
  }
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#${color}" rx="8"/>
      <text x="30" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">
        ${letter}
      </text>
    </svg>
  `.trim();
  
  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
  fallbackLogoCache.set(cacheKey, dataUrl);
  return dataUrl;
};

const getFallbackLogo = (company: ICompany): string => {
  if (!company || !company.name) {
    return generateSVGLogo('?', '6b7280');
  }
  
  const firstLetter = company.name.charAt(0).toUpperCase();
  const colors = [
    '10b981', '3b82f6', 'f59e0b', 'ef4444', '8b5cf6', '06b6d4', 'f97316', 
  ];
  const color = colors[Math.abs(company.id) % colors.length] || '6b7280';
  return generateSVGLogo(firstLetter, color);
}

const handleImageError = (event: Event, company: ICompany) => {
  const target = event.target as HTMLImageElement;
  // Éviter les boucles infinies en marquant l'image comme traitée
  if (target.dataset.fallbackApplied === 'true') {
    return;
  }
  target.dataset.fallbackApplied = 'true';
  target.src = getFallbackLogo(company);
}

const enrichJobsWithCompanyData = async (jobs: IJob[]): Promise<any[]> => {
  try {
    const enrichedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (companyCache.has(job.companyId)) {
          const cachedCompany = companyCache.get(job.companyId);
          return {
            ...job,
            company: cachedCompany,
            companyLogo: getCompanyLogo(cachedCompany)
          };
        }

        try {
          const company = await companyService.getCompanyById(job.companyId);
          const companyData: ICompany = {
            id: company.id,
            name: company.name,
            location: company.location,
            webSiteUrl: company.webSiteUrl,
            description: company.description,
            userId: 0
          };
          
          companyCache.set(job.companyId, companyData);
          return {
            ...job,
            company: companyData,
            companyLogo: getCompanyLogo(companyData)
          };
        } catch (error) {
          console.warn(`Impossible de récupérer l'entreprise pour l'offre ${job.id}:`, error);
          const fallbackCompany: ICompany = {
            id: job.companyId,
            name: `Entreprise #${job.companyId}`,
            location: 'Non spécifié',
            webSiteUrl: '',
            description: '', // Ajout de description
            userId: 0
          };
          
          companyCache.set(job.companyId, fallbackCompany);
          return {
            ...job,
            company: fallbackCompany,
            companyLogo: getFallbackLogo(fallbackCompany)
          };
        }
      })
    );
    
    return enrichedJobs;
  } catch (error) {
    console.error('Erreur lors de l\'enrichissement des offres:', error);
    const fallback: ICompany = {
      id: 0,
      name: 'Entreprise inconnue',
      location: '',
      webSiteUrl: '',
      description: '',
      userId: 0
    };
    return jobs.map(job => ({
      ...job,
      companyLogo: getFallbackLogo(fallback)
    }));
  }
};
const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return 'Salaire à négocier';
  if (!min) return `Jusqu'à ${max?.toLocaleString()} €`;
  if (!max) return `À partir de ${min?.toLocaleString()} €`;
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`;
};

const formatJobType = (jobType: string): string => {
  const types: { [key: string]: string } = {
    'FULL_TIME': 'CDI',
    'PART_TIME': 'Temps partiel',
    'CONTRACT': 'CDD',
    'FREELANCE': 'Freelance',
    'INTERNSHIP': 'Stage',
    'HYBRID': 'Hybride',
    'REMOTE': 'Remote'
  };
  return types[jobType] || jobType || 'Non spécifié';
};

const determineJobCategories = (job: any): string[] => {
  const categories = new Set<string>();
  
  if (job.sector) {
    jobCategories.value.forEach(category => {
      // Check if job.sector matches any of the category sectors
      // This logic depends on what `job.sector` actual values are vs `category.sectors`
      if (category.sectors.includes(job.sector)) {
        categories.add(category.id);
      }
    });
  }
  
  if (categories.size === 0) {
    categories.add('other');
  }
  
  return Array.from(categories);
};

const formatJobForDisplay = (job: any) => {
  const categories = determineJobCategories(job);
  
  return {
    title: job.title || 'Titre non spécifié',
    company: job.company?.name || `Entreprise #${job.companyId}`,
    companyData: job.company,
    location: job.location || 'Non spécifié',
    salary: formatSalary(job.salaryMin, job.salaryMax),
    type: job.jobType?.toLowerCase() || 'full-time',
    typeLabel: formatJobType(job.jobType),
    excerpt: job.description ? job.description.substring(0, 100) + '...' : 'Description non disponible',
    skills: job.skills?.map((skill: any) => skill.skillName) || [job.sector, job.experienceLevel].filter(Boolean),
    logo: job.companyLogo || getFallbackLogo(job.company || {} as ICompany),
    id: job.id,
    remote: job.location?.toLowerCase().includes('remote') || false,
    webSiteUrl: job.company?.webSiteUrl || '',
    categories: categories,
    primaryCategory: categories[0],
    sector: job.sector
  };
};

const getCategoryBadges = (job: any) => {
  return job.categories.map((categoryId: string) => {
    const category = jobCategories.value.find(cat => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || 'Autre',
      color: category?.color || '#9ca3af'
    };
  });
};


// Primary Fetch Function (Server-Side)
const fetchJobs = async (page: number = 0) => {
  try {
    if (page === currentPage.value) {
      loading.value = true;
    } else {
      paginationLoading.value = true;
    }
    
    // Déterminer le secteur à partir de la catégorie sélectionnée
    let sector: string | undefined;
    if (selectedCategory.value) {
      const cat = jobCategories.value.find(c => c.id === selectedCategory.value);
      // NOTE: API likely takes one sector. We take the first one from the category definition.
      // Ideally, the API would accept a list or a 'category' param.
      sector = cat?.sectors?.[0];
    }

    console.log('📡 Fetching jobs:', {
      page,
      size: itemsPerPage,
      title: searchQuery.value,
      location: locationQuery.value,
      sector
    });

    const response: IJobResponse = await jobService.searchJobs({
      title: searchQuery.value.trim() || undefined,
      location: locationQuery.value.trim() || undefined,
      sector,
      page,
      size: itemsPerPage,
      status: 'PUBLISHED'
    });

    console.log('✅ Jobs response:', response);

    if (response && Array.isArray(response.content)) {
      const enriched = await enrichJobsWithCompanyData(response.content);
      displayedJobs.value = enriched.map(formatJobForDisplay);
      
      currentPage.value = response.number ?? page;
      totalPages.value = response.totalPages ?? 0;
      totalElements.value = response.totalElements ?? 0;
      quickPage.value = currentPage.value;
    } else {
      displayedJobs.value = [];
      totalPages.value = 0;
      totalElements.value = 0;
    }

  } catch (error) {
    console.error('❌ Erreur lors de la recherche des offres:', error);
    displayedJobs.value = [];
    totalPages.value = 0;
    totalElements.value = 0;
  } finally {
    loading.value = false;
    paginationLoading.value = false;
  }
};

// ACTIONS

 const filterByCategory = (categoryId: string) => {
  if (selectedCategory.value === categoryId) {
    // Toggle off if same category clicked (optional, but standard behavior)
    // selectedCategory.value = '';
    return; // Or do nothing
  }
  
  selectedCategory.value = categoryId;
  currentPage.value = 0;
  
  const query: any = { ...route.query, category: categoryId };
  if (!categoryId) delete query.category;
  
  router.push({ query });
  fetchJobs(0);
};

const handleSearch = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    performSearch();
  }, 500);
};

const performSearch = () => {
  currentPage.value = 0;
  fetchJobs(0);
};

const clearAllFilters = () => {
  selectedCategory.value = '';
  searchQuery.value = '';
  locationQuery.value = '';
  currentPage.value = 0;
  
  const query: any = { ...route.query };
  delete query.category;
  
  router.push({ query });
  fetchJobs(0);
};

// Pagination
const changePage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    fetchJobs(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToQuickPage = () => {
  changePage(quickPage.value);
};

// Watchers 
const searchTimeout = ref<number>();

// Initialize
watch(
  () => route.query.category,
  (newCategory) => {
     // If URL changes "externally" (back button), sync state
     const cat = newCategory as string;
     if (cat !== selectedCategory.value) {
        selectedCategory.value = cat || '';
        fetchJobs(0);
     }
  },
  { immediate: true }
);

onMounted(() => {
  fetchJobs(0);
});

// Catégories
const jobCategories = ref([
  {
    id: 'development',
    name: 'Développement',
    icon: CodeBracketIcon,
    color: '#16a34a',
    sectors: ['IT']
  },
  {
    id: 'business',
    name: 'Business',
    icon: BriefcaseIcon,
    color: '#10B981',
    sectors: ['SALES', 'CONSULTING', 'BUSINESS']
  },
  {
    id: 'finance',
    name: 'Finance & Comptabilité',
    icon: BanknotesIcon,
    color: '#06B6D4',
    sectors: ['FINANCE', 'ACCOUNTING', 'BANKING']
  },
  {
    id: 'marketing',
    name: 'Marketing & Communication',
    icon: GlobeAltIcon,
    color: '#F97316',
    sectors: ['MARKETING', 'COMMUNICATION', 'ADVERTISING']
  },
  {
    id: 'design',
    name: 'Design & Création',
    icon: ComputerDesktopIcon,
    color: '#EC4899',
    sectors: ['DESIGN', 'CREATIVE', 'ARTS']
  },
  {
    id: 'health',
    name: 'Santé & Social',
    icon: BeakerIcon,
    color: '#DC2626',
    sectors: ['HEALTH', 'MEDICAL', 'SOCIAL', 'CARE']
  },
  {
    id: 'education',
    name: 'Éducation & Formation',
    icon: AcademicCapIcon,
    color: '#8B5CF6',
    sectors: ['EDUCATION', 'TRAINING', 'TEACHING']
  },
  {
    id: 'construction',
    name: 'BTP & Construction',
    icon: WrenchScrewdriverIcon,
    color: '#F59E0B',
    sectors: ['CONSTRUCTION', 'BUILDING', 'ENGINEERING']
  },
  {
    id: 'logistics',
    name: 'Logistique & Transport',
    icon: TruckIcon,
    color: '#475569',
    sectors: ['LOGISTICS', 'TRANSPORT', 'SUPPLY_CHAIN']
  },
  {
    id: 'retail',
    name: 'Commerce & Vente',
    icon: ShoppingBagIcon,
    color: '#84CC16',
    sectors: ['RETAIL', 'SALES', 'COMMERCE']
  },
  {
    id: 'hospitality',
    name: 'Hôtellerie & Restauration',
    icon: BuildingStorefrontIcon,
    color: '#EC4899',
    sectors: ['HOSPITALITY', 'RESTAURANT', 'TOURISM']
  },
  {
    id: 'admin',
    name: 'Administration & Secrétariat',
    icon: DocumentTextIcon,
    color: '#6B7280',
    sectors: ['ADMINISTRATION', 'SECRETARIAL', 'OFFICE']
  },
  {
    id: 'production',
    name: 'Production & Industrie',
    icon: CogIcon,
    color: '#1E40AF',
    sectors: ['PRODUCTION', 'MANUFACTURING', 'INDUSTRY']
  },
  {
    id: 'maintenance',
    name: 'Maintenance & Réparation',
    icon: WrenchIcon,
    color: '#D97706',
    sectors: ['MAINTENANCE', 'REPAIR', 'TECHNICAL']
  },
  {
    id: 'cleaning',
    name: 'Nettoyage & Services',
    icon: HomeIcon,
    color: '#059669',
    sectors: ['CLEANING', 'DOMESTIC', 'SERVICES']
  },
  {
    id: 'security',
    name: 'Sécurité & Surveillance',
    icon: ShieldCheckIcon,
    color: '#374151',
    sectors: ['SECURITY', 'SURVEILLANCE', 'PROTECTION']
  }
])
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.categories-page {
  --primary-color: #10b981;
  --primary-hover: #059669;
  --primary-light: #d1fae5;
  --primary-dark: #047857;
  --accent-color: #34d399;
  --text-color: #ffffff;
  --dark-text: #1f2937;
  font-family: 'Outfit', sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}


.page-header {
  background: linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%);
  color: white;
  padding: 6rem 0 8rem;
  margin-top: 0;
  position: relative;
  overflow: visible;
  z-index: 10; 
}

.header-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 20; 
}

.header-text {
  max-width: 600px;
  position: relative;
  z-index: 30; 
}

.badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: white;
}

.highlight {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 500px;
}


.hero-search-form {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  overflow: visible;
  padding: 1rem;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  margin-bottom: 2.5rem;
  max-width: 800px;
  width: 100%; 
  position: relative;
  z-index: 40; 
}

.hero-search-form .search-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: rgba(248, 250, 252, 0.9);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(203, 213, 225, 0.3);
  min-height: 60px; 
}

.hero-search-form .search-input-group:focus-within {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 2px var(--primary-color);
  border-color: var(--primary-color);
}

.hero-search-form .search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.hero-search-form .search-input {
  flex: 1;
  padding: 1.125rem 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  font-weight: 500;
  width: 100%; 
  min-height: 30px; 
}

.hero-search-form .search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.hero-search-form .search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  white-space: nowrap;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(16, 185, 129, 0.45);
  min-height: 60px; 
  min-width: 140px;
}

.hero-search-form .search-button:hover {
  background: linear-gradient(135deg, var(--primary-hover), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
}

.hero-search-form .search-button:active {
  transform: translateY(0);
}

.hero-search-form .button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.hero-search-form .search-button:hover .button-icon {
  transform: translateX(3px);
}

.header-features {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 30;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
}

.feature-icon {
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-visual {
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 30;
}

.stats-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 350px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #f0fdf4;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.gradient-orbit {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
  z-index: 1;
}

.gradient-orbit:nth-child(1) {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -100px;
  animation-delay: 0s;
}

.gradient-orbit:nth-child(2) {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: 10%;
  animation-delay: -2s;
}

.gradient-orbit:nth-child(3) {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 20%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) scale(1.05);
    opacity: 0.8;
  }
}

.search-section {
  display: none;
}

.search-form {
  display: flex;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  max-width: 800px;
  margin: 0 auto;
}

.search-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(203, 213, 225, 0.3);
}

.search-input-group:focus-within {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 2px var(--primary-color);
  border-color: var(--primary-color);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  padding: 1.125rem 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  font-weight: 500;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  white-space: nowrap;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}

.search-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.search-button:hover .button-icon {
  transform: translateX(3px);
}

.categories-section {
  padding: 5rem 0;
  background-color: #f9fafb;
  position: relative;
  z-index: 5; 
  margin-top: -2rem; 
}

.section-header.with-toggle {
  margin-bottom: 3rem;
}

.section-header .header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}

.section-header .header-text {
  flex: 1;
  max-width: 600px;
}

.header-toggle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.toggle-button.header-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  background-color: white;
  white-space: nowrap;
}

.toggle-button.header-toggle-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.toggle-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.section-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
}

.categories-container {
  position: relative;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  transition: all 0.3s ease;
  max-height: 400px;
  overflow: hidden;
}

.categories-grid.expanded {
  max-height: none;
  overflow: visible;
}

.category-card {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  min-height: 100px;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.category-card.active {
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.category-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.category-info p {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.categories-grid:not(.expanded) {
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}


.results-section {
  padding: 4rem 0;
  background-color: #f9fafb;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-info {
  flex: 1;
}

.results-info .section-title {
  margin-bottom: 0.5rem;
  text-align: left;
}

.results-count {
  color: #6b7280;
  font-size: 1rem;
}

.results-actions {
  display: flex;
  gap: 1rem;
}

.clear-filter {
  background: none;
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.clear-filter:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .jobs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .jobs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.job-card {
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
}

.company-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.job-type {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.job-type.full-time {
  background-color: #d1fae5;
  color: #065f46;
}

.job-type.part-time {
  background-color: #e0e7ff;
  color: #3730a3;
}

.job-type.contract {
  background-color: #fef3c7;
  color: #92400e;
}

.job-type.internship {
  background-color: #fce7f3;
  color: #be185d;
}

.job-type.remote {
  background-color: #dcfce7;
  color: #166534;
}

.job-type.hybrid {
  background-color: #f3e8ff;
  color: #6b21a8;
}

.salary-range {
  font-size: 0.875rem;
  font-weight: 600;
  color: #16a34a;
}

.card-body {
  padding: 1.25rem 1.5rem;
  flex-grow: 1;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.company-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}

.company-name {
  font-size: 0.875rem;
  color: #6b7280;
}

.location {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.location svg {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  color: #9ca3af;
}

.job-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid;
  backdrop-filter: blur(4px);
}

.job-excerpt {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-size: 0.75rem;
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.apply-button {
  display: inline-flex;
  align-items: center;
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.apply-button:hover {
  background-color: #15803d;
}

.apply-button svg {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.loading-container {
  width: 100%;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-filters-btn:hover {
  background-color: var(--primary-hover);
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.categories-grid.expanded .category-card:nth-child(n+9) {
  animation: fadeIn 0.4s ease-out;
}


@media (max-width: 1024px) {
  .header-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .header-text {
    max-width: none;
  }
  
  .page-title {
    font-size: 3rem;
  }
  
  .hero-search-form {
    flex-wrap: wrap;
    padding: 0.75rem;
    gap: 0.5rem;
    max-width: 100%; 
  }

  .hero-search-form .search-input-group {
    flex: 1 1 40%;
    min-width: 200px;
    padding: 0 1rem;
    min-height: 55px; 
  }

  .hero-search-form .search-button {
    padding: 1rem 1.5rem;
    flex: 1 1 100%;
    min-height: 55px;
  }

  .jobs-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 4rem 0 6rem;
    overflow: visible; 
  }

  .page-title {
    font-size: 2.5rem;
  }

  .hero-search-form {
    flex-direction: column;
    padding: 1rem;
  }

  .hero-search-form .search-input-group {
    width: 100%;
    min-height: 50px;
  }

  .hero-search-form .search-button {
    width: 100%;
    min-height: 50px;
  }

  .header-features {
    justify-content: center;
  }

  .stats-card {
    max-width: 100%;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .section-header .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  
  .header-toggle {
    justify-content: flex-start;
  }
  
  .toggle-button.header-toggle-btn {
    width: 100%;
    justify-content: center;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }

  .category-card {
    padding: 1.25rem;
    min-height: 90px;
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .job-card,
  .category-card {
    padding: 1.25rem;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding: 1rem;
  }

  .logo-image {
    width: 35px;
    height: 35px;
  }

  .job-title {
    font-size: 1.2rem;
  }

  .feature {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .category-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
    min-height: 140px;
  }

  .category-info h4 {
    font-size: 0.9375rem;
  }

  .logo-image {
    width: 32px;
    height: 32px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .toggle-button.header-toggle-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }

  .hero-search-form {
    padding: 0.75rem;
  }

  .hero-search-form .search-input {
    padding: 1rem 0;
    font-size: 0.9375rem;
  }

  .hero-search-form .search-input-group,
  .hero-search-form .search-button {
    min-height: 45px;
  }
}
</style>