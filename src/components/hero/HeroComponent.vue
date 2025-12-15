<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
//@ts-ignore
import jobSearch from '../../assets/carousel-1.jpg'
//@ts-ignore
import hiring from '../../assets/carousel-3.jpg'
//@ts-ignore
import remoteWork from '../../assets/carousel-2.jpg'
//@ts-ignore
import careerGrowth from '../../assets/carousel-4.jpg'
//@ts-ignore
import Navbar from '../navbar/NavBarComponent.vue'

import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  CodeBracketIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  BanknotesIcon,
  BeakerIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  CogIcon,
  WrenchIcon,
  HomeIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
//@ts-ignore
import { useJobService } from '@/utils/service/jobService'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
import type { IJob, IJobResponse } from '@/utils/interface/IJobOffers'
import { JobType } from '@/utils/interface/IJobOffers'
import type { ICompany } from '@/utils/interface/ICompagny'

// Services
const jobService = useJobService();
const companyService = useCompanyService();
const router = useRouter();
const { t } = useI18n();

const featuredJobs = ref<any[]>([])
const loading = ref(false)

const companyCache = new Map<number, any>();

const jobCategories = computed(() => [
  {
    id: 'development',
    name: t('hero.categories.development'),
    icon: CodeBracketIcon,
    color: '#16a34a',
    sectors: ['IT']
  },
  {
    id: 'business',
    name: t('hero.categories.business'),
    icon: BriefcaseIcon,
    color: '#10B981',
    sectors: ['SALES', 'CONSULTING', 'BUSINESS']
  },
  {
    id: 'finance',
    name: t('hero.categories.finance'),
    icon: BanknotesIcon,
    color: '#06B6D4',
    sectors: ['FINANCE', 'ACCOUNTING', 'BANKING']
  },
  {
    id: 'marketing',
    name: t('hero.categories.marketing'),
    icon: GlobeAltIcon,
    color: '#F97316',
    sectors: ['MARKETING', 'COMMUNICATION', 'ADVERTISING']
  },
  {
    id: 'design',
    name: t('hero.categories.design'),
    icon: ComputerDesktopIcon,
    color: '#EC4899',
    sectors: ['DESIGN', 'CREATIVE', 'ARTS']
  },
  {
    id: 'health',
    name: t('hero.categories.health'),
    icon: BeakerIcon,
    color: '#DC2626',
    sectors: ['HEALTH', 'MEDICAL', 'SOCIAL', 'CARE']
  },
  {
    id: 'education',
    name: t('hero.categories.education'),
    icon: AcademicCapIcon,
    color: '#8B5CF6',
    sectors: ['EDUCATION', 'TRAINING', 'TEACHING']
  },
  {
    id: 'construction',
    name: t('hero.categories.engineering'),
    icon: WrenchScrewdriverIcon,
    color: '#F59E0B',
    sectors: ['CONSTRUCTION', 'BUILDING', 'ENGINEERING']
  },
  {
    id: 'logistics',
    name: t('hero.categories.logistics'),
    icon: TruckIcon,
    color: '#475569',
    sectors: ['LOGISTICS', 'TRANSPORT', 'SUPPLY_CHAIN']
  },
  {
    id: 'retail',
    name: t('hero.categories.sales'),
    icon: ShoppingBagIcon,
    color: '#84CC16',
    sectors: ['RETAIL', 'SALES', 'COMMERCE']
  },
  {
    id: 'hospitality',
    name: t('hero.categories.hospitality'),
    icon: BuildingStorefrontIcon,
    color: '#EC4899',
    sectors: ['HOSPITALITY', 'RESTAURANT', 'TOURISM']
  },
  {
    id: 'admin',
    name: t('hero.categories.hr'),
    icon: DocumentTextIcon,
    color: '#6B7280',
    sectors: ['ADMINISTRATION', 'SECRETARIAL', 'OFFICE']
  },
  {
    id: 'production',
    name: t('hero.categories.legal'),
    icon: CogIcon,
    color: '#1E40AF',
    sectors: ['PRODUCTION', 'MANUFACTURING', 'INDUSTRY']
  },
  {
    id: 'maintenance',
    name: t('hero.categories.maintenance'),
    icon: WrenchIcon,
    color: '#D97706',
    sectors: ['MAINTENANCE', 'REPAIR', 'TECHNICAL']
  },
  {
    id: 'cleaning',
    name: t('hero.categories.cleaning'),
    icon: HomeIcon,
    color: '#059669',
    sectors: ['CLEANING', 'DOMESTIC', 'SERVICES']
  },
  {
    id: 'security',
    name: t('hero.categories.security'),
    icon: ShieldCheckIcon,
    color: '#374151',
    sectors: ['SECURITY', 'SURVEILLANCE', 'PROTECTION']
  }
])
const slides = computed(() => [
  {
    image: jobSearch,
    title: t('hero.slide1.title'),
    highlight: t('hero.slide1.highlight'),
    subtitle: t('hero.slide1.subtitle'),
    description: t('hero.slide1.description'),
    cta: t('hero.slide1.cta'),
  },
  {
    image: hiring,
    title: t('hero.slide2.title'),
    highlight: t('hero.slide2.highlight'),
    subtitle: t('hero.slide2.subtitle'),
    description: t('hero.slide2.description'),
    cta: t('hero.slide2.cta'),
  },
  {
    image: remoteWork,
    title: t('hero.slide3.title'),
    highlight: t('hero.slide3.highlight'),
    subtitle: t('hero.slide3.subtitle'),
    description: t('hero.slide3.description'),
    cta: t('hero.slide3.cta'),
  },
  {
    image: careerGrowth,
    title: t('hero.slide4.title'),
    highlight: t('hero.slide4.highlight'),
    subtitle: t('hero.slide4.subtitle'),
    description: t('hero.slide4.description'),
    cta: t('hero.slide4.cta'),
  },
])

