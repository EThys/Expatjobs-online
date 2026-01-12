<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useJobService } from '@/utils/service/jobService'
import { useCompanyService } from '@/utils/service/CompagnyService'
// @ts-ignore
import type { IJob, IJobResponse } from '@/utils/interface/IJobOffers'
import type { ICompany } from '@/utils/interface/ICompagny'

const { t } = useI18n()
const jobService = useJobService()
const companyService = useCompanyService()

const featuredJobs = ref<any[]>([])
const loading = ref(false)
const companyCache = new Map<number, any>()

// Cache pour les logos fallback générés
const fallbackLogoCache = new Map<string, string>()

// Générateur de SVG pour fallback logo
const generateSVGLogo = (letter: string, color: string): string => {
  const cacheKey = `${letter}-${color}`

  if (fallbackLogoCache.has(cacheKey)) {
    return fallbackLogoCache.get(cacheKey)!
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#${color}" rx="8"/>
      <text x="30" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">
        ${letter}
      </text>
    </svg>
  `.trim()

  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`
  fallbackLogoCache.set(cacheKey, dataUrl)
  return dataUrl
}

const getFallbackLogo = (company: ICompany): string => {
  if (!company || !company.name) {
    return generateSVGLogo('?', '6b7280')
  }

  const firstLetter = company.name.charAt(0).toUpperCase()
  const colors = ['10b981', '3b82f6', 'f59e0b', 'ef4444', '8b5cf6', '06b6d4', 'f97316']
  const color = colors[Math.abs(company.id || 0) % colors.length] || '6b7280'

  return generateSVGLogo(firstLetter, color)
}

const getCompanyLogo = (company: ICompany): string => {
  if (!company) return getFallbackLogo(company)

  if (company.webSiteUrl) {
    try {
      const fullUrl = company.webSiteUrl.startsWith('http')
        ? company.webSiteUrl
        : `https://${company.webSiteUrl}`
      const domain = new URL(fullUrl).hostname.replace('www.', '')
      return `https://logo.clearbit.com/${domain}?size=120&format=png`
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

const formatJobType = (jobType: string): string => {
  const types: { [key: string]: string } = {
    FULL_TIME: t('hero.featuredJobs.fullTime', 'Temps plein'),
    PART_TIME: t('hero.featuredJobs.partTime', 'Temps partiel'),
    CONTRACT: t('hero.featuredJobs.contract', 'Contrat'),
    FREELANCE: t('hero.featuredJobs.contract', 'Freelance'),
    INTERNSHIP: t('hero.featuredJobs.internship', 'Stage'),
    HYBRID: t('hero.jobTypeRemote', 'Hybride'),
    REMOTE: t('hero.featuredJobs.remote', 'Télétravail'),
  }
  return types[jobType] || jobType || t('common.notSpecified', 'Non spécifié')
}

const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return t('common.salaryNegotiable', 'Négociable')
  if (!min) {
    const maxFormatted = max?.toLocaleString() || '0'
    return t('common.salaryUpTo').replace('{max}', maxFormatted)
  }
  if (!max) {
    const minFormatted = min?.toLocaleString() || '0'
    return t('common.salaryFrom').replace('{min}', minFormatted)
  }
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`
}

const formatJobForDisplay = (job: any) => {
  return {
    title: job.title || t('common.notSpecified', 'Titre non spécifié'),
    company: job.company?.name || `${t('common.company', 'Entreprise')} #${job.companyId}`,
    companyData: job.company,
    location: job.location || t('common.notSpecified', 'Non spécifié'),
    salary: formatSalary(job.salaryMin, job.salaryMax),
    type: job.jobType?.toLowerCase() || 'full-time',
    typeLabel: formatJobType(job.jobType),
    excerpt: job.description
      ? job.description.substring(0, 100) + '...'
      : t('common.noDescription', 'Description non disponible'),
    skills:
      job.skills?.map((skill: any) => skill.skillName) ||
      [job.sector, job.experienceLevel].filter(Boolean),
    logo: job.companyLogo || getFallbackLogo(job.company || ({} as ICompany)),
    id: job.id,
    remote: job.location?.toLowerCase().includes('remote') || false,
    webSiteUrl: job.company?.webSiteUrl || '',
    sector: job.sector,
  }
}

const enrichJobsWithCompanyData = async (jobs: IJob[]): Promise<any[]> => {
  try {
    const enrichedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (companyCache.has(job.companyId)) {
          const cachedCompany = companyCache.get(job.companyId)
          return {
            ...job,
            company: cachedCompany,
            companyLogo: getCompanyLogo(cachedCompany),
          }
        }

        try {
          const company = await companyService.getCompanyById(job.companyId)
          const companyData: ICompany = {
            id: company.id,
            name: company.name,
            location: company.location,
            webSiteUrl: company.webSiteUrl,
            description: company.description,
            userId: 0,
          }

          companyCache.set(job.companyId, companyData)
          return {
            ...job,
            company: companyData,
            companyLogo: getCompanyLogo(companyData),
          }
        } catch (error) {
          console.warn(`Impossible de récupérer l'entreprise pour l'offre ${job.id}:`, error)
          const fallbackCompany: ICompany = {
            id: job.companyId,
            name: `Entreprise #${job.companyId}`,
            location: 'Non spécifié',
            webSiteUrl: '',
            userId: 0,
            description: '',
          }

          companyCache.set(job.companyId, fallbackCompany)
          return {
            ...job,
            company: fallbackCompany,
            companyLogo: getFallbackLogo(fallbackCompany),
          }
        }
      }),
    )
    return enrichedJobs
  } catch (error) {
    console.error("Erreur lors de l'enrichissement des offres:", error)
    return jobs.map((job) => ({
      ...job,
      companyLogo: getFallbackLogo({} as ICompany),
    }))
  }
}

