<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
    <Navbar />

    <main class="pt-20 pb-16">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold mb-3">
            {{ $t('hero.jobsByTypeView.title').split($t('hero.jobsByTypeView.titleHighlight'))[0] }}
            <span class="text-emerald-200">{{ $t('hero.jobsByTypeView.titleHighlight') }}</span>
          </h1>
          <p class="text-emerald-100 text-lg">{{ $t('hero.jobsByTypeView.subtitle') }}</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Filter Chips -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="type in jobTypeOptions"
              :key="type.value"
              @click="changeType(type.value)"
              :class="[
                'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200',
                selectedType === type.value
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
              ]"
            >
              {{ type.label }}
              <span
                v-if="counts[type.value] !== undefined"
                :class="[
                  'ml-2 px-2 py-0.5 rounded-full text-xs',
                  selectedType === type.value
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 text-emerald-700'
                ]"
              >
                {{ counts[type.value] }}
              </span>
            </button>
          </div>
        </div>

        <!-- Results Header -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">
              {{ currentTypeLabel }}
            </h2>
            <p class="text-gray-600 mt-1">
              {{ totalElements }} {{ totalElements !== 1 ? 'offres trouvées' : 'offre trouvée' }}
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
          >
            <div class="h-6 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Jobs Grid -->
        <div
          v-else-if="formattedOffres.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <OffreCard
            v-for="offre in formattedOffres"
            :key="offre.id"
            :offre="offre"
            class="transform hover:scale-[1.02] transition-transform duration-200"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="bg-white rounded-2xl border border-gray-200 p-12 text-center"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucune offre trouvée</h3>
            <p class="text-gray-600 mb-6">
              Aucune offre n'est actuellement disponible pour ce type de contrat.
            </p>
            <button
              @click="goToAllJobs"
              class="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Voir toutes les offres
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && totalPages > 1" class="mt-10">
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
import Pagination from '@/components/shared/Pagination.vue';
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
const paginationLoading = ref(false);

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
      size: 12,
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

// Format helpers - utiliser uniquement les données de l'API
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

const formatDate = (dateString: string | undefined): string => {
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

// Formater les offres en utilisant uniquement les données de l'API
const formatOffreForCard = (job: IJobOffers) => {
  return {
    id: job.id,
    titre: job.title || 'Titre non spécifié',
    entreprise: job.company?.name || (job.companyId ? `Entreprise #${job.companyId}` : 'Entreprise inconnue'),
    localisation: job.location || 'Non spécifié',
    typeContrat: formatJobType(job.jobType),
    salaire: formatSalary(job.salaryMin, job.salaryMax),
    competences: job.skills?.map((skill: any) => skill.skillName || skill.name) || [],
    datePublication: formatDate(job.createdAt),
    urgent: job.status === 'URGENT',
    remote: job.location ? job.location.toLowerCase().includes('remote') : false,
    featured: false,
    description: job.description || '',
    experienceLevel: job.experienceLevel || '',
    sector: job.sector || '',
    companyInfo: job.company || {
      id: job.companyId,
      name: job.companyId ? `Entreprise #${job.companyId}` : 'Entreprise inconnue',
      location: job.location || '',
      webSiteUrl: (job.company as any)?.webSiteUrl || '',
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
/* Animations simples et modernes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main {
  animation: fadeIn 0.3s ease-out;
}
</style>
