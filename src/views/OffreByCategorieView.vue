<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <Navbar />
  
  <div class="categories-page">
    <section class="page-header">
      <div class="container">
        <div class="header-content mt-10">
          <div class="header-text">
            <h1 class="page-title">Trouvez Votre <span class="highlight">Prochain Défi</span></h1>
            <p class="page-subtitle">
              Des opportunités de carrière <strong>triées sur le volet</strong> dans les meilleures entreprises. 
              Rejoignez les talents qui façonnent l'avenir professionnel.
            </p>
            
            <div class="hero-search-form">
              <div class="search-input-group">
                <MagnifyingGlassIcon class="search-icon" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Poste, compétence ou entreprise..."
                  class="search-input"
                  @input="handleSearch"
                />
              </div>
              <div class="search-input-group">
                <MapPinIcon class="search-icon" />
                <input
                  v-model="locationQuery"
                  type="text"
                  placeholder="Localisation..."
                  class="search-input"
                  @input="handleSearch"
                />
              </div>
              <button class="search-button" @click="performSearch">
                <span>Rechercher</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="button-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="header-visual">
            <div class="stats-card">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">{{ totalJobsCount }}+</div>
                  <div class="stat-label">Offres actives</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">{{ jobCategories.length }}+</div>
                  <div class="stat-label">Domaines</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">100+</div>
                  <div class="stat-label">Entreprises</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">24h</div>
                  <div class="stat-label">Réponse moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-background">
        <div class="gradient-orbit"></div>
        <div class="gradient-orbit"></div>
        <div class="gradient-orbit"></div>
      </div>
    </section>

    <section class="categories-section">
      <div class="container">
        <div class="section-header with-toggle">
          <div class="header-content">
            <div class="header-text">
              <h2 class="section-title">Explorez par Catégories</h2>
              <p class="section-subtitle">Trouvez le poste qui correspond à vos compétences</p>
            </div>
            
            <div class="header-toggle" v-if="jobCategories.length > initialCategoriesCount">
              <button 
                @click="toggleCategories" 
                class="toggle-button header-toggle-btn"
              >
                <span>{{ showAllCategories ? 'Voir moins' : 'Voir plus' }}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="toggle-icon" 
                  :class="{ 'rotated': showAllCategories }"
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
          </div>
        </div>
        
        <div class="categories-container">
          <div 
            class="categories-grid"
            :class="{ 'expanded': showAllCategories }"
          >
            <button 
              v-for="category in displayedCategories" 
              :key="category.id" 
              @click="filterByCategory(category.id)"
              class="category-card"
              :class="{ active: selectedCategory === category.id }"
            >
              <div class="category-icon" :style="{ backgroundColor: category.color }">
                <component :is="category.icon" />
              </div>
              <div class="category-info">
                <h4>{{ category.name }}</h4>
                <p>{{ getJobsCountByCategory[category.id] || 0 }}+ offres</p>
              </div>
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
                <span v-if="totalFilteredJobs > displayedJobs.length">
                  sur {{ totalFilteredJobs }} trouvée{{ totalFilteredJobs !== 1 ? 's' : '' }}
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
        <div v-if="!loading && totalPages > 1" class="mt-12">
          <div class="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <!-- Informations -->
              <div class="flex-shrink-0">
                <p class="text-sm text-gray-600">
                  Page <span class="font-semibold text-gray-800">{{ currentPage + 1 }}</span> sur 
                  <span class="font-semibold text-gray-800">{{ totalPages }}</span>
                  <span class="text-gray-400 mx-2">•</span>
                  <span class="font-semibold text-emerald-600">{{ displayedJobs.length }}</span> offre{{ displayedJobs.length !== 1 ? 's' : '' }} affichée{{ displayedJobs.length !== 1 ? 's' : '' }}
                  sur <span class="font-semibold text-emerald-600">{{ totalFilteredJobs }}</span>
                </p>
              </div>
              
              <!-- Navigation -->
              <nav class="flex items-center space-x-1 sm:space-x-2">
                <!-- Précédent -->
                <button 
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 0"
                  class="flex items-center justify-center p-2 sm:p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all duration-200 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
                  aria-label="Page précédente"
                >
                  <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

             
                <template v-for="page in visiblePages" :key="page">
                 <button
                    v-if="typeof page === 'number'"
                    @click="changePage(page - 1)"
                    :class="[
                      'flex items-center justify-center px-3 py-2 rounded-xl font-medium transition-all duration-200 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] text-sm sm:text-base',
                      currentPage === page - 1 
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/20 transform scale-105' 
                        : 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-emerald-600 bg-white'
                    ]"
                    :aria-label="`Aller à la page ${page}`"
                    :aria-current="currentPage === page - 1 ? 'page' : undefined"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="px-2 text-gray-400 text-sm sm:text-base flex items-center" aria-hidden="true">
                    ...
                  </span>
                </template>

                
                <button 
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage >= totalPages - 1"
                  class="flex items-center justify-center p-2 sm:p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all duration-200 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
                  aria-label="Page suivante"
                >
                  <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>

              <div class="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0">
                <span class="whitespace-nowrap">Aller à:</span>
                <select 
                  v-model="quickPage"
                  @change="goToQuickPage"
                  class="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white transition-colors appearance-none cursor-pointer"
                  aria-label="Sélectionner une page"
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
    </section>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//@ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue'
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

