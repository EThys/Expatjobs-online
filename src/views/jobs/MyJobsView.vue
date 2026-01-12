<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// @ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
import { useModernToast } from '@/composables/useModernToast'
import { useJobStore } from '@/stores/jobs'
import { useCompanyStore } from '@/stores/companies'
import { useJobService } from '@/utils/service/jobService'
import { storeToRefs } from 'pinia'
import type { IJob, ISkill, ISkillCreate } from '@/utils/interface/IJobOffers'
import { JobType, ExperienceLevel, JobStatus } from '@/utils/interface/IJobOffers'
import { getUser } from '@/stores/authStorage'
// @ts-ignore
import Footer from '../../components/footer/FooterComponent.vue'

const { t } = useI18n()
const toast = useModernToast()
const router = useRouter()
const jobStore = useJobStore()
const companyStore = useCompanyStore()
const jobService = useJobService()

const { myJobs: jobs } = storeToRefs(jobStore)
// We use local loading/saving state for UI feedback or store loading state
// Ideally use store loading state, but here we might want specific local control
const loading = ref(false)
const saving = ref(false)
const deletingId = ref<number | null>(null)
const skills = ref<ISkill[]>([])
const editingSkillId = ref<number | null>(null)
const newSkill = ref<ISkillCreate>({
  skillName: '',
  jobOfferId: 0,
  experienceYear: 0,
})
const editingSkill = ref<ISkillCreate>({
  skillName: '',
  jobOfferId: 0,
  experienceYear: 0,
})
const loadingSkills = ref(false)

const user = getUser()
const userId = user?.id

const selectedJobId = ref<number | null>(null)

const editForm = ref({
  title: '',
  description: '',
  location: '',
  salaryMin: 0,
  salaryMax: 0,
  jobType: JobType.FULL_TIME as JobType,
  experienceLevel: ExperienceLevel.MID as ExperienceLevel,
  status: JobStatus.PUBLISHED as JobStatus,
  sector: 'IT',
})

const hasJobs = computed(() => jobs.value.length > 0)
const selectedJob = computed(() => jobs.value.find((j) => j.id === selectedJobId.value) || null)

const jobTypes = [
  { value: JobType.FULL_TIME, label: 'Temps plein' },
  { value: JobType.PART_TIME, label: 'Temps partiel' },
  { value: JobType.CONTRACT, label: 'Contrat' },
  { value: JobType.INTERNSHIP, label: 'Stage' },
  { value: JobType.FREELANCE, label: 'Freelance' },
]

const experienceLevels = [
  { value: ExperienceLevel.JUNIOR, label: 'Junior' },
  { value: ExperienceLevel.MID, label: 'Confirmé' },
  { value: ExperienceLevel.SENIOR, label: 'Senior' },
  { value: ExperienceLevel.LEAD, label: 'Lead' },
  { value: ExperienceLevel.EXPERT, label: 'Expert' },
]

const jobStatuses = [
  { value: JobStatus.DRAFT, label: 'Brouillon' },
  { value: JobStatus.PUBLISHED, label: 'Publié' },
  { value: JobStatus.CLOSED, label: 'Fermé' },
]

