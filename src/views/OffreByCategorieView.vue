<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
    <NavBarComponent />

    <main class="flex-grow pt-24 pb-20 relative">
      <!-- Decorative Background Elements -->
      <div
        class="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-emerald-500/5 to-teal-500/5 -skew-y-3 z-0 pointer-events-none"
      ></div>
      <div
        class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"
      ></div>
      <div
        class="absolute top-40 -left-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"
      ></div>

      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header & Search -->
        <div class="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1
            class="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
          >
            {{ t('categoryView.title1') }} <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"
              >{{ t('categoryView.title2') }}</span
            >
          </h1>
          <p class="text-lg text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
            {{ t('categoryView.subtitle') }}
          </p>

          <!-- Search Bar -->
          <div
            class="bg-white p-2 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto transition-all hover:shadow-[0_30px_80px_-20px_rgba(16,185,129,0.15)] ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-emerald-500/50"
          >
            <div class="flex-1 flex items-center px-4 h-12 md:h-14">
              <MagnifyingGlassIcon class="w-6 h-6 text-emerald-500 mr-3" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('categoryView.searchPlaceholder')"
                class="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 font-medium h-full outline-none"
                @keyup.enter="performSearch"
              />
            </div>
            <div class="w-px h-8 bg-gray-200 hidden md:block self-center"></div>
            <div class="flex-1 flex items-center px-4 h-12 md:h-14">
              <MapPinIcon class="w-6 h-6 text-emerald-500 mr-3" />
              <input
                v-model="locationQuery"
                type="text"
                :placeholder="t('categoryView.locationPlaceholder')"
                class="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 font-medium h-full outline-none"
                @keyup.enter="performSearch"
              />
            </div>
            <button
              @click="performSearch"
              class="h-12 md:h-14 px-8 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors duration-300 md:ml-2 shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2"
            >
              <span v-if="loading && !paginationLoading">...</span>
              <span v-else>{{ t('categoryView.searchButton') }}</span>
              <ArrowLongRightIcon v-if="!loading" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Categories / Filters (Pills) -->
        <div class="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div class="flex justify-center md:flex-wrap gap-3 min-w-max md:min-w-0 px-4">
            <button
              @click="clearAllFilters"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-300',
                !selectedCategory
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105'
                  : 'bg-white text-slate-500 border-gray-200 hover:border-emerald-200 hover:text-emerald-600',
              ]"
            >
              {{ t('categoryView.all') }}
            </button>
            <button
              v-for="cat in jobCategories"
              :key="cat.id"
              @click="filterByCategory(cat.id)"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 flex items-center gap-2',
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30 transform scale-105'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50',
              ]"
            >
              <component
                :is="cat.icon"
                class="w-4 h-4"
                :class="selectedCategory === cat.id ? 'text-white' : 'text-slate-400'"
              />
              {{ cat.name.toUpperCase() }}
            </button>
          </div>
        </div>

        <!-- Results Info -->
        <div
          class="flex items-center justify-between mb-8 px-2 animate-fade-in"
          v-if="!loading || paginationLoading"
        >
          <h2 class="text-xl font-bold text-slate-800">
            <span v-if="loading">{{ t('categoryView.searching') }}</span>
            <span v-else>
              {{ totalElements }} {{ t('categoryView.offer', totalElements) }}
              <span class="text-slate-400 font-normal"
                >{{ t('categoryView.available', totalElements) }}</span
              >
            </span>
          </h2>
        </div>

        <!-- Jobs Grid -->
        <div
          v-if="loading && !paginationLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 9"
            :key="i"
            class="h-64 bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse"
          ></div>
        </div>

        <div
          v-else-if="displayedJobs.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-100"
        >
          <div
            v-for="job in displayedJobs"
            :key="job.id"
            class="group bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            <!-- Accent line -->
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-100 via-emerald-400 to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            ></div>

            <div class="flex justify-between items-start mb-6">
              <div
                class="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 group-hover:bg-white transition-colors"
              >
                <img
                  :src="job.logo"
                  :alt="job.companyData?.name || job.company?.name || ''"
                  class="w-full h-full object-contain mix-blend-multiply"
                  @error="handleImageError($event, job.companyData)"
                />
              </div>
              <span
                class="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                {{ job.typeLabel }}
              </span>
            </div>

            <div class="mb-4">
              <h3
                class="text-lg font-bold text-slate-900 leading-snug mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2"
              >
                {{ job.title }}
              </h3>
              <p class="text-sm text-slate-500 font-medium">{{ job.companyName }}</p>
            </div>

            <div class="flex flex-wrap gap-2 mb-6 mt-auto pt-4">
              <span
                class="inline-flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md"
              >
                <MapPinIcon class="w-3 h-3 mr-1 text-emerald-500" />
                {{ job.location }}
              </span>
              <span
                v-if="job.salary"
                class="inline-flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md"
              >
                <CurrencyEuroIcon class="w-3 h-3 mr-1 text-emerald-500" />
                {{ job.salary }}
              </span>
            </div>

            <div
              class="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center group/btn"
            >
              <span class="text-xs font-medium text-slate-400"
                >{{ t('categoryView.publishedOn') }} {{ formatDate(job.createdAt) }}</span
              >
              <router-link
                :to="`/detail/jobs/${job.id}`"
                class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover/btn:bg-emerald-500 transition-colors"
              >
                <ArrowUpRightIcon class="w-5 h-5" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-32 animate-fade-in">
          <div
            class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <InboxIcon class="w-10 h-10 text-gray-300" />
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ t('categoryView.noResults') }}</h3>
          <p class="text-slate-500">{{ t('categoryView.tryBroader') }}</p>
          <button @click="clearAllFilters" class="mt-8 text-emerald-600 font-bold hover:underline">
            {{ t('categoryView.resetSearch') }}
          </button>
        </div>

        <!-- Pagination -->
        <div class="mt-16 flex justify-center" v-if="!loading && totalPages > 1">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="paginationLoading"
            @change="changePage"
          />
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavBarComponent from '@/components/navbar/NavBarComponent.vue'
import Pagination from '@/components/shared/Pagination.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import { useJobStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'
import type { IJobOffers } from '@/utils/interface/IJobOffers'
import type { ICompany } from '@/utils/interface/ICompagny'

