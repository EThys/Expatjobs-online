<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
//@ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
//@ts-ignore
import { useJobService } from '@/utils/service/jobService'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
import type { IJobCreate, ISkillCreate } from '@/utils/interface/IJobOffers'
import { JobType, ExperienceLevel, JobStatus } from '@/utils/interface/IJobOffers'
import type { ICompany } from '@/utils/interface/ICompagny'
import {getUser} from '@/stores/authStorage'
// @ts-ignore
import Footer from '../../components/footer/FooterComponent.vue';

const toast = useToast();
const router = useRouter();
const jobService = useJobService();
const companyService = useCompanyService();

const user=getUser()
const userId=user?.id


const job = ref<IJobCreate>({
  companyId: 0,
  title: '',
  description: '',
  location: '',
  salaryMin: 0,
  salaryMax: 0,
  jobType: JobType.FULL_TIME,
  experienceLevel: ExperienceLevel.MID,
  status: JobStatus.PUBLISHED,
  sector: 'IT'
});

const skills = ref<ISkillCreate[]>([]);
const companies = ref<ICompany[]>([]);
const availableSkills = ref<string[]>([]);
const isSubmitting = ref(false);
const isLoadingCompanies = ref(false);
const customSkill = ref('');
const customExperience = ref(1);
const showCompanyModal = ref(false);
const newCompany = ref({
  name: '',
  description: '',
  location: '',
  webSiteUrl: ''
});

const jobTypes = [
  { value: JobType.FULL_TIME, label: 'Temps plein' },
  { value: JobType.PART_TIME, label: 'Temps partiel' },
  { value: JobType.CONTRACT, label: 'Contrat' },
  { value: JobType.INTERNSHIP, label: 'Stage' },
  { value: JobType.FREELANCE, label: 'Freelance' },
];

const experienceLevels = [
  { value: ExperienceLevel.JUNIOR, label: 'Junior' },
  { value: ExperienceLevel.MID, label: 'Confirmé' },
  { value: ExperienceLevel.SENIOR, label: 'Senior' },
  { value: ExperienceLevel.LEAD, label: 'Lead' },
  { value: ExperienceLevel.EXPERT, label: 'Expert' },
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
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'RETAIL', label: 'Commerce' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'ACCOUNTING', label: 'Comptabilité' },
  { value: 'BANKING', label: 'Banque' },
  { value: 'COMMUNICATION', label: 'Communication' },
  { value: 'ADVERTISING', label: 'Publicité' },
  { value: 'CREATIVE', label: 'Créatif' },
  { value: 'ARTS', label: 'Arts' },
  { value: 'MEDICAL', label: 'Médical' },
  { value: 'SOCIAL', label: 'Social' },
  { value: 'CARE', label: 'Soins' },
  { value: 'TRAINING', label: 'Formation' },
  { value: 'TEACHING', label: 'Enseignement' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'BUILDING', label: 'Bâtiment' },
  { value: 'LOGISTICS', label: 'Logistique' },
  { value: 'TRANSPORT', label: 'Transport' },
  { value: 'SUPPLY_CHAIN', label: 'Chaîne d\'approvisionnement' },
  { value: 'COMMERCE', label: 'Commerce' },
  { value: 'HOSPITALITY', label: 'Hôtellerie' },
  { value: 'RESTAURANT', label: 'Restauration' },
  { value: 'TOURISM', label: 'Tourisme' },
  { value: 'ADMINISTRATION', label: 'Administration' },
  { value: 'SECRETARIAL', label: 'Secrétariat' },
  { value: 'OFFICE', label: 'Bureau' },
  { value: 'PRODUCTION', label: 'Production' },
  { value: 'MANUFACTURING', label: 'Fabrication' },
  { value: 'INDUSTRY', label: 'Industrie' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'REPAIR', label: 'Réparation' },
  { value: 'TECHNICAL', label: 'Technique' },
  { value: 'CLEANING', label: 'Nettoyage' },
  { value: 'DOMESTIC', label: 'Domestique' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'SECURITY', label: 'Sécurité' },
  { value: 'SURVEILLANCE', label: 'Surveillance' },
  { value: 'PROTECTION', label: 'Protection' }
];

