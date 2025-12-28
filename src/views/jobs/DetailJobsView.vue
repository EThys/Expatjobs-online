<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  if (!min && !max) return 'Salaire à négocier'
  if (!min) return `Jusqu'à ${max?.toLocaleString()} €`
  if (!max) return `À partir de ${min?.toLocaleString()} €`
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`
}

const formatJobType = (jobType: string): string => {
  const types: { [key: string]: string } = {
    'FULL_TIME': 'CDI',
    'PART_TIME': 'Temps partiel',
    'CONTRACT': 'CDD',
    'FREELANCE': 'Freelance',
    'INTERNSHIP': 'Stage',
    'HYBRID': 'Hybride'
  }
  return types[jobType] || jobType || 'Non spécifié'
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date inconnue'
  
  try {
    const normalizedDateString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T')
    const date = new Date(normalizedDateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    
    if (diffDays === 0) return 'Aujourd\'hui'
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    if (diffWeeks === 1) return 'Il y a 1 semaine'
    if (diffWeeks < 4) return `Il y a ${diffWeeks} semaines`
    if (diffMonths === 1) return 'Il y a 1 mois'
    if (diffMonths < 12) return `Il y a ${diffMonths} mois`
    
    return `Il y a ${Math.floor(diffMonths / 12)} an${Math.floor(diffMonths / 12) > 1 ? 's' : ''}`
  } catch (error) {
    console.warn('Erreur de formatage de date:', dateString, error)
    return 'Date inconnue'
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
        name: `Entreprise #${jobData.companyId}`,
        location: jobData.location || 'Non spécifié',
        webSiteUrl: null,
        logoUrl: null
      }
    }
    job.value = {
      id: jobData.id,
      title: jobData.title,
      company: companyData.name,
      companyId: companyData.id,
      location: jobData.location || 'Non spécifié',
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
    error.value = err.response?.data?.message || 'Erreur lors du chargement de l\'offre'
  } finally {
    loading.value = false
  }
}

const generateRequirements = (jobData: IJob): string => {
  const requirements = []
  
  if (jobData.experienceLevel) {
    requirements.push(`Niveau d'expérience: ${jobData.experienceLevel}`)
  }
  
  if (jobData.sector) {
    requirements.push(`Secteur: ${jobData.sector}`)
  }
  requirements.push(
    'Capacité à travailler en équipe et excellentes compétences en communication',
    'Autonomie et sens des responsabilités',
    'Esprit d\'analyse et résolution de problèmes'
  )
  
  return `
    <p>Profil recherché :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      ${requirements.map(req => `<li>${req}</li>`).join('')}
    </ul>
  `
}

const generateBenefits = (jobData: IJob): string => {
  const benefits = [
    'Environnement de travail dynamique et innovant',
    'Possibilités d\'évolution de carrière',
    'Formation continue et développement des compétences',
    'Package salarial compétitif'
  ]
  
  if (jobData.location?.toLowerCase().includes('remote')) {
    benefits.push('Télétravail partiel ou total possible')
  }
  
  return `
    <p>Avantages :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
    </ul>
  `
}

// Générateur de SVG pour logo
const generateSVGLogo = (letter: string, color: string): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="#${color}" rx="8"/>
      <text x="20" y="27" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">
        ${letter}
      </text>
    </svg>
  `.trim();
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const getCompanyLogoForSimilarJob = (companyName: string, companyId: number): string => {
    const firstLetter = companyName ? companyName.charAt(0).toUpperCase() : '?';
    const colors = ['3b82f6', 'ef4444', '10b981', 'f59e0b', '8b5cf6', 'ec4899', 'f97316'];
    const color = colors[Math.abs(companyId) % colors.length] || '6b7280';
    return generateSVGLogo(firstLetter, color);
};

const fetchSimilarJobs = async () => {
  try {
    const response = await jobService.getAllJobs(0, 3)
    
    if (response && Array.isArray(response.content)) {
      similarJobs.value = response.content
        .filter(similarJob => similarJob.id !== jobId.value) 
        .slice(0, 3) 
        .map(similarJob => {
            const companyName = `Entreprise #${similarJob.companyId}`;
            return {
              id: similarJob.id,
              title: similarJob.title,
              company: companyName,
              location: similarJob.location,
              salary: formatSalary(similarJob.salaryMin, similarJob.salaryMax),
              type: similarJob.jobType?.toLowerCase() || 'full-time',
              logo: getCompanyLogoForSimilarJob(companyName, similarJob.companyId)
            };
        })
    }
  } catch (err) {
    console.warn('Erreur lors du chargement des offres similaires:', err)
    similarJobs.value = []
  }
}

