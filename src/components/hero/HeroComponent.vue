<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
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
//@ts-ignore
import Footer from '../footer/FooterComponent.vue'

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
import type { ICompany } from '@/utils/interface/ICompagny'

// Services
const jobService = useJobService();
const companyService = useCompanyService();
const router = useRouter();
const { t, locale } = useI18n();

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
const isLoaded = ref(false)
const displayedTitle = ref('')
const displayedDescription = ref('')
const isTyping = ref(false)
let interval: number
let typingInterval: number | null = null

// Tous les textes pour l'animation (utilise tous les slides)
const allTexts = computed(() => {
  return slides.value.map((slide, index) => ({
    subtitle: slide.subtitle,
    description: slide.description,
    title: slide.title,
    highlight: slide.highlight,
    animationType: ['zoom', 'spin', 'fade', 'slide'][index % 4] // Alterner les types d'animations
  }))
})

// Index du texte actuellement affiché
const currentTextIndex = ref(0)
const isAnimating = ref(false)
const titleVisible = ref(false)
const subtitleVisible = ref(false)
const currentAnimationType = ref('fade')

// Fonction pour l'animation séquentielle : titre puis sous-titre, puis disparition
const startTypingEffect = () => {
  if (typingInterval) clearTimeout(typingInterval)
  isTyping.value = true
  
  const cycleTexts = () => {
    if (isAnimating.value) return
    
    const texts = allTexts.value
    if (texts.length === 0) return
    
    currentSlide.value = currentTextIndex.value // Sync slide with text
    const currentText = texts[currentTextIndex.value]
    currentAnimationType.value = currentText.animationType
    
    // Étape 1: Le titre apparaît et reste
    isAnimating.value = true
    titleVisible.value = false
    subtitleVisible.value = false
    displayedTitle.value = currentText.subtitle
    displayedDescription.value = currentText.description
    
    // Animation d'entrée du titre (petit délai pour éviter le chevauchement)
    setTimeout(() => {
      titleVisible.value = true
      
      // Étape 2: Le sous-titre apparaît après le titre (0.6s après pour laisser le titre s'afficher)
      setTimeout(() => {
        subtitleVisible.value = true
        
        // Étape 3: Après 5 secondes, les deux disparaissent ensemble
        typingInterval = setTimeout(() => {
          titleVisible.value = false
          subtitleVisible.value = false
          
          // Attendre la fin complète de l'animation de sortie (max 0.7s pour spin, 0.6s pour les autres)
          const leaveDuration = currentText.animationType === 'spin' ? 700 : 600
          setTimeout(() => {
            // Petit délai supplémentaire pour éviter le chevauchement visuel
            setTimeout(() => {
              isAnimating.value = false
              currentTextIndex.value = (currentTextIndex.value + 1) % texts.length
              cycleTexts() // Relancer le cycle avec le prochain texte
            }, 100)
          }, leaveDuration)
        }, 5000)
      }, 500)
    }, 100)
  }
  
  // Démarrer le cycle
  cycleTexts()
}

const stopTypingEffect = () => {
  if (typingInterval) {
    clearTimeout(typingInterval)
    typingInterval = null
  }
  isTyping.value = false
  isAnimating.value = false
  titleVisible.value = false
  subtitleVisible.value = false
  // Réinitialiser l'affichage avec le premier texte
  if (allTexts.value.length > 0) {
    displayedTitle.value = allTexts.value[0].subtitle
    displayedDescription.value = allTexts.value[0].description
    currentTextIndex.value = 0
    currentAnimationType.value = allTexts.value[0].animationType
  }
}

// Watch pour réagir aux changements de slide (synchroniser le texte avec l'image)
watch(
  () => currentSlide.value,
  (newSlide) => {
    // Mettre à jour le texte affiché selon le slide actuel
    if (allTexts.value.length > newSlide) {
      currentTextIndex.value = newSlide
      displayedTitle.value = allTexts.value[newSlide].subtitle
      displayedDescription.value = allTexts.value[newSlide].description
      currentAnimationType.value = allTexts.value[newSlide].animationType
      // Réinitialiser les animations pour afficher immédiatement
      titleVisible.value = true
      subtitleVisible.value = true
    }
  },
  { immediate: true }
)