const currentSlide = ref(0)
const isHovering = ref(false)
const isTransitioning = ref(false)
let interval: number

const searchQuery = ref('')
const locationQuery = ref('')
const jobType = ref<JobType | ''>('')

// Options de type de contrat basées sur l'enum JobType
const jobTypes = computed(() => [
  { value: '', label: t('hero.jobTypeAll') },
  { value: JobType.FULL_TIME, label: t('hero.jobTypeFullTime') },
  { value: JobType.PART_TIME, label: t('hero.jobTypePartTime') },
  { value: JobType.CONTRACT, label: t('hero.jobTypeContract') },
  { value: JobType.INTERNSHIP, label: t('hero.jobTypeInternship') },
  { value: JobType.FREELANCE, label: t('hero.jobTypeFreelance') },
])

// Fonction pour déterminer les catégories d'un job basée uniquement sur le secteur
const determineJobCategories = (job: any): string[] => {
  const categories = new Set<string>();
  
  console.log('🔍 Analyzing job sector:', job.sector);
  
  // Détection basée uniquement sur job.sector
  if (job.sector) {
    jobCategories.value.forEach(category => {
      if (category.sectors.includes(job.sector)) {
        console.log(`✅ Job ${job.id} (${job.sector}) matches category: ${category.id}`);
        categories.add(category.id);
      }
    });
  }
  
  // Si aucune catégorie trouvée, mettre dans "other"
  if (categories.size === 0) {
    console.log(`❌ Job ${job.id} (${job.sector}) has no matching category, adding to 'other'`);
    categories.add('other');
  }
  
  console.log(`📋 Job ${job.id} categories:`, Array.from(categories));
  return Array.from(categories);
};

// Obtenir le nombre d'offres par catégorie
const getJobsCountByCategory = computed(() => {
  const counts: { [key: string]: number } = {};
  
  // Initialiser tous les compteurs à 0
  jobCategories.value.forEach(category => {
    counts[category.id] = 0;
  });
  counts['other'] = 0;
  
  console.log('📊 Counting jobs by category...');
  console.log('📈 Total featured jobs:', featuredJobs.value.length);
  
  // Compter les jobs pour chaque catégorie
  featuredJobs.value.forEach(job => {
    const jobCategoriesList = determineJobCategories(job);
    jobCategoriesList.forEach(categoryId => {
      if (counts[categoryId] !== undefined) {
        counts[categoryId]++;
      } else {
        counts['other']++;
      }
    });
  });
  
  console.log('🎯 Final counts:', counts);
  return counts;
});

// Fonction pour naviguer vers la page catégories avec filtre
const navigateToCategory = (categoryId: string) => {
  router.push(`/jobs/categories?category=${categoryId}`);
};

// Fonction pour obtenir le nombre d'offres formaté
const getFormattedJobsCount = (categoryId: string) => {
  const count = getJobsCountByCategory.value[categoryId] || 0;
  return `${count}+`;
};

// Fonction pour extraire le domaine d'une URL
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

// Fonction pour générer le logo via Clearbit
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

// Fallback logo avec placeholder
const getFallbackLogo = (company: ICompany): string => {
  if (!company) return 'https://via.placeholder.com/60x60/6b7280/ffffff?text=?&font-size=14'
  
  const firstLetter = company.name ? company.name.charAt(0).toUpperCase() : '?'
  const colors = [
    '10b981', // emerald
    '3b82f6', // blue
    'f59e0b', // amber
    'ef4444', // red
    '8b5cf6', // violet
    '06b6d4', // cyan
    'f97316', // orange
  ]
  const color = colors[Math.abs(company.id) % colors.length] || '6b7280'
  return `https://via.placeholder.com/60x60/${color}/ffffff?text=${firstLetter}&font-size=16&font-weight=bold`
}

// Gestion des erreurs de chargement d'image
const handleImageError = (event: Event, company: ICompany) => {
  const target = event.target as HTMLImageElement
  target.src = getFallbackLogo(company)
}

