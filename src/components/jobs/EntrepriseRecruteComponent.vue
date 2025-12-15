<template>
  <section class="companies-showcase py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
    <!-- Fond animé avec effets de lumière -->
    <div class="absolute inset-0 overflow-hidden -z-10">
      <div class="absolute -top-40 -left-40 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div class="absolute -bottom-40 -right-40 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] bg-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-reverse"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIj48L3JlY3Q+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48L2xpbmVhckdyYWRpZW50Pjwvc3ZnPg==')] opacity-10"></div>
    </div>

    <div class="max-w-7xl mx-auto container-responsive">
      <div class="text-center mb-6 sm:mb-10 md:mb-12 animate-on-scroll" data-delay="0">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
          {{ t('companies.title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">{{ t('companies.highlight') }}</span>
        </h2>

        <p class="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 px-4">
          {{ t('companies.description') }}
        </p>
      </div>

      <!-- Bande "Pourquoi travailler avec nos entreprises partenaires ?" -->
      <div class="reasons-strip animate-on-scroll" data-delay="60">
        <div class="reason-item">
          <span class="reason-label">Tout est clair</span>
          <span class="reason-text">Contrats transparents et paiements sécurisés</span>
        </div>
        <div class="reason-item">
          <span class="reason-label">Beaucoup d'offres</span>
          <span class="reason-text">Des missions et postes ajoutés en continu</span>
        </div>
        <div class="reason-item">
          <span class="reason-label">Partout dans le monde</span>
          <span class="reason-text">Entreprises présentes sur plusieurs marchés</span>
        </div>
        <div class="reason-item">
          <span class="reason-label">Support dédié</span>
          <span class="reason-text">Une équipe pour vous accompagner</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center justify-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full">
          <ArrowPathIcon class="w-6 h-6 mr-3 text-emerald-600 animate-spin" />
          <span class="text-sm font-medium text-gray-700">{{ t('companies.loading') }}</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="inline-flex items-center justify-center px-6 py-3 bg-red-50 border border-red-200 rounded-full">
          <ExclamationTriangleIcon class="w-6 h-6 mr-3 text-red-600" />
          <span class="text-sm font-medium text-red-700">{{ error || t('companies.error') }}</span>
        </div>
        <button @click="loadCompanies" class="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">
          {{ t('companies.retry') }}
        </button>
      </div>

      <div v-else-if="companies.length > 0" class="relative">
        <button @click="prevSlide" class="carousel-nav prev" aria-label="Previous">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button @click="nextSlide" class="carousel-nav next" aria-label="Next">
          <ChevronRightIcon class="w-6 h-6" />
        </button>

        <div class="carousel-container">
          <div class="companies-grid" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="company in companies" :key="company.id" class="company-card">
              <div class="card-inner">
                <div class="card-header">
                  <div class="company-logo-container">
                    <div class="company-logo">
                      <img 
                        :src="getCompanyLogo(company)" 
                        :alt="company.name" 
                        @error="(e: any) => e.target.src = getFallbackLogo(company)" 
                      />
                    </div>
                    <CheckBadgeIcon v-if="company.isFavorite" class="verified-badge" />
                  </div>

                  <button @click="toggleFavorite(company.id)" class="favorite-toggle" :aria-label="company.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'">
                    <HeartIconSolid v-if="company.isFavorite" class="w-6 h-6 text-red-500" />
                    <HeartIcon v-else class="w-6 h-6 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
                <div class="card-body">
                  <h3 class="company-name">{{ company.name }}</h3>

                  <div class="company-meta">
                    <div class="meta-item">
                      <MapPinIcon class="w-4 h-4 text-gray-400" />
                      <span>{{ company.location || 'Localisation non spécifiée' }}</span>
                    </div>
                    <div class="meta-item">
                      <GlobeAltIcon class="w-4 h-4 text-gray-400" />
                      <span>{{ getDomainFromUrl(company.webSiteUrl) || 'Site web non spécifié' }}</span>
                    </div>
                  </div>

                  <p class="company-description">{{ truncateDescription(company.description) }}</p>

                  <div class="highlights">
                    <span v-for="(highlight, index) in getCompanyHighlights(company)" :key="index" class="highlight-tag">
                      {{ highlight }}
                    </span>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="jobs-info">
                    <ArrowPathIcon class="w-4 h-4 text-emerald-600" />
                    <span>{{ getRandomJobsCount(company.id) }} postes ouverts</span>
                  </div>
                  <a :href="company.webSiteUrl || '#'" target="_blank" class="view-jobs-btn">Visiter le site →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-indicators">
          <button
            v-for="(_, index) in Math.ceil(companies.length / visibleSlides)"
            :key="index"
            @click="goToSlide(index)"
            :class="{ active: currentSlide === index }"
            :aria-label="`Aller à la diapositive ${index + 1}`"
          ></button>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <div class="inline-flex items-center justify-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full">
          <BuildingOfficeIcon class="w-6 h-6 mr-3 text-gray-400" />
          <span class="text-sm font-medium text-gray-700">Aucune entreprise disponible</span>
        </div>
      </div>

      <div class="cta-section mt-20">
        <div class="cta-inner">
          <div class="cta-left">
            <div class="cta-badge">
              <span class="badge-dot"></span>
              <span class="badge-text">Prêt à commencer ?</span>
            </div>

            <h3 class="cta-title">
              Rejoignez
              <span class="cta-gradient">expatJobs</span>
              maintenant
            </h3>

            <p class="cta-subtitle">
              Trouvez votre prochain emploi international ou recrutez les meilleurs talents, en quelques clics seulement.
            </p>

            <div class="cta-buttons">
              <a href="#register-candidate" class="primary-btn">
                Je cherche un job
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#register-company" class="secondary-btn">
                Je veux recruter
              </a>
            </div>

            <div class="cta-meta">
              <span>Inscription gratuite</span>
              <span class="dot"></span>
              <span>Annulation à tout moment</span>
              <span class="dot"></span>
              <span>Support dédié</span>
            </div>
          </div>

          <div class="cta-right">
            <div class="cta-card">
              <div class="cta-card-header">
                <span class="cta-chip">Temps réel</span>
                <span class="cta-chip cta-chip-secondary">International</span>
              </div>
              <div class="cta-card-main">
                <div class="cta-stat">
                  <div class="cta-stat-value">2 357</div>
                  <div class="cta-stat-label">Offres actives</div>
                </div>
                <div class="cta-stat">
                  <div class="cta-stat-value">78</div>
                  <div class="cta-stat-label">Pays connectés</div>
                </div>
              </div>
              <div class="cta-card-footer">
                <div class="cta-avatars">
                  <span class="avatar-circle">AM</span>
                  <span class="avatar-circle">JD</span>
                  <span class="avatar-circle">LK</span>
                  <span class="avatar-more">+120</span>
                </div>
                <p class="cta-card-text">
                  Des candidats et des entreprises rejoignent la plateforme chaque jour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import {
  BuildingOfficeIcon,
  MapPinIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import { useCompanyService } from '../../utils/service/CompagnyService'
import type { ICompany } from '@/utils/interface/ICompagny'

interface CompanyWithUI extends ICompany {
  isFavorite: boolean
  highlights: string[]
  jobsCount: number
}

interface CacheData {
  data: CompanyWithUI[]
  timestamp: number
}

const companies = ref<CompanyWithUI[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentSlide = ref(0)
const resizeTimeout = ref<number | null>(null)

const companyService = useCompanyService()

// Cache utilities
const CACHE_KEY = 'companies_cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedData = (): CompanyWithUI[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsed: CacheData = JSON.parse(cached)
    const now = Date.now()

    if (now - parsed.timestamp > CACHE_DURATION) {
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
    const cacheData: CacheData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch {
    // Ignore localStorage errors
  }
}

const visibleSlides = computed(() => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1280) return 3
  if (window.innerWidth >= 768) return 2
  return 1
})

// Computed simplifiés
const isLoading = computed(() => loading.value)
const hasError = computed(() => !!error.value)

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

const getFallbackLogo = (company: ICompany): string => {
  const firstLetter = company.name.charAt(0).toUpperCase()
  return `https://via.placeholder.com/80x80/10b981/ffffff?text=${firstLetter}`
}

const getDomainFromUrl = (url: string): string => {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const truncateDescription = (description: string, maxLength: number = 120): string => {
  if (!description) return 'Aucune description disponible'
  return description.length > maxLength 
    ? `${description.substring(0, maxLength)}...` 
    : description
}

const getCompanyHighlights = (company: CompanyWithUI): string[] => {
  if (company.highlights && company.highlights.length > 0) {
    return company.highlights.slice(0, 3)
  }
  
  const defaultHighlights = [
    'Entreprise internationale',
    'Environnement dynamique',
    'Projets innovants'
  ]
  
  return defaultHighlights.slice(0, 2)
}

const getRandomJobsCount = (companyId: number): number => {
  return (companyId % 10) + 5
}

// Optimisation: fonctions stables pour éviter les re-renders inutiles
const toggleFavorite = (id: number) => {
  const company = companies.value.find(c => c.id === id)
  if (company) company.isFavorite = !company.isFavorite
}

const nextSlide = () => {
  if (companies.value.length === 0) return
  const totalSlides = Math.ceil(companies.value.length / visibleSlides.value)
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  if (companies.value.length === 0) return
  const totalSlides = Math.ceil(companies.value.length / visibleSlides.value)
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Chargement des données avec cache
const loadCompanies = async () => {
  loading.value = true
  error.value = null

  // Vérifier le cache d'abord
  const cachedData = getCachedData()
  if (cachedData) {
    companies.value = cachedData
    loading.value = false
    return
  }

  try {
    const response = await companyService.getAllCompanies(0, 20, 'name,asc')

    // Transformation des données de l'API vers le format UI
    const transformedData = response.content.map(company => ({
      ...company,
      isFavorite: Math.random() > 0.7, // Exemple: 30% des entreprises sont favorites
      highlights: [
        'Flex-office',
        'Télétravail',
        'Bonus annuel'
      ].sort(() => Math.random() - 0.5).slice(0, 2), // 2 highlights aléatoires
      jobsCount: getRandomJobsCount(company.id)
    } as CompanyWithUI))

    companies.value = transformedData

    // Mettre en cache les données
    setCachedData(transformedData)

  } catch (err) {
    console.error('Erreur lors du chargement des entreprises:', err)
    error.value = 'Impossible de charger les entreprises. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}

// Gestionnaire d'événement resize avec debounce
const handleResize = () => {
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value)
  }
  resizeTimeout.value = setTimeout(() => {
    currentSlide.value = 0
  }, 150)
}

onMounted(() => {
  loadCompanies()

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value)
  }
})
</script>


<style scoped>
/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-reverse {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-5deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 10s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}

.companies-showcase {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Bande des raisons, inspirée des landing pages de jobs modernes */
.reasons-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 0.9rem 1rem;
  margin-bottom: 2.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
}

.reason-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.reason-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #059669;
  margin-bottom: 0.15rem;
}

.reason-text {
  font-size: 0.8rem;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
  position: relative;
}

.companies-grid {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.company-card {
  flex: 0 0 calc(100% / v-bind(visibleSlides) - 1.5rem);
  margin: 0 0.75rem;
  perspective: 1000px;
}

.card-inner {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  border: 1px solid #e5e7eb;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.company-card:hover .card-inner {
  transform: translateY(-8px) rotateX(5deg) rotateY(3deg);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.company-logo-container {
  position: relative;
}

.company-logo {
  width: 80px;
  height: 80px;
  border-radius: 1rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.company-logo img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.company-card:hover .company-logo img {
  transform: scale(1.05);
}

.verified-badge {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 1.75rem;
  height: 1.75rem;
  color: #10b981;
  background: white;
  border-radius: 50%;
  padding: 0.25rem;
  box-shadow: 0 0 0 2px white;
  border: 1px solid #e5e7eb;
}

.favorite-toggle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.favorite-toggle:hover {
  background: #f3f4f6;
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
  flex-grow: 1;
}

.company-name {
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.company-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.highlight-tag {
  font-size: 0.8125rem;
  padding: 0.5rem 0.875rem;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 9999px;
  line-height: 1;
  transition: all 0.2s ease;
}

.company-card:hover .highlight-tag {
  background-color: #e2e8f0;
}

.card-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jobs-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
}

.view-jobs-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-jobs-btn:hover {
  color: #059669;
  transform: translateX(3px);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-nav:hover {
  background: #10b981;
  color: white;
}

.carousel-nav.prev {
  left: -1.75rem;
}

.carousel-nav.next {
  right: -1.75rem;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background-color: #10b981;
  transform: scale(1.2);
}

.cta-section {
  margin-top: 4rem;
  padding: 3rem;
  background: radial-gradient(circle at top left, #ecfdf5 0, #dcfce7 35%, #f0fdf4 60%, #e5f9ff 100%);
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
}

.cta-section::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 150px;
  height: 150px;
  background: rgba(6, 182, 212, 0.1);
  border-radius: 50%;
}

.cta-inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.1fr);
  gap: 2.5rem;
  align-items: center;
}

.cta-left {
  text-align: left;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #059669;
}

.badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: radial-gradient(circle, #22c55e 0, #16a34a 40%, #0f766e 100%);
  margin-right: 0.5rem;
}

.badge-text {
  display: inline-block;
}

.cta-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.9rem;
  line-height: 1.25;
}

.cta-gradient {
  background: linear-gradient(90deg, #059669, #10b981, #0ea5e9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cta-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: 0;
  margin-right: 0;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: white;
  color: #10b981;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #10b981;
}

.secondary-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}

.cta-meta {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.cta-meta .dot {
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 999px;
  background: #a7f3d0;
}

.cta-right {
  display: flex;
  justify-content: flex-end;
}

.cta-card {
  width: 100%;
  max-width: 360px;
  border-radius: 1.5rem;
  padding: 1.5rem 1.6rem;
  background: rgba(15, 23, 42, 0.96);
  color: #e5e7eb;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.4);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at top, rgba(52, 211, 153, 0.25) 0, transparent 55%);
  opacity: 0.9;
}

.cta-card-header,
.cta-card-main,
.cta-card-footer {
  position: relative;
  z-index: 1;
}

.cta-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
}

.cta-chip {
  font-size: 0.7rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(52, 211, 153, 0.4);
  background: rgba(15, 23, 42, 0.9);
  color: #a7f3d0;
}

.cta-chip-secondary {
  border-color: rgba(56, 189, 248, 0.45);
  color: #bae6fd;
}

.cta-card-main {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.cta-stat {
  flex: 1;
}

.cta-stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #e5e7eb;
}

.cta-stat-label {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.2rem;
}

.cta-card-footer {
  border-top: 1px solid rgba(148, 163, 184, 0.5);
  padding-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cta-avatars {
  display: flex;
  align-items: center;
}

.avatar-circle,
.avatar-more {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border: 2px solid #0b1120;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8);
}

.avatar-circle:nth-child(1) { background: linear-gradient(135deg, #22c55e, #16a34a); }
.avatar-circle:nth-child(2) { background: linear-gradient(135deg, #0ea5e9, #0369a1); margin-left: -0.75rem; }
.avatar-circle:nth-child(3) { background: linear-gradient(135deg, #f97316, #ea580c); margin-left: -0.75rem; }
.avatar-more {
  background: rgba(15, 23, 42, 0.9);
  margin-left: -0.75rem;
}

.cta-card-text {
  font-size: 0.8rem;
  color: #9ca3af;
}

@media (max-width: 1280px) {
  .company-card {
    flex: 0 0 calc(50% - 1rem);
  }

  .reasons-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 1.5rem;
    padding-inline: 1rem;
  }
}

@media (max-width: 1024px) {
  .carousel-nav {
    width: 3rem;
    height: 3rem;
  }

  .carousel-nav.prev {
    left: -1rem;
  }

  .carousel-nav.next {
    right: -1rem;
  }
}

@media (max-width: 768px) {
  .company-card {
    flex: 0 0 calc(100% - 1rem);
  }

  .carousel-nav {
    width: 2.5rem;
    height: 2.5rem;
  }

  .carousel-nav.prev {
    left: -0.5rem;
  }

  .carousel-nav.next {
    right: -0.5rem;
  }

  .cta-title {
    font-size: 1.7rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .reasons-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.75rem;
    column-gap: 0.75rem;
    padding-inline: 0.9rem;
    border-radius: 1.5rem;
  }

  .cta-inner {
    grid-template-columns: 1fr;
  }

  .cta-right {
    justify-content: flex-start;
    margin-top: 1.25rem;
  }

  .cta-card {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .section-title {
    font-size: 2rem;
  }

  .company-card {
    margin: 0 0.5rem;
  }

  .reasons-strip {
    grid-template-columns: 1fr;
    border-radius: 1.25rem;
  }

  .cta-section {
    padding: 2.25rem 1.75rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
