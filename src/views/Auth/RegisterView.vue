<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'
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
  AcademicCapIcon,
  HomeIcon,
  BuildingOfficeIcon,
} from '@heroicons/vue/24/outline'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import type { IUser, IUserRegister } from '@/utils/interface/user/IUser'
//@ts-ignore
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter()
const toast = useToast()
const { t } = useI18n()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const termsAccepted = ref(false)
const userRegister = ref<IUserRegister>({
  email: '',
  phone: '',
  role: 'CANDIDATE',
  password: '',
})

const confirmPassword = ref('')

const setRole = (role: 'CANDIDATE' | 'RECRUITER') => {
  userRegister.value.role = role
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Indicateur de force du mot de passe
const passwordStrength = computed(() => {
  const password = userRegister.value.password
  if (!password) return { score: 0, label: '', color: 'bg-gray-200' }

  let score = 0
  if (password.length >= 8) score += 20
  if (password.length >= 12) score += 10
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 20
  if (/[0-9]/.test(password)) score += 20
  if (/[^a-zA-Z0-9]/.test(password)) score += 20

  score = Math.min(score, 100)

  if (score < 40) return { score, label: t('auth.register.weak'), color: 'bg-red-500' }
  if (score < 75) return { score, label: t('auth.register.medium'), color: 'bg-yellow-500' }
  return { score, label: t('auth.register.strong'), color: 'bg-emerald-500' }
})

const passwordRequirements = computed(() => {
  const password = userRegister.value.password
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  }
})

const registerValidate = async () => {
  if (!userRegister.value.email || !userRegister.value.password || !confirmPassword.value) {
    toast.error(t('auth.register.errors.fillRequired'))
    return
  }
  if (!termsAccepted.value) {
    toast.error(t('auth.register.errors.acceptTerms'))
    return
  }
  if (userRegister.value.password !== confirmPassword.value) {
    toast.error(t('auth.register.errors.passwordMismatch'))
    return
  }

  await register()
}