// Enrichir les jobs avec les données des entreprises
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
            userId:0,
          };
          
          companyCache.set(job.companyId, companyData);
          return {
            ...job,
            company: companyData,
            companyLogo: getCompanyLogo(companyData)
          };
        } catch (error) {
          console.warn(`Impossible de récupérer l'entreprise pour l'offre ${job.id}:`, error);
          const fallbackCompany :ICompany = {
            id: job.companyId,
            name: `Entreprise #${job.companyId}`,
            location: 'Non spécifié',
            webSiteUrl: '',
            userId:0,
            description:''
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
    return jobs.map(job => ({
      ...job,
      companyLogo: getFallbackLogo({} as ICompany)
    }));
  }
};

// Formater les jobs pour l'affichage
const formatJobForDisplay = (job: any) => {
  const categories = determineJobCategories(job);
  
  return {
    title: job.title || t('common.notSpecified', 'Titre non spécifié'),
    company: job.company?.name || `${t('common.company', 'Entreprise')} #${job.companyId}`,
    companyData: job.company,
    location: job.location || t('common.notSpecified', 'Non spécifié'),
    salary: formatSalary(job.salaryMin, job.salaryMax),
    type: job.jobType?.toLowerCase() || 'full-time',
    typeLabel: formatJobType(job.jobType),
    excerpt: job.description ? job.description.substring(0, 100) + '...' : t('common.noDescription', 'Description non disponible'),
    skills: job.skills?.map((skill: any) => skill.skillName) || [job.sector, job.experienceLevel].filter(Boolean),
    logo: job.companyLogo || getFallbackLogo(job.company || {} as ICompany),
    id: job.id,
    remote: job.location?.toLowerCase().includes('remote') || false,
    webSiteUrl: job.company?.webSiteUrl || '',
    categories: categories,
    sector: job.sector // Conserver le secteur pour le débogage
  };
};