const fetchFeaturedJobs = async () => {
  try {
    loading.value = true
    const response: IJobResponse = await jobService.getAllJobs(0, 6)

    if (response && Array.isArray(response.content)) {
      const enrichedJobs = await enrichJobsWithCompanyData(response.content)
      featuredJobs.value = enrichedJobs.map(formatJobForDisplay)
    } else {
      featuredJobs.value = []
    }
  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des offres:', error)
    featuredJobs.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFeaturedJobs()
})
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 jobs-section">
    <div class="section-header text-left mb-8">
      <h2 class="section-title text-3xl font-bold text-gray-900 mb-2">
        {{ t('hero.featuredJobs.title') }}
      </h2>
      <p class="section-subtitle text-gray-500">{{ t('hero.featuredJobs.subtitle') }}</p>
      <router-link
        to="/jobs"
        class="view-all inline-flex items-center text-emerald-600 font-semibold mt-2 hover:text-emerald-700"
      >
        {{ t('hero.featuredJobs.viewAll') }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="n in 6"
        :key="n"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
      >
        <div class="h-12 w-12 bg-gray-100 rounded-xl mb-4"></div>
        <div class="h-6 w-3/4 bg-gray-100 rounded mb-2"></div>
        <div class="h-4 w-1/2 bg-gray-100 rounded mb-6"></div>
      </div>
    </div>

    <!-- Loaded Jobs -->
    <div
      v-else-if="featuredJobs.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="job in featuredJobs"
        :key="job.id"
        class="job-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500 transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1"
      >
        <div class="card-header flex items-start justify-between mb-4">
          <div class="company-logo relative">
            <div
              class="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center p-1 border border-gray-100 group-hover:border-emerald-200 transition-colors"
            >
              <img
                :src="job.logo"
                :alt="`Logo ${job.company}`"
                class="w-full h-full object-contain rounded-lg"
                loading="lazy"
                @error="(e) => handleImageError(e, job.companyData || {})"
              />
            </div>
          </div>
          <div class="job-meta flex flex-col items-end gap-2">
            <span
              class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold"
              >{{ job.typeLabel }}</span
            >
            <span class="text-emerald-600 font-bold text-sm">{{ job.salary }}</span>
          </div>
        </div>

        <div class="card-body flex-grow">
          <h3
            class="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors"
          >
            {{ job.title }}
          </h3>
          <div class="company-info flex items-center gap-2 mb-4 text-sm text-gray-500">
            <span class="font-medium">{{ job.company }}</span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ job.location }}
            </span>
          </div>
          <p class="text-gray-500 text-sm mb-6 line-clamp-2">{{ job.excerpt }}</p>
        </div>

        <div class="card-footer pt-4 border-t border-gray-50 flex items-center justify-between">
          <div class="skills flex gap-2">
            <span
              v-for="(skill, i) in job.skills.slice(0, 2)"
              :key="i"
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >{{ skill }}</span
            >
          </div>
          <router-link
            :to="`/detail/jobs/${job.id}`"
            class="text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
          >
            {{ t('hero.featuredJobs.apply') }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ t('hero.featuredJobs.noJobsAvailable') }}
      </h3>
      <p class="text-gray-500 max-w-sm mx-auto">{{ t('hero.featuredJobs.noJobsDescription') }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles mainly handled by Tailwind classes in template */
</style>