// Watch pour réagir aux changements de langue
watch(
  () => locale.value,
  () => {
    // Réinitialiser l'affichage quand la langue change
    stopTypingEffect()
    // Mettre à jour les textes
    if (allTexts.value.length > 0) {
      currentTextIndex.value = 0
      displayedTitle.value = allTexts.value[0].subtitle
      displayedDescription.value = allTexts.value[0].description
      currentAnimationType.value = allTexts.value[0].animationType
    }
    // Relancer après un court délai
    setTimeout(() => {
      startTypingEffect()
    }, 500)
  }
)

// Watch pour réagir aux changements des textes (slides)
watch(
  () => allTexts.value,
  () => {
    // Réinitialiser si les textes changent
    stopTypingEffect()
    if (allTexts.value.length > 0) {
      currentTextIndex.value = 0
      displayedTitle.value = allTexts.value[0].subtitle
      displayedDescription.value = allTexts.value[0].description
      currentAnimationType.value = allTexts.value[0].animationType
      setTimeout(() => {
        startTypingEffect()
      }, 500)
    }
  },
  { deep: true }
)

const searchQuery = ref('')
const locationQuery = ref('')
const jobType = ref('')

const jobTypes = computed(() => [
  { value: '', label: t('hero.jobTypeAll') },
  { value: 'full-time', label: t('hero.jobTypeFullTime') },
  { value: 'part-time', label: t('hero.jobTypePartTime') },
  { value: 'contract', label: t('hero.jobTypeContract') },
  { value: 'internship', label: t('hero.jobTypeInternship') },
  { value: 'remote', label: t('hero.jobTypeRemote') },
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

// Fallback logo avec SVG inline (pas de requête externe)
const getFallbackLogo = (company: ICompany): string => {
  if (!company || !company.name) {
    return generateSVGLogo('?', '6b7280');
  }
  
  const firstLetter = company.name.charAt(0).toUpperCase();
  const colors = [
    '10b981', // emerald
    '3b82f6', // blue
    'f59e0b', // amber
    'ef4444', // red
    '8b5cf6', // violet
    '06b6d4', // cyan
    'f97316', // orange
  ];
  const color = colors[Math.abs(company.id) % colors.length] || '6b7280';
  
  return generateSVGLogo(firstLetter, color);
}

// Gestion des erreurs de chargement d'image
const handleImageError = (event: Event, company: ICompany) => {
  const target = event.target as HTMLImageElement;
  // Éviter les boucles infinies en marquant l'image comme traitée
  if (target.dataset.fallbackApplied === 'true') {
    return;
  }
  target.dataset.fallbackApplied = 'true';
  target.src = getFallbackLogo(company);
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
  
  // Smooth scroll vers la section si on expand
  if (showAllCategories.value) {
    setTimeout(() => {
      const categoriesSection = document.querySelector('.categories-section')
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
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

const handleSearch = () => {
  // Rediriger vers la page de recherche avec les paramètres
  const queryParams = new URLSearchParams({
    q: searchQuery.value,
    location: locationQuery.value,
    type: jobType.value
  }).toString()
  
  window.location.href = `/jobs?${queryParams}`;
}

onMounted(() => {
  // Trigger animation after component is mounted
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  // Démarrer l'effet typing après un court délai
  setTimeout(() => {
    startTypingEffect()
  }, 500)
  fetchFeaturedJobs()
})

onUnmounted(() => {
  stopTypingEffect()
})
</script>

<template>
  <Navbar />
  <div class="hero-landing relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Decorative Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <!-- Floating shapes with animations -->
      <div class="absolute -top-48 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" :class="{ 'animate-fade-in': isLoaded }"></div>
      <div class="absolute -bottom-48 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" :class="{ 'animate-fade-in': isLoaded }" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000" :class="{ 'animate-fade-in': isLoaded }" style="animation-delay: 4s"></div>
      
      <!-- Animated gradient orbs -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-blob" :class="{ 'animate-fade-in': isLoaded }"></div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" :class="{ 'animate-fade-in': isLoaded }"></div>
      <div class="absolute top-1/2 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" :class="{ 'animate-fade-in': isLoaded }"></div>
      
      <!-- Animated grid lines -->
      <div class="absolute inset-0 opacity-10" :class="{ 'animate-fade-in': isLoaded }">
        <div class="absolute inset-0 grid-animation" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      
      <!-- Animated particles -->
      <div class="absolute inset-0">
        <div v-for="i in 20" :key="i" 
          class="absolute w-1.5 h-1.5 bg-white/40 rounded-full animate-float"
          :class="{ 'animate-fade-in': isLoaded }"
          :style="{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }">
        </div>
      </div>
      
      <!-- Decorative lines -->
      <svg class="absolute inset-0 w-full h-full opacity-5" :class="{ 'animate-fade-in': isLoaded }">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="50%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M0,200 Q400,100 800,200 T1600,200" stroke="url(#line-gradient)" stroke-width="2" fill="none" class="animate-draw-line" />
        <path d="M0,400 Q400,300 800,400 T1600,400" stroke="url(#line-gradient)" stroke-width="2" fill="none" class="animate-draw-line animation-delay-1000" />
      </svg>
    </div>

    <div
      id="carouselId"
      class="relative w-full h-full"
    >
      <!-- Single Slide with Typing Effect -->
      <div class="relative w-full h-full">
        <!-- Background Image (only first slide) -->
        <!-- Background Image (carousel) -->
        <div class="absolute inset-0">
          <transition-group name="slide-fade">
            <template v-for="(slide, index) in slides" :key="index">
              <img
                v-show="currentSlide === index"
                :src="slide.image"
                class="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                :alt="slide.title"
                loading="eager"
              />
            </template>
          </transition-group>
          <!-- Gradient Overlay with reduced opacity -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 z-10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 z-10"></div>
          
          <!-- Decorative Elements -->
          <div class="absolute inset-0 z-5 pointer-events-none">
            <!-- Floating geometric shapes -->
            <div class="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div class="absolute top-40 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-blob"></div>
            <div class="absolute bottom-40 left-1/4 w-36 h-36 bg-teal-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            
            <!-- Animated grid pattern -->
            <div class="absolute inset-0 opacity-5 grid-animation" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
            
            <!-- Floating particles -->
            <div 
              v-for="i in 15" 
              :key="`particle-${i}`"
              class="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float"
              :style="{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }"
            ></div>
            
            <!-- Decorative circles with borders -->
            <div class="absolute top-1/4 right-1/4 w-64 h-64 border border-white/10 rounded-full animate-pulse delay-1000"></div>
            <div class="absolute bottom-1/3 left-1/3 w-48 h-48 border border-white/5 rounded-full animate-pulse delay-2000"></div>
            
            <!-- Animated SVG decorative lines -->
            <svg class="absolute top-0 left-0 w-full h-full opacity-10" style="overflow: visible;">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.5" />
                  <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#14b8a6;stop-opacity:0.5" />
                </linearGradient>
              </defs>
          <path
                d="M 0,200 Q 400,100 800,200 T 1600,200" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                fill="none"
                class="animate-draw-line"
              />
          <path
                d="M 0,400 Q 600,300 1200,400 T 2400,400" 
                stroke="url(#lineGradient)" 
                stroke-width="2" 
                fill="none"
                class="animate-draw-line delay-1000"
          />
        </svg>
          </div>
          
          <!-- White fog effect at bottom (no blur on image) -->
        </div>
        
        <!-- Three.js Canvas Container -->
        <div ref="threeContainer" class="absolute inset-0 z-5 pointer-events-none"></div>

        <!-- Slide Content with Typing Effect -->
        <div class="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 pt-25 sm:pt-5 md:pt-5 pb-20">
          <div class="w-full max-w-5xl mx-auto text-center hero-content">
            <!-- Main Title and Subtitle with sequential animations -->
            <div 
              class="mb-10"
              :class="{ 'animate-slide-in-up opacity-100': isLoaded }"
              style="animation-delay: 0.2s; animation-fill-mode: both; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
            >
              <!-- Title with animation -->
              <transition :name="`text-${currentAnimationType}-title`" appear>
                <h4 
                  v-if="titleVisible"
                  key="title"
                  class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight px-4 text-center"
                  style="font-family: 'Manrope', sans-serif;"
                >
                  <span class="block bg-gradient-to-r from-white via-emerald-50/90 to-white bg-clip-text text-transparent drop-shadow-xl animate-gradient-shift">
                    {{ displayedTitle }}
                  </span>
                </h4>
              </transition>
              
              <!-- Subtitle with animation -->
              <transition :name="`text-${currentAnimationType}-subtitle`" appear>
                <p 
                  v-if="subtitleVisible"
                  key="description"
                  class="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg px-4 text-center"
                  style="font-family: 'Manrope', sans-serif;"
                >
                  {{ displayedDescription }}
                </p>
              </transition>
      </div>

            <!-- Modern Search Bar with entrance animation -->
            <div 
              class="mt-10 sm:mt-12 max-w-4xl mx-auto px-4"
              :class="{ 'animate-slide-in-up opacity-100': isLoaded }"
              style="animation-delay: 0.6s; animation-fill-mode: both;"
            >
              <form @submit.prevent="handleSearch" class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 border border-white/40 transition-all duration-300 hover:shadow-emerald-500/30 hover:shadow-[0_25px_60px_-12px_rgba(16,185,129,0.4)] hover:-translate-y-1 hover:scale-[1.01] animate-float-subtle">
                <!-- Search Input -->
                <div class="group flex-1 flex items-center bg-white/80 rounded-xl px-3 sm:px-4 py-3.5 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:shadow-md">
                  <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-200 group-focus-within:text-emerald-600" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('hero.searchPlaceholder')"
                    class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-400 text-xs sm:text-sm md:text-base font-medium"
            />
          </div>
                
                <!-- Location Input -->
                <div class="group flex-1 flex items-center bg-white/80 rounded-xl px-3 sm:px-4 py-3.5 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:shadow-md">
                  <MapPinIcon class="w-5 h-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-200 group-focus-within:text-emerald-600" />
            <input
              v-model="locationQuery"
              type="text"
              :placeholder="$t('hero.locationPlaceholder')"
                    class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base font-medium"
            />
          </div>
                
                <!-- Search Button -->
                <button 
                  type="submit" 
                  class="flex items-center justify-center w-full sm:w-auto sm:min-w-[56px] h-12 sm:h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  :aria-label="$t('hero.searchButton')"
                >
                  <MagnifyingGlassIcon class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </form>
      </div>
    </div>
        </div>
      </div>

      <!-- Modern Indicator - Bottom Right (fade-in animation) -->
      <div 
        class="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 z-20 flex flex-col items-end gap-3"
        :class="{ 'animate-fade-in': isLoaded }"
        style="animation-delay: 0.8s; animation-fill-mode: both;"
      >
        <!-- Single indicator dot -->
        <div class="flex items-center gap-2.5 bg-black/20 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/10 animate-float-subtle">
          <div class="relative w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/40 to-teal-500/40 backdrop-blur-sm border border-emerald-400/60 flex items-center justify-center transition-all duration-300 shadow-md shadow-emerald-500/50">
            <span class="text-white font-semibold text-xs relative z-10">01</span>
            <!-- Animated ring -->
            <div 
              v-if="!isHovering" 
              class="absolute inset-0 rounded-full border border-transparent border-t-emerald-400/80 animate-spin-slow"
              style="animation-duration: 5s;"
            ></div>
          </div>
        </div>
      </div>

    </div>
    
    <!-- White fog effect at bottom of hero - smooth transition without separator -->
    <div class="absolute bottom-0 left-0 right-0 z-15 pointer-events-none fog-effect"></div>
    <div class="absolute bottom-0 left-0 right-0 z-15 pointer-events-none fog-overlay"></div>
    
    <!-- Statistics in fog area - Positioned at bottom left (hidden on mobile) -->
    <!-- Statistics in fog area - Centered at bottom (hidden on mobile) -->
    <div class="hidden sm:block absolute bottom-0 left-0 w-full z-20 px-6 lg:px-8 py-5 lg:py-6">
      <div class="flex items-center justify-center gap-4 lg:gap-8 flex-wrap max-w-7xl mx-auto">
        <!-- Stat 1 -->
        <div class="flex flex-col items-center">
          <div class="text-xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight whitespace-nowrap">1.7M+</div>
          <div class="text-[10px] lg:text-xs text-white/90 font-medium uppercase tracking-wider">Applications</div>
        </div>
        
        <!-- Vertical Separator -->
        <div class="h-8 lg:h-12 w-px bg-white/20"></div>
        
        <!-- Stat 2 -->
        <div class="flex flex-col items-center">
          <div class="text-xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight whitespace-nowrap">3.8M+</div>
          <div class="text-[10px] lg:text-xs text-white/90 font-medium uppercase tracking-wider">Postes vacants</div>
        </div>
        
        <!-- Vertical Separator -->
        <div class="h-8 lg:h-12 w-px bg-white/20"></div>
        
        <!-- Stat 3 -->
        <div class="flex flex-col items-center">
          <div class="text-xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight whitespace-nowrap">736K+</div>
          <div class="text-[10px] lg:text-xs text-white/90 font-medium uppercase tracking-wider">Demandes CV</div>
        </div>
        
        <!-- Vertical Separator -->
        <div class="h-8 lg:h-12 w-px bg-white/20"></div>
        
        <!-- Stat 4 -->
        <div class="flex flex-col items-center">
          <div class="text-xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight whitespace-nowrap">82K+</div>
          <div class="text-[10px] lg:text-xs text-white/90 font-medium uppercase tracking-wider">Entreprises</div>
        </div>
        
        <!-- Vertical Separator -->
        <div class="h-8 lg:h-12 w-px bg-white/20"></div>
        
        <!-- Stat 5 -->
        <div class="flex flex-col items-center">
          <div class="text-xl lg:text-3xl font-bold text-white mb-1 drop-shadow-lg leading-tight whitespace-nowrap">670M+</div>
          <div class="text-[10px] lg:text-xs text-white/90 font-medium uppercase tracking-wider">Visiteurs/an</div>
        </div>
      </div>
    </div>
  

    
    <!-- Transition Spacer -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>
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
              v-for="(category, index) in displayedCategories" 
              :key="category.id" 
              @click="navigateToCategory(category.id)"
              class="category-card"
              :style="{ '--animation-delay': `${index * 0.05}s` }"
            >
              <div class="category-card-inner">
              <div class="category-icon" :style="{ backgroundColor: category.color }">
                  <component :is="category.icon" class="category-icon-svg" />
                  <div class="icon-glow" :style="{ backgroundColor: category.color }"></div>
              </div>
              <div class="category-info">
                <h4>{{ category.name }}</h4>
                  <p class="category-count">
                    <span class="count-number">{{ getFormattedJobsCount(category.id) }}</span>
                    <span class="count-label">{{ t('hero.categories.offers') }}</span>
                  </p>
                </div>
                <div class="category-hover-effect" :style="{ backgroundColor: category.color }"></div>
              </div>
            </button>
          </div>
        </div>
      </div>



      <!-- Section Opportunités en vedette -->
      <div class="jobs-section">
        <div class="section-header text-left">
          <h2 class="section-title">{{ t('hero.featuredJobs.title') }}</h2>
          <p class="section-subtitle">{{ t('hero.featuredJobs.subtitle') }}</p>
          <a href="/jobs" class="view-all">
            {{ t('hero.featuredJobs.viewAll') }}
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
            <!-- Illustration SVG moderne -->
            <div class="illustration-container mx-auto mb-8">
              <svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" class="empty-illustration">
                <!-- Background circle -->
                <circle cx="150" cy="125" r="80" fill="url(#gradient1)" opacity="0.1"/>
                <!-- Person searching illustration -->
                <g transform="translate(75, 60)">
                  <!-- Person -->
                  <circle cx="75" cy="30" r="20" fill="#10b981" opacity="0.2"/>
                  <path d="M75 50 L70 70 L80 70 Z" fill="#10b981" opacity="0.3"/>
                  <!-- Search icon -->
                  <circle cx="120" cy="45" r="25" stroke="#10b981" stroke-width="3" fill="none" opacity="0.6"/>
                  <line x1="135" y1="60" x2="150" y2="75" stroke="#10b981" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
                  <!-- Documents/Pages -->
                  <rect x="30" y="80" width="40" height="50" rx="4" fill="#06b6d4" opacity="0.2" transform="rotate(-10 50 105)"/>
                  <rect x="50" y="85" width="40" height="50" rx="4" fill="#10b981" opacity="0.2" transform="rotate(5 70 110)"/>
                  <rect x="70" y="90" width="40" height="50" rx="4" fill="#8b5cf6" opacity="0.2" transform="rotate(-5 90 115)"/>
                  <!-- Stars/Dots decoration -->
                  <circle cx="160" cy="100" r="3" fill="#f59e0b" opacity="0.4"/>
                  <circle cx="180" cy="85" r="2.5" fill="#ef4444" opacity="0.4"/>
                  <circle cx="40" cy="60" r="2" fill="#8b5cf6" opacity="0.4"/>
                </g>
                <!-- Gradient definitions -->
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                  </linearGradient>
                </defs>
                </svg>
              </div>
            <h3 class="empty-title">{{ t('hero.featuredJobs.noJobsAvailable') }}</h3>
            <p class="empty-description">{{ t('hero.featuredJobs.noJobsDescription') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
  --primary-color: #10b981;
  --primary-hover: #059669;
  --accent-color: #d1fae5;
  --text-color: #ffffff;
  --dark-text: #1f2937;
  --transition-speed: 0.5s;
}

.hero-landing {
  font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Custom Tailwind animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(20px, 20px) scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }
}

@keyframes float-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes draw-line {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

@keyframes typing-cursor {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-blob {
  animation: blob 20s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-subtle {
  animation: float-subtle 3s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.animate-draw-line {
  animation: draw-line 3s ease-out forwards;
}

.grid-animation {
  animation: grid-move 20s linear infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

.delay-2000 {
  animation-delay: 2s;
}

@keyframes ken-burns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

.animate-ken-burns {
  animation: ken-burns 15s ease-out forwards;
}

/* ===== ZOOM ANIMATIONS ===== */
.text-zoom-title-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-zoom-title-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-zoom-title-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

.text-zoom-title-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.text-zoom-subtitle-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: 0.1s;
}

.text-zoom-subtitle-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-zoom-subtitle-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.text-zoom-subtitle-leave-to {
  opacity: 0;
  transform: scale(1.3);
}

/* ===== SPIN/TOURBILLON ANIMATIONS ===== */
.text-spin-title-enter-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-spin-title-leave-active {
  transition: all 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-spin-title-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.text-spin-title-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.3);
}

.text-spin-subtitle-enter-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: 0.1s;
}

.text-spin-subtitle-leave-active {
  transition: all 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-spin-subtitle-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

.text-spin-subtitle-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0.3);
}

/* ===== FADE ANIMATIONS ===== */
.text-fade-title-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.text-fade-title-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-fade-title-enter-from {
  opacity: 0;
  transform: translateY(30px);
  filter: blur(10px);
}

.text-fade-title-leave-to {
  opacity: 0;
  transform: translateY(-30px);
  filter: blur(10px);
}

.text-fade-subtitle-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.1s;
}

.text-fade-subtitle-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-fade-subtitle-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(8px);
}

.text-fade-subtitle-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(8px);
}

/* ===== SLIDE ANIMATIONS ===== */
.text-slide-title-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-slide-title-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-slide-title-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.text-slide-title-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.text-slide-subtitle-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: 0.1s;
}

.text-slide-subtitle-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-slide-subtitle-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.text-slide-subtitle-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Image Carousel Transitions */
.hero-slide {
  width: 100%;
  height: 100%;
}

.slide-fade-enter-active {
  transition: opacity 1s ease-in-out;
}

.slide-fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
}

.hero-bg-image {
  will-change: transform;
  image-rendering: auto;
}

/* Three.js Canvas Styling */
#threeContainer {
  pointer-events: none;
}

#threeContainer canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

/* Smooth fog effect at bottom - no blur on image */
.fog-effect {
  height: 7rem; /* 112px - reduced for smaller stats */
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.12) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 75%,
    transparent 100%
  );
  /* No backdrop-filter blur to keep image sharp */
}