const sectors = [
  { value: 'IT', label: 'Technologie' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTH', label: 'Santé' },
  { value: 'EDUCATION', label: 'Éducation' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'SALES', label: 'Ventes' },
  { value: 'ENGINEERING', label: 'Ingénierie' },
  { value: 'CONSULTING', label: 'Consulting' },
]

const applyJobToForm = (job: IJob | any) => {
  editForm.value = {
    title: job.title ?? '',
    description: job.description ?? '',
    location: job.location ?? '',
    salaryMin: job.salaryMin ?? 0,
    salaryMax: job.salaryMax ?? 0,
    jobType: (job.jobType as JobType) ?? JobType.FULL_TIME,
    experienceLevel: (job.experienceLevel as ExperienceLevel) ?? ExperienceLevel.MID,
    status: (job.status as JobStatus) ?? JobStatus.PUBLISHED,
    sector: job.sector ?? 'IT',
  }
}

const loadJobs = async () => {
  if (!userId) {
    toast.warning(t('myJobs.mustLogin'))
    router.push('/login')
    return
  }

  try {
    loading.value = true

    // Charger les offres via le store
    // Le store gère déjà la récupération des compagnies de l'utilisateur pour filtrer
    await jobStore.fetchMyJobs(userId)

    if (jobs.value.length > 0) {
      // Sélectionner le premier job s'il n'y en a pas de sélectionné
      if (!selectedJobId.value) {
        selectedJobId.value = jobs.value[0].id
        applyJobToForm(jobs.value[0])
        await loadSkills(jobs.value[0].id)
      }
    } else {
      selectedJobId.value = null
      skills.value = []
    }
  } catch (error: any) {
    console.error('Erreur lors du chargement des offres:', error)
    toast.error(t('myJobs.loadError'))
  } finally {
    loading.value = false
  }
}

const selectJob = async (job: IJob) => {
  selectedJobId.value = job.id
  applyJobToForm(job)
  await loadSkills(job.id)
}

const loadSkills = async (jobId: number) => {
  try {
    loadingSkills.value = true
    const response = await jobService.getSkillsByJob(jobId)
    skills.value = response.content || []
  } catch (error) {
    console.error('Erreur lors du chargement des skills:', error)
    skills.value = []
  } finally {
    loadingSkills.value = false
  }
}

const addSkill = async () => {
  if (!selectedJob.value || !newSkill.value.skillName.trim()) {
    toast.warning('Veuillez entrer un nom de compétence')
    return
  }

  try {
    const skillData: ISkillCreate = {
      skillName: newSkill.value.skillName.trim(),
      jobOfferId: selectedJob.value.id,
      experienceYear: newSkill.value.experienceYear || 0,
    }

    await jobService.createSkill(skillData)
    await loadSkills(selectedJob.value.id)

    newSkill.value = {
      skillName: '',
      jobOfferId: selectedJob.value.id,
      experienceYear: 0,
    }

    toast.success('Compétence ajoutée avec succès')
  } catch (error) {
    console.error("Erreur lors de l'ajout de la compétence:", error)
    toast.error("Erreur lors de l'ajout de la compétence")
  }
}

const startEditSkill = (skill: ISkill) => {
  editingSkillId.value = skill.id
  editingSkill.value = {
    skillName: skill.skillName,
    jobOfferId: skill.jobOfferId,
    experienceYear: skill.experienceYear,
  }
}

const cancelEditSkill = () => {
  editingSkillId.value = null
  editingSkill.value = {
    skillName: '',
    jobOfferId: 0,
    experienceYear: 0,
  }
}

const updateSkill = async (skillId: number) => {
  if (!editingSkill.value.skillName.trim()) {
    toast.warning('Veuillez entrer un nom de compétence')
    return
  }

  try {
    // Préparer le payload avec l'id
    const payload = {
      ...editingSkill.value,
      id: skillId,
      jobOfferId: selectedJob.value!.id,
    }

    await jobService.updateSkill(skillId, payload)
    await loadSkills(selectedJob.value!.id)
    editingSkillId.value = null
    toast.success('Compétence mise à jour avec succès')
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence:', error)
    toast.error('Erreur lors de la mise à jour de la compétence')
  }
}

const deleteSkill = async (skillId: number) => {
  if (!confirm('Supprimer cette compétence ?')) {
    return
  }

  try {
    await jobService.deleteSkill(skillId)
    await loadSkills(selectedJob.value!.id)
    toast.success('Compétence supprimée avec succès')
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence:', error)
    toast.error('Erreur lors de la suppression de la compétence')
  }
}

const saveJob = async () => {
  if (!selectedJob.value) return

  if (!editForm.value.title.trim() || !editForm.value.location.trim()) {
    toast.warning(t('myJobs.validationError'))
    return
  }

  if (editForm.value.salaryMin >= editForm.value.salaryMax) {
    toast.warning(t('myJobs.salaryValidationError'))
    return
  }

  try {
    saving.value = true

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
      sector: editForm.value.sector,
    }

    await jobStore.updateJob(selectedJob.value.id, payload)

    toast.success(t('myJobs.updateSuccess'))
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'offre:", error)
    toast.error(t('myJobs.updateError'))
  } finally {
    saving.value = false
  }
}

