<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  AcademicCapIcon
} from '@heroicons/vue/24/outline';
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import type { IUser, IUserRegister } from '@/utils/interface/user/IUser'
//@ts-ignore
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter();
const toast = useToast();
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const termsAccepted = ref(false);
const userRegister = ref<IUserRegister>({
  email: '',
  phone: '',
  role: 'CANDIDATE',
  password: ''
})

const confirmPassword = ref('');

// Fonction pour gérer le changement de rôle
const setRole = (role: 'CANDIDATE' | 'RECRUITER') => {
  userRegister.value.role = role;
}

// Fonction pour basculer la visibilité du mot de passe
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}

// Fonction pour basculer la visibilité du mot de passe de confirmation
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}

// Fonction pour vérifier la force du mot de passe
const getPasswordStrength = () => {
  const password = userRegister.value.password;
  if (!password) return { strength: 0, message: '', color: 'bg-gray-200' };
  
  let strength = 0;
  let message = '';
  let color = 'bg-red-500';

  // Longueur minimale de 8 caractères
  if (password.length >= 8) strength += 20;
  
  // Longueur de 12 caractères ou plus
  if (password.length >= 12) strength += 10;
  
  // Contient des lettres minuscules
  if (/[a-z]/.test(password)) strength += 15;
  
  // Contient des lettres majuscules
  if (/[A-Z]/.test(password)) strength += 15;
  
  // Contient des chiffres
  if (/[0-9]/.test(password)) strength += 20;
  
  // Contient des caractères spéciaux
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

  // Limiter à 100%
  strength = Math.min(strength, 100);

  // Déterminer le message et la couleur selon la force
  if (strength <= 25) {
    message = 'Très faible';
    color = 'bg-red-500';
  } else if (strength <= 50) {
    message = 'Faible';
    color = 'bg-orange-500';
  } else if (strength <= 75) {
    message = 'Moyen';
    color = 'bg-yellow-500';
  } else if (strength <= 90) {
    message = 'Fort';
    color = 'bg-green-500';
  } else {
    message = 'Très fort';
    color = 'bg-green-600';
  }

  return { strength, message, color };
}

// Computed pour l'indicateur de force du mot de passe
const passwordStrength = computed(() => getPasswordStrength());

