<script setup lang="ts">
import { ref } from 'vue';
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
  ShieldCheckIcon
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
const termsAccepted = ref(false);
const userRegister = ref<IUserRegister>({
  email: '',
  phone: '',
  role:'CANDIDATE',
  password: ''

})


const confirmPassword = ref('');


const register = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(userRegister.value))
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.open({
      message: 'Network Error, please check your internet.',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  }, 30000)

      // Debug: affichez l'URL complète
    const fullUrl = `http://localhost:8080/api/${ApiRoutes.register}`
    console.log('URL de la requête:', fullUrl)
    console.log('Données envoyées:', data)

      console.log('🔍 DONNÉES À ENVOYER:', data);
  console.log('🔍 Type de données:', typeof data);
  console.log('🔍 Structure complète:', JSON.stringify(data, null, 2));


  await useAxiosRequestWithToken()
    .post(`${ApiRoutes.register}`, data, { signal: abortSignal })
    .then(function (response) {
      clearTimeout(networkTimeout)
      toast.open({
        message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
        type: 'success',
        position: 'bottom',
        duration: 5000
      })
      
      loading.value = false

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    })
    .catch(function (error) {
      clearTimeout(networkTimeout)
          // DEBUG: Vérifiez l'erreur complète
    console.error('❌ ERREUR COMPLÈTE:', error);
    console.error('❌ Données de réponse erreur:', error.response?.data);
      toast.open({
        message: error.response?.data?.message || 'Erreur lors de l\'inscription',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    })
}

const registerValidate = async () => {
  loading.value = true
  
  if (
    !userRegister.value?.email ||
    !userRegister.value.password ||
    !userRegister.value.phone ||
    //!userRegister.value.confirmPassword ||  
    userRegister.value.email.trim() === '' ||
    userRegister.value.password.trim() === '' ||
    //userRegister.value.confirmPassword.trim() === '' ||
    userRegister.value.phone.trim() === '' 
  ) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez remplir tous les champs obligatoires!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    }, 300)
    return
  }

  const emailforRegex=userRegister.value.email
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailforRegex)) {
    setTimeout(() => {
      toast.open({
        message: 'Veuillez entrer une adresse email valide!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    }, 300)
    return
  }
  
  // Validation de la force du mot de passe
  if (userRegister.value.password.length < 6) {
    setTimeout(() => {
      toast.open({
        message: 'Le mot de passe doit contenir au moins 6 caractères!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    }, 300)
    return
  }
  
  //userRegister.value.password !== userRegister.value.confirmPassword

  // if (userRegister.value.password) {
  //   setTimeout(() => {
  //     toast.open({
  //       message: 'Les mots de passe ne correspondent pas!',
  //       type: 'error',
  //       position: 'bottom',
  //       duration: 5000
  //     })
  //     loading.value = false
  //   }, 300)
  //   return
  // }
  
  await register()
}


</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4 relative overflow-hidden">
    <!-- Effets de fond animés -->
    <div class="absolute inset-0 overflow-hidden -z-10">
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-green-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -top-10 right-1/3 w-72 h-72 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <!-- Conteneur principal -->
    <div class="w-full max-w-5xl mx-auto relative z-10">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Section visuelle (gauche) -->
          <div class="relative p-10 bg-gradient-to-br from-green-600 to-teal-500 text-white overflow-hidden hidden md:block">
            <!-- Effet de verre dépoli -->
            <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <!-- Contenu -->
            <div class="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
              <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
              </div>
              <h1 class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">Expat<span class="font-light">Jobs</span></h1>
              <p class="text-green-100/90 mb-8 max-w-xs">Rejoignez notre communauté professionnelle et accédez à des opportunités mondiales.</p>
              <!-- Éléments décoratifs -->
              <div class="absolute bottom-6 left-6 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"></div>
              <div class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
            </div>
          </div>

          <!-- Section formulaire (droite) -->
          <div class="p-8 sm:p-12">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold text-gray-800 mb-1 text-center">Créer un compte</h2>
              <p class="text-gray-500 text-sm mb-8 text-center">Rejoignez notre communauté et accédez à des opportunités exclusives.</p>

              <form @submit.prevent="registerValidate" class="space-y-5">
                <!-- Nom complet -->
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

                <!-- Email -->
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

                <!-- Téléphone -->
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

                <!-- Mot de passe -->
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
                    @click="showPassword = !showPassword"
                    class="absolute  inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-500"
                  >
                    <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">Minimum 8 caractères avec lettres et chiffres.</p>

                <!-- Confirmation mot de passe -->
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Confirmer le mot de passe"
                    class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                  
                  />
                </div>

                <!-- Conditions d'utilisation -->
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

                <!-- Bouton d'inscription -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full cursor-pointer py-3 px-6 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                >
                  <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10 flex items-center">
                    <template v-if="!loading">
                      <span>S'inscrire</span>
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

                <!-- Séparateur -->
                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">Ou continuez avec</span>
                  </div>
                </div>

                <!-- Boutons de connexion sociale -->
                <div class="grid grid-cols-3 gap-3">
                  <button type="button" class="w-full py-2 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  </button>
                  <button type="button" class="w-full py-2 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button type="button" class="w-full py-2 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-[#EA4335]" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>

                <!-- Lien de connexion -->
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
/* Animation des "blobs" en arrière-plan */
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

/* Animation du spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Effet de survol des boutons */
button:hover {
  transform: translateY(-1px);
}

/* Transition douce */
button, input {
  transition: all 0.3s ease;
}

/* Effet de focus personnalisé */
input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  border-color: #10B981;
}

/* Effet de verre dépoli */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Dégradé de texte */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Responsive : masquer la section visuelle sur mobile */
@media (max-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  .hidden.md\:block {
    display: none;
  }
}
</style>
