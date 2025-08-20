<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
//@ts-ignore
import HeroComponent from '@/components/hero/HeroComponent.vue'
//@ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../../components/footer/FooterComponent.vue'

const toast = useToast();

const job = ref({
  title: '',
  company: '',
  location: '',
  type: 'full-time',
  salary: '',
  category: 'tech',
  skills: [] as string[],
  experience: 'mid-level',
  description: '',
  remote: false,
  benefits: '',
});

const jobTypes = [
  { value: 'full-time', label: 'Temps plein' },
  { value: 'part-time', label: 'Temps partiel' },
  { value: 'contract', label: 'Contrat' },
  { value: 'internship', label: 'Stage' },
  { value: 'freelance', label: 'Freelance' },
];

const categories = [
  { value: 'tech', label: 'Technologie' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Santé' },
  { value: 'education', label: 'Éducation' },
  { value: 'design', label: 'Design' },
];

const experienceLevels = [
  { value: 'intern', label: 'Stagiaire' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid-level', label: 'Confirmé' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];

const availableSkills = [
  'JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 
  'Design', 'SEO', 'Gestion de projet', 'TypeScript',
  'AWS', 'Docker', 'UX/UI', 'Analytics', 'Mobile'
];

const customSkill = ref('');
const isSubmitting = ref(false);

const addSkill = (skill: string) => {
  if (!job.value.skills.includes(skill)) {
    job.value.skills = [...job.value.skills, skill];
  }
};

const addCustomSkill = () => {
  if (customSkill.value.trim() && !job.value.skills.includes(customSkill.value.trim())) {
    job.value.skills = [...job.value.skills, customSkill.value.trim()];
    customSkill.value = '';
  }
};

const removeSkill = (skill: string) => {
  job.value.skills = job.value.skills.filter(s => s !== skill);
};

const submitJob = async () => {
  isSubmitting.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.open({
      message: 'Offre d\'emploi publiée avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    });
    
    // Reset form
    job.value = {
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      salary: '',
      category: 'tech',
      skills: [],
      experience: 'mid-level',
      description: '',
      remote: false,
      benefits: ''
    };
  } catch (error) {
    toast.open({
      message: 'Erreur lors de la publication',
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Navbar />
  <header class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-emerald-700 to-cyan-600 py-24 px-4 sm:px-6 lg:px-8">
  <!-- Effets de fond animés -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Dégradé principal -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-800/30 to-cyan-500/20"></div>
    <!-- Blobs animés -->
    <div class="absolute top-10 left-20 w-64 h-64 bg-purple-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
    <div class="absolute top-20 right-32 w-72 h-72 bg-yellow-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
  </div>

  <!-- Contenu principal -->
  <div class="max-w-4xl mx-auto text-center relative z-10">
    <!-- Badge "Nouveau" -->
    <div class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
      <svg class="w-5 h-5 mr-2 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="text-sm font-medium text-white">Publication rapide</span>
    </div>

    <!-- Titre principal avec effet de dégradé animé -->
    <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100 animate-gradient-text">
      <span class="block">Publiez une <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">offre d'emploi</span></span>
      <span class="block mt-2">en seulement 2 minutes</span>
    </h1>

    <!-- Sous-titre avec animation -->
    <p class="text-xl text-emerald-50 max-w-2xl mx-auto mb-10 animate-fade-in">
      Attirez les <strong class="text-white">meilleurs talents</strong> avec notre outil ultra-rapide et notre réseau international.
    </p>

    <!-- Boutons d'action -->
    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="#publication-form"
        class="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Commencer la publication
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </a>
      <a
        href="#pricing"
        class="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        Voir les tarifs
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </div>
  </div>

  <!-- Forme décorative en bas -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
</header>

  <div class="min-h-screen pt-18 bg-gray-50">
    <!-- Hero Section -->


    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Form Section -->
        <div class="w-full lg:w-2/3">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 md:p-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Détails de l'offre</h2>
              
              <form @submit.prevent="submitJob" class="space-y-6">
                <!-- Job Title -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Titre du poste <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="job.title"
                    type="text"
                    placeholder="Ex: Développeur Full Stack Vue.js"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    required
                  />
                  <p class="mt-1 text-xs text-gray-500">Soyez spécifique (ex: "Développeur Backend Node.js" plutôt que "Développeur")</p>
                </div>

                <!-- Company & Location -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="job.company"
                      type="text"
                      placeholder="Ex: ExpatJobs Inc."
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Localisation <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="job.location"
                      type="text"
                      placeholder="Ex: Kinshasa, RDC ou Remote"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                      required
                    />
                  </div>
                </div>

                <!-- Remote Option -->
                <div class="flex items-center">
                  <input
                    id="remote"
                    v-model="job.remote"
                    type="checkbox"
                    class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label for="remote" class="ml-2 block text-sm text-gray-700">
                    Ce poste est entièrement à distance
                  </label>
                </div>

                <!-- Job Type & Experience -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Type de contrat <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="job.type"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                    >
                      <option v-for="type in jobTypes" :key="type.value" :value="type.value">
                        {{ type.label }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d'expérience <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="job.experience"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                    >
                      <option v-for="level in experienceLevels" :key="level.value" :value="level.value">
                        {{ level.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Salary & Category -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Fourchette salariale
                    </label>
                    <input
                      v-model="job.salary"
                      type="text"
                      placeholder="Ex: 30 000 - 50 000 USD/an"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                    />
                    <p class="mt-1 text-xs text-gray-500">Indiquez la devise et la périodicité (ex: 50 000 USD/an)</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="job.category"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                    >
                      <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                        {{ cat.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Benefits -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Avantages (optionnel)
                  </label>
                  <input
                    v-model="job.benefits"
                    type="text"
                    placeholder="Ex: Assurance santé, Formation, Télétravail flexible"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                  />
                </div>

                <!-- Skills -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Compétences requises
                  </label>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="skill in job.skills"
                      :key="skill"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                    >
                      {{ skill }}
                      <button
                        type="button"
                        @click="removeSkill(skill)"
                        class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-emerald-600 hover:bg-emerald-200 hover:text-emerald-900 focus:outline-none"
                      >
                        <span class="sr-only">Remove</span>
                        <svg class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  </div>
                  
                  <div class="mb-3">
                    <p class="text-xs text-gray-500 mb-2">Sélectionnez des compétences :</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="skill in availableSkills"
                        :key="skill"
                        type="button"
                        @click="addSkill(skill)"
                        :class="{
                          'bg-gray-100 text-gray-800 hover:bg-gray-200': !job.skills.includes(skill),
                          'bg-emerald-100 text-emerald-800': job.skills.includes(skill)
                        }"
                        class="px-3 py-1 rounded-full text-sm font-medium transition duration-150 ease-in-out"
                      >
                        {{ skill }}
                      </button>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <input
                      v-model="customSkill"
                      @keyup.enter="addCustomSkill"
                      type="text"
                      placeholder="Ajouter une compétence personnalisée"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      @click="addCustomSkill"
                      class="px-4 py-2 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                <!-- Job Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description du poste <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="job.description"
                    rows="8"
                    placeholder="Décrivez en détail les responsabilités, qualifications et avantages du poste..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition duration-200"
                    required
                  ></textarea>
                  <div class="mt-2 text-xs text-gray-500">
                    <p>Conseils pour une bonne description :</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Décrivez les missions principales</li>
                      <li>Listez les compétences et qualifications requises</li>
                      <li>Précisez les avantages et la culture d'entreprise</li>
                      <li>Utilisez des paragraphes courts et des listes à puces</li>
                    </ul>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="{
                      'bg-emerald-600 hover:bg-emerald-700': !isSubmitting,
                      'bg-emerald-400 cursor-not-allowed': isSubmitting
                    }"
                    class="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
                  >
                    <span v-if="!isSubmitting">Publier l'offre</span>
                    <span v-else class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publication en cours...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="w-full lg:w-1/3">
          <div class="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
            <div class="p-6 md:p-8 bg-gradient-to-b from-emerald-50 to-white">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Aperçu de votre offre</h2>
              
              <div class="space-y-6">
                <!-- Job Header -->
                <div>
                  <h3 class="text-lg font-bold text-gray-900 leading-tight">
                    {{ job.title || 'Titre du poste' }}
                  </h3>
                  <p class="text-emerald-600 font-medium mt-1">
                    {{ job.company || 'Nom de l\'entreprise' }}
                  </p>
                  <p class="text-gray-500 text-sm mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ job.remote ? 'Remote' : job.location || 'Localisation' }}
                  </p>
                </div>
                
                <!-- Job Meta -->
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ jobTypes.find(t => t.value === job.type)?.label || 'Type de contrat' }}
                  </span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ experienceLevels.find(l => l.value === job.experience)?.label || 'Niveau' }}
                  </span>
                  <span v-if="job.salary" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ job.salary }}
                  </span>
                  <span v-if="job.remote" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Remote
                  </span>
                </div>
                
                <!-- Skills -->
                <div v-if="job.skills.length > 0">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Compétences requises :</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in job.skills"
                      :key="skill"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
                
                <!-- Description Preview -->
                <div>
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Description :</h4>
                  <p class="text-gray-600 text-sm whitespace-pre-line">
                    {{ job.description || 'Votre description apparaîtra ici. Assurez-vous qu\'elle soit claire et attrayante.' }}
                  </p>
                </div>
                
                <!-- Benefits -->
                <div v-if="job.benefits">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Avantages :</h4>
                  <p class="text-gray-600 text-sm">
                    {{ job.benefits }}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-gray-600">
                  Votre offre sera visible immédiatement après publication.
                </p>
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
/* Animations clés */
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

@keyframes wave {
  0% { transform: translateY(0) skewY(-3deg); }
  50% { transform: translateY(-5px) skewY(-3deg); }
  100% { transform: translateY(0) skewY(-3deg); }
}

/* Classes d'animation */
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

.animate-wave {
  animation: wave 5s ease-in-out infinite;
}

/* Responsive */
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
