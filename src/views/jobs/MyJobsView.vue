<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// @ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue';
import { useToast } from 'vue-toast-notification';
import { useJobService } from '@/utils/service/jobService';
import { useCompanyService } from '@/utils/service/CompagnyService';
import type { IJob } from '@/utils/interface/IJobOffers';
import { JobType, ExperienceLevel, JobStatus } from '@/utils/interface/IJobOffers';
import { getUser } from '@/stores/authStorage';
// @ts-ignore
import Footer from '../../components/footer/FooterComponent.vue';


const toast = useToast();
const router = useRouter();
const jobService = useJobService();
const companyService = useCompanyService();

const user = getUser();
const userId = user?.id;

const loading = ref(false);
const saving = ref(false);
const deletingId = ref<number | null>(null);
const jobs = ref<IJob[]>([]);
const selectedJobId = ref<number | null>(null);

const editForm = ref({
  title: '',
  description: '',
  location: '',
  salaryMin: 0,
  salaryMax: 0,
  jobType: JobType.FULL_TIME as JobType,
  experienceLevel: ExperienceLevel.MID as ExperienceLevel,
  status: JobStatus.PUBLISHED as JobStatus,
  sector: 'IT'
});

const hasJobs = computed(() => jobs.value.length > 0);
const selectedJob = computed(() =>
  jobs.value.find(j => j.id === selectedJobId.value) || null
);

const jobTypes = [
  { value: JobType.FULL_TIME, label: 'Temps plein' },
  { value: JobType.PART_TIME, label: 'Temps partiel' },
  { value: JobType.CONTRACT, label: 'Contrat' },
  { value: JobType.INTERNSHIP, label: 'Stage' },
  { value: JobType.FREELANCE, label: 'Freelance' }
];

const experienceLevels = [
  { value: ExperienceLevel.JUNIOR, label: 'Junior' },
  { value: ExperienceLevel.MID, label: 'Confirmé' },
  { value: ExperienceLevel.SENIOR, label: 'Senior' },
  { value: ExperienceLevel.LEAD, label: 'Lead' },
  { value: ExperienceLevel.EXPERT, label: 'Expert' }
];

const jobStatuses = [
  { value: JobStatus.DRAFT, label: 'Brouillon' },
  { value: JobStatus.PUBLISHED, label: 'Publié' },
  { value: JobStatus.CLOSED, label: 'Fermé' }
];