import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowLongRightIcon,
  ArrowUpRightIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  CurrencyEuroIcon,
  InboxIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const jobStore = useJobStore()
const { t } = useI18n()

const { jobs, loading, totalPages, totalElements, currentPage: storePage } = storeToRefs(jobStore)

const paginationLoading = ref(false)
const selectedCategory = ref<string>('')
const searchQuery = ref('')
const locationQuery = ref('')

const currentPage = computed({
  get: () => storePage.value,
  set: (val) => {
    /* handled by actions */
  },
})

const itemsPerPage = 9

// Categories - Only static definitions for UI, NO counts
const jobCategories = [
  { id: 'development', name: 'Tech & Dev', icon: CodeBracketIcon, sectors: ['IT'] },
  {
    id: 'business',
    name: 'Business',
    icon: BriefcaseIcon,
    sectors: ['SALES', 'CONSULTING', 'BUSINESS'],
  },
  { id: 'finance', name: 'Finance', icon: BanknotesIcon, sectors: ['FINANCE', 'ACCOUNTING'] },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: GlobeAltIcon,
    sectors: ['MARKETING', 'COMMUNICATION'],
  },
  { id: 'design', name: 'Design', icon: ComputerDesktopIcon, sectors: ['DESIGN', 'CREATIVE'] },
  { id: 'health', name: 'Santé', icon: BeakerIcon, sectors: ['HEALTH', 'MEDICAL'] },
]

// Utilities
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Récemment'
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getCompanyLogo = (company?: ICompany): string => {
  return getFallbackLogo(company)
}

const getFallbackLogo = (company?: ICompany): string => {
  const companyName = company?.name || 'Company'
  const letter = companyName.charAt(0).toUpperCase()
  
  const colors = [
    { bg: '#10b981', text: '#ffffff' },
    { bg: '#3b82f6', text: '#ffffff' },
    { bg: '#8b5cf6', text: '#ffffff' },
    { bg: '#f59e0b', text: '#ffffff' },
    { bg: '#ef4444', text: '#ffffff' },
    { bg: '#06b6d4', text: '#ffffff' },
  ]
  
  const colorIndex = companyName.charCodeAt(0) % colors.length
  const color = colors[colorIndex]
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
      <rect width="128" height="128" fill="${color.bg}" rx="16"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="64" font-weight="600" fill="${color.text}">
        ${letter}
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const handleImageError = (event: Event, company?: ICompany) => {
  const target = event.target as HTMLImageElement
  if (!target.dataset.fallback) {
    target.dataset.fallback = 'true'
    target.src = getFallbackLogo(company)
  }
}

// Formatting
const formatJobForDisplay = (job: IJobOffers) => {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} €`
    if (min) return `${min.toLocaleString()} €+`
    return `${max?.toLocaleString()} €`
  }

  return {
    ...job,
    companyData: job.company,
    companyName: job.company?.name || `Entreprise #${job.companyId}`,
    location: job.company?.location || job.location || 'Non spécifié',
    logo: getCompanyLogo(job.company),
    typeLabel:
      job.jobType === 'FULL_TIME' ? 'CDI' : job.jobType === 'CONTRACT' ? 'CDD' : job.jobType,
    salary: formatSalary(job.salaryMin, job.salaryMax),
  }
}

const displayedJobs = computed(() => jobs.value.map(formatJobForDisplay))

// Actions
const performSearch = () => {
  fetchJobs(0)
}

const filterByCategory = (id: string) => {
  if (selectedCategory.value === id) selectedCategory.value = ''
  else selectedCategory.value = id
  fetchJobs(0)
}

const clearAllFilters = () => {
  searchQuery.value = ''
  locationQuery.value = ''
  selectedCategory.value = ''
  fetchJobs(0)
}

const changePage = (page: number) => {
  fetchJobs(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const fetchJobs = async (page = 0) => {
  if (page > 0) paginationLoading.value = true

  let sector: string | undefined
  if (selectedCategory.value) {
    const cat = jobCategories.find((c) => c.id === selectedCategory.value)
    sector = cat?.sectors?.[0] // Taking primary sector
  }

  await jobStore.searchJobs(
    {
      title: searchQuery.value || undefined,
      location: locationQuery.value || undefined,
      sector,
      status: 'PUBLISHED',
    },
    page,
    itemsPerPage,
  )

  paginationLoading.value = false
}

onMounted(() => {
  // Check URL params if needed for deep linking
  if (route.query.category) {
    const cat = route.query.category as string
    if (jobCategories.find((c) => c.id === cat)) {
      selectedCategory.value = cat
    }
  }
  fetchJobs(0)
})

watch(
  () => route.query.category,
  (newCategory) => {
    if (typeof newCategory === 'string' && jobCategories.find((c) => c.id === newCategory)) {
      selectedCategory.value = newCategory
      fetchJobs(0)
    }
  },
)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
