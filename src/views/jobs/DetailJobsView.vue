<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  LinkIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ArrowLongRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/vue/24/outline'

//@ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../../components/footer/FooterComponent.vue'

// Importez vos services
//@ts-ignore
import { useJobService } from '@/utils/service/jobService'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
//@ts-ignore
import type { IJob } from '@/utils/interface/IJobOffers'

// Services et router
const { t } = useI18n()
const jobService = useJobService()
const companyService = useCompanyService()
const route = useRoute()
const router = useRouter()


const job = ref<any>(null)
const similarJobs = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const jobId = computed(() => parseInt(route.params.id as string))


const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return t('jobDetail.salaryNegotiable')
  if (!min) return t('jobDetail.salaryUpTo', { max: max?.toLocaleString() })
  if (!max) return t('jobDetail.salaryFrom', { min: min?.toLocaleString() })
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`
}

const formatJobType = (jobType: string): string => {
  const types: { [key: string]: string } = {
    'FULL_TIME': t('jobDetail.jobTypeFullTime'),
    'PART_TIME': t('jobDetail.jobTypePartTime'),
    'CONTRACT': t('jobDetail.jobTypeContract'),
    'FREELANCE': t('jobDetail.jobTypeFreelance'),
    'INTERNSHIP': t('jobDetail.jobTypeInternship'),
    'HYBRID': t('jobDetail.jobTypeHybrid')
  }
  return types[jobType] || jobType || t('common.notSpecified')
}

const formatDate = (dateString: string): string => {
  if (!dateString) return t('jobDetail.dateUnknown')
  
  try {
    const normalizedDateString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T')
    const date = new Date(normalizedDateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    
    if (diffDays === 0) return t('jobDetail.today')
    if (diffDays === 1) return t('jobDetail.yesterday')
    if (diffDays < 7) return t('jobDetail.daysAgo', { count: diffDays })
    if (diffWeeks === 1) return t('jobDetail.oneWeekAgo')
    if (diffWeeks < 4) return t('jobDetail.weeksAgo', { count: diffWeeks })
    if (diffMonths === 1) return t('jobDetail.oneMonthAgo')
    if (diffMonths < 12) return t('jobDetail.monthsAgo', { count: diffMonths })
    
    const years = Math.floor(diffMonths / 12)
    return t('jobDetail.yearsAgo', { count: years })
  } catch (error) {
    console.warn('Erreur de formatage de date:', dateString, error)
    return t('jobDetail.dateUnknown')
  }
}

const fetchJobDetails = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('📡 Fetching job details for ID:', jobId.value)

    const jobData: IJob = await jobService.getJobById(jobId.value)
    
    const skillsResponse = await jobService.getSkillsByJob(jobId.value)
    const skills = skillsResponse.content?.map((skill: any) => skill.skillName) || []

    let companyData: any = null
    try {
      companyData = await companyService.getCompanyById(jobData.companyId)
    } catch (companyError) {
      console.warn('Impossible de récupérer les données de l\'entreprise:', companyError)
      companyData = {
        id: jobData.companyId,
        name: t('jobDetail.companyPrefix', { id: jobData.companyId }),
        location: jobData.location || t('common.notSpecified'),
        webSiteUrl: null,
        logoUrl: null
      }
    }
    job.value = {
      id: jobData.id,
      title: jobData.title,
      company: companyData.name,
      companyId: companyData.id,
      location: jobData.location || t('common.notSpecified'),
      salary: formatSalary(jobData.salaryMin, jobData.salaryMax),
      type: jobData.jobType?.toLowerCase() || 'full-time',
      typeLabel: formatJobType(jobData.jobType),
      postedDate: formatDate(jobData.createdAt),
      description: jobData.description,
      requirements: null,
      benefits: null,
      skills: skills,
      logo: companyData.logoUrl || null, 
      website: companyData.webSiteUrl || null,
      experienceLevel: jobData.experienceLevel,
      sector: jobData.sector,
      recruiter: null,
      applicationCount: null 
    }

    console.log('✅ Job details loaded:', job.value)

    await fetchSimilarJobs()

  } catch (err: any) {
    console.error('❌ Error fetching job details:', err)
    error.value = err.response?.data?.message || t('jobDetail.loadError')
  } finally {
    loading.value = false
  }
}

const generateRequirements = (jobData: IJob): string => {
  const requirements = []
  
  if (jobData.experienceLevel) {
    requirements.push(t('jobDetail.experienceLevelLabel', { level: jobData.experienceLevel }))
  }
  
  if (jobData.sector) {
    requirements.push(t('jobDetail.sectorLabel', { sector: jobData.sector }))
  }
  requirements.push(
    t('jobDetail.requirementTeamwork'),
    t('jobDetail.requirementAutonomy'),
    t('jobDetail.requirementAnalysis')
  )
  
  return `
    <p>${t('jobDetail.profileSought')}</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      ${requirements.map(req => `<li>${req}</li>`).join('')}
    </ul>
  `
}

const generateBenefits = (jobData: IJob): string => {
  const benefits = [
    t('jobDetail.benefitDynamic'),
    t('jobDetail.benefitCareer'),
    t('jobDetail.benefitTraining'),
    t('jobDetail.benefitSalary')
  ]
  
  if (jobData.location?.toLowerCase().includes('remote')) {
    benefits.push(t('jobDetail.benefitRemote'))
  }
  
  return `
    <p>${t('jobDetail.benefitsTitle')}</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
    </ul>
  `
}

const fetchSimilarJobs = async () => {
  try {
    const response = await jobService.getAllJobs(0, 3)
    
    if (response && Array.isArray(response.content)) {
      similarJobs.value = response.content
        .filter(similarJob => similarJob.id !== jobId.value) 
        .slice(0, 3) 
        .map(similarJob => ({
          id: similarJob.id,
          title: similarJob.title,
          company: t('jobDetail.companyPrefix', { id: similarJob.companyId }),
          location: similarJob.location,
          salary: formatSalary(similarJob.salaryMin, similarJob.salaryMax),
          type: similarJob.jobType?.toLowerCase() || 'full-time',
          logo: 'https://via.placeholder.com/40'
        }))
    }
  } catch (err) {
    console.warn('Erreur lors du chargement des offres similaires:', err)
    similarJobs.value = []
  }
}

const goBack = () => {
  router.back()
}

const goToJob = async (newJobId: number) => {
  // Réinitialiser l'état avant la navigation
  loading.value = true
  job.value = null
  similarJobs.value = []
  error.value = null
  
  // Naviguer vers la nouvelle offre
  await router.push(`/detail/jobs/${newJobId}`)
  
  // Attendre que Vue Router mette à jour la route
  await nextTick()
  
  // Le watcher devrait se déclencher, mais on force aussi le rechargement pour être sûr
  // Vérifier que l'ID de la route correspond bien au nouvel ID
  const currentId = parseInt(route.params.id as string)
  if (currentId === newJobId) {
    await fetchJobDetails()
  }
}

const shareJob = () => {
  if (navigator.share) {
    navigator.share({
      title: job.value.title,
      text: job.value.description,
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert(t('jobDetail.linkCopied'))
  }
}

// Watcher pour détecter les changements d'ID dans l'URL
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      const id = parseInt(newId as string)
      if (!isNaN(id)) {
        fetchJobDetails()
      }
    }
  },
  { immediate: false }
)

onMounted(() => {
  if (jobId.value) {
    fetchJobDetails()
  } else {
    error.value = t('jobDetail.invalidJobId')
    loading.value = false
  }
})
</script>
<template>
  <Navbar/>
  <div class="job-details-page bg-gray-50 min-h-screen">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <button @click="goBack" class="flex items-center text-green-600 hover:text-green-700">
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          <span class="font-medium">{{ t('jobDetail.backToOffers') }}</span>
        </button>
        <div class="flex space-x-4" v-if="job">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <BookmarkIcon class="h-5 w-5 text-gray-500 hover:text-green-600" />
          </button>
          <button @click="shareJob" class="p-2 rounded-full hover:bg-gray-100">
            <ShareIcon class="h-5 w-5 text-gray-500 hover:text-green-600" />
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Loading State with Shimmer -->
      <div v-if="loading" class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content Shimmer -->
        <div class="lg:w-2/3 space-y-6">
          <!-- Job Header Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div class="w-16 h-16 bg-gray-200 rounded-lg shimmer"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-8 bg-gray-200 rounded shimmer w-3/4"></div>
                  <div class="h-5 bg-gray-200 rounded shimmer w-1/2"></div>
                </div>
              </div>
              <div class="h-6 bg-gray-200 rounded-full shimmer w-24"></div>
            </div>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="h-5 bg-gray-200 rounded shimmer w-32"></div>
              <div class="h-5 bg-gray-200 rounded shimmer w-32"></div>
              <div class="h-5 bg-gray-200 rounded shimmer w-32"></div>
              <div class="h-5 bg-gray-200 rounded shimmer w-32"></div>
            </div>
            <div class="mt-6 flex gap-2">
              <div class="h-8 bg-gray-200 rounded-full shimmer w-20"></div>
              <div class="h-8 bg-gray-200 rounded-full shimmer w-24"></div>
              <div class="h-8 bg-gray-200 rounded-full shimmer w-16"></div>
            </div>
            <div class="mt-8 flex gap-3">
              <div class="h-12 bg-gray-200 rounded-lg shimmer flex-1"></div>
              <div class="h-12 bg-gray-200 rounded-lg shimmer flex-1"></div>
            </div>
          </div>
          
          <!-- Description Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-48 mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded shimmer"></div>
              <div class="h-4 bg-gray-200 rounded shimmer"></div>
              <div class="h-4 bg-gray-200 rounded shimmer w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded shimmer"></div>
              <div class="h-4 bg-gray-200 rounded shimmer w-4/5"></div>
            </div>
          </div>
          
          <!-- Requirements Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-40 mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded shimmer"></div>
              <div class="h-4 bg-gray-200 rounded shimmer w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
          
          <!-- Apply Form Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-48 mb-6"></div>
            <div class="space-y-4">
              <div class="h-10 bg-gray-200 rounded shimmer"></div>
              <div class="h-10 bg-gray-200 rounded shimmer"></div>
              <div class="h-24 bg-gray-200 rounded shimmer"></div>
              <div class="h-12 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        </div>
        
        <!-- Sidebar Shimmer -->
        <div class="lg:w-1/3 space-y-6">
          <!-- Statistics Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-40 mb-4"></div>
            <div class="space-y-4">
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded shimmer w-24"></div>
                <div class="h-4 bg-gray-200 rounded shimmer w-20"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded shimmer w-24"></div>
                <div class="h-4 bg-gray-200 rounded shimmer w-20"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded shimmer w-24"></div>
                <div class="h-4 bg-gray-200 rounded shimmer w-20"></div>
              </div>
            </div>
          </div>
          
          <!-- Similar Jobs Shimmer -->
          <div class="bg-white rounded-xl shadow-sm p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-36 mb-4"></div>
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-start space-x-3">
                  <div class="w-10 h-10 bg-gray-200 rounded shimmer"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-5 bg-gray-200 rounded shimmer"></div>
                    <div class="h-4 bg-gray-200 rounded shimmer w-2/3"></div>
                    <div class="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                  </div>
                  <div class="h-6 bg-gray-200 rounded shimmer w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-800 mb-2">{{ t('jobDetail.error') }}</h3>
        <p class="text-red-600">{{ error }}</p>
        <button @click="fetchJobDetails" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          {{ t('jobDetail.retry') }}
        </button>
      </div>

      <!-- Contenu de l'offre -->
      <div v-else-if="job" class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div v-if="job.logo" class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div v-else class="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
                  <span class="text-green-700 font-semibold text-xl">
                    {{ job.company ? job.company[0] : '?' }}
                  </span>
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">{{ job.title }}</h1>
                  <div class="flex items-center mt-1">
                    <BuildingOfficeIcon class="h-4 w-4 text-gray-500 mr-1" />
                    <span class="text-gray-600">{{ job.company }}</span>
                  </div>
                </div>
              </div>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {{ job.typeLabel }}
              </span>
            </div>

            <!-- Job Meta -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center">
                <MapPinIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.location }}</span>
              </div>
              <div class="flex items-center">
                <CurrencyDollarIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.salary }}</span>
              </div>
              <div class="flex items-center">
                <BriefcaseIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.typeLabel }}</span>
              </div>
              <div class="flex items-center">
                <CalendarIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.postedDate }}</span>
              </div>
            </div>

            <!-- Skills -->
            <div class="mt-6" v-if="job.skills && job.skills.length > 0">
              <h3 class="text-sm font-medium text-gray-500 mb-2">{{ t('jobDetail.requiredSkills') }}</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(skill, index) in job.skills"
                  :key="index"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#apply"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors flex items-center justify-center"
              >
                {{ t('jobDetail.applyNow') }}
                <ArrowLongRightIcon class="h-5 w-5 ml-2" />
              </a>
              <a
                v-if="job.website && job.website !== '#'"
                :href="job.website"
                target="_blank"
                class="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <LinkIcon class="h-5 w-5 mr-2" />
                {{ t('jobDetail.companyWebsite') }}
              </a>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ t('jobDetail.jobDescription') }}</h2>
            <div class="prose text-gray-700" v-html="job.description"></div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6" v-if="job.requirements">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ t('jobDetail.requirements') }}</h2>
            <div class="prose text-gray-700" v-html="job.requirements"></div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6" v-if="job.benefits">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ t('jobDetail.benefits') }}</h2>
            <div class="prose text-gray-700" v-html="job.benefits"></div>
          </div>

          <div id="apply" class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('jobDetail.applyToOffer') }}</h2>
            <form class="space-y-6">
              <!-- ... ( formulaire de candidature ) ... -->
            </form>
          </div>
        </div>

        <div class="lg:w-1/3">
          <div v-if="job.recruiter" class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t('jobDetail.yourRecruiter') }}</h3>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 font-medium text-lg">
                    {{ job.recruiter.name.split(' ').map((n:any) => n[0]).join('') }}
                  </span>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ job.recruiter.name }}</h4>
                <p class="text-sm text-gray-500">{{ job.recruiter.position }}</p>
                <div class="mt-3 space-y-2">
                  <a :href="`mailto:${job.recruiter.email}`" class="flex items-center text-sm text-green-600 hover:text-green-700">
                    <EnvelopeIcon class="h-4 w-4 mr-2" />
                    {{ job.recruiter.email }}
                  </a>
                  <a :href="`tel:${job.recruiter.phone}`" class="flex items-center text-sm text-green-600 hover:text-green-700">
                    <PhoneIcon class="h-4 w-4 mr-2" />
                    {{ job.recruiter.phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t('jobDetail.offerStatistics') }}</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ t('jobDetail.publicationDate') }}</span>
                <span class="text-sm font-medium text-gray-900">{{ job.postedDate }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ t('jobDetail.contractType') }}</span>
                <span class="text-sm font-medium text-gray-900">{{ job.typeLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ t('jobDetail.location') }}</span>
                <span class="text-sm font-medium text-gray-900">{{ job.location }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ t('jobDetail.salary') }}</span>
                <span class="text-sm font-medium text-gray-900">{{ job.salary }}</span>
              </div>
              <div v-if="job.applicationCount" class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ t('jobDetail.applications') }}</span>
                <span class="text-sm font-medium text-gray-900">{{ job.applicationCount }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6" v-if="similarJobs.length > 0">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t('jobDetail.similarOffers') }}</h3>
            <div class="space-y-4">
              <div
                v-for="similarJob in similarJobs"
                :key="similarJob.id"
                @click="goToJob(similarJob.id)"
                class="block p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-green-200"
              >
                <div class="flex items-start space-x-3">
                  <div v-if="similarJob.logo" class="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img
                      :src="similarJob.logo"
                      :alt="similarJob.company"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div v-else class="w-10 h-10 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span class="text-green-700 font-semibold text-sm">
                      {{ similarJob.company ? similarJob.company[0] : '?' }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-gray-900 hover:text-green-600 transition-colors">{{ similarJob.title }}</h4>
                    <p class="text-sm text-gray-500 truncate">{{ similarJob.company }}</p>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                      <MapPinIcon class="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span class="truncate">{{ similarJob.location }}</span>
                    </div>
                  </div>
                  <div class="ml-auto text-right flex-shrink-0">
                    <span
                      class="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800"
                    >
                      {{ similarJob.salary }}
                    </span>
                  </div>
                </div>
              </div>
              <router-link
                to="/jobs"
                class="block text-center text-green-600 hover:text-green-700 font-medium py-2 transition-colors"
              >
                {{ t('jobDetail.viewMoreOffers') }}
                <ArrowLongRightIcon class="h-4 w-4 inline ml-1" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <Footer/>
</template>

<style scoped>
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
</style>