const sectors = [
  { value: 'IT', label: 'Technologie' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTH', label: 'Santé' },
  { value: 'EDUCATION', label: 'Éducation' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'SALES', label: 'Ventes' },
  { value: 'ENGINEERING', label: 'Ingénierie' },
  { value: 'CONSULTING', label: 'Consulting' }
];

const loadJobs = async () => {
  if (!userId) {
    toast.open({
      message: 'Vous devez être connecté pour voir vos publications.',
      type: 'warning',
      position: 'top-right'
    });
    router.push('/login');
    return;
  }

  try {
    loading.value = true;
    // 1. Récupérer toutes les compagnies (paged) et garder celles du user connecté
    const companiesPage: any = await companyService.getAllCompanies(0, 100);
    const allCompanies: any[] = Array.isArray(companiesPage?.content) ? companiesPage.content : [];
    const myCompanyIds = allCompanies
      .filter((c: any) => c.userId === userId)
      .map((c: any) => c.id);

    if (myCompanyIds.length === 0) {
      jobs.value = [];
      selectedJobId.value = null;
      return;
    }

    // 2. Récupérer les offres (paged) et filtrer celles dont la companyId est dans myCompanyIds
    const jobsPage: any = await jobService.getAllJobs(0, 200);
    const allJobs: any[] = Array.isArray(jobsPage?.content) ? jobsPage.content : [];
    const userJobs = allJobs.filter((j: any) => myCompanyIds.includes(j.companyId));

    jobs.value = userJobs as IJob[];

    if (jobs.value.length > 0) {
      selectedJobId.value = jobs.value[0].id;
      applyJobToForm(jobs.value[0]);
    } else {
      selectedJobId.value = null;
    }
  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des offres:', error);
    // En cas d'erreur réseau ou serveur, on affiche un message générique
    toast.open({
      message: 'Impossible de charger vos publications. Réessayez plus tard.',
      type: 'error',
      position: 'top-right'
    });
  } finally {
    loading.value = false;
  }
};

const applyJobToForm = (job: IJob | any) => {
  editForm.value = {
    title: job.title ?? '',
    description: job.description ?? '',
    location: job.location ?? '',
    salaryMin: job.salaryMin ?? 0,
    salaryMax: job.salaryMax ?? 0,
    jobType: job.jobType as JobType ?? JobType.FULL_TIME,
    experienceLevel: job.experienceLevel as ExperienceLevel ?? ExperienceLevel.MID,
    status: job.status as JobStatus ?? JobStatus.PUBLISHED,
    sector: job.sector ?? 'IT'
  };
};

const selectJob = (job: IJob) => {
  selectedJobId.value = job.id;
  applyJobToForm(job);
};

const saveJob = async () => {
  if (!selectedJob.value) return;

  if (!editForm.value.title.trim() || !editForm.value.location.trim()) {
    toast.open({
      message: 'Le titre et la localisation sont obligatoires.',
      type: 'warning',
      position: 'top-right'
    });
    return;
  }

  if (editForm.value.salaryMin >= editForm.value.salaryMax) {
    toast.open({
      message: 'Le salaire minimum doit être inférieur au salaire maximum.',
      type: 'warning',
      position: 'top-right'
    });
    return;
  }

  try {
    saving.value = true;
    const payload = {
      companyId: (selectedJob.value as any).companyId,
      title: editForm.value.title.trim(),
      description: editForm.value.description?.trim() || '',
      location: editForm.value.location.trim(),
      salaryMin: editForm.value.salaryMin,
      salaryMax: editForm.value.salaryMax,
      jobType: editForm.value.jobType,
      experienceLevel: editForm.value.experienceLevel,
      status: editForm.value.status,
      sector: editForm.value.sector
    };

    const updated = await jobService.updateJob(selectedJob.value.id, payload);
    jobs.value = jobs.value.map(j => (j.id === updated.id ? updated : j));

    toast.open({
      message: 'Offre mise à jour avec succès.',
      type: 'success',
      position: 'top-right'
    });
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de l\'offre:', error);
    toast.open({
      message: 'Erreur lors de la mise à jour de l\'offre.',
      type: 'error',
      position: 'top-right'
    });
  } finally {
    saving.value = false;
  }
};

const removeJob = async (job: IJob) => {
  if (!confirm(`Supprimer définitivement l'offre "${job.title}" ?`)) {
    return;
  }

  try {
    deletingId.value = job.id;
    await jobService.deleteJob(job.id);
    jobs.value = jobs.value.filter(j => j.id !== job.id);

    if (selectedJobId.value === job.id) {
      selectedJobId.value = jobs.value[0]?.id ?? null;
      if (jobs.value[0]) applyJobToForm(jobs.value[0]);
    }

    toast.open({
      message: 'Offre supprimée avec succès.',
      type: 'success',
      position: 'top-right'
    });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'offre:', error);
    toast.open({
      message: 'Erreur lors de la suppression de l\'offre.',
      type: 'error',
      position: 'top-right'
    });
  } finally {
    deletingId.value = null;
  }
};

const goToPostJob = () => {
  router.push('/postjob');
};

onMounted(() => {
  loadJobs();
});
</script>