const removeJob = async (job: IJob) => {
  if (!confirm(`${t('myJobs.deleteConfirm')} "${job.title}" ?`)) {
    return
  }

  try {
    deletingId.value = job.id
    await jobStore.deleteJob(job.id)

    if (selectedJobId.value === job.id) {
      selectedJobId.value = jobs.value[0]?.id ?? null
      if (jobs.value[0]) applyJobToForm(jobs.value[0])
    }

    toast.success(t('myJobs.deleteSuccess'))
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error)
    toast.error(t('myJobs.deleteError'))
  } finally {
    deletingId.value = null
  }
}

const goToPostJob = () => {
  router.push('/postjob')
}

onMounted(() => {
  loadJobs()
})
</script>

<template>
  <Navbar />

  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/40 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            {{ t('myJobs.title').split(t('myJobs.titleHighlight'))[0] }}
            <span class="text-emerald-600">{{ t('myJobs.titleHighlight') }}</span>
          </h1>
          <p class="mt-2 text-gray-600 text-sm md:text-base">
            {{ t('myJobs.subtitle') }}
          </p>
        </div>
        <button
          type="button"
          @click="goToPostJob"
          class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {{ t('myJobs.postNewJob') }}
        </button>
      </div>

      <!-- Contenu principal -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <!-- Liste des offres -->
          <div class="border-b lg:border-b-0 lg:border-r border-gray-100">
            <div class="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                {{ t('myJobs.myOffers') }}
              </h2>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
              >
                {{ jobs.length }} {{ t('myJobs.publishedCount') }}
              </span>
            </div>

            <div class="p-4 lg:max-h-[420px] lg:overflow-y-auto">
              <div v-if="loading" class="flex items-center justify-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>

              <div v-else-if="!hasJobs" class="text-center text-gray-500 text-sm py-8 px-4">
                <p class="mb-2 font-medium text-gray-700">
                  {{ t('myJobs.noJobs') }}
                </p>
                <p class="text-xs">
                  {{ t('myJobs.noJobsHint') }}
                </p>
              </div>

              <div v-else class="space-y-2">
                <div
                  v-for="job in jobs"
                  :key="job.id"
                  @click="selectJob(job)"
                  class="w-full text-left px-3 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3 cursor-pointer"
                  :class="
                    selectedJobId === job.id
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/40'
                  "
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
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire d'édition -->
          <div class="lg:col-span-2">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  {{ t('myJobs.jobDetails') }}
                </h2>
                <p class="text-xs text-gray-500 mt-1">
                  {{ t('myJobs.editHint') }}
                </p>
              </div>
              <router-link
                v-if="selectedJob"
                :to="`/detail/jobs/${selectedJob.id}`"
                target="_blank"
                class="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-medium transition-colors"
              >
                <span>{{ t('myJobs.viewJob') }}</span>
                <svg class="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </router-link>
            </div>

            <div class="p-6">
              <div v-if="!selectedJob">
                <p class="text-sm text-gray-500">
                  {{ t('myJobs.selectJob') }}
                </p>
              </div>

              <form v-else @submit.prevent="saveJob" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.jobTitle') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.title"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      :placeholder="t('myJobs.jobTitlePlaceholder')"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.location') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.location"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      :placeholder="t('myJobs.locationPlaceholder')"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.sector') }}
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
                      {{ t('myJobs.contractType') }}
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
                      {{ t('myJobs.experienceLevel') }}
                    </label>
                    <select
                      v-model="editForm.experienceLevel"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option
                        v-for="level in experienceLevels"
                        :key="level.value"
                        :value="level.value"
                      >
                        {{ level.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.salaryMin') }}
                    </label>
                    <input
                      v-model.number="editForm.salaryMin"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      :placeholder="t('myJobs.salaryMinPlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.salaryMax') }}
                    </label>
                    <input
                      v-model.number="editForm.salaryMax"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      :placeholder="t('myJobs.salaryMaxPlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('myJobs.status') }}
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
                    {{ t('myJobs.description') }}
                  </label>
                  <textarea
                    v-model="editForm.description"
                    rows="6"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white resize-vertical"
                    :placeholder="t('myJobs.descriptionPlaceholder')"
                  ></textarea>
                </div>

                <!-- Skills Section -->
                <div class="pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <label class="block text-sm font-semibold text-gray-800 mb-1">
                        {{ t('myJobs.skillsTitle', 'Compétences requises') }}
                      </label>
                      <p class="text-xs text-gray-500">
                        {{
                          t(
                            'myJobs.skillsSubtitle',
                            'Ajoutez, modifiez ou supprimez les compétences associées à cette offre',
                          )
                        }}
                      </p>
                    </div>
                  </div>

                  <!-- Add New Skill -->
                  <div class="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div class="md:col-span-2">
                        <input
                          v-model="newSkill.skillName"
                          type="text"
                          :placeholder="
                            t(
                              'myJobs.skillNamePlaceholder',
                              'Nom de la compétence (ex: JavaScript, Python...)',
                            )
                          "
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-sm"
                          @keyup.enter="addSkill"
                        />
                      </div>
                      <div class="flex gap-2">
                        <input
                          v-model.number="newSkill.experienceYear"
                          type="number"
                          min="0"
                          :placeholder="t('myJobs.experienceYearsPlaceholder', 'Années')"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-sm"
                        />
                        <button
                          type="button"
                          @click="addSkill"
                          class="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          {{ t('myJobs.addSkill', 'Ajouter') }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Skills List -->
                  <div v-if="loadingSkills" class="flex items-center justify-center py-4">
                    <div
                      class="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"
                    ></div>
                  </div>

                  <div
                    v-else-if="skills.length === 0"
                    class="text-center py-6 text-gray-500 text-sm"
                  >
                    <p>{{ t('myJobs.noSkills', 'Aucune compétence ajoutée pour le moment') }}</p>
                  </div>

                  <div v-else class="space-y-2">
                    <div
                      v-for="skill in skills"
                      :key="skill.id"
                      class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                    >
                      <div
                        v-if="editingSkillId !== skill.id"
                        class="flex-1 flex items-center gap-3"
                      >
                        <div class="flex-1">
                          <p class="font-medium text-gray-900 text-sm">{{ skill.skillName }}</p>
                          <p class="text-xs text-gray-500">
                            {{ skill.experienceYear }}
                            {{
                              skill.experienceYear > 1
                                ? t('myJobs.experienceYearsPlural', 'années')
                                : t('myJobs.experienceYearsSingular', 'année')
                            }}
                            {{ t('myJobs.experienceSuffix') }}
                          </p>
                        </div>
                        <button
                          type="button"
                          @click="startEditSkill(skill)"
                          class="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          {{ t('myJobs.editSkill', 'Modifier') }}
                        </button>
                        <button
                          type="button"
                          @click="deleteSkill(skill.id)"
                          class="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          {{ t('myJobs.deleteSkill', 'Supprimer') }}
                        </button>
                      </div>

                      <div v-else class="flex-1 flex items-center gap-2">
                        <input
                          v-model="editingSkill.skillName"
                          type="text"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          :placeholder="t('myJobs.skillNamePlaceholder', 'Nom de la compétence')"
                        />
                        <input
                          v-model.number="editingSkill.experienceYear"
                          type="number"
                          min="0"
                          class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          :placeholder="t('myJobs.experienceYearsPlaceholder', 'Années')"
                        />
                        <button
                          type="button"
                          @click="updateSkill(skill.id)"
                          class="px-3 py-2 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          {{ t('myJobs.saveSkill', 'Enregistrer') }}
                        </button>
                        <button
                          type="button"
                          @click="cancelEditSkill"
                          class="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {{ t('myJobs.cancelSkill', 'Annuler') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end"
                >
                  <button
                    type="button"
                    @click="selectedJob && applyJobToForm(selectedJob)"
                    class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    {{ t('myJobs.cancel') }}
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
                    <span>{{ saving ? t('myJobs.saving') : t('myJobs.save') }}</span>
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
