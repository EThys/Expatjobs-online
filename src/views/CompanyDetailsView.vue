<template>
  <div class="company-details min-h-screen bg-slate-50 pt-20">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-[60vh]">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-500 font-medium">Chargement des informations...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center h-[60vh]">
      <div class="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExclamationTriangleIcon class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h3>
        <p class="text-gray-500 mb-6">{{ error }}</p>
        <router-link to="/" class="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
          Retour à l'accueil
        </router-link>
      </div>
    </div>

    <div v-else-if="company" class="pb-20 animate-fade-in">
      <!-- Hero Header -->
      <div class="relative h-[300px] md:h-[400px] w-full bg-slate-900 overflow-hidden">
        <!-- Background Image/Gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"></div>
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <!-- Decorative Shapes -->
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32">
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="p-6 md:p-10">
            <div class="flex flex-col md:flex-row gap-8 items-start">
              
              <!-- Company Logo -->
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white p-2 shadow-lg border border-gray-100 flex-shrink-0 relative -mt-20 md:-mt-24 z-20">
                <div class="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    :src="getCompanyLogo(company)" 
                    :alt="company.name" 
                    class="w-full h-full object-contain"
                    @error="(e: any) => e.target.src = getFallbackLogo(company!)" 
                  />
                </div>
              </div>

              <!-- Company Info -->
              <div class="flex-grow pt-2 md:pt-0">
                <div class="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{{ company.name }}</h1>
                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1.5">
                        <MapPinIcon class="w-4 h-4 text-emerald-500" />
                        {{ company.location || 'Localisation non spécifiée' }}
                      </div>
                      <div class="flex items-center gap-1.5">
                        <GlobeAltIcon class="w-4 h-4 text-emerald-500" />
                        <a :href="company.webSiteUrl" target="_blank" class="hover:text-emerald-600 transition-colors">{{ getDomainFromUrl(company.webSiteUrl) || 'Site web' }}</a>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <CalendarIcon class="w-4 h-4 text-emerald-500" />
                        Membre depuis {{ formatDate(company.createdAt) }}
                      </div>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button class="px-5 py-2.5 bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-2">
                       <PlusIcon class="w-5 h-5" />
                       Suivre
                    </button>
                    <a :href="company.webSiteUrl" target="_blank" class="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                       Visiter le site
                       <ArrowTopRightOnSquareIcon class="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <!-- Tags / Highlights -->
                <div class="mt-6 flex flex-wrap gap-2">
                  <span v-for="tag in ['Tech', 'International', 'Innovation']" :key="tag" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium uppercase tracking-wider">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description & Stats Grid -->
            <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-gray-100 pt-10">
              
              <!-- Left Column: About -->
              <div class="lg:col-span-2">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <InformationCircleIcon class="w-6 h-6 text-emerald-500" />
                  À propos de {{ company.name }}
                </h2>
                <div class="prose prose-slate max-w-none text-gray-600 leading-relaxed">
                   <p>{{ company.description || "Aucune description fournie par l'entreprise pour le moment." }}</p>
                </div>

                <!-- Gallery (Mockup) -->
                <h3 class="text-lg font-bold text-gray-900 mt-10 mb-4">La vie chez {{ company.name }}</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="aspect-square rounded-xl bg-gray-100 overflow-hidden relative group cursor-pointer" v-for="i in 4" :key="i">
                     <img :src="`https://source.unsplash.com/random/400x400?office,work&sig=${i}`" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Office life" />
                     <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Stats & Contact -->
              <div class="space-y-6">
                <!-- Key Stats -->
                <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Chiffres clés</h3>
                  <div class="grid grid-cols-2 gap-4">
                     <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                       <span class="block text-2xl font-black text-emerald-600">{{ jobs.length }}</span>
                       <span class="text-xs text-gray-500 font-medium">Offres actives</span>
                     </div>
                     <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                       <span class="block text-2xl font-black text-blue-600">50+</span>
                       <span class="text-xs text-gray-500 font-medium">Employés</span>
                     </div>
                     <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center col-span-2">
                       <span class="block text-2xl font-black text-purple-600">4.5/5</span>
                       <span class="text-xs text-gray-500 font-medium whitespace-nowrap">Satisfaction employés</span>
                     </div>
                  </div>
                </div>

                <!-- Contact Info -->
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                   <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
                   <ul class="space-y-3">
                     <li class="flex items-center text-sm text-gray-600 gap-3">
                       <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                         <GlobeAltIcon class="w-4 h-4" />
                       </div>
                       {{ company.webSiteUrl }}
                     </li>
                     <li class="flex items-center text-sm text-gray-600 gap-3">
                       <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                         <MapPinIcon class="w-4 h-4" />
                       </div>
                       {{ company.location }}
                     </li>
                   </ul>
                   <a :href="company.webSiteUrl" target="_blank" class="block w-full text-center mt-6 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition-colors">
                     Contacter via le site
                   </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Open Positions Section -->
        <div class="py-16 md:py-24">
          <div class="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
             <div>
               <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Nos offres d'emploi</h2>
               <p class="text-gray-600">Rejoignez-nous et participez à notre aventure</p>
             </div>
             <div class="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
               {{ jobs.length }} postes ouverts
             </div>
          </div>

          <div v-if="loadingJobs" class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div v-for="i in 4" :key="i" class="h-40 bg-white rounded-2xl animate-pulse"></div>
          </div>

          <div v-else-if="jobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="job in jobs" 
              :key="job.id" 
              class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
               <!-- Hover Gradient -->
               <div class="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

               <div class="relative z-10">
                 <div class="flex justify-between items-start mb-4">
                   <div class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                     {{ job.jobType === 'FULL_TIME' ? 'CDI' : job.jobType }}
                   </div>
                   <span class="text-xs text-gray-400 font-medium">{{ formatDate(job.createdAt) }}</span>
                 </div>

                 <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{{ job.title }}</h3>
                 
                 <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                   <div class="flex items-center gap-1.5">
                     <MapPinIcon class="w-4 h-4" />
                     {{ job.location }}
                   </div>
                   <div class="flex items-center gap-1.5" v-if="job.salaryMin">
                     <CurrencyEuroIcon class="w-4 h-4" />
                     {{ formatSalary(job.salaryMin, job.salaryMax) }}
                   </div>
                 </div>

                 <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div class="flex -space-x-2">
                      <div class="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                        +3
                      </div>
                    </div>
                    <router-link :to="`/detail/jobs/${job.id}`" class="text-sm font-bold text-gray-900 flex items-center gap-1 group/link">
                      Voir l'offre
                      <ArrowLongRightIcon class="w-4 h-4 text-emerald-500 group-hover/link:translate-x-1 transition-transform" />
                    </router-link>
                 </div>
               </div>
            </div>
          </div>

          <div v-else class="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BriefcaseIcon class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">Aucune offre disponible</h3>
            <p class="text-gray-500">Cette entreprise n'a pas d'offres publiées pour le moment.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCompanyService } from '@/utils/service/CompagnyService'