.fog-overlay {
  height: 6rem; /* 96px - reduced for smaller stats */
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0.08) 60%,
    transparent 100%
  );
  mix-blend-mode: soft-light;
  opacity: 0.85;
}

/* Progress bar animation */
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
  width: 100%;
  }
}

.animate-progress {
  animation: progress 5s linear forwards;
}

/* Slow spin animation for slide indicator */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow linear infinite;
}

/* Remove old styles as we're using Tailwind now */

.carousel-container {
  position: relative;
}

.slides-container {
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-item {
  position: relative;
}

/* Styles removed - using Tailwind CSS classes instead */

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
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  border: 2px solid #e5e7eb;
  color: #6b7280;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.toggle-button.header-toggle-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
  transition: left 0.5s ease;
}

.toggle-button.header-toggle-btn:hover::before {
  left: 100%;
}

.toggle-button.header-toggle-btn:hover {
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
  border-color: #10b981;
  color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.toggle-button.header-toggle-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.1);
}

.toggle-button.header-toggle-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.toggle-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.toggle-button.header-toggle-btn:hover .toggle-icon {
  transform: translateY(2px);
}

.toggle-button.header-toggle-btn:hover .toggle-icon.rotated {
  transform: rotate(180deg) translateY(-2px);
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

/* Modern Search Bar Styles - Hidden (using inline version now) */
.search-container {
  display: none; /* Using inline search bar instead */
}

.search-form {
  display: flex;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  animation: searchBarSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes searchBarSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-form::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.search-form:hover::before {
  opacity: 1;
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
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #06b6d4);
  border-radius: 2px;
  animation: underlineExpand 0.8s ease-out 0.3s both;
}

@keyframes underlineExpand {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60px;
    opacity: 1;
  }
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
  animation: fadeInUp 0.8s ease-out 0.2s both;
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
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid #e5e7eb;
  position: relative;
}

.jobs-section::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
  border-radius: 2px;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.job-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.job-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.75rem 1.75rem 0;
  position: relative;
}

