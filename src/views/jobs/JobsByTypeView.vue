<template>
  <div class="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden page-fade-in">
    <Navbar />

    <main class="flex-grow">
    <PageHero>
      <template #title>
        {{ $t('hero.jobsByTypeView.title').split($t('hero.jobsByTypeView.titleHighlight'))[0] }} <span class="text-emerald-400">{{ $t('hero.jobsByTypeView.titleHighlight') }}</span>
      </template>
      <template #subtitle>
        {{ $t('hero.jobsByTypeView.subtitle') }}
      </template>

      <div class="flex justify-center">
        <div class="inline-flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-xl">
          <button
            v-for="type in jobTypeOptions"
            :key="type.value"
            @click="changeType(type.value)"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300',
              selectedType === type.value
                ? 'bg-white text-emerald-700 shadow-lg shadow-emerald-500/20 scale-105'
                : 'bg-white/5 text-emerald-50 hover:bg-white/20 hover:text-white'
            ]"
          >
            <span class="inline-block w-2 h-2 rounded-full transition-colors duration-300"
                  :class="selectedType === type.value ? 'bg-emerald-500' : 'bg-emerald-200/50'"></span>
            {{ type.label }}
          </button>
        </div>
      </div>
    </PageHero>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Filters Section - Horizontal Chips -->
      <div class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200/80">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Types de contrat
        </h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="type in jobTypeOptions"
            :key="type.value"
            @click="changeType(type.value)"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
              selectedType === type.value
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
            ]"
          >
            <span class="inline-block w-2 h-2 rounded-full transition-colors duration-300"
                  :class="selectedType === type.value ? 'bg-white' : 'bg-emerald-500'"></span>
            <span>{{ type.label }}</span>
            <span v-if="counts[type.value] !== undefined" 
                  :class="[
                    'text-xs px-2 py-0.5 rounded-full',
                    selectedType === type.value ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                  ]">
              {{ counts[type.value] }}
            </span>
          </button>
        </div>
      </div>

      <!-- Job Cards Section -->
      <div class="space-y-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-800">
                Offres en {{ currentTypeLabel }}
              </h2>
              <p class="text-sm text-gray-600 mt-1">
                {{ totalElements }} offre{{ totalElements !== 1 ? 's' : '' }} trouvée{{ totalElements !== 1 ? 's' : '' }}
                pour ce type de contrat
              </p>
            </div>
          </div>

          <div v-if="loading" class="space-y-6">
            <div v-for="n in 6" :key="n" class="bg-white rounded-2xl border border-gray-200/80 p-6 shimmer-container">
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

          <div v-else-if="formattedOffres.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OffreCard
              v-for="offre in formattedOffres"
              :key="offre.id"
              :offre="offre"
              class="transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <div v-else class="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
            <div class="max-w-md mx-auto">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Aucune offre trouvée</h3>
              <p class="text-gray-500 mb-4">
                Aucune offre n'est actuellement disponible pour ce type de contrat.
              </p>
              <button
                @click="goToAllJobs"
                class="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
              >
                Voir toutes les offres
              </button>
            </div>
          </div>

          <div v-if="!loading && totalPages > 1" class="mt-10">
          <Pagination
            v-if="!loading && totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="paginationLoading"
            @change="changePage"
          />
          </div>
        </div>
      </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//@ts-ignore
import Navbar from '@/components/navbar/NavBarComponent.vue';
import PageHero from '@/components/shared/PageHero.vue';
import Pagination from '@/components/shared/Pagination.vue';
//@ts-ignore
import Footer from '@/components/footer/FooterComponent.vue';
//@ts-ignore
import OffreCard from '@/components/cards/OffreCard.vue';
//@ts-ignore
import { useJobService } from '@/utils/service/jobService';
//@ts-ignore
import type { IJob, IJobOffers, IJobResponse } from '@/utils/interface/IJobOffers';
import { JobType } from '@/utils/interface/IJobOffers';

const route = useRoute();
const router = useRouter();
const jobService = useJobService();

const selectedType = ref<JobType>(JobType.FULL_TIME);
const jobs = ref<IJob[]>([]);
const loading = ref(false);
const currentPage = ref(0);
const totalPages = ref(0);
const totalElements = ref(0);

const jobTypeOptions = [
  { value: JobType.FULL_TIME, label: 'CDI (Temps plein)' },
  { value: JobType.PART_TIME, label: 'Temps partiel' },
  { value: JobType.CONTRACT, label: 'Contrat (CDD)' },
  { value: JobType.INTERNSHIP, label: 'Stage' },
  { value: JobType.FREELANCE, label: 'Freelance' },
];

