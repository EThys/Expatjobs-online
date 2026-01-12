<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <!-- Hero Section -->
    <PageHero v-if="company && !loading">
      <template #title>
        {{ company.name }}
      </template>
      <template #subtitle>
        {{ company.description || t('companyDetails.discoverOpportunities') }}
      </template>
    </PageHero>

    <!-- Loading State with Shimmer -->
    <div v-if="loading" class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Company Info Shimmer -->
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 shimmer-container"
        >
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-32 h-32 bg-gray-200 rounded-2xl shimmer"></div>
            <div class="flex-1 space-y-4">
              <div class="h-8 bg-gray-200 rounded shimmer w-1/3"></div>
              <div class="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded shimmer w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- Jobs Shimmer -->
        <div class="mb-8">
          <div class="h-8 bg-gray-200 rounded shimmer w-64 mb-6"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="i in 6"
              :key="i"
              class="bg-white rounded-xl border border-gray-200 p-6 shimmer-container"
            >
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 bg-gray-200 rounded-2xl shimmer"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-6 bg-gray-200 rounded shimmer"></div>
                  <div class="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                  <div class="flex gap-4">
                    <div class="h-4 bg-gray-200 rounded shimmer w-20"></div>
                    <div class="h-4 bg-gray-200 rounded shimmer w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex justify-center items-center min-h-[60vh] px-4">
      <div class="text-center max-w-md">
        <div
          class="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <ExclamationTriangleIcon class="w-10 h-10 text-red-500" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          {{ t('companyDetails.errorOccurred') }}
        </h3>
        <p class="text-gray-600 mb-8">{{ error }}</p>
        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          {{ t('companyDetails.backToHome') }}
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else-if="company" class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Company Info Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <!-- Company Logo -->
            <div class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              ></div>
              <div
                class="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 relative z-10"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center overflow-hidden"
                >
                  <img
                    :src="getCompanyLogo(company)"
                    :alt="company.name"
                    class="w-16 h-16 md:w-20 md:h-20 object-contain"
                    @error="handleImageError($event, company)"
                  />
                </div>
              </div>
            </div>

            <!-- Company Details -->
            <div class="flex-1 text-center md:text-left">
              <div
                class="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium text-sm mb-4"
              >
                {{ t('companyDetails.company') }}
              </div>

              <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div
                  v-if="company.location"
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <MapPinIcon class="w-4 h-4 text-emerald-500" />
                  <span class="font-medium text-gray-700">{{ company.location }}</span>
                </div>

                <div
                  v-if="company.webSiteUrl"
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <GlobeAltIcon class="w-4 h-4 text-emerald-500" />
                  <a
                    :href="company.webSiteUrl"
                    target="_blank"
                    class="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {{ t('companyDetails.website') }}
                  </a>
                </div>
              </div>

              <p v-if="company.description" class="text-gray-600 leading-relaxed">
                {{ company.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Jobs Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-3xl font-bold text-gray-900">
                {{ t('companyDetails.availableOffers') }}
              </h2>
              <p class="text-gray-600 mt-1">
                {{ t('companyDetails.positionsAvailable', { count: totalElements }) }}
              </p>
            </div>
          </div>

          <!-- Loading Jobs with Shimmer -->
          <div v-if="loadingJobs" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="i in 6"
              :key="i"
              class="bg-white rounded-xl border border-gray-200 p-6 shimmer-container"
            >
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 bg-gray-200 rounded-2xl shimmer"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-6 bg-gray-200 rounded shimmer"></div>
                  <div class="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                  <div class="flex gap-4">
                    <div class="h-4 bg-gray-200 rounded shimmer w-20"></div>
                    <div class="h-4 bg-gray-200 rounded shimmer w-24"></div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <div class="h-6 bg-gray-200 rounded-full shimmer w-16"></div>
                    <div class="h-6 bg-gray-200 rounded-full shimmer w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Jobs Grid - 3 per row -->
          <div v-else-if="formattedJobs.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <OffreCard
                v-for="job in formattedJobs"
                :key="job.id"
                :offre="job"
                class="transform hover:scale-[1.02] transition-transform duration-200"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8">
              <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                :total-elements="totalElements"
                :loading="paginationLoading"
                @change="changePage"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div
              class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-50 flex items-center justify-center"
            >
              <BriefcaseIcon class="w-10 h-10 text-gray-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ t('companyDetails.noOffersAvailable') }}
            </h3>
            <p class="text-gray-600">{{ t('companyDetails.offersComingSoon') }}</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCompanyService } from '@/utils/service/CompagnyService'
import { useJobService } from '@/utils/service/jobService'
import type { ICompany } from '@/utils/interface/ICompagny'
import type { IJob, IJobResponse, IJobOffers } from '@/utils/interface/IJobOffers'
import {
  MapPinIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  BriefcaseIcon,
} from '@heroicons/vue/24/outline'
// @ts-ignore
import Navbar from '@/components/navbar/NavBarComponent.vue'
// @ts-ignore
import Footer from '@/components/footer/FooterComponent.vue'
import PageHero from '@/components/shared/PageHero.vue'
// @ts-ignore
import OffreCard from '@/components/cards/OffreCard.vue'
import Pagination from '@/components/shared/Pagination.vue'

const { t } = useI18n()
const route = useRoute()
const companyService = useCompanyService()
const jobService = useJobService()

const company = ref<ICompany | null>(null)
const jobs = ref<IJob[]>([])
const loading = ref(true)
const loadingJobs = ref(true)
const paginationLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)
const pageSize = 12