.company-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  object-fit: cover;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.job-card:hover .logo-image {
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
  padding: 1.5rem 1.75rem;
  flex-grow: 1;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.job-card:hover .job-title {
  color: #059669;
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
  padding: 1.25rem 1.75rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to top, #f9fafb, transparent);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-size: 0.75rem;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #4b5563;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.job-card:hover .skill-tag {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border-color: rgba(16, 185, 129, 0.2);
  transform: translateY(-1px);
}

.apply-button {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  position: relative;
  overflow: hidden;
}

.apply-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.apply-button:hover::before {
  width: 300px;
  height: 300px;
}

.apply-button:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.apply-button:active {
  transform: translateY(0);
}

.apply-button svg {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.categories-section {
  margin-bottom: 5rem;
  position: relative;
  padding-bottom: 2rem;
}

.categories-section::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
  border-radius: 2px;
  opacity: 0.5;
}

.categories-container {
  position: relative;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  transition: max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  max-height: 520px;
  overflow: hidden;
  position: relative;
}

.categories-grid::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, rgba(249, 250, 251, 1));
  pointer-events: none;
  transition: opacity 0.5s ease;
  z-index: 1;
}

.categories-grid.expanded {
  max-height: 3000px !important;
  overflow: visible;
}

.categories-grid.expanded::after {
  opacity: 0;
  height: 0;
  pointer-events: none;
}