const register = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(userRegister.value))
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.error(t('auth.register.errors.network'))
  }, 30000)

  try {
    await useAxiosRequestWithToken().post(`${ApiRoutes.register}`, data, { signal: abortSignal })

    clearTimeout(networkTimeout)
    toast.success(t('auth.register.success'))

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error: any) {
    clearTimeout(networkTimeout)
    console.error('Erreur:', error)
    toast.error(error.response?.data?.message || t('auth.login.errors.default'))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-stretch overflow-hidden bg-white">
    <!-- Left Side: Register Form -->
    <div
      class="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 bg-white/90 backdrop-blur-md overflow-y-auto"
    >
      <!-- Back Home -->
      <div class="absolute top-6 left-6 flex items-center gap-4 z-20">
        <router-link
          to="/"
          class="group flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all duration-300"
        >
          <HomeIcon class="w-5 h-5 group-hover:scale-110 transition-transform" />
        </router-link>
      </div>

      <div class="w-full max-w-lg mx-auto animate-fade-in-up py-10 lg:py-0">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            {{ t('auth.register.createTitle') }}
          </h1>
          <p class="text-gray-500">{{ t('auth.register.createSubtitle') }}</p>
        </div>

        <form @submit.prevent="registerValidate" class="space-y-6">
          <!-- Role Selection -->
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="setRole('CANDIDATE')"
              :class="[
                'relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group overflow-hidden',
                userRegister.role === 'CANDIDATE'
                  ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'border-gray-100 bg-white text-gray-500 hover:border-emerald-200 hover:bg-emerald-50/30',
              ]"
            >
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                  userRegister.role === 'CANDIDATE'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-400',
                ]"
              >
                <AcademicCapIcon class="w-6 h-6" />
              </div>
              <div class="text-center relative z-10">
                <span class="block font-bold text-sm">{{
                  t('auth.register.candidate.title')
                }}</span>
                <span class="text-xs opacity-80">{{
                  t('auth.register.candidate.description')
                }}</span>
              </div>
              <div
                v-if="userRegister.role === 'CANDIDATE'"
                class="absolute -right-2 -top-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
              >
                <span class="text-white text-xs font-bold">✓</span>
              </div>
            </button>

            <button
              type="button"
              @click="setRole('RECRUITER')"
              :class="[
                'relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group overflow-hidden',
                userRegister.role === 'RECRUITER'
                  ? 'border-cyan-500 bg-cyan-50/50 text-cyan-700 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'border-gray-100 bg-white text-gray-500 hover:border-cyan-200 hover:bg-cyan-50/30',
              ]"
            >
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                  userRegister.role === 'RECRUITER'
                    ? 'bg-cyan-100 text-cyan-600'
                    : 'bg-gray-100 text-gray-400',
                ]"
              >
                <BuildingOfficeIcon class="w-6 h-6" />
              </div>
              <div class="text-center relative z-10">
                <span class="block font-bold text-sm">{{
                  t('auth.register.recruiter.title')
                }}</span>
                <span class="text-xs opacity-80">{{
                  t('auth.register.recruiter.description')
                }}</span>
              </div>
              <div
                v-if="userRegister.role === 'RECRUITER'"
                class="absolute -right-2 -top-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-white"
              >
                <span class="text-white text-xs font-bold">✓</span>
              </div>
            </button>
          </div>

          <!-- Basic Info -->
          <div class="space-y-4">
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              >
                <EnvelopeIcon class="h-5 w-5" />
              </div>
              <input
                v-model="userRegister.email"
                type="email"
                :placeholder="t('auth.register.emailPlaceholder')"
                class="auth-input pl-11"
                required
              />
            </div>

            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              >
                <PhoneIcon class="h-5 w-5" />
              </div>
              <input
                v-model="userRegister.phone"
                type="tel"
                :placeholder="t('auth.register.phonePlaceholder')"
                class="auth-input pl-11"
                required
              />
            </div>
          </div>

          <!-- Password Section -->
          <div class="space-y-4">
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              >
                <LockClosedIcon class="h-5 w-5" />
              </div>
              <input
                v-model="userRegister.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('auth.register.passwordPlaceholder')"
                class="auth-input pl-11 pr-12"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 cursor-pointer"
              >
                <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
              </button>
            </div>

            <!-- Password Strength -->
            <div
              v-if="userRegister.password"
              class="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2"
            >
              <div class="flex justify-between text-xs font-medium text-gray-500">
                <span
                  >{{ t('auth.register.passwordStrength') }} :
                  <span :class="passwordStrength.color.replace('bg-', 'text-')">{{
                    passwordStrength.label
                  }}</span></span
                >
                <span>{{ passwordStrength.score }}%</span>
              </div>
              <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-300"
                  :class="passwordStrength.color"
                  :style="{ width: `${passwordStrength.score}%` }"
                ></div>
              </div>
              <div class="flex flex-wrap gap-2 text-[10px] text-gray-400 pt-1">
                <span :class="{ 'text-emerald-600 font-bold': passwordRequirements.length }"
                  >8+ car.</span
                >
                <span :class="{ 'text-emerald-600 font-bold': passwordRequirements.uppercase }"
                  >Majuscule</span
                >
                <span :class="{ 'text-emerald-600 font-bold': passwordRequirements.number }"
                  >Chiffre</span
                >
                <span :class="{ 'text-emerald-600 font-bold': passwordRequirements.special }"
                  >Symbole</span
                >
              </div>
            </div>

            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              >
                <LockClosedIcon class="h-5 w-5" />
              </div>
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="t('auth.register.confirmPasswordPlaceholder')"
                class="auth-input pl-11 pr-12"
                required
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 cursor-pointer"
              >
                <component :is="showConfirmPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="termsAccepted"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-colors cursor-pointer"
              />
            </div>
            <label for="terms" class="ml-3 text-sm text-gray-500">
              {{ t('auth.register.terms') }}
              <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500 underline">{{
                t('auth.register.termsLink')
              }}</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !termsAccepted"
            class="w-full relative flex items-center justify-center py-4 px-8 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
          >
            <div
              class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
            ></div>

            <template v-if="loading">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              {{ t('auth.register.loading') }}
            </template>
            <template v-else>
              {{ t('auth.register.submitButton') }}
              <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </template>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            {{ t('auth.register.alreadyAccount') }}
            <router-link
              to="/login"
              class="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
            >
              {{ t('nav.login') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side: Decorative Image (Same as Login but different content/color tweak) -->
    <div class="hidden lg:block lg:w-1/2 xl:w-7/12 relative bg-gray-900 overflow-hidden">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]"
      ></div>

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-slate-900/80 to-slate-900/90 mix-blend-multiply"
      ></div>

      <!-- Blobs -->
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"
      ></div>

      <!-- Content -->
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-12 z-10">
        <div
          class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-lg shadow-2xl animate-fade-in-up delay-200"
        >
          <h2 class="text-4xl font-black text-white mb-6 leading-tight">
            {{ t('auth.register.heroTitle') }} <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300"
              >{{ t('auth.register.heroHighlight') }}</span
            >
          </h2>
          <p class="text-lg text-emerald-50 font-medium leading-relaxed mb-6">
            {{ t('auth.register.heroDescription') }}
          </p>

          <!-- Badges removed as per previous request -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-input {
  display: block;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #f9fafb; /* bg-gray-50 */
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-radius: 0.75rem; /* rounded-xl */
  color: #111827; /* text-gray-900 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-input:focus {
  outline: none;
  background-color: #ffffff;
  border-color: #10b981; /* emerald-500 */
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.auth-input::placeholder {
  color: #9ca3af; /* text-gray-400 */
}

/* Animations reused from LoginView */
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