const getCompanyLogo = (company: ICompany): string => {
  if (company?.webSiteUrl) {
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
  const letter = company?.name?.charAt(0).toUpperCase() || 'C'
  return `https://ui-avatars.com/api/?name=${letter}&background=10b981&color=fff&size=128&font-size=0.5`
}

const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return t('common.salaryNegotiable')
  if (!min) return t('common.salaryUpTo', { max: max?.toLocaleString() })
  if (!max) return t('common.salaryFrom', { min: min?.toLocaleString() })
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`
}

const formatJobType = (jobType: string | undefined): string => {
  const types: { [key: string]: string } = {
    FULL_TIME: t('hero.jobTypeFullTime'),
    PART_TIME: t('hero.jobTypePartTime'),
    CONTRACT: t('hero.jobTypeContract'),
    FREELANCE: t('hero.jobTypeContract'),
    INTERNSHIP: t('hero.jobTypeInternship'),
  }
  return types[jobType || ''] || jobType || t('common.notSpecified')
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return t('jobDetail.dateUnknown')
  try {
    const date = new Date(dateString.replace(' ', 'T'))
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return t('jobDetail.today')
    if (diffDays === 2) return t('jobDetail.yesterday')
    if (diffDays < 7) return t('jobDetail.daysAgo', { count: diffDays })
    if (diffDays < 30) return t('jobDetail.weeksAgo', { count: Math.floor(diffDays / 7) })
    return t('jobDetail.monthsAgo', { count: Math.floor(diffDays / 30) })
  } catch {
    return t('jobDetail.dateUnknown')
  }
}

const formatOffreForCard = (job: IJob): any => {
  return {
    id: job.id,
    titre: job.title || t('common.notSpecified'),
    entreprise: company.value?.name || t('jobDetail.companyPrefix', { id: job.companyId }),
    localisation: job.location || t('common.notSpecified'),
    typeContrat: formatJobType(job.jobType),
    salaire: formatSalary(job.salaryMin, job.salaryMax),
    competences: [],
    datePublication: formatDate(job.createdAt),
    urgent: false,
    remote: job.location ? job.location.toLowerCase().includes('remote') : false,
    featured: false,
    description: job.description || '',
    experienceLevel: job.experienceLevel || '',
    sector: job.sector || '',
    companyInfo: company.value
      ? {
          id: company.value.id,
          name: company.value.name,
          location: company.value.location || job.location || '',
          webSiteUrl: company.value.webSiteUrl || '',
        }
      : {
          id: job.companyId,
          name: `Entreprise #${job.companyId}`,
          location: job.location || '',
          webSiteUrl: '',
        },
  }
}

const formattedJobs = computed(() => {
  return jobs.value.map((job: IJob) => formatOffreForCard(job))
})

const loadJobs = async (page = 0) => {
  if (!company.value) return

  try {
    if (page === currentPage.value && jobs.value.length === 0) {
      loadingJobs.value = true
    } else {
      paginationLoading.value = true
    }

    const response: IJobResponse = await jobService.getJobsByCompany(
      company.value.id,
      page,
      pageSize,
    )

    if (response && Array.isArray(response.content)) {
      jobs.value = response.content
      currentPage.value = response.number ?? page
      totalPages.value = response.totalPages ?? 1
      totalElements.value = response.totalElements ?? jobs.value.length
    } else {
      jobs.value = []
      currentPage.value = 0
      totalPages.value = 0
      totalElements.value = 0
    }
  } catch (error) {
    console.error('Erreur lors du chargement des offres:', error)
    jobs.value = []
  } finally {
    loadingJobs.value = false
    paginationLoading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 0 || page >= totalPages.value) return
  currentPage.value = page
  loadJobs(page)
}

onMounted(async () => {
  const companyId = parseInt(route.params.id as string)
  if (isNaN(companyId)) {
    error.value = t('companyDetails.invalidCompanyId')
    loading.value = false
    return
  }

  try {
    // Charger les informations de l'entreprise
    company.value = await companyService.getCompanyById(companyId)
    loading.value = false

    // Charger les offres d'emploi
    await loadJobs(0)
  } catch (err) {
    console.error("Erreur lors du chargement de l'entreprise", err)
    error.value = t('companyDetails.loadError')
    loading.value = false
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Shimmer Effect */
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
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
</style>
