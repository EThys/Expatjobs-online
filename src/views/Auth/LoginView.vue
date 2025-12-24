<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArrowRightIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, HomeIcon } from '@heroicons/vue/24/outline';
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import type { IUser, IUserAuth } from '@/utils/interface/user/IUser'
//@ts-ignore
import type { IToken } from '@/utils/interface/token'
//@ts-ignore
import { useNotif } from '@/composables/useNotif';
import { setToken} from '@/stores/token';
import { setUser} from '@/stores/user';


const router = useRouter();
const { t } = useI18n();
const { notifyError } = useNotif();
const loading = ref(false);
const showPassword = ref(false);
const auth = ref<IUserAuth>({
  login: '',
  password: ''
})


const login = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(auth.value))
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    notifyError(t('auth.login.errors.network'));
  }, 30000)

  try {
    const response = await useAxiosRequestWithToken()
      .post(`${ApiRoutes.login}`, data, { signal: abortSignal })

    clearTimeout(networkTimeout)
    
    if (response.data.jwt) {
      const authData = {
        jwt: response.data.jwt,
        user: response.data.user,
        timestamp: new Date().toISOString(),
        expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
      }
      localStorage.setItem('auth_data', JSON.stringify(authData))
      setToken(response.data.jwt)
    }
    
    if (response.data.user) {
      setUser(response.data.user)
    }

    // Force navbar reload
    window.dispatchEvent(new Event('storage'))
    
    // Toast removed as requested
    
    setTimeout(() => {
      router.push('/')
    }, 800)
    
  } catch (error: any) {
    clearTimeout(networkTimeout)
    console.error('ERREUR:', error);
    notifyError(error.response?.data?.message || t('auth.login.errors.credentials'));
  } finally {
    loading.value = false
  }
}

const loginValidate = async () => {
  if (!auth.value.login || !auth.value.password) {
    notifyError(t('auth.login.errors.fillAll'));
    return
  }
  await login()
}

</script>

<template>
  <div class="min-h-screen w-full flex items-stretch overflow-hidden bg-white">
    
    <!-- Left Side: Login Form -->
    <div class="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 bg-white/80 backdrop-blur-md">
      
      <!-- Logo & Home Link -->
      <div class="absolute top-8 left-8 flex items-center gap-4">
        <router-link to="/" class="group flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all duration-300">
           <HomeIcon class="w-5 h-5 group-hover:scale-110 transition-transform" />
        </router-link>
      </div>

      <div class="w-full max-w-md mx-auto animate-fade-in-up">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 mb-6 transform hover:rotate-6 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">{{ t('auth.login.welcomeBack') }}</h1>
          <p class="text-gray-500">{{ t('auth.login.manageCareer') }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="loginValidate" class="space-y-6">
          
          <div class="space-y-5">
            <div class="group relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <EnvelopeIcon class="h-5 w-5" />
              </div>
              <input
                v-model="auth.login"
                type="text"
                class="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-300"
                :placeholder="t('auth.login.emailPlaceholder')"
                required
              />
            </div>

            <div class="group relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <LockClosedIcon class="h-5 w-5" />
              </div>
              <input
                v-model="auth.password"
                :type="showPassword ? 'text' : 'password'"
                class="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-300"
                :placeholder="t('auth.login.passwordPlaceholder')"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center group cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-colors cursor-pointer" />
              <span class="ml-2 text-gray-500 group-hover:text-gray-700 transition-colors">{{ t('auth.login.rememberMe') }}</span>
            </label>
            <a href="#" class="font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-all">{{ t('auth.login.forgotPassword') }}</a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full relative flex items-center justify-center py-4 px-8 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
          >
             <!-- Shine Effect -->
             <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
            
            <template v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ t('auth.login.loading') }}
            </template>
            <template v-else>
              {{ t('auth.login.submitButton') }}
              <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </template>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            {{ t('auth.login.noAccount') }}
            <router-link to="/register" class="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all">
              {{ t('auth.login.createAccount') }}
            </router-link>
          </p>
        </div>
      </div>
    
      <!-- Footer Text -->
      <div class="absolute bottom-6 text-center w-full">
        <p class="text-xs text-gray-400">&copy; {{ new Date().getFullYear() }} EXPAT JOBS Go. All rights reserved.</p>
      </div>
    </div>

    <!-- Right Side: Decorative Image -->
    <div class="hidden lg:block lg:w-1/2 xl:w-7/12 relative bg-gray-900 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]"></div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-slate-900/80 to-slate-900/90 mix-blend-multiply"></div>
      
      <!-- Blobs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

      <!-- Content -->
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-12 z-10">
         <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-lg shadow-2xl animate-fade-in-up delay-200">
            <h2 class="text-4xl font-black text-white mb-6 leading-tight">
              {{ t('auth.login.sideTitle') }} <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">{{ t('auth.login.sideHighlight') }}</span>
            </h2>
            <p class="text-lg text-emerald-50 font-medium leading-relaxed mb-8">
              {{ t('auth.login.sideDescription') }}
            </p>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span class="block text-2xl font-bold text-white">10K+</span>
                <span class="text-xs text-emerald-200 uppercase tracking-wider">{{ t('auth.login.stats.offers') }}</span>
              </div>
              <div>
                <span class="block text-2xl font-bold text-white">50+</span>
                <span class="text-xs text-emerald-200 uppercase tracking-wider">{{ t('auth.login.stats.countries') }}</span>
              </div>
              <div>
                <span class="block text-2xl font-bold text-white">100%</span>
                <span class="text-xs text-emerald-200 uppercase tracking-wider">{{ t('auth.login.stats.verified') }}</span>
              </div>
            </div>
         </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.delay-200 {
  animation-delay: 200ms;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