const counts = ref<Record<JobType, number>>({
  [JobType.FULL_TIME]: 0,
  [JobType.PART_TIME]: 0,
  [JobType.CONTRACT]: 0,
  [JobType.INTERNSHIP]: 0,
  [JobType.FREELANCE]: 0,
});

const currentTypeLabel = computed(() => {
  return jobTypeOptions.find(t => t.value === selectedType.value)?.label || 'CDI';
});

// Pagination handled by component

const paginationLoading = ref(false);

const fetchJobsByType = async (page = 0) => {
  try {
    if (page === currentPage.value && jobs.value.length === 0) {
       loading.value = true;
    } else {
       paginationLoading.value = true;
    }

    const response: IJobResponse = await jobService.searchJobs({
      jobType: selectedType.value,
      page,
      size: 10,
      status: 'PUBLISHED',
    });

    if (response && Array.isArray(response.content)) {
      jobs.value = response.content;
      currentPage.value = response.number ?? page;
      totalPages.value = response.totalPages ?? 1;
      totalElements.value = response.totalElements ?? jobs.value.length;
    } else {
      jobs.value = [];
      currentPage.value = 0;
      totalPages.value = 0;
      totalElements.value = 0;
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des offres par type:', error);
    jobs.value = [];
    currentPage.value = 0;
    totalPages.value = 0;
    totalElements.value = 0;
  } finally {
    loading.value = false;
    paginationLoading.value = false;
  }
};

const fetchCounts = async () => {
  try {
    const newCounts: Record<JobType, number> = { ...counts.value };
    for (const type of Object.values(JobType)) {
      const response: IJobResponse = await jobService.searchJobs({
        jobType: type,
        page: 0,
        size: 1,
        status: 'PUBLISHED',
      });
      newCounts[type as JobType] = response.totalElements ?? 0;
    }
    counts.value = newCounts;
  } catch (error) {
    console.warn('⚠️ Erreur lors du chargement des compteurs par type:', error);
  }
};

const changeType = (type: JobType) => {
  if (selectedType.value === type) return;
  selectedType.value = type;
  currentPage.value = 0;
  router.replace({ query: { ...route.query, type } });
  fetchJobsByType(0);
};

const changePage = (page: number) => {
  if (page < 0 || page >= totalPages.value) return;
  currentPage.value = page;
  fetchJobsByType(page);
};

const goToAllJobs = () => {
  router.push({ name: 'jobs' });
};

// Format helpers (recyclés depuis AllJobsView)
const formatSalary = (min: number | null, max: number | null): string => {
  if (!min && !max) return 'Salaire à négocier';
  if (!min) return `Jusqu'à ${max?.toLocaleString()} €`;
  if (!max) return `À partir de ${min?.toLocaleString()} €`;
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} €`;
};

const formatJobType = (jobType: JobType | string): string => {
  const types: { [key: string]: string } = {
    FULL_TIME: 'CDI',
    PART_TIME: 'Temps partiel',
    CONTRACT: 'CDD',
    FREELANCE: 'Freelance',
    INTERNSHIP: 'Stage',
  };
  return types[jobType] || jobType || 'Non spécifié';
};

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date inconnue';
  try {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  } catch {
    return 'Date inconnue';
  }
};

const formatOffreForCard = (job: IJobOffers) => {
  return {
    id: job.id,
    titre: job.title || 'Titre non spécifié',
    entreprise: job.company?.name || `Entreprise #${job.companyId}`,
    localisation: job.location || 'Non spécifié',
    typeContrat: formatJobType(job.jobType),
    salaire: formatSalary(job.salaryMin, job.salaryMax),
    competences:
      job.skills?.map((skill) => skill.skillName) ||
      ([job.sector, job.experienceLevel].filter(Boolean) as string[]),
    datePublication: formatDate(job.createdAt),
    urgent: job.status === 'URGENT',
    remote: job.location ? job.location.toLowerCase().includes('remote') : false,
    featured: job.experienceLevel === 'SENIOR' || job.status === 'FEATURED',
    description: job.description,
    experienceLevel: job.experienceLevel,
    sector: job.sector,
    companyInfo: job.company || {
      id: job.companyId,
      name: `Entreprise #${job.companyId}`,
      location: job.location,
    },
  };
};

const formattedOffres = computed(() => {
  return jobs.value.map((job: any) => formatOffreForCard(job as IJobOffers));
});

onMounted(async () => {
  const initialType = (route.query.type as string) as JobType | undefined;
  if (initialType && Object.values(JobType).includes(initialType)) {
    selectedType.value = initialType;
  }
  await fetchJobsByType(0);
  fetchCounts();
});
</script>

<style scoped>
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

/* Effet d'apparition simple de la page */
.page-fade-in {
  animation: pageFadeIn 0.35s ease-out;
}

@keyframes pageFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