// Helper pour formater le salaire
const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return t('common.salaryNegotiable');
  if (!min) {
    const maxFormatted = max?.toLocaleString() || '0';
    return t('common.salaryUpTo').replace('{max}', maxFormatted);
  }
  if (!max) {
    const minFormatted = min?.toLocaleString() || '0';
    return t('common.salaryFrom').replace('{min}', minFormatted);
  }
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`;
};

// Helper pour formater le type de job
const formatJobType = (jobType: string): string => {
  const types: { [key: string]: string } = {
    'FULL_TIME': t('hero.featuredJobs.fullTime'),
    'PART_TIME': t('hero.featuredJobs.partTime'),
    'CONTRACT': t('hero.featuredJobs.contract'),
    'FREELANCE': t('hero.featuredJobs.contract'),
    'INTERNSHIP': t('hero.featuredJobs.internship'),
    'HYBRID': t('hero.jobTypeRemote'),
    'REMOTE': t('hero.featuredJobs.remote')
  };
  return types[jobType] || jobType || t('common.notSpecified', 'Non spécifié');
};

// États pour le toggle des catégories
const showAllCategories = ref(false)
const initialCategoriesCount = 8 // Nombre de catégories affichées initialement

// Computed pour les catégories affichées
const displayedCategories = computed(() => {
  if (showAllCategories.value) {
    return jobCategories.value
  }
  return jobCategories.value.slice(0, initialCategoriesCount)
})

// Fonction pour toggle l'affichage des catégories
const toggleCategories = () => {
  showAllCategories.value = !showAllCategories.value
}

// Récupérer les offres featured
const fetchFeaturedJobs = async () => {
  try {
    loading.value = true;
    console.log('📡 Fetching featured jobs...');

    // Récupérer 50 offres pour avoir des statistiques significatives
    const response: IJobResponse = await jobService.getAllJobs(0, 50);
    
    console.log('✅ Featured jobs response:', response);

    if (response && Array.isArray(response.content)) {
      // Enrichir avec les données des entreprises
      const enrichedJobs = await enrichJobsWithCompanyData(response.content);
      
      // Formater pour l'affichage
      featuredJobs.value = enrichedJobs.map(formatJobForDisplay);
      
      console.log('🎨 Jobs formatted with logos:', featuredJobs.value);
      console.log('📊 Jobs count by category:', getJobsCountByCategory.value);
      
      // Debug: Afficher les secteurs disponibles
      const sectors = [...new Set(featuredJobs.value.map(job => job.sector))];
      console.log('🏷️ Available sectors in jobs:', sectors);
      
    } else {
      console.warn('⚠️ Aucune offre trouvée ou format de réponse invalide');
      featuredJobs.value = [];
    }

  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des offres:', error);
    featuredJobs.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed pour limiter à 6 offres pour l'affichage
const limitedFeaturedJobs = computed(() => {
  return featuredJobs.value.slice(0, 6);
});

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const goToSlide = (index: number) => {
  if (isTransitioning.value || currentSlide.value === index) return
  isTransitioning.value = true
  currentSlide.value = index
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const startAutoPlay = () => {
  interval = setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  clearInterval(interval)
}

const resetTimer = () => {
  stopAutoPlay()
  if (!isHovering.value) startAutoPlay()
}

const handleSearch = () => {
  // Rediriger vers la page des jobs avec les paramètres de recherche
  router.push({
    name: 'jobs',
    query: {
      q: searchQuery.value || undefined,
      location: locationQuery.value || undefined,
      type: jobType.value || undefined
    }
  });
}

onMounted(() => {
  startAutoPlay()
  fetchFeaturedJobs()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <Navbar />
  <div class="hero-carousel h-screen relative overflow-hidden">
    <div
      id="carouselId"
      class="carousel-container w-full h-full"
      @mouseenter="
        () => {
          isHovering = true
          stopAutoPlay()
        }
      "
      @mouseleave="
        () => {
          isHovering = false
          startAutoPlay()
        }
      "
    >
      <!-- Carousel Slides -->
      <div
        class="slides-container flex h-full"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide-item w-full h-full flex-shrink-0 relative"
        >
          <div class="gradient-overlay"></div>
          <img
            :src="slide.image"
            class="w-full h-full object-cover"
            :alt="`Slide ${index + 1}: ${slide.title}`"
            loading="lazy"
          />

          <!-- Slide Content -->
          <div class="slide-content">
            <div class="content-wrapper">
              <div
                class="text-content transition-all duration-700 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-10 opacity-0': currentSlide !== index,
                }"
              >
                <h5 class="slide-pre-title">
                  {{ slide.title }} <span class="highlight-text">{{ slide.highlight }}</span>
                </h5>
                <h4 class="slide-title">
                  {{ slide.subtitle }}
                </h4>
                <p class="slide-description">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <button class="carousel-control prev" @click="prevSlide" aria-label="Slide précédent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button class="carousel-control next" @click="nextSlide" aria-label="Slide suivant">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Carousel Indicators -->
      <div class="indicators-container">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="['indicator', { active: currentSlide === index }]"
          @click="goToSlide(index)"
          :aria-label="`Aller au slide ${index + 1}`"
        >
          <span class="progress-bar" v-if="currentSlide === index && !isHovering"></span>
        </button>
      </div>

      <!-- Modern Search Bar -->
      <div class="search-container animate-on-scroll" data-delay="300">
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="search-input-group">
            <MagnifyingGlassIcon class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('hero.searchPlaceholder')"
              class="search-input"
            />
          </div>
          <div class="search-input-group">
            <MapPinIcon class="search-icon" />
            <input
              v-model="locationQuery"
              type="text"
              :placeholder="$t('hero.locationPlaceholder')"
              class="search-input"
            />
          </div>
          <div class="search-input-group">
            <BriefcaseIcon class="search-icon" />
            <select v-model="jobType" class="search-select">
              <option v-for="type in jobTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
          <button type="submit" class="search-button">
            <span>{{ $t('hero.searchButton') }}</span>
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
        </form>
      </div>
    </div>
    <div class="transition-spacer"></div>
  </div>

  <section class="featured-jobs">
    <div class="container">
      <div class="categories-section">
        <div class="section-header with-toggle">
          <div class="header-content">
            <div class="header-text">
              <h2 class="section-title">{{ t('hero.categories.title') }}</h2>
              <p class="section-subtitle">{{ t('hero.categories.subtitle') }}</p>
            </div>
            
            <div class="header-toggle" v-if="jobCategories.length > initialCategoriesCount">
              <button 
                @click="toggleCategories" 
                class="toggle-button header-toggle-btn"
              >
                <span>{{ showAllCategories ? t('hero.categories.viewLess') : t('hero.categories.viewMore') }}</span>
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
               @click="navigateToCategory(category.id)"
               class="category-card"
             >
               <div class="category-icon" :style="{ backgroundColor: category.color }">
                 <component :is="category.icon" />
               </div>
               <div class="category-info">
                 <h4>{{ category.name }}</h4>
                 <p>{{ getFormattedJobsCount(category.id) }} {{ t('hero.categories.offers') }}</p>
               </div>
             </button>
          </div>
        </div>
      </div>



      <!-- Section Opportunités en vedette -->
      <div class="jobs-section">
        <div class="section-header text-left featured-header">
          <div class="featured-header-text">
            <div class="featured-badge">
              <span class="badge-dot"></span>
              <span class="badge-text">{{ t('hero.featuredJobs.badge', 'Opportunités en vedette') }}</span>
            </div>
            <h2 class="section-title">{{ t('hero.featuredJobs.title') }}</h2>
            <p class="section-subtitle">{{ t('hero.featuredJobs.subtitle') }}</p>
          </div>
          <a href="/jobs" class="view-all featured-view-all">
            <span>{{ t('hero.featuredJobs.viewAll') }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <!-- État de chargement -->
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

        <!-- Offres chargées -->
        <div v-else-if="limitedFeaturedJobs.length > 0" class="jobs-grid">
          <div v-for="(job, index) in limitedFeaturedJobs" :key="job.id || index" class="job-card">
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
              <p class="job-excerpt">{{ job.excerpt }}</p>
            </div>
            <div class="card-footer">
              <div class="skills">
                <span v-for="(skill, i) in job.skills" :key="i" class="skill-tag">{{ skill }}</span>
              </div>
              <router-link :to="`/detail/jobs/${job.id}`" class="apply-button">
                {{ t('hero.featuredJobs.apply') }}
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

        <!-- État vide -->
        <div v-else class="empty-state">
          <div class="empty-content">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            <h3>Aucune offre disponible</h3>
            <p>Il n'y a actuellement aucune offre d'emploi à afficher.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Les styles restent exactement les mêmes que dans le code précédent */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.hero-carousel {
  --primary-color: #10b981;
  --primary-hover: #059669;
  --accent-color: #d1fae5;
  --text-color: #ffffff;
  --dark-text: #1f2937;
  --transition-speed: 0.5s;
  font-family: 'Inter', sans-serif;
  padding-top: 64px;
}

@media (max-width: 768px) {
  .hero-carousel {
    padding-top: 56px;
  }
}

@media (max-width: 480px) {
  .hero-carousel {
    padding-top: 56px;
  }
}

@media (max-width: 380px) {
  .hero-carousel {
    padding-top: 48px;
  }
}

.transition-spacer {
  height: 8rem;
  position: relative;
  z-index: 5;
  background: linear-gradient(to bottom, transparent 0%, #f9fafb 100%);
  margin-top: -8rem;
}

.carousel-container {
  position: relative;
}

.slides-container {
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-item {
  position: relative;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
}

.slide-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.text-content {
  max-width: 600px;
  will-change: transform, opacity;
}

.slide-pre-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  transition:
    transform 0.7s ease-out,
    opacity 0.7s ease-out;
}

.highlight-text {
  color: var(--primary-color);
  font-weight: 700;
}

.slide-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.7s ease-out 0.1s,
    opacity 0.7s ease-out 0.1s;
}

.slide-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  transition:
    transform 0.7s ease-out 0.2s,
    opacity 0.7s ease-out 0.2s;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  color: white;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all var(--transition-speed) ease;
  opacity: 0.9;
}

.carousel-control:hover {
  opacity: 1;
  background-color: var(--primary-color);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.indicators-container {
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.indicator {
  width: 3rem;
  height: 0.375rem;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.indicator:hover {
  transform: scaleY(1.5);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--primary-color);
  animation: progress 5s linear forwards;
  transform-origin: left;
}

@keyframes progress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

.section-header.with-toggle {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}

.header-text {
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

/* Pour la section des opportunités en vedette */
.section-header.with-action {
  margin-bottom: 3rem;
}

.section-header.with-action .header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}

.view-all.header-action {
  display: inline-flex;
  align-items: center;
  color: #16a34a;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 0.75rem 1.5rem;
  border: 1px solid #16a34a;
  border-radius: 0.5rem;
}

.view-all.header-action:hover {
  background-color: #16a34a;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.view-all.header-action .icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.view-all.header-action:hover .icon {
  transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
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
  
  .view-all.header-action {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .section-header.with-toggle,
  .section-header.with-action {
    margin-bottom: 2rem;
  }
  
  .header-content {
    gap: 1rem;
  }
  
  .toggle-button.header-toggle-btn,
  .view-all.header-action {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
}

/* Modern Search Bar Styles */
.search-container {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  z-index: 10;
}

.search-form {
  display: flex;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
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

.search-select {
  flex: 1;
  padding: 1.125rem 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  font-weight: 500;
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

.search-button:active {
  transform: translateY(0);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.search-button:hover .button-icon {
  transform: translateX(3px);
}

/* Effet de vague au survol */
.search-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
  opacity: 0;
}

.search-button:hover::after {
  transform: scale(1);
  opacity: 1;
}

/* Featured Jobs Section */
.featured-jobs {
  padding: 5rem 0;
  background-color: #f9fafb;
  z-index: 1;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: left;
  margin-bottom: 3rem;
  position: relative;
  max-width: none;
  margin-left: 0;
  padding-left: 0;
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
  text-align: left;
  color: #6b7280;
  max-width: 600px;
  position: relative;
  max-width: none;
  margin-left: 0;
  padding-left: 0;
}

/* Badge & meta pour la section catégories */
.categories-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.1rem;
  background: #ecfdf5;
  border-radius: 999px;
  border: 1px solid #bbf7d0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #047857;
  margin-bottom: 0.8rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.18);
}

.categories-badge .badge-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: radial-gradient(circle, #22c55e 0, #16a34a 40%, #0f766e 100%);
  margin-right: 0.45rem;
}

.categories-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.categories-meta .dot {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 999px;
  background: #a7f3d0;
}

/* Featured jobs header */
.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.featured-header-text {
  flex: 1;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 1rem;
  background: #eff6ff;
  border-radius: 999px;
  border: 1px solid #bfdbfe;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #1d4ed8;
  margin-bottom: 0.85rem;
}

.featured-badge .badge-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: radial-gradient(circle, #60a5fa 0, #2563eb 40%, #1d4ed8 100%);
  margin-right: 0.45rem;
}

.featured-view-all {
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.9rem;
}

.featured-view-all:hover {
  border-color: #16a34a;
  background: #ecfdf5;
}

.featured-view-all span {
  display: inline-flex;
  align-items: center;
}

.view-all {
  display: inline-flex;
  align-items: center;
  color: #16a34a;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all .icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.view-all:hover {
  color: #15803d;
}

.view-all:hover .icon {
  transform: translateX(4px);
}

.jobs-section {
  margin-top: 4rem;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
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

.categories-section {
  margin-bottom: 4rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
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
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
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

.category-info {
  /* retour au style simple */
}

.category-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.category-info p {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Loading States */
.loading-container {
  width: 100%;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
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
}

/* Responsive Design */
@media (max-width: 1024px) {
  .search-container {
    bottom: 1.5rem;
    width: calc(100% - 3rem);
    left: 1.5rem;
    transform: none;
  }

  .search-form {
    flex-wrap: wrap;
    padding: 0.625rem;
    gap: 0.625rem;
  }

  .search-input-group {
    flex: 1 1 calc(50% - 0.3125rem);
    min-width: 180px;
    padding: 0 1rem;
  }

  .search-button {
    padding: 0.875rem 1.5rem;
    flex: 1 1 100%;
    margin-top: 0.25rem;
  }

  .slide-content {
    padding: 0 3rem;
  }

  .slide-title {
    font-size: 2.25rem;
  }

  .jobs-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.25rem;
  }

  .featured-jobs {
    padding: 4rem 0;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    min-height: calc(100vh - 64px);
    height: auto;
    padding-top: 64px;
  }

  .search-container {
    bottom: 1rem;
    width: calc(100% - 2rem);
    left: 1rem;
    transform: none;
    position: relative;
    margin-top: -3.5rem;
    z-index: 10;
    margin-bottom: 1rem;
  }

  .search-form {
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.75rem;
    border-radius: 0.75rem;
  }

  .search-input-group {
    width: 100%;
    padding: 0 1rem;
    min-height: 48px;
  }

  .search-input,
  .search-select {
    padding: 0.875rem 0;
    font-size: 0.9375rem;
  }

  .search-icon {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 0.625rem;
  }

  .search-button {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    margin-top: 0.25rem;
  }

  .slide-content {
    padding: 0 1.5rem;
    justify-content: flex-start;
    text-align: center;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 8rem;
  }

  .text-content {
    max-width: 100%;
  }

  .gradient-overlay {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 100%);
  }

  .slide-pre-title {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
  }

  .slide-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .slide-description {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .carousel-control {
    width: 2.75rem;
    height: 2.75rem;
    opacity: 0.8;
  }

  .carousel-control.prev {
    left: 0.75rem;
  }

  .carousel-control.next {
    right: 0.75rem;
  }

  .control-icon {
    width: 1.125rem;
    height: 1.125rem;
  }

  .indicators-container {
    bottom: 6.5rem;
    gap: 0.5rem;
  }

  .indicator {
    width: 2.5rem;
    height: 0.3rem;
  }

  .featured-jobs {
    padding: 2.5rem 0 1.5rem;
    margin-top: 0;
  }
  
  .transition-spacer {
    height: 4rem;
    margin-top: -4rem;
  }

  .container {
    padding: 0 1rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.625rem;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .category-card {
    padding: 1rem;
    min-height: 90px;
    gap: 0.75rem;
  }

  .category-icon {
    width: 40px;
    height: 40px;
  }

  .category-icon svg {
    width: 20px;
    height: 20px;
  }

  .category-info h4 {
    font-size: 0.875rem;
  }

  .category-info p {
    font-size: 0.8125rem;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .job-card {
    padding: 0;
  }

  .card-header {
    padding: 1.25rem 1.25rem 0;
  }

  .card-body {
    padding: 1rem 1.25rem;
  }

  .card-footer {
    padding: 1rem 1.25rem;
  }

  .view-all {
    font-size: 0.875rem;
    margin-top: 1rem;
    display: inline-flex;
  }
}

@media (max-width: 640px) {
  .hero-carousel {
    min-height: 100vh;
  }

  .hero-carousel {
    min-height: calc(100vh - 56px);
    padding-top: 56px;
  }

  .search-container {
    bottom: 0.75rem;
    width: calc(100% - 1.5rem);
    left: 0.75rem;
    margin-top: -3rem;
    margin-bottom: 0.75rem;
  }

  .search-form {
    padding: 0.625rem;
    gap: 0.625rem;
  }

  .search-input-group {
    padding: 0 0.875rem;
    min-height: 44px;
  }

  .search-input,
  .search-select {
    padding: 0.75rem 0;
    font-size: 0.875rem;
  }

  .search-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }

  .slide-content {
    padding: 0 1rem;
    padding-top: 1.5rem;
    padding-bottom: 7rem;
  }

  .slide-pre-title {
    font-size: 0.8125rem;
    margin-bottom: 0.625rem;
  }

  .slide-title {
    font-size: 1.5rem;
    margin-bottom: 0.875rem;
  }

  .slide-description {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .carousel-control {
    width: 2.5rem;
    height: 2.5rem;
  }

  .carousel-control.prev {
    left: 0.5rem;
  }

  .carousel-control.next {
    right: 0.5rem;
  }

  .indicators-container {
    bottom: 5.5rem;
  }
  
  .transition-spacer {
    height: 3rem;
    margin-top: -3rem;
  }

  .featured-jobs {
    padding: 2rem 0 1rem;
    margin-top: 0;
  }

  .container {
    padding: 0 0.875rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.875rem;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }

  .category-card {
    padding: 0.875rem;
    min-height: 85px;
    gap: 0.625rem;
  }

  .category-icon {
    width: 36px;
    height: 36px;
  }

  .category-icon svg {
    width: 18px;
    height: 18px;
  }

  .category-info h4 {
    font-size: 0.8125rem;
    margin-bottom: 0.125rem;
  }

  .category-info p {
    font-size: 0.75rem;
  }

  .jobs-grid {
    gap: 1rem;
  }

  .card-header {
    padding: 1rem 1rem 0;
  }

  .card-body {
    padding: 0.875rem 1rem;
  }

  .card-footer {
    padding: 0.875rem 1rem;
  }

  .job-title {
    font-size: 1.125rem;
  }

  .logo-image {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .hero-carousel {
    min-height: calc(100vh - 56px);
    padding-top: 56px;
  }

  .search-container {
    bottom: 0.5rem;
    width: calc(100% - 1rem);
    left: 0.5rem;
    margin-top: -2.5rem;
    margin-bottom: 0.5rem;
  }

  .search-form {
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: 0.625rem;
  }

  .search-input-group {
    padding: 0 0.75rem;
    min-height: 42px;
    border-radius: 0.625rem;
  }

  .search-input,
  .search-select {
    padding: 0.625rem 0;
    font-size: 0.8125rem;
  }

  .search-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  .search-button {
    padding: 0.625rem 1rem;
    font-size: 0.8125rem;
    border-radius: 0.625rem;
  }

  .button-icon {
    width: 1rem;
    height: 1rem;
  }

  .slide-content {
    padding: 0 0.75rem;
    padding-top: 1rem;
    padding-bottom: 6.5rem;
  }

  .slide-pre-title {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    letter-spacing: 0.03em;
  }

  .slide-title {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
    line-height: 1.25;
  }

  .slide-description {
    font-size: 0.8125rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .carousel-control {
    width: 2.25rem;
    height: 2.25rem;
    opacity: 0.7;
  }

  .carousel-control.prev {
    left: 0.375rem;
  }

  .carousel-control.next {
    right: 0.375rem;
  }

  .control-icon {
    width: 1rem;
    height: 1rem;
  }

  .indicators-container {
    bottom: 4.5rem;
    gap: 0.375rem;
  }

  .indicator {
    width: 2rem;
    height: 0.25rem;
  }

  .transition-spacer {
    height: 2.5rem;
    margin-top: -2.5rem;
  }

  .featured-jobs {
    padding: 1.5rem 0 1rem;
    margin-top: 0;
  }

  .container {
    padding: 0 0.75rem;
  }

  .section-header {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.375rem;
    margin-bottom: 0.375rem;
    line-height: 1.3;
  }

  .section-subtitle {
    font-size: 0.8125rem;
    margin-bottom: 1.25rem;
    line-height: 1.4;
  }

  .view-all {
    font-size: 0.8125rem;
    padding: 0.5rem 0.75rem;
  }

  .view-all .icon {
    width: 1rem;
    height: 1rem;
    margin-left: 0.375rem;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .category-card {
    padding: 0.75rem;
    min-height: 80px;
    gap: 0.5rem;
    border-radius: 0.625rem;
  }

  .category-icon {
    width: 32px;
    height: 32px;
    border-radius: 0.375rem;
  }

  .category-icon svg {
    width: 16px;
    height: 16px;
  }

  .category-info h4 {
    font-size: 0.75rem;
    margin-bottom: 0.125rem;
  }

  .category-info p {
    font-size: 0.6875rem;
  }

  .toggle-button {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }

  .job-card {
    border-radius: 0.625rem;
  }

  .card-header {
    padding: 1rem 1rem 0;
  }

  .card-body {
    padding: 0.75rem 1rem;
  }

  .card-footer {
    padding: 0.75rem 1rem;
  }

  .logo-image {
    width: 32px;
    height: 32px;
    border-radius: 0.375rem;
  }

  .job-title {
    font-size: 1.0625rem;
    margin-bottom: 0.375rem;
  }

  .company-name,
  .location {
    font-size: 0.8125rem;
  }

  .job-excerpt {
    font-size: 0.8125rem;
    margin-bottom: 1rem;
  }

  .skill-tag {
    font-size: 0.6875rem;
    padding: 0.1875rem 0.375rem;
  }

  .apply-button {
    padding: 0.4375rem 0.875rem;
    font-size: 0.8125rem;
  }

  .apply-button svg {
    width: 0.875rem;
    height: 0.875rem;
    margin-left: 0.375rem;
  }

  .job-type {
    font-size: 0.6875rem;
    padding: 0.1875rem 0.4375rem;
  }

  .salary-range {
    font-size: 0.8125rem;
  }
}

@media (max-width: 380px) {
  .search-container {
    width: calc(100% - 0.75rem);
    left: 0.375rem;
    bottom: 0.375rem;
  }

  .search-form {
    padding: 0.4375rem;
    gap: 0.4375rem;
  }

  .search-input-group {
    min-height: 40px;
    padding: 0 0.625rem;
  }

  .search-input,
  .search-select {
    padding: 0.5625rem 0;
    font-size: 0.75rem;
  }

  .search-button {
    padding: 0.5625rem 0.875rem;
    font-size: 0.75rem;
  }

  .hero-carousel {
    min-height: calc(100vh - 56px);
    padding-top: 56px;
  }

  .search-container {
    width: calc(100% - 0.75rem);
    left: 0.375rem;
    bottom: 0.375rem;
    margin-top: -2rem;
    margin-bottom: 0.375rem;
  }

  .slide-content {
    padding: 0 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 5.5rem;
  }

  .slide-pre-title {
    font-size: 0.6875rem;
  }

  .slide-title {
    font-size: 1.25rem;
    margin-bottom: 0.625rem;
  }

  .slide-description {
    font-size: 0.75rem;
    margin-bottom: 0.875rem;
  }

  .carousel-control {
    width: 2rem;
    height: 2rem;
  }

  .indicators-container {
    bottom: 3.5rem;
  }
  
  .transition-spacer {
    height: 2rem;
    margin-top: -2rem;
  }

  .featured-jobs {
    padding: 1.5rem 0 1rem;
  }

  .container {
    padding: 0 0.625rem;
  }

  .section-header {
    margin-bottom: 1.25rem;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .section-subtitle {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 0.625rem;
  }

  .category-card {
    flex-direction: row;
    text-align: left;
    padding: 0.625rem;
    min-height: 70px;
  }

  .category-icon {
    width: 28px;
    height: 28px;
  }

  .category-icon svg {
    width: 14px;
    height: 14px;
  }

  .category-info h4 {
    font-size: 0.6875rem;
  }

  .category-info p {
    font-size: 0.625rem;
  }

  .jobs-grid {
    gap: 0.75rem;
  }

  .card-header {
    padding: 0.875rem 0.875rem 0;
  }

  .card-body {
    padding: 0.625rem 0.875rem;
  }

  .card-footer {
    padding: 0.625rem 0.875rem;
  }

  .job-title {
    font-size: 1rem;
  }

  .logo-image {
    width: 28px;
    height: 28px;
  }

  .company-name,
  .location {
    font-size: 0.75rem;
  }

  .job-excerpt {
    font-size: 0.75rem;
  }
}

.categories-section {
  margin-bottom: 4rem;
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

.categories-toggle {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  position: relative;
}

.categories-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}

.toggle-button {
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
}

.toggle-button:hover {
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

/* Gradient overlay pour l'état réduit */
.categories-grid:not(.expanded) {
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.25rem;
  }
  
  .category-card {
    padding: 1.25rem;
    min-height: 90px;
  }
  
  .category-info h4 {
    font-size: 0.9375rem;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
    max-height: 350px;
  }
  
  .category-card {
    padding: 1rem;
    min-height: 85px;
    gap: 0.75rem;
  }
  
  .category-icon {
    width: 40px;
    height: 40px;
  }
  
  .category-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .category-info h4 {
    font-size: 0.875rem;
  }
  
  .category-info p {
    font-size: 0.8125rem;
  }
  
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    max-height: 300px;
  }
  
  .category-card {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem 1rem;
    min-height: 110px;
  }
  
  .category-info h4 {
    font-size: 0.875rem;
  }
  
  .toggle-button {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
  
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 0.875rem;
    max-height: 280px;
  }
  
  .category-card {
    flex-direction: row;
    text-align: left;
    min-height: 80px;
  }
  
  .categories-section {
    margin-bottom: 4.25rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
}

/* Animation pour le déploiement */
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
</style>