const jobStatuses = [
  { value: JobStatus.DRAFT, label: 'Brouillon' },
  { value: JobStatus.PUBLISHED, label: 'Publié' },
  { value: JobStatus.CLOSED, label: 'Fermé' },
];

const selectedCompany = computed(() => {
  return companies.value.find((company: any) => company.id === job.value.companyId);
});


const loadUserCompanies = async () => {
  try {
    isLoadingCompanies.value = true;
    console.log('User ID utilisé:', userId);
    
    const userCompanies = await companyService.getCompaniesByUser(userId ?? 0);
    console.log('Données récupérées:', userCompanies);
    
    if (userCompanies && typeof userCompanies === 'object' && !Array.isArray(userCompanies)) {
      // Si c'est un objet unique, le mettre dans un tableau
      companies.value = [userCompanies];
    } else if (Array.isArray(userCompanies)) {
      // Si c'est déjà un tableau
      companies.value = userCompanies;
    } else {
      // Si c'est null ou undefined
      companies.value = [];
    }
    
    console.log('📋 Liste des companies après traitement:', companies.value);
    
    if (companies.value.length > 0) {
      job.value.companyId = companies.value[0].id;
      console.log('✅ CompanyId défini à:', job.value.companyId);
    } else {
      job.value.companyId = 0;
      console.log('ℹ️ Aucune entreprise trouvée');
    }
  } catch (error) {
    console.error('❌ Erreur complète lors du chargement des entreprises:', error);
    // Informer clairement l'utilisateur qu'il doit d'abord créer une entreprise
    toast.open({
      message: 'Veuillez d\'abord créer une entreprise avant de publier une offre.',
      type: 'warning',
      position: 'top-right',
      duration: 5000,
    });
    // Rediriger vers la page de création d\'entreprise
    router.push({ name: 'company' });
  } finally {
    isLoadingCompanies.value = false;
  }
};


const resetCompanyForm = () => {
  newCompany.value = {
    name: '',
    description: '',
    location: '',
    webSiteUrl: ''
  };
};

const loadAvailableSkills = async () => {
  try {
    const response = await jobService.getAllSkills(0, 100);
    const names = response.content.map((skill: any) => skill.skillName);
    const lastDistinct: string[] = [];
    for (let i = names.length - 1; i >= 0 && lastDistinct.length < 4; i--) {
      const name = names[i];
      if (!lastDistinct.includes(name)) {
        lastDistinct.push(name);
      }
    }
    availableSkills.value = lastDistinct.reverse();
  } catch (error) {
    console.error('Erreur lors du chargement des compétences:', error);
    // Fallback minimal si l'API échoue
    availableSkills.value = ['JavaScript', 'Vue.js', 'Node.js', 'TypeScript'];
  }
};

const addSkill = (skillName: string, experienceYear: number = 1) => {
  if (!skills.value.find(s => s.skillName === skillName)) {
    skills.value.push({
      skillName,
      jobOfferId: 0, 
      experienceYear
    });
  }
};

const addCustomSkill = () => {
  if (customSkill.value.trim() && !skills.value.find(s => s.skillName === customSkill.value.trim())) {
    skills.value.push({
      skillName: customSkill.value.trim(),
      jobOfferId: 0,
      experienceYear: customExperience.value
    });
    customSkill.value = '';
    customExperience.value = 1;
  }
};

const removeSkill = (skillName: string) => {
  skills.value = skills.value.filter(s => s.skillName !== skillName);
};