import { useJobService } from '@/utils/service/jobService'
import type { ICompany } from '@/utils/interface/ICompagny'
import type { IJob } from '@/utils/interface/IJobOffers'
import {
  MapPinIcon,
  GlobeAltIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  CurrencyEuroIcon,
  ArrowLongRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const companyService = useCompanyService()
const jobService = useJobService()

const company = ref<ICompany | null>(null)
const jobs = ref<IJob[]>([])
const loading = ref(true)
const loadingJobs = ref(true)
const error = ref<string | null>(null)

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

const getFallbackLogo = (company: ICompany): string => {
  const letter = company?.name?.charAt(0).toUpperCase() || 'C'
  return `https://ui-avatars.com/api/?name=${letter}&background=10b981&color=fff&size=128`
}

const getDomainFromUrl = (url?: string): string => {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatSalary = (min?: number, max?: number): string => {
  if (!min) return 'Non spécifié'
  if (min && !max) return `${min / 1000}k€`
  return `${min / 1000}k€ - ${max! / 1000}k€`
}

onMounted(async () => {
  const companyId = parseInt(route.params.id as string)
  if (isNaN(companyId)) {
    error.value = "Identifiant d'entreprise invalide"
    loading.value = false
    return
  }

  try {
    // 1. Fetch Company Details
    company.value = await companyService.getCompanyById(companyId)
    loading.value = false // Show content as soon as company is loaded

    // 2. Fetch Company Jobs (async in background)
    try {
      jobs.value = await jobService.getJobsByCompany(companyId)
    } catch (err) {
      console.error("Erreur lors du chargement des jobs", err)
      // On ne bloque pas la page si les jobs échouent
    } finally {
      loadingJobs.value = false
    }

  } catch (err) {
    console.error("Erreur lors du chargement de l'entreprise", err)
    error.value = "Impossible de charger les informations de l'entreprise."
    loading.value = false
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
