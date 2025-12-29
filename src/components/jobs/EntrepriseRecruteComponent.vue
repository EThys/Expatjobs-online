<template>
  <section class="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-slate-50">
    <!-- Animated Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-transparent to-transparent"></div>
      <div class="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl animate-blob-slow mix-blend-multiply"></div>
      <div class="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl animate-blob-fast mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-pattern-dots opacity-50"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 animate-fade-in-up">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-700 font-semibold text-sm mb-6">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Rejoignez l'élite
        </div>
        
        <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {{ t('companies.title') }}
          <span class="transparent-text bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            {{ t('companies.highlight') }}
          </span>
        </h2>
        
        <p class="text-xl text-gray-600 leading-relaxed">
          {{ t('companies.description') }}
        </p>
      </div>

      <!-- Feature Strip -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-fade-in-up delay-100">
        <div v-for="(feature, idx) in features" :key="idx" class="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-emerald-100/50 shadow-sm flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-300">
          <component :is="feature.icon" class="w-8 h-8 text-emerald-600 mb-3" />
          <h3 class="font-bold text-gray-900 text-sm mb-1">{{ feature.title }}</h3>
          <p class="text-xs text-gray-500">{{ feature.desc }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-lg border border-emerald-100">
          <div class="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-gray-600 font-medium">{{ t('companies.loading') }}</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="inline-block p-6 bg-red-50 rounded-3xl mb-4">
          <ExclamationTriangleIcon class="w-10 h-10 text-red-500" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Oups !</h3>
        <p class="text-gray-500 mb-6">{{ error || t('companies.error') }}</p>
        <button @click="loadCompanies" class="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
          {{ t('companies.retry') }}
        </button>
      </div>

      <!-- Companies Carousel -->
      <div v-else-if="companies.length > 0" class="relative group/carousel">
        
        <!-- Navigation Buttons -->
        <button @click="prevSlide" class="absolute left-[-1rem] lg:left-[-2rem] top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all duration-300 focus:outline-none" aria-label="Previous slide">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button @click="nextSlide" class="absolute right-[-1rem] lg:right-[-2rem] top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all duration-300 focus:outline-none" aria-label="Next slide">
           <ChevronRightIcon class="w-6 h-6" />
        </button>

        <div class="overflow-hidden px-4 -mx-4 py-8 -my-8">
          <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div 
              v-for="company in companies" 
              :key="company.id" 
              class="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 md:px-4"
            >
              <div class="group h-full bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
                <!-- Hover Gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <!-- Card Header -->
                <div class="relative flex justify-between items-start mb-6">
                  <div class="relative">
                    <div class="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <img 
                        :src="getCompanyLogo(company)" 
                        :alt="company.name" 
                        class="w-full h-full object-contain mix-blend-multiply"
                        @error="handleImageError($event, company)" 
                      />
                    </div>
                    <div v-if="company.isFavorite" class="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-white">
                      <CheckBadgeIcon class="w-4 h-4" />
                    </div>
                  </div>
                  <button 
                    @click="toggleFavorite(company.id)"
                    class="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                  >
                    <HeartIconSolid v-if="company.isFavorite" class="w-5 h-5 text-red-500" />
                    <HeartIcon v-else class="w-5 h-5" />
                  </button>
                </div>

                <!-- Card Body -->
                <div class="relative flex-grow">
                  <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{{ company.name }}</h3>
                  
                  <div class="flex flex-col gap-2 mb-4">
                    <div class="flex items-center text-sm text-gray-500">
                      <MapPinIcon class="w-4 h-4 mr-2 text-emerald-500" />
                      {{ company.location || 'Localisation non spécifiée' }}
                    </div>
                    <div class="flex items-center text-sm text-gray-500">
                       <GlobeAltIcon class="w-4 h-4 mr-2 text-emerald-500" />
                       <span class="truncate max-w-[200px]">{{ getDomainFromUrl(company.webSiteUrl) || 'Site web' }}</span>
                    </div>
                  </div>

                  <p class="text-sm text-gray-600 mb-6 line-clamp-2">
                    {{ truncateDescription(company.description) }}
                  </p>

                  <div class="flex flex-wrap gap-2 mb-6">
                    <span 
                      v-for="(highlight, hIdx) in getCompanyHighlights(company)" 
                      :key="hIdx"
                      class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100"
                    >
                      {{ highlight }}
                    </span>
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="relative pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                   <div class="flex items-center text-sm font-medium text-gray-600">
                      <span class="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                      {{ getRandomJobsCount(company.id) }} postes
                   </div>
                   <router-link 
                     :to="{ name: 'companyDetails', params: { id: company.id } }"
                     class="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group/link"
                   >
                     Voir l'entreprise
                     <ArrowLongRightIcon class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                   </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-8">
          <button 
            v-for="(_, idx) in Math.ceil(companies.length / visibleSlides)" 
            :key="idx"
            @click="goToSlide(idx)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === idx ? 'bg-emerald-500 w-8' : 'bg-gray-300 hover:bg-emerald-300'"
            :aria-label="`Page ${idx + 1}`"
          ></button>
        </div>

      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <BuildingOfficeIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 font-medium">Aucune entreprise trouvée pour le moment.</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowLongRightIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import { useCompanyService } from '@/utils/service/CompagnyService'
import type { ICompany } from '@/utils/interface/ICompagny'

const { t } = useI18n()
const companyService = useCompanyService()

// Types
interface CompanyWithUI extends ICompany {
  isFavorite: boolean
  highlights: string[]
  jobsCount: number
}

interface CacheData {
  data: CompanyWithUI[]
  timestamp: number
}

// State
const companies = ref<CompanyWithUI[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentSlide = ref(0)
const resizeTimeout = ref<number | null>(null)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

// Config
const CACHE_KEY = 'companies_cache'
const CACHE_DURATION = 5 * 60 * 1000

// Features Static Data
const features = [
  { icon: ShieldCheckIcon, title: 'Tout est clair', desc: 'Contrats transparents' },
  { icon: DocumentCheckIcon, title: 'Offres vérifiées', desc: 'Mises à jour quotidiennes' },
  { icon: GlobeAltIcon, title: 'International', desc: 'Présence mondiale' },
  { icon: UserGroupIcon, title: 'Support continu', desc: 'Équipe dédiée 24/7' }
]

// Computed
const visibleSlides = computed(() => {
  if (windowWidth.value >= 1024) return 3
  if (windowWidth.value >= 640) return 2
  return 1
})

const maxSlides = computed(() => Math.ceil(companies.value.length / visibleSlides.value))

// Methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const getCachedData = (): CompanyWithUI[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const parsed: CacheData = JSON.parse(cached)
    if (Date.now() - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

const setCachedData = (data: CompanyWithUI[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {}
}

const getCompanyLogo = (company: ICompany): string => {
  if (company.webSiteUrl) {
    try {
      const domain = new URL(company.webSiteUrl).hostname.replace('www.', '')
      return `https://logo.clearbit.com/${domain}`
    } catch {
      return getFallbackLogo(company)
    }
  }
  return getFallbackLogo(company)
}

const handleImageError = (event: Event, company: ICompany) => {
  const target = event.target as HTMLImageElement
  if (target.dataset.fallbackApplied === 'true') {
    return
  }
  target.dataset.fallbackApplied = 'true'
  target.src = getFallbackLogo(company)
}

const getFallbackLogo = (company: ICompany): string => {
  const letter = company.name.charAt(0).toUpperCase()
  return `https://ui-avatars.com/api/?name=${letter}&background=10b981&color=fff&size=128`
}

const getDomainFromUrl = (url: string): string => {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const truncateDescription = (desc: string): string => {
  if (!desc) return 'Découvrez cette entreprise exceptionnelle et ses opportunités.'
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
}

const getCompanyHighlights = (company: CompanyWithUI): string[] => {
  if (company.highlights?.length) return company.highlights
  return ['Innovation', 'Croissance']
}

const getRandomJobsCount = (id: number): number => (id % 15) + 3

const toggleFavorite = (id: number) => {
  const company = companies.value.find(c => c.id === id)
  if (company) company.isFavorite = !company.isFavorite
}

const nextSlide = () => {
  if (currentSlide.value >= maxSlides.value - 1) {
    currentSlide.value = 0
  } else {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value <= 0) {
    currentSlide.value = maxSlides.value - 1
  } else {
    currentSlide.value--
  }
}

const goToSlide = (idx: number) => {
  currentSlide.value = idx
}

const loadCompanies = async () => {
  loading.value = true
  error.value = null
  
  const cached = getCachedData()
  if (cached) {
    companies.value = cached
    loading.value = false
    return
  }

  try {
    const response = await companyService.getAllCompanies(0, 20, 'name,asc')
    const transformed = response.content.map(c => ({
      ...c,
      isFavorite: Math.random() > 0.8,
      highlights: ['Remote first', 'Tech lead', 'Startup', 'Scale-up'].sort(() => 0.5 - Math.random()).slice(0, 2),
      jobsCount: getRandomJobsCount(c.id)
    } as CompanyWithUI))
    
    companies.value = transformed
    setCachedData(transformed)
  } catch (err) {
    error.value = 'Erreur de chargement'
  } finally {
    loading.value = false
  }
}

const handleResize = () => {
  if (resizeTimeout.value) clearTimeout(resizeTimeout.value)
  resizeTimeout.value = setTimeout(() => {
    updateWidth()
    // Reset slide if out of bounds
    if (currentSlide.value >= Math.ceil(companies.value.length / visibleSlides.value)) {
      currentSlide.value = 0
    }
  }, 100)
}

onMounted(() => {
  updateWidth()
  loadCompanies()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.animate-blob-slow {
  animation: blob 10s infinite;
}
.animate-blob-fast {
  animation: blob 8s infinite reverse;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.delay-100 {
  animation-delay: 100ms;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-pattern-dots {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==');
}
</style>
