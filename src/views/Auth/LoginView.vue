<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import type { IUser, IUserAuth } from '@/utils/interface/user/IUser'
//@ts-ignore
import type { IToken } from '@/utils/interface/token'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
//@ts-ignore
import { setUser } from '@/stores/user'
//@ts-ignore
import { setToken } from '@/stores/token'

const router = useRouter()
const toast = useToast()
const loading = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const auth = ref<IUserAuth>({
  UserEmail: '',
  UserPassword: '',
})

const login = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(auth.value))
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.open({
      message: 'Network error, please check your internet connection.',
      type: 'error',
      position: 'bottom',
      duration: 5000,
    })
  }, 30000)

  await useAxiosRequestWithToken()
    .post(`${ApiRoutes.login}`, data, { signal: abortSignal })
    .then(function (response) {
      clearTimeout(networkTimeout)
      const token = response.data.data.token
      if (token != null) {
        setToken(token as IToken)
        setUser(response.data.data as IUser)
      }
      if (response.data.data.role === 'admin') {
        router.push('/admin/dashboard/agence')
      } else {
        router.push('/user/dashboard/mes-agences')
      }
      loading.value = false
    })
    .catch(function (error) {
      clearTimeout(networkTimeout)
      toast.open({
        message: error.response.data.message,
        type: 'error',
        position: 'bottom',
        duration: 5000,
      })
      loading.value = false
    })
}

const loginValidate = async () => {
  loading.value = true
  if (
    !auth.value.UserEmail ||
    !auth.value.UserPassword ||
    auth.value.UserEmail.trim() === '' ||
    auth.value.UserPassword.trim() === ''
  ) {
    setTimeout(() => {
      toast.open({
        message: 'Please fill in all required fields!',
        type: 'error',
        position: 'bottom',
        duration: 5000,
      })
      loading.value = false
    }, 300)
    return
  } else {
    await login()
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <!-- Conteneur principal avec ombre subtile -->
    <div class="w-full max-w-4xl mx-4">
      <div class="flex flex-col md:flex-row rounded-3xl shadow-lg overflow-hidden bg-white">
        <!-- Section visuelle (40%) avec dégradé moderne -->
        <div
          class="md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <!-- Effet de particules décoratives -->
          <div
            v-for="i in 12"
            :key="i"
            class="particle absolute rounded-full bg-white/20"
            :style="{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }"
          ></div>

          <div class="relative z-10">
            <div
              class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md mx-auto mb-6 transition-all duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
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
            <h1 class="text-3xl font-bold text-white tracking-tight mb-2">
              Expat<span class="font-light">Jobs</span>
            </h1>
            <p class="text-emerald-100/90 text-sm">Global opportunities await</p>
          </div>
        </div>

        <!-- Section formulaire (60%) avec espacement optimisé -->
        <div class="md:w-3/5 p-8 sm:p-10">
          <div class="max-w-sm mx-auto">
            <div class="mb-8 text-center">
              <h2 class="text-2xl font-semibold text-gray-800">Welcome Back</h2>
              <p class="text-gray-500 mt-1 text-sm">Sign in to access your dashboard</p>
            </div>

            <form class="space-y-5" @submit.prevent="loginValidate">
              <!-- Champ Email avec icône moderne -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-600 mb-1">
                  Email Address <span class="text-emerald-500">*</span>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                    v-model="auth.UserEmail"
                    id="email"
                    type="email"
                    class="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <!-- Champ Mot de passe avec meilleure ergonomie -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label for="password" class="block text-sm font-medium text-gray-600">
                    Password <span class="text-emerald-500">*</span>
                  </label>
                  <a
                    href="#"
                    class="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                    v-model="auth.UserPassword"
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="block w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    @click="togglePasswordVisibility"
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
              </div>

              <!-- Bouton Submit avec effet moderne -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
              >
                <span
                  class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></span>
                <span class="relative z-10 flex items-center">
                  <span v-if="!loading">Sign In</span>
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
                    Signing in...
                  </span>
                </span>
              </button>

              <!-- Séparateur social -->
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500"> Or continue with </span>
                </div>
              </div>

              <!-- Boutons sociaux simplifiés -->
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <!-- Lien d'inscription avec texte plus discret -->
            <div class="mt-6 text-center text-sm text-gray-500">
              <p>
                Don't have an account?
                <a
                  href="#"
                  class="font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation des particules */
.particle {
  animation: particle-move 8s linear infinite;
}

@keyframes particle-move {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(20px);
    opacity: 0;
  }
}

/* Transition douce pour les interactions */
button,
input,
a {
  transition:
    all 0.2s ease,
    transform 0.1s ease;
}

/* Effet de pression sur les boutons */
button:active:not(:disabled) {
  transform: scale(0.98);
}

/* Style pour le focus des inputs */
input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  outline: none;
}

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

/* Effet de flou pour la carte */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Style pour les icônes dans les inputs */
.input-icon {
  transition: color 0.2s ease;
}
</style>