const goBack = () => {
  router.back()
}

const goToJob = (jobId: number) => {
  router.push(`/detail/jobs/${jobId}`)
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
    alert('Lien copié dans le presse-papier !')
  }
}

onMounted(() => {
  if (jobId.value) {
    fetchJobDetails()
  } else {
    error.value = 'ID d\'offre non valide'
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
          <span class="font-medium">Retour aux offres</span>
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
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-800 mb-2">Erreur</h3>
        <p class="text-red-600">{{ error }}</p>
        <button @click="fetchJobDetails" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Réessayer
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
              <h3 class="text-sm font-medium text-gray-500 mb-2">COMPÉTENCES REQUISES</h3>
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
                Postuler maintenant
                <ArrowLongRightIcon class="h-5 w-5 ml-2" />
              </a>
              <a
                v-if="job.website && job.website !== '#'"
                :href="job.website"
                target="_blank"
                class="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <LinkIcon class="h-5 w-5 mr-2" />
                Site de l'entreprise
              </a>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Description du poste</h2>
            <div class="prose text-gray-700" v-html="job.description"></div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6" v-if="job.requirements">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Exigences</h2>
            <div class="prose text-gray-700" v-html="job.requirements"></div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 mb-6" v-if="job.benefits">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Avantages</h2>
            <div class="prose text-gray-700" v-html="job.benefits"></div>
          </div>

          <div id="apply" class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Postuler à cette offre</h2>
            <form class="space-y-6">
              <!-- ... ( formulaire de candidature ) ... -->
            </form>
          </div>
        </div>

        <div class="lg:w-1/3">
          <div v-if="job.recruiter" class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Votre recruteur</h3>
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
            <h3 class="text-lg font-medium text-gray-900 mb-4">Statistiques de l'offre</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Date de publication</span>
                <span class="text-sm font-medium text-gray-900">{{ job.postedDate }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Type de contrat</span>
                <span class="text-sm font-medium text-gray-900">{{ job.typeLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Localisation</span>
                <span class="text-sm font-medium text-gray-900">{{ job.location }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Salaire</span>
                <span class="text-sm font-medium text-gray-900">{{ job.salary }}</span>
              </div>
              <div v-if="job.applicationCount" class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Candidatures</span>
                <span class="text-sm font-medium text-gray-900">{{ job.applicationCount }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6" v-if="similarJobs.length > 0">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Offres similaires</h3>
            <div class="space-y-4">
              <a
                v-for="similarJob in similarJobs"
                :key="similarJob.id"
                @click.prevent="goToJob(similarJob.id)"
                href="#"
                class="block p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div class="flex items-start space-x-3">
                  <img
                    :src="similarJob.logo"
                    :alt="similarJob.company"
                    class="w-10 h-10 object-contain rounded"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900">{{ similarJob.title }}</h4>
                    <p class="text-sm text-gray-500">{{ similarJob.company }}</p>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                      <MapPinIcon class="h-3.5 w-3.5 mr-1" />
                      <span>{{ similarJob.location }}</span>
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <span
                      class="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800"
                    >
                      {{ similarJob.salary }}
                    </span>
                  </div>
                </div>
              </a>
              <router-link
                to="/jobs"
                class="block text-center text-green-600 hover:text-green-700 font-medium py-2"
              >
                Voir plus d'offres
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