// Validation du formulaire
const registerValidate = async () => {
  loading.value = true;
  
  // Validation des champs obligatoires
  if (
    !userRegister.value?.email ||
    !userRegister.value.password ||
    !userRegister.value.phone ||
    !confirmPassword.value ||
    userRegister.value.email.trim() === '' ||
    userRegister.value.password.trim() === '' ||
    confirmPassword.value.trim() === '' ||
    userRegister.value.phone.trim() === '' 
  ) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez remplir tous les champs obligatoires!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }

  if (!termsAccepted.value) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez accepter les conditions générales!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }

  const emailforRegex = userRegister.value.email as string;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailforRegex)) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez entrer une adresse email valide!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }
  
  // Validation du téléphone (format basique)
  const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
  if (!phoneRegex.test(userRegister.value.phone)) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez entrer un numéro de téléphone valide!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }
  
  // Validation de la force du mot de passe - minimum 8 caractères
  if (userRegister.value.password.length < 8) {
    setTimeout(() => {
      toast.open({
        message: 'Le mot de passe doit contenir au moins 8 caractères!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }

  // Validation : le mot de passe ne doit pas contenir uniquement des chiffres
  const onlyDigitsRegex = /^\d+$/;
  if (onlyDigitsRegex.test(userRegister.value.password)) {
    setTimeout(() => {
      toast.open({
        message: 'Le mot de passe ne doit pas contenir uniquement des chiffres!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }

  // Validation : le mot de passe ne doit pas être trop faible
  if (passwordStrength.value.strength <= 25) {
    setTimeout(() => {
      toast.open({
        message: 'Le mot de passe est trop faible. Utilisez des lettres, chiffres et caractères spéciaux.',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }
  
  // Validation de la correspondance des mots de passe
  if (userRegister.value.password !== confirmPassword.value) {
    setTimeout(() => {
      toast.open({
        message: 'Les mots de passe ne correspondent pas!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    }, 300);
    return;
  }
  
  await register();
}

const register = async () => {
  loading.value = true;
  const data = JSON.parse(JSON.stringify(userRegister.value));
  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  const networkTimeout = setTimeout(() => {
    abortController.abort();
    loading.value = false;
    toast.open({
      message: 'Network Error, please check your internet.',
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
  }, 30000);

  const fullUrl = `http://localhost:8080/api/${ApiRoutes.register}`;
  console.log('URL de la requête:', fullUrl);
  console.log('Données envoyées:', data);

  console.log('🔍 DONNÉES À ENVOYER:', data);
  console.log('🔍 Type de données:', typeof data);
  console.log('🔍 Structure complète:', JSON.stringify(data, null, 2));

  await useAxiosRequestWithToken()
    .post(`${ApiRoutes.register}`, data, { signal: abortSignal })
    .then(function (response) {
      clearTimeout(networkTimeout);
      toast.open({
        message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
        type: 'success',
        position: 'bottom',
        duration: 5000
      });
      
      loading.value = false;

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    })
    .catch(function (error) {
      clearTimeout(networkTimeout);
      console.error('❌ ERREUR COMPLÈTE:', error);
      console.error('❌ Données de réponse erreur:', error.response?.data);
      toast.open({
        message: error.response?.data?.message || 'Erreur lors de l\'inscription',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
      loading.value = false;
    });
}

// Indicateurs de qualité du mot de passe
const passwordRequirements = computed(() => {
  const password = userRegister.value.password;
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password)
  };
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden -z-10">
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-green-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -top-10 right-1/3 w-72 h-72 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="w-full max-w-5xl mx-auto relative z-10">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="relative p-10 bg-gradient-to-br from-green-600 to-teal-500 text-white overflow-hidden hidden md:block">
            <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div class="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
              <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
              </div>
              <h1 class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">Expat<span class="font-light">Jobs</span></h1>
              <p class="text-green-100/90 mb-8 max-w-xs">Rejoignez notre communauté professionnelle et accédez à des opportunités mondiales.</p>
              <div class="absolute bottom-6 left-6 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"></div>
              <div class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
            </div>
          </div>
          <div class="p-8 sm:p-12">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold text-gray-800 mb-1 text-center">Créer un compte</h2>
              <p class="text-gray-500 text-sm mb-8 text-center">Rejoignez notre communauté et accédez à des opportunités exclusives.</p>

              <form @submit.prevent="registerValidate" class="space-y-5">
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-700">Je suis :</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="setRole('CANDIDATE')"
                      :class="[
                        'p-4 border-2 cursor-pointer rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2',
                        userRegister.role === 'CANDIDATE'
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-25'
                      ]"
                    >
                      <AcademicCapIcon class="h-6 w-6" />
                      <span class="font-medium">Candidat</span>
                      <span class="text-xs text-gray-500 text-center">Je cherche un emploi</span>
                    </button>

                    <button
                      type="button"
                      @click="setRole('RECRUITER')"
                      :class="[
                        'p-4 border-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2',
                        userRegister.role === 'RECRUITER'
                          ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:bg-teal-25'
                      ]"
                    >
                      <BriefcaseIcon class="h-6 w-6" />
                      <span class="font-medium">Recruteur</span>
                      <span class="text-xs text-gray-500 text-center">Je recrute des talents</span>
                    </button>
                  </div>
                
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                    
                  />
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="userRegister.email"
                    type="email"
                    placeholder="Adresse email"
                    class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                    required
                  />
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="userRegister.phone"
                    type="tel"
                    placeholder="Téléphone"
                    class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                    required
                  />
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="userRegister.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Mot de passe"
                    class="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-500"
                  >
                    <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
                  </button>
                </div>

                <!-- Indicateur de force du mot de passe -->
                <div v-if="userRegister.password" class="space-y-3">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-gray-500">Force du mot de passe:</span>
                    <span :class="{
                      'text-red-500': passwordStrength.strength <= 25,
                      'text-orange-500': passwordStrength.strength > 25 && passwordStrength.strength <= 50,
                      'text-yellow-500': passwordStrength.strength > 50 && passwordStrength.strength <= 75,
                      'text-green-500': passwordStrength.strength > 75
                    }">
                      {{ passwordStrength.message }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      :class="passwordStrength.color"
                      class="h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${passwordStrength.strength}%` }"
                    ></div>
                  </div>
                  
                  <!-- Exigences du mot de passe -->
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="flex items-center gap-1">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        passwordRequirements.length ? 'bg-green-500' : 'bg-gray-300'
                      ]"></div>
                      <span :class="passwordRequirements.length ? 'text-green-600' : 'text-gray-500'">
                        8 caractères min
                      </span>
                    </div>
                    <div class="flex items-center gap-1">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        passwordRequirements.uppercase ? 'bg-green-500' : 'bg-gray-300'
                      ]"></div>
                      <span :class="passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'">
                        Majuscule
                      </span>
                    </div>
                    <div class="flex items-center gap-1">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        passwordRequirements.lowercase ? 'bg-green-500' : 'bg-gray-300'
                      ]"></div>
                      <span :class="passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'">
                        Minuscule
                      </span>
                    </div>
                    <div class="flex items-center gap-1">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        passwordRequirements.number ? 'bg-green-500' : 'bg-gray-300'
                      ]"></div>
                      <span :class="passwordRequirements.number ? 'text-green-600' : 'text-gray-500'">
                        Chiffre
                      </span>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-gray-500 mt-1">Minimum 8 caractères avec majuscules, minuscules et chiffres</p>

                <!-- Confirmation mot de passe -->
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirmer le mot de passe"
                    class="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    @click="toggleConfirmPasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-500"
                  >
                    <component :is="showConfirmPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
                  </button>
                </div>

                <!-- Indicateur de correspondance des mots de passe -->
                <div v-if="userRegister.password && confirmPassword" class="text-xs">
                  <span v-if="userRegister.password === confirmPassword" class="text-green-600 flex items-center">
                    <ShieldCheckIcon class="h-4 w-4 mr-1" />
                    Les mots de passe correspondent
                  </span>
                  <span v-else class="text-red-600">
                    Les mots de passe ne correspondent pas
                  </span>
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      v-model="termsAccepted"
                      type="checkbox"
                      class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-medium text-gray-600">
                      J'accepte les
                      <a href="#" class="text-green-600 hover:text-green-500 underline">conditions générales</a>
                    </label>
                  </div>
                </div>

  
                <button
                  type="submit"
                  :disabled="loading || !termsAccepted"
                  class="w-full cursor-pointer py-3 px-6 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10 flex items-center">
                    <template v-if="!loading">
                      <span>S'inscrire en tant que {{ userRegister.role === 'CANDIDATE' ? 'Candidat' : 'Recruteur' }}</span>
                      <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </template>
                    <template v-else>
                      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création en cours...
                    </template>
                  </span>
                </button>

                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500"></span>
                  </div>
                </div>

                <div class="mt-6 text-center text-sm text-gray-500">
                  <p>
                    Vous avez déjà un compte ?
                    <router-link to="/login" class="font-medium text-green-600 hover:text-green-500 transition-colors">
                      Se connecter
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

button:hover {
  transform: translateY(-1px);
}

button, input {
  transition: all 0.3s ease;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  border-color: #10B981;
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}


@media (max-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  .hidden.md\:block {
    display: none;
  }
}
</style>