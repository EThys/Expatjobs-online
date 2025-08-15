<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import type { IUser } from '@/utils/interface/user/IUser'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
//@ts-ignore
import { getToken } from '@/stores/token'
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter()
const toast = useToast()
const token = getToken() as string
const loading = ref<boolean>(false)
const user = ref({
  UserName: '',
  UserPassword: '',
  UserPhone: '',
  UserEmail: '',
})
const confirmPassword = ref('')
const showPassword = ref(false)
const termsAccepted = ref(false)

const register = async () => {
  loading.value = true
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.open({
      message: 'Erreur réseau, veuillez vérifier votre connexion Internet.',
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
  }, 30000)

  try {
    const response = await useAxiosRequestWithToken(token).post(ApiRoutes.register, user.value, {
      signal: abortSignal,
    })

    clearTimeout(networkTimeout)
    toast.open({
      message: 'Inscription réussie! Veuillez vous connecter.',
      type: 'success',
      position: 'bottom',
      duration: 5000,
    })
    router.push('/login')
  } catch (error: any) {
    clearTimeout(networkTimeout)
    toast.open({
      message: error.response?.data?.message || "Erreur lors de l'inscription",
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

const validateRegister = async () => {
  if (!termsAccepted.value) {
    toast.open({
      message: 'Veuillez accepter les conditions générales',
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
    return
  }

  if (user.value.UserPassword !== confirmPassword.value) {
    toast.open({
      message: 'Les mots de passe ne correspondent pas',
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
    return
  }

  if (
    !user.value.UserName ||
    !user.value.UserEmail ||
    !user.value.UserPassword ||
    !user.value.UserPhone
  ) {
    toast.open({
      message: 'Veuillez remplir tous les champs obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
    return
  }

  await register()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <!-- Conteneur principal -->
    <div class="w-full max-w-2xl mx-4">
      <div class="flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden bg-white">
        <!-- Section visuelle (40%) -->
        <div
          class="md:w-2/5 bg-gradient-to-br from-emerald-600 to-teal-500 p-8 flex flex-col justify-center items-center text-center"
        >
          <div class="mb-8">
            <div
              class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg mx-auto mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-white tracking-tight">
              Expat<span class="font-light">Jobs</span>
            </h1>
            <p class="mt-3 text-emerald-100/90 text-lg">Global opportunities await</p>
          </div>
        </div>

        <!-- Section formulaire (60%) -->
        <div class="md:w-3/5 p-10">
          <div class="max-w-md mx-auto">
            <div class="mb-8 text-center">
              <h2 class="text-3xl font-bold text-gray-800">Create Account</h2>
              <p class="text-gray-500 mt-2 text-lg">Join our professional community</p>
            </div>

            <!-- Formulaire -->
            <form class="space-y-5" @submit.prevent="validateRegister">
              <!-- Nom complet -->
              <div>
                <label for="username" class="block text-sm font-medium text-gray-600 mb-1">
                  Full Name <span class="text-emerald-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="user.UserName"
                    id="username"
                    type="text"
                    class="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-600 mb-1">
                  Email <span class="text-emerald-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="user.UserEmail"
                    id="email"
                    type="email"
                    class="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <!-- Téléphone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-600 mb-1">
                  Phone <span class="text-emerald-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="user.UserPhone"
                    id="phone"
                    type="tel"
                    class="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="+123 456 7890"
                    required
                  />
                </div>
              </div>

              <!-- Mot de passe -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-600 mb-1">
                  Password <span class="text-emerald-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="user.UserPassword"
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="block w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    @click="showPassword = !showPassword"
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-if="showPassword"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  Minimum 8 characters with numbers and letters
                </p>
              </div>

              <!-- Confirmation mot de passe -->
              <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-600 mb-1">
                  Confirm Password <span class="text-emerald-500">*</span>
                </label>
                <input
                  v-model="confirmPassword"
                  id="confirm-password"
                  :type="showPassword ? 'text' : 'password'"
                  class="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <!-- Conditions d'utilisation -->
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    v-model="termsAccepted"
                    type="checkbox"
                    class="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-medium text-gray-600">
                    I accept the
                    <a href="#" class="text-emerald-600 hover:text-emerald-500 underline"
                      >terms and conditions</a
                    >
                  </label>
                </div>
              </div>

              <!-- Bouton d'inscription -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-medium rounded-xl shadow-md transition-all duration-300 flex items-center justify-center"
              >
                <span v-if="!loading">Sign Up</span>
                <span v-else class="flex items-center">
                  <svg
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
                  Creating account...
                </span>
              </button>
            </form>

            <!-- Lien de connexion -->
            <div class="mt-6 text-center text-sm text-gray-500">
              <p>
                Already have an account?
                <router-link to="/login" class="text-emerald-600 font-medium hover:text-emerald-500"
                  >Sign in</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation du spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transition pour les inputs */
input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Style pour le focus des inputs */
input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  outline: none;
}

/* Effet de survol sur les liens */
a {
  transition: color 0.2s ease;
}

/* Effet de flou pour la carte */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
