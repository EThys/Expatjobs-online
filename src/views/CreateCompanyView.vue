<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
//@ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../components/footer/FooterComponent.vue'
//@ts-ignore
import { useCompanyService } from '@/utils/service/CompagnyService'
import { getUser } from '@/stores/authStorage'

const toast = useToast();
const router = useRouter();
const companyService = useCompanyService();

const user = getUser()
const userId = user?.id

// États réactifs
const company = ref({
  name: '',
  description: '',
  location: '',
  webSiteUrl: '',
  sector: '',
  size: '',
  foundedYear: new Date().getFullYear(),
  logoUrl: '',
  email: '',
  phone: '',
  address: ''
});

const isSubmitting = ref(false);
const currentStep = ref(1);
const totalSteps = 4;


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


const companySizes = [
  { value: 'SOLO', label: '👤 Travailleur indépendant' },
  { value: 'MICRO', label: '👥 Micro-entreprise (2-9 employés)' },
  { value: 'SMALL', label: '👨‍👩‍👧‍👦 Petite entreprise (10-49 employés)' },
  { value: 'MEDIUM', label: '🏢 Moyenne entreprise (50-249 employés)' },
  { value: 'LARGE', label: '🏛️ Grande entreprise (250+ employés)' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

const createCompany = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  try {
    const companyData = {
      ...company.value,
      userId: userId
    };
    

    const createdCompany = await companyService.createCompany(companyData);
    
    toast.open({
      message: 'Entreprise créée avec succès ! 🎉',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    });
    
    setTimeout(() => {
      router.push(`/company/${createdCompany.id}`);
    }, 1500);
    
  } catch (error: any) {
    console.error('Erreur lors de la création de l\'entreprise:', error);
    toast.open({
      message: error.response?.data?.message || 'Erreur lors de la création de l\'entreprise',
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const validateForm = (): boolean => {
  if (!company.value.name.trim()) {
    toast.open({
      message: 'Le nom de l\'entreprise est requis',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (!company.value.location.trim()) {
    toast.open({
      message: 'La localisation est requise',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (!company.value.sector) {
    toast.open({
      message: 'Le secteur d\'activité est requis',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  if (company.value.webSiteUrl && !isValidUrl(company.value.webSiteUrl)) {
    toast.open({
      message: 'L\'URL du site web n\'est pas valide',
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
    return false;
  }

  return true;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const resetForm = () => {
  company.value = {
    name: '',
    description: '',
    location: '',
    webSiteUrl: '',
    sector: '',
    size: '',
    foundedYear: new Date().getFullYear(),
    logoUrl: '',
    email: '',
    phone: '',
    address: ''
  };
};


onMounted(() => {
  // Initialisation si nécessaire
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span class="text-sm font-medium text-white">Création d'entreprise</span>
      </div>

      <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100 animate-gradient-text">
        <span class="block">Créez votre <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">entreprise</span></span>
        <span class="block mt-2">en quelques minutes</span>
      </h1>

      <p class="text-xl text-emerald-50 max-w-2xl mx-auto mb-10 animate-fade-in">
        Présentez votre entreprise au monde et commencez à attirer les <strong class="text-white">meilleurs talents</strong> dès aujourd'hui.
      </p>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
  </header>

  <!-- Formulaire principal -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-white">Informations de l'entreprise</h3>
              <p class="text-emerald-100 text-sm">Tous les champs marqués d'un * sont obligatoires</p>
            </div>
          </div>
        </div>

        <div class="p-6 md:p-8">
          <form @submit.prevent="createCompany" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="md:col-span-2">
                <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Nom de l'entreprise <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  v-model="company.name"
                  type="text"
                  placeholder="Ex: Tech Solutions SARL"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg bg-white shadow-sm"
                  required
                />
              </div>

              <!-- Localisation -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Localisation <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="company.location"
                    type="text"
                    placeholder="Ex: Kinshasa, RDC"
                    class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                    required
                  />
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
              </div>

              <!-- Site web -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Site web
                </label>
                <div class="relative">
                  <input
                    v-model="company.webSiteUrl"
                    type="url"
                    placeholder="https://votre-entreprise.com"
                    class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                  />
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"/>
                  </svg>
                </div>
              </div>

              <!-- Secteur d'activité -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Secteur d'activité <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="company.sector"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                  required
                >
                  <option value="" disabled>Sélectionnez un secteur</option>
                  <option v-for="sector in sectors" :key="sector.value" :value="sector.value">
                    {{ sector.label }}
                  </option>
                </select>
              </div>

              <!-- Taille de l'entreprise -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Taille de l'entreprise
                </label>
                <select
                  v-model="company.size"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="" disabled>Sélectionnez une taille</option>
                  <option v-for="size in companySizes" :key="size.value" :value="size.value">
                    {{ size.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Année de création
                </label>
                <select
                  v-model.number="company.foundedYear"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <!-- Logo URL -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  URL du logo (optionnel)
                </label>
                <input
                  v-model="company.logoUrl"
                  type="url"
                  placeholder="https://exemple.com/logo.png"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>
            </div>

            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <label class="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
                Description de l'entreprise
              </label>
              <textarea
                v-model="company.description"
                rows="6"
                placeholder="Décrivez votre entreprise :
• Votre mission et vos valeurs
• Votre histoire
• Vos produits/services
• Votre culture d'entreprise
• Vos réalisations..."
                class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm resize-vertical"
              ></textarea>
              <p class="mt-2 text-sm text-gray-600">
                Une description complète aide les candidats à mieux comprendre votre entreprise et sa culture.
              </p>
            </div>

            <div class="pt-6 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  type="button"
                  @click="resetForm"
                  class="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                >
                  Réinitialiser
                </button>
                
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  :class="{
                    'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transform hover:scale-105': !isSubmitting,
                    'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-lg shadow-gray-400/25': isSubmitting
                  }"
                  class="w-full sm:w-auto px-12 py-4 border border-transparent text-lg font-bold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span v-if="!isSubmitting" class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Créer l'entreprise
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </span>
                </button>
              </div>
            </div>
          </form>
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