const allJobs = ref<any[]>([])
const filteredJobs = ref<any[]>([])
const loading = ref(false)
const selectedCategory = ref<string>('')
const searchQuery = ref('')
const locationQuery = ref('')
const showAllCategories = ref(false)


const currentPage = ref(0)
const itemsPerPage = 12
const totalPages = ref(0)
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

// Jobs affichés avec pagination
const displayedJobs = computed(() => {
  const startIndex = currentPage.value * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredJobs.value.slice(startIndex, endIndex)
})

// Total des jobs filtrés (sans pagination)
const totalFilteredJobs = computed(() => {
  return filteredJobs.value.length
})

// Total de tous les jobs (pour les stats)
const totalJobsCount = computed(() => {
  return allJobs.value.length
})

// Pages visibles pour la pagination
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value + 1
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const selectedCategoryData = computed(() => {
  if (!selectedCategory.value) return null;
  return jobCategories.value.find(cat => cat.id === selectedCategory.value);
})

// Comptage des jobs par catégorie (basé sur tous les jobs, pas les jobs filtrés
const getJobsCountByCategory = computed(() => {
  const counts: { [key: string]: number } = {};
  
  jobCategories.value.forEach(category => {
    counts[category.id] = 0;
  });
  counts['other'] = 0;
  counts['all'] = allJobs.value.length;
  
  // Compter les jobs pour chaque catégorie parmi TOUS les jobs
  allJobs.value.forEach(job => {
    job.categories.forEach((categoryId: string) => {
      if (counts[categoryId] !== undefined) {
        counts[categoryId]++;
      } else {
        counts['other']++;
      }
    });
  });
  
  return counts;
})

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

const getFallbackLogo = (company: ICompany): string => {
  if (!company) return 'https://via.placeholder.com/60x60/6b7280/ffffff?text=?&font-size=14'
  
  const firstLetter = company.name ? company.name.charAt(0).toUpperCase() : '?'
  const colors = [
    '10b981', '3b82f6', 'f59e0b', 'ef4444', '8b5cf6', '06b6d4', 'f97316', 
  ]
  const color = colors[Math.abs(company.id) % colors.length] || '6b7280'
  return `https://via.placeholder.com/60x60/${color}/ffffff?text=${firstLetter}&font-size=16&font-weight=bold`
}

const handleImageError = (event: Event, company: ICompany) => {
  const target = event.target as HTMLImageElement
  target.src = getFallbackLogo(company)
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


const fetchAllJobs = async () => {
  try {
    loading.value = true;
    console.log('📡 Fetching all jobs...');

    const response: IJobResponse = await jobService.getAllJobs(0, 1000);
    
    console.log('✅ All jobs response:', response);

    if (response && Array.isArray(response.content)) {
      const enrichedJobs = await enrichJobsWithCompanyData(response.content);
      allJobs.value = enrichedJobs.map(formatJobForDisplay);
      applyFilters();
      
      console.log('All jobs formatted:', allJobs.value);
      console.log('Jobs by category:', getJobsCountByCategory.value);
    } else {
      console.warn('Aucune offre trouvée ou format de réponse invalide');
      allJobs.value = [];
      filteredJobs.value = [];
    }

  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des offres:', error);
    allJobs.value = [];
    filteredJobs.value = [];
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  let results = [...allJobs.value];
  
  // Appliquer les filtres
  if (selectedCategory.value) {
    results = results.filter(job => 
      job.categories.includes(selectedCategory.value)
    );
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.excerpt.toLowerCase().includes(query) ||
      job.skills.some((skill: string) => skill.toLowerCase().includes(query))
    );
  }
  
  if (locationQuery.value) {
    const location = locationQuery.value.toLowerCase();
    results = results.filter(job => 
      job.location.toLowerCase().includes(location)
    );
  }
  
  filteredJobs.value = results;
  
  // Mettre à jour la pagination
  totalPages.value = Math.ceil(results.length / itemsPerPage);
  
  // Réinitialiser à la première page si nécessaire
  if (currentPage.value >= totalPages.value) {
    currentPage.value = 0;
    quickPage.value = 0;
  }
};

// Pagination
const changePage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page;
    quickPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToQuickPage = () => {
  changePage(quickPage.value);
};

const filterByCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  currentPage.value = 0;
  quickPage.value = 0;
  
  const query: any = { ...route.query };
  if (categoryId) {
    query.category = categoryId;
  } else {
    delete query.category;
  }
  
  router.push({ query });
  applyFilters();
};

const handleSearch = () => {
  // éviter trop d'appels
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    performSearch();
  }, 500);
};

const performSearch = () => {
  currentPage.value = 0;
  quickPage.value = 0;
  applyFilters();
};

const clearAllFilters = () => {
  selectedCategory.value = '';
  searchQuery.value = '';
  locationQuery.value = '';
  currentPage.value = 0;
  quickPage.value = 0;
  
  const query: any = { ...route.query };
  delete query.category;
  
  router.push({ query });
  applyFilters();
};

// Watchers 
const searchTimeout = ref<number>();

watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory && newCategory !== selectedCategory.value) {
      selectedCategory.value = newCategory as string;
      currentPage.value = 0;
      applyFilters();
    } else if (!newCategory && selectedCategory.value) {
      selectedCategory.value = '';
      currentPage.value = 0;
      applyFilters();
    }
  },
  { immediate: true }
);

onMounted(() => {
  fetchAllJobs();
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
  font-family: 'Inter', sans-serif;
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
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
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