<template>
  <Navbar />

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/40 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Mes <span class="text-emerald-600">offres publiées</span>
          </h1>
          <p class="mt-2 text-gray-600 text-sm md:text-base">
            Gérez les offres d'emploi que vous avez publiées : modifiez-les ou supprimez-les facilement.
          </p>
        </div>
        <button
          type="button"
          @click="goToPostJob"
          class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Publier une nouvelle offre
        </button>
      </div>

      <!-- Contenu principal -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <!-- Liste des offres -->
          <div class="border-b lg:border-b-0 lg:border-r border-gray-100">
            <div class="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Mes offres
              </h2>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
              >
                {{ jobs.length }} publiée(s)
              </span>
            </div>

            <div class="p-4 lg:max-h-[420px] lg:overflow-y-auto">
              <div v-if="loading" class="flex items-center justify-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>

              <div v-else-if="!hasJobs" class="text-center text-gray-500 text-sm py-8 px-4">
                <p class="mb-2 font-medium text-gray-700">
                  Aucune offre publiée pour le moment.
                </p>
                <p class="text-xs">
                  Cliquez sur <span class="font-semibold text-emerald-600">"Publier une nouvelle offre"</span> pour commencer.
                </p>
              </div>

              <div v-else class="space-y-2">
                <button
                  v-for="job in jobs"
                  :key="job.id"
                  type="button"
                  @click="selectJob(job)"
                  class="w-full text-left px-3 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3"
                  :class="selectedJobId === job.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/40'"
                >
                  <div
                    class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow"
                    :class="selectedJobId === job.id ? 'bg-emerald-500' : 'bg-emerald-400'"
                  >
                    {{ job.title ? job.title[0] : 'O' }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 truncate">
                      {{ job.title }}
                    </p>
                    <p class="text-xs text-gray-500 truncate">
                      {{ job.location || 'Localisation inconnue' }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click.stop="removeJob(job)"
                    class="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      v-if="deletingId !== job.id"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 01-.894-.553L6.382 4.276A1 1 0 017.276 3h9.448a1 1 0 01.894.553L18 7"
                      />
                    </svg>
                    <svg
                      v-else
                      class="animate-spin w-4 h-4 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </button>
                </button>
              </div>
            </div>
          </div>

          <!-- Formulaire d'édition -->
          <div class="lg:col-span-2">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  Détails de l'offre
                </h2>
                <p class="text-xs text-gray-500 mt-1">
                  Modifiez les informations de votre offre d'emploi.
                </p>
              </div>
            </div>

            <div class="p-6">
              <div v-if="!selectedJob">
                <p class="text-sm text-gray-500">
                  Sélectionnez une offre dans la colonne de gauche pour voir et modifier ses détails.
                </p>
              </div>

              <form
                v-else
                @submit.prevent="saveJob"
                class="space-y-6"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Titre du poste <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.title"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Développeur Backend Java Senior"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Localisation <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.location"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Kinshasa, RDC ou Remote"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Secteur
                    </label>
                    <select
                      v-model="editForm.sector"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option v-for="s in sectors" :key="s.value" :value="s.value">
                        {{ s.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Type de contrat
                    </label>
                    <select
                      v-model="editForm.jobType"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option v-for="type in jobTypes" :key="type.value" :value="type.value">
                        {{ type.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d'expérience
                    </label>
                    <select
                      v-model="editForm.experienceLevel"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option v-for="level in experienceLevels" :key="level.value" :value="level.value">
                        {{ level.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Salaire minimum (USD)
                    </label>
                    <input
                      v-model.number="editForm.salaryMin"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Ex: 3000"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Salaire maximum (USD)
                    </label>
                    <input
                      v-model.number="editForm.salaryMax"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Ex: 5000"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      v-model="editForm.status"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option v-for="s in jobStatuses" :key="s.value" :value="s.value">
                        {{ s.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    v-model="editForm.description"
                    rows="6"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white resize-vertical"
                    placeholder="Mettez à jour la description de votre offre..."
                  ></textarea>
                </div>

                <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    @click="selectedJob && applyJobToForm(selectedJob)"
                    class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Annuler les modifications
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <svg
                      v-if="saving"
                      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{{ saving ? 'Enregistrement...' : 'Enregistrer les modifications' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>