const submitJob = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  try {
    const jobData = {
      ...job.value,
      location: job.value.location.trim() 
    };
    
    console.log('📤 Données envoyées:', jobData);

    const createdJob = await jobService.createJob(jobData);
    
    if (skills.value.length > 0) {
      const skillsWithJobId = skills.value.map(skill => ({
        ...skill,
        jobOfferId: createdJob.id
      }));
      await jobService.createSkillsBatch(skillsWithJobId);
    }

    toast.open({
      message: 'Offre d\'emploi publiée avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    });
    
    resetForm();
    
  } catch (error: any) {
    console.error('Erreur complète:', error);
    toast.open({
      message: error.response?.data?.message || 'Erreur lors de la publication de l\'offre',
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const validateForm = (): boolean => {
  if (!job.value.companyId) {
    toast.open({
      message: 'Veuillez sélectionner ou créer une entreprise',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (!job.value.title.trim()) {
    toast.open({
      message: 'Le titre du poste est requis',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (!job.value.description.trim()) {
    toast.open({
      message: 'La description du poste est requise',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (!job.value.location.trim()) {
    toast.open({
      message: 'La localisation est requise',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (job.value.salaryMin >= job.value.salaryMax) {
    toast.open({
      message: 'Le salaire minimum doit être inférieur au salaire maximum',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  return true;
};

const resetForm = () => {
  job.value = {
    companyId: companies.value.length > 0 ? companies.value[0].id : 0,
    title: '',
    description: '',
    location: '',
    salaryMin: 0,
    salaryMax: 0,
    jobType: JobType.FULL_TIME,
    experienceLevel: ExperienceLevel.MID,
    status: JobStatus.PUBLISHED,
    sector: 'IT'
  };
  skills.value = [];
};

onMounted(() => {
  loadUserCompanies();
  loadAvailableSkills();
});
</script>

<template>
  <Navbar />
  <header class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-emerald-700 to-teal-600 py-24 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-800/30 to-teal-500/20"></div>
      <div class="absolute top-10 left-20 w-64 h-64 bg-emerald-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
      <div class="absolute top-20 right-32 w-72 h-72 bg-teal-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
    </div>

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        <svg class="w-5 h-5 mr-2 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm font-medium text-white">Publication rapide</span>
      </div>

      <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100 animate-gradient-text">
        <span class="block">Publiez une <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">offre d'emploi</span></span>
        <span class="block mt-2">en seulement 2 minutes</span>
      </h1>

      <p class="text-xl text-emerald-50 max-w-2xl mx-auto mb-10 animate-fade-in">
        Attirez les <strong class="text-white">meilleurs talents</strong> avec notre outil ultra-rapide et notre réseau international.
      </p>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
  </header>

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="flex flex-col lg:flex-row gap-8">
      
        <div class="w-full lg:w-2/3">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-semibold text-white">Informations de l'offre</h3>
                  <p class="text-emerald-100 text-sm">Tous les champs marqués d'un * sont obligatoires</p>
                </div>
              </div>
            </div>

            <!-- Stepper visuel création d'offre -->
            <div class="px-6 md:px-8 pt-5 pb-2 border-b border-gray-100 bg-white">
              <div class="job-stepper">
                <div class="job-step job-step-active">
                  <div class="job-step-index">1</div>
                  <div>
                    <p class="job-step-title">Entreprise</p>
                    <p class="job-step-subtitle">Sélectionnez votre société</p>
                  </div>
                </div>
                <div class="job-step">
                  <div class="job-step-index">2</div>
                  <div>
                    <p class="job-step-title">Poste</p>
                    <p class="job-step-subtitle">Détails & rémunération</p>
                  </div>
                </div>
                <div class="job-step">
                  <div class="job-step-index">3</div>
                  <div>
                    <p class="job-step-title">Compétences & description</p>
                    <p class="job-step-subtitle">Profil recherché</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-6 md:p-8">
              <form @submit.prevent="submitJob" class="space-y-8">
                <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    Entreprise <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                      <select
                        v-model="job.companyId"
                        :disabled="isLoadingCompanies || companies.length === 0"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                        required
                      >
                        <option value="0" disabled>Sélectionnez une entreprise</option>
                        <option v-for="company in companies" :key="company.id" :value="company.id">
                          {{ company.name }} - {{ company.location }}
                        </option>
                      </select>
                      <p class="mt-2 text-sm text-gray-600">
                        {{ companies.length === 0 ? 'Aucune entreprise trouvée. Créez-en une nouvelle.' : `${companies.length} entreprise(s) disponible(s)` }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-8">
                  <div>
                    <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Titre du poste <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="job.title"
                      type="text"
                      placeholder="Ex: Développeur Full Stack Vue.js Senior"
                      class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg bg-white shadow-sm"
                      required
                    />
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Localisation <span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model="job.location"
                          type="text"
                          placeholder="Ex: Kinshasa, RDC ou Remote"
                          class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                          required
                        />
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Secteur <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="job.sector"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                      >
                        <option v-for="sector in sectors" :key="sector.value" :value="sector.value">
                          {{ sector.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Type de contrat <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="job.jobType"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                      >
                        <option v-for="type in jobTypes" :key="type.value" :value="type.value">
                          {{ type.label }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Niveau d'expérience <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="job.experienceLevel"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                      >
                        <option v-for="level in experienceLevels" :key="level.value" :value="level.value">
                          {{ level.label }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Salaire minimum (USD) <span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model.number="job.salaryMin"
                          type="number"
                          min="0"
                          step="100"
                          placeholder="3000"
                          class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                          required
                        />
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Salaire maximum (USD) <span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model.number="job.salaryMax"
                          type="number"
                          min="0"
                          step="100"
                          placeholder="5000"
                          class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                          required
                        />
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                      Statut de l'offre <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="job.status"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                    >
                      <option v-for="status in jobStatuses" :key="status.value" :value="status.value">
                        {{ status.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    Compétences requises
                  </label>
                  
                  <div class="mb-6">
                    <p class="text-sm font-medium text-gray-700 mb-3">Compétences sélectionnées :</p>
                    <div class="flex flex-wrap gap-3">
                      <span
                        v-for="skill in skills"
                        :key="skill.skillName"
                        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                      >
                        {{ skill.skillName }} ({{ skill.experienceYear }} an{{ skill.experienceYear > 1 ? 's' : '' }})
                        <button
                          type="button"
                          @click="removeSkill(skill.skillName)"
                          class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-emerald-100 hover:bg-emerald-600 hover:text-white focus:outline-none transition-colors"
                        >
                          <span class="sr-only">Remove</span>
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    </div>
                    <p v-if="skills.length === 0" class="text-sm text-gray-500 italic">
                      Aucune compétence sélectionnée. Ajoutez des compétences pour mieux cibler vos candidats.
                    </p>
                  </div>
                  
                  <div class="mb-6">
                    <p class="text-sm font-medium text-gray-700 mb-3">Compétences populaires :</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="skill in availableSkills"
                        :key="skill"
                        type="button"
                        @click="addSkill(skill, 1)"
                        :class="{
                          'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50': !skills.find(s => s.skillName === skill),
                          'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-2 border-transparent shadow-lg shadow-emerald-500/25': skills.find(s => s.skillName === skill)
                        }"
                        class="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        {{ skill }}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <p class="text-sm font-medium text-gray-700 mb-3">Ajouter une compétence personnalisée :</p>
                    <div class="flex flex-col sm:flex-row gap-3">
                      <div class="flex-1">
                        <input
                          v-model="customSkill"
                          @keyup.enter="addCustomSkill"
                          type="text"
                          placeholder="Ex: Machine Learning, Blockchain, DevOps..."
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                        />
                      </div>
                      <div class="w-full sm:w-40">
                        <select
                          v-model.number="customExperience"
                          class="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                        >
                          <option value="1">1 an</option>
                          <option value="2">2 ans</option>
                          <option value="3">3 ans</option>
                          <option value="5">5+ ans</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        @click="addCustomSkill"
                        class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-emerald-500/25 transform hover:scale-105"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>


                <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                    </svg>
                    Description du poste <span class="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    v-model="job.description"
                    rows="8"
                    placeholder="Décrivez en détail :
  • Les responsabilités du poste
  • Les qualifications requises
  • Les avantages offerts
  • La culture d'entreprise
  • Les perspectives d'évolution..."
                    class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm resize-vertical"
                    required
                  ></textarea>
                  <p class="mt-2 text-sm text-gray-600">
                    Une description détaillée augmente de 40% les chances de trouver le bon candidat.
                  </p>
                </div>

                <div class="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    :disabled="isSubmitting || !job.companyId"
                    :class="{
                      'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transform hover:scale-105': !isSubmitting && job.companyId,
                      'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-lg shadow-gray-400/25': isSubmitting || !job.companyId
                    }"
                    class="w-full md:w-auto px-12 py-4 border border-transparent text-lg font-bold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    <span v-if="!isSubmitting" class="flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                      </svg>
                      Publier l'offre d'emploi
                    </span>
                    <span v-else class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publication en cours...
                    </span>
                  </button>
                  
                  <p v-if="!job.companyId" class="mt-3 text-sm text-red-600 text-center">
                    ⚠️ Veuillez sélectionner ou créer une entreprise avant de publier l'offre.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/3">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-6">
            <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <h3 class="text-lg font-semibold text-white">Aperçu de votre offre</h3>
              </div>
            </div>

            <div class="p-6 bg-gradient-to-b from-emerald-50 to-white">
              <div class="text-center mb-6 pb-6 border-b border-gray-200">
                <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2">
                  {{ job.title || 'Titre du poste' }}
                </h3>
                <p class="text-emerald-600 font-semibold text-lg">
                  {{ selectedCompany?.name || 'Nom de l\'entreprise' }}
                </p>
                <p class="text-gray-600 mt-2 flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ job.location || 'Localisation' }}
                </p>
              </div>
              
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Détails du poste :</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Type</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ jobTypes.find(t => t.value === job.jobType)?.label || '---' }}
                    </p>
                  </div>
                  <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Niveau</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ experienceLevels.find(l => l.value === job.experienceLevel)?.label || '---' }}
                    </p>
                  </div>
                  <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Secteur</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ sectors.find(s => s.value === job.sector)?.label || '---' }}
                    </p>
                  </div>
                  <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Salaire</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ job.salaryMin > 0 ? `${job.salaryMin} - ${job.salaryMax} USD` : '---' }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div v-if="skills.length > 0" class="mb-6">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Compétences requises :</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in skills"
                    :key="skill.skillName"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200"
                  >
                    {{ skill.skillName }} ({{ skill.experienceYear }} an{{ skill.experienceYear > 1 ? 's' : '' }})
                  </span>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Description :</h4>
                <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm max-h-48 overflow-y-auto">
                  <p class="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                    {{ job.description || 'Votre description apparaîtra ici. Une bonne description attire les meilleurs candidats.' }}
                  </p>
                </div>
              </div>
            </div>
 
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-sm font-medium text-gray-700">Statut :</span>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" 
                      :class="{
                        'bg-yellow-100 text-yellow-800': job.status === JobStatus.DRAFT,
                        'bg-emerald-100 text-emerald-800': job.status === JobStatus.PUBLISHED,
                        'bg-red-100 text-red-800': job.status === JobStatus.CLOSED
                      }">
                  {{ jobStatuses.find(s => s.value === job.status)?.label }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Progression de création</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Informations de base</span>
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Détails du poste</span>
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium" :class="skills.length > 0 ? 'text-emerald-700' : 'text-gray-500'">
                  Compétences
                </span>
                <svg v-if="skills.length > 0" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium" :class="job.description ? 'text-emerald-700' : 'text-gray-500'">
                  Description
                </span>
                <svg v-if="job.description" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style>
@keyframes blobSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.05); }
}

@keyframes blobFast {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-25px, 20px) scale(1.03); }
}

@keyframes gradientText {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes wave {
  0% { transform: translateY(0) skewY(-3deg); }
  50% { transform: translateY(-5px) skewY(-3deg); }
  100% { transform: translateY(0) skewY(-3deg); }
}

.animate-blob-slow {
  animation: blobSlow 12s ease-in-out infinite;
}

.animate-blob-fast {
  animation: blobFast 15s ease-in-out infinite;
}

.animate-gradient-text {
  background-size: 200% auto;
  animation: gradientText 4s ease infinite alternate;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out forwards;
}

.animate-wave {
  animation: wave 5s ease-in-out infinite;
}

/* Stepper création d'offre */
.job-stepper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.job-step {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  gap: 0.55rem;
}

.job-step-active {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border-color: #34d399;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.20);
}

.job-step-index {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  background: #ffffff;
  color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.job-step-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #111827;
}

.job-step-subtitle {
  font-size: 0.7rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  header {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .absolute.bottom-0 {
    height: 12px;
  }
}
</style>