.categories-grid.expanded .category-card {
  opacity: 1;
  animation: categoryCardFadeIn 0.4s ease-out var(--animation-delay, 0s) forwards;
}

.category-card {
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  padding: 0;
  position: relative;
  opacity: 1;
}

.categories-grid:not(.expanded) .category-card:nth-child(n+9) {
  opacity: 0;
  pointer-events: none;
}

@keyframes categoryCardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.category-card-inner {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.category-card:hover .category-card-inner {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.category-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 0;
}

.category-card:hover .category-hover-effect {
  left: 0;
}

.category-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.icon-glow {
  position: absolute;
  inset: -50%;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.category-card:hover .icon-glow {
  opacity: 0.6;
  animation: iconGlowPulse 2s ease-in-out infinite;
}

@keyframes iconGlowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.category-icon-svg {
  width: 28px;
  height: 28px;
  color: white;
  position: relative;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.category-card:hover .category-icon-svg {
  transform: scale(1.15);
}

.category-info {
  position: relative;
  z-index: 1;
  flex: 1;
}

.category-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  line-height: 1.3;
}

.category-card:hover .category-info h4 {
  color: #059669;
}

.category-count {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.count-number {
  font-size: 0.875rem;
  font-weight: 700;
  color: #16a34a;
  transition: all 0.3s ease;
}

.category-card:hover .count-number {
  transform: scale(1.1);
  color: #059669;
}

.count-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
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
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  border-radius: 1.5rem;
  margin: 2rem 0;
}

.empty-content {
  max-width: 500px;
  margin: 0 auto;
}

.illustration-container {
  max-width: 300px;
  animation: float-gentle 3s ease-in-out infinite;
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-illustration {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 10px 25px rgba(16, 185, 129, 0.1));
}

.empty-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #059669 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
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
    font-size: 2rem;
  }
  
  .search-form-inline {
    flex-wrap: wrap;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .search-input-group-inline {
    flex: 1 1 calc(50% - 0.25rem);
    min-width: 200px;
    min-height: 52px;
  }
  
  .search-button-inline {
    flex: 1 1 100%;
    margin-top: 0.25rem;
    min-height: 52px;
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
    justify-content: center;
    text-align: center;
    align-items: center;
    padding-top: 3rem;
    padding-bottom: 4rem;
  }

  .text-content {
    max-width: 100%;
  }
  
  .slide-pre-title {
    font-size: 0.875rem;
  }
  
  .slide-title {
    font-size: 1.75rem;
  }
  
  .slide-description {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }
  
  .search-container-inline {
    margin-top: 1.25rem;
  }
  
  .search-form-inline {
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .search-input-group-inline {
    width: 100%;
    min-height: 48px;
  }
  
  .search-button-inline {
    width: 100%;
    margin-top: 0;
    min-height: 48px;
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
    bottom: 1.5rem;
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

  .category-icon-svg {
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
  
  .search-container-inline {
    margin-top: 1rem;
    width: 100%;
  }
  
  .search-form-inline {
    padding: 0.625rem;
    gap: 0.625rem;
  }
  
  .search-input-group-inline {
    min-height: 44px;
  }
  
  .search-input-inline,
  .search-select-inline {
    font-size: 0.875rem;
  }
  
  .search-button-inline {
    min-height: 44px;
    font-size: 0.875rem;
    padding: 0 1.5rem;
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
    bottom: 1rem;
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

  .category-icon-svg {
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
  
  .search-container-inline {
    margin-top: 0.875rem;
  }
  
  .search-form-inline {
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: 0.875rem;
  }
  
  .search-input-group-inline {
    min-height: 42px;
    padding: 0 0.875rem;
  }
  
  .search-input-inline,
  .search-select-inline {
    font-size: 0.8125rem;
    padding: 0.75rem 0;
  }
  
  .search-icon-inline {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 0.625rem;
  }
  
  .search-button-inline {
    min-height: 42px;
    font-size: 0.8125rem;
    padding: 0 1.25rem;
  }
  
  .button-icon-inline {
    width: 1rem;
    height: 1rem;
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
    bottom: 0.75rem;
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

  .category-icon-svg {
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
    bottom: 0.5rem;
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

  .category-icon-svg {
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
  -webkit-mask-image: linear-gradient(to bottom, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%);
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
    max-height: 400px;
  }
  
  .categories-grid.expanded {
    max-height: 2500px;
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
  
  .category-icon-svg {
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
    max-height: 350px;
  }
  
  .categories-grid.expanded {
    max-height: 2000px;
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
    max-height: 320px;
  }
  
  .categories-grid.expanded {
    max-height: 1800px;
  }
  
  .category-card {
    flex-direction: row;
    text-align: left;
    min-height: 80px;
  }
  
  .categories-section {
    margin-bottom: 3rem;
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