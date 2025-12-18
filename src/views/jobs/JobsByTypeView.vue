<template>
  <div class="min-h-screen bg-gray-50 page-fade-in">
    <Navbar />

    <section class="relative overflow-hidden bg-gradient-to-br mt-4 sm:mt-8 from-emerald-800 via-emerald-700 to-teal-600 py-16 px-4 sm:px-6 lg:px-8">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div class="max-w-5xl mx-auto text-center relative z-10">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
          Explorez les offres <span class="text-emerald-200">par type de contrat</span>
        </h1>
        <p class="text-lg text-emerald-50/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Filtrez les opportunités selon le format de travail qui vous correspond le mieux : CDI, temps partiel, freelance, stage ou contrat.
        </p>

        <div class="inline-flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          <button
            v-for="type in jobTypeOptions"
            :key="type.value"
            @click="changeType(type.value)"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200',
              selectedType === type.value
                ? 'bg-white text-emerald-700 shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 text-emerald-50 hover:bg-white/20'
            ]"
          >
            <span class="inline-block w-2 h-2 rounded-full"
                  :class="selectedType === type.value ? 'bg-emerald-500' : 'bg-emerald-200'"></span>
            {{ type.label }}
          </button>
        </div>
      </div>
    </section>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <aside class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/80 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Types de contrat
            </h3>
            <div class="space-y-2">
              <button
                v-for="type in jobTypeOptions"
                :key="type.value"
                @click="changeType(type.value)"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  selectedType === type.value
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
                ]"
              >
                <span>{{ type.label }}</span>
                <span class="text-xs text-gray-500" v-if="counts[type.value] !== undefined">
                  {{ counts[type.value] }} offres
                </span>
              </button>
            </div>
          </div>
        </aside>

        <section class="flex-1 min-w-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

          <div v-else-if="formattedOffres.length > 0" class="grid gap-6">
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
            <div class="bg-white rounded-2xl border border-gray-200/80 p-6">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-600">
                  Page {{ currentPage + 1 }} sur {{ totalPages }}
                  <span class="text-gray-400 mx-2">•</span>
                  {{ totalElements }} résultat{{ totalElements !== 1 ? 's' : '' }}
                </p>

                <nav class="flex items-center space-x-2">
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 0"
                    class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <template v-for="(page, index) in visiblePages" :key="index">
                    <button
                      v-if="typeof page === 'number'"
                      @click="changePage((page as number) - 1)"
                      :class="[
                        'px-4 py-2 rounded-xl font-medium transition-all duration-300 min-w-10 flex items-center justify-center',
                        currentPage === ((page as number) - 1)
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transform scale-105'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span v-else class="px-2 text-gray-400">
                      ...
                    </span>
                  </template>

                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage >= totalPages - 1"
                    class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </section>
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

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = currentPage.value + 1;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }

  return pages;
});

const fetchJobsByType = async (page = 0) => {
  try {
    loading.value = true;
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


