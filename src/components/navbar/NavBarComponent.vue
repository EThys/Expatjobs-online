<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getAuthData, clearAuthData, getUser } from '@/stores/authStorage'
import type { IUser } from '@/utils/interface/user/IUser'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import { useLanguage } from '@/composables/useLanguage'
import { JobType } from '@/utils/interface/IJobOffers'

const toast = useToast()
const { t } = useI18n()
const { currentLocale, availableLocales, changeLocale } = useLanguage()
const languageDropdownOpen = ref(false)
const router = useRouter()
const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const hoverTimeout = ref<number | null>(null)
const userDropdownOpen = ref(false)
const currentUser = ref<IUser | null>(null)

const isMobile = computed(() => windowWidth.value < 1024)
const isLoggedIn = computed(() => currentUser.value !== null)

const jobTypeLinks = computed(() => [
  { value: JobType.FULL_TIME, label: 'CDI (Temps plein)' },
  { value: JobType.PART_TIME, label: 'Temps partiel' },
  { value: JobType.CONTRACT, label: 'Contrat (CDD)' },
  { value: JobType.INTERNSHIP, label: 'Stage' },
  { value: JobType.FREELANCE, label: 'Freelance' },
])

const parseUser = (userData: any): IUser => {
  const validRoles = ['CANDIDATE', 'RECRUITER', 'ADMIN'] as const
  const role = validRoles.includes(userData.role) ? userData.role : 'CANDIDATE'

  return {
    id: userData.id,
    email: userData.email,
    phone: userData.phone,
    role: role,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  }
}

const loadUser = () => {
  const authData = getAuthData()
  if (authData) {
    currentUser.value = parseUser(authData.user)
  } else {
    const userString = localStorage.getItem('user')
    if (userString) {
      try {
        const userData = JSON.parse(userString)
        currentUser.value = parseUser(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        currentUser.value = null
      }
    } else {
      currentUser.value = null
    }
  }
}
const canPostJob = computed(() => {
  if (!currentUser.value) return false
  const userRole = currentUser.value.role?.toLowerCase()
  return userRole === 'recruiter' || userRole === 'admin'
})

const logout = () => {
  clearAuthData()
  currentUser.value = null
  userDropdownOpen.value = false
  closeAllDropdowns()
  localStorage.removeItem('token_app')
  localStorage.removeItem('user_app')

  // toast.open({
  //   message: 'Déconnexion réussie',
  //   type: 'success',
  //   position: 'bottom',
  //   duration: 3000
  // })

  router.push('/')
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  if (userDropdownOpen.value) {
    activeDropdown.value = null
  }
}
const openUserDropdown = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  userDropdownOpen.value = true
  activeDropdown.value = null
}

const closeUserDropdown = () => {
  if (!isMobile.value) {
    hoverTimeout.value = window.setTimeout(() => {
      userDropdownOpen.value = false
    }, 300)
  }
}

const cancelUserDropdownClose = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) {
    isMobileMenuOpen.value = false
    activeDropdown.value = null
  }
}

const toggleDropdown = (menu: string) => {
  if (activeDropdown.value === menu) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = menu
    userDropdownOpen.value = false
  }
}

const openDropdown = (menu: string) => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  if (!isMobile.value) {
    activeDropdown.value = menu
    userDropdownOpen.value = false
  }
}

const closeDropdown = () => {
  if (!isMobile.value) {
    hoverTimeout.value = window.setTimeout(() => {
      activeDropdown.value = null
    }, 200)
  }
}

const cancelDropdownClose = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const closeAllDropdowns = () => {
  activeDropdown.value = null
  userDropdownOpen.value = false
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

watch(
  () => router.currentRoute.value.path,
  () => {
    closeAllDropdowns()
  },
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  loadUser()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }
})
</script>

<template>
  <!-- Navbar Ultra-Moderne avec Glassmorphism -->
  <header class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500">
    <!-- Barre promotionnelle élégante -->
    <div
      v-if="!isLoggedIn"
      class="bg-gradient-to-r from-emerald-600/95 via-emerald-700/95 to-green-600/95 backdrop-blur-xl text-white py-2 sm:py-3 px-4 sm:px-6 border-b border-emerald-400/20 text-xs sm:text-sm"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 bg-emerald-400/30 rounded-full flex items-center justify-center">
            <svg
              class="w-3 h-3 text-emerald-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span class="font-medium text-emerald-50">{{
            t('nav.promoText', "50K+ offres d'emploi internationales disponibles")
          }}</span>
        </div>
        <div class="h-4 w-px bg-emerald-300/50"></div>
        <router-link
          to="/register"
          class="font-semibold hover:text-emerald-200 transition-all duration-200 flex items-center gap-1 group"
          @click="closeAllDropdowns"
        >
          {{ t('nav.joinUs', 'Rejoignez-nous gratuitement') }}
          <svg
            class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Navbar principale avec glassmorphism -->
    <nav
      class="navbar-professional bg-white/80 backdrop-blur-2xl border-b border-emerald-100/30 transition-all duration-300"
      :class="{ 'bg-white/90 shadow-xl shadow-emerald-500/10': isScrolled }"
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo et marque -->
          <div class="flex items-center">
            <router-link
              to="/"
              class="flex items-center space-x-3 group"
              @click="closeAllDropdowns"
            >
              <div class="relative">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110"
                >
                  <span class="text-white font-bold text-lg">E</span>
                </div>
                <div
                  class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
                ></div>
              </div>
              <div class="flex flex-col">
                <span
                  class="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-green-600 transition-all duration-300"
                >
                  EXPAT JOBS Go
                </span>
                <span class="text-xs text-emerald-600 font-medium -mt-1 opacity-80"
                  >International</span
                >
              </div>
            </router-link>
          </div>
          <!-- Navigation principale minimaliste -->
          <div class="hidden lg:flex items-center space-x-8">
            <!-- Accueil -->
            <router-link
              to="/"
              class="relative px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 group rounded-lg hover:bg-emerald-50/50"
              active-class="text-emerald-600 bg-emerald-50/50"
              @click="closeAllDropdowns"
            >
              <span class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {{ t('nav.home') }}
              </span>
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-full transition-all duration-300"
                :class="{ 'w-full': $route.path === '/' }"
              ></div>
            </router-link>

            <!-- Menu Emplois -->
            <div
              class="relative group"
              @mouseenter="openDropdown('jobs')"
              @mouseleave="closeDropdown"
            >
              <button
                @click="toggleDropdown('jobs')"
                class="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 group rounded-lg hover:bg-emerald-50/50"
                :class="{ 'text-emerald-600 bg-emerald-50/50': activeDropdown === 'jobs' }"
              >
                <span class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {{ t('nav.jobs') }}
                </span>
                <svg
                  class="ml-1 w-4 h-4 transition-transform duration-300"
                  :class="{ 'rotate-180': activeDropdown === 'jobs' }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown glassmorphism -->
              <div
                v-show="activeDropdown === 'jobs'"
                class="absolute left-0 mt-2 w-[22rem] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-emerald-100/50 overflow-hidden z-50"
                @mouseenter="cancelDropdownClose"
                @mouseleave="closeDropdown"
              >
                <div class="p-6 space-y-4">
                  <div class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    Explorer les offres
                  </div>

                  <!-- Tous les emplois -->
                  <router-link
                    to="/jobs"
                    class="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-200 group"
                    @click="closeAllDropdowns"
                  >
                    <div
                      class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-all duration-200"
                    >
                      <svg
                        class="w-6 h-6 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold">{{ t('nav.allJobs') }}</div>
                      <div class="text-sm text-gray-500">
                        50K+ {{ t('common.opportunities', 'opportunities') }}
                      </div>
                    </div>
                  </router-link>

                  <!-- Séparateur -->
                  <div class="border-t border-gray-100 pt-3 mt-1">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Par type de contrat
                      </span>
                    </div>

                    <!-- Liens par JobType -->
                    <div class="space-y-1">
                      <router-link
                        v-for="type in jobTypeLinks"
                        :key="type.value"
                        :to="{ name: 'jobsByType', query: { type: type.value } }"
                        class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-all duration-200 group"
                        @click="closeAllDropdowns"
                      >
                        <div
                          class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-3 group-hover:bg-emerald-100 transition-all duration-200"
                        >
                          <span class="text-[10px] font-semibold text-emerald-700">
                            {{ type.label.split(' ')[0] }}
                          </span>
                        </div>
                        <div class="flex-1 flex items-center justify-between">
                          <span class="font-medium">{{ type.label }}</span>
                          <svg
                            class="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Menu Recruteur (Publier + Mes offres) -->
            <div
              v-if="canPostJob"
              class="relative group"
              @mouseenter="openDropdown('recruiter')"
              @mouseleave="closeDropdown"
            >
              <button
                @click="toggleDropdown('recruiter')"
                class="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 rounded-lg hover:bg-emerald-50/50"
                :class="{ 'text-emerald-600 bg-emerald-50/50': activeDropdown === 'recruiter' }"
              >
                <span class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Recruteur</span>
                </span>
                <svg
                  class="ml-1 w-4 h-4 transition-transform duration-300"
                  :class="{ 'rotate-180': activeDropdown === 'recruiter' }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                v-show="activeDropdown === 'recruiter'"
                class="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-emerald-100/50 overflow-hidden z-50"
                @mouseenter="cancelDropdownClose"
                @mouseleave="closeDropdown"
              >
                <div class="py-2">
                  <router-link
                    to="/postjob"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                    @click="closeAllDropdowns"
                  >
                    <div
                      class="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-medium">Publier une offre</span>
                      <span class="text-xs text-gray-500">Créer une nouvelle annonce</span>
                    </div>
                  </router-link>

                  <router-link
                    to="/my-jobs"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                    @click="closeAllDropdowns"
                  >
                    <div
                      class="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-medium">Mes offres</span>
                      <span class="text-xs text-gray-500">Gérer vos publications</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Contact -->
            <router-link
              to="/contact"
              class="relative px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 group rounded-lg hover:bg-emerald-50/50"
              active-class="text-emerald-600 bg-emerald-50/50"
              @click="closeAllDropdowns"
            >
              <span class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact
              </span>
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-full transition-all duration-300"
                :class="{ 'w-full': $route.path === '/contact' }"
              ></div>
            </router-link>
          </div>

          <!-- Sélecteur de langue pour utilisateur connecté -->
          <div v-if="isLoggedIn" class="flex items-center ml-4 mr-4">
            <div
              class="relative"
              @mouseenter="languageDropdownOpen = true"
              @mouseleave="languageDropdownOpen = false"
            >
              <button
                @click="languageDropdownOpen = !languageDropdownOpen"
                class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-200 rounded-lg hover:bg-emerald-50/50"
              >
                <span class="text-lg">{{
                  availableLocales.find((l) => l.code === currentLocale)?.flag || '🌐'
                }}</span>
                <span class="hidden sm:inline text-sm font-medium">{{
                  availableLocales.find((l) => l.code === currentLocale)?.code.toUpperCase() || 'FR'
                }}</span>
                <svg
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': languageDropdownOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown des langues -->
              <transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 scale-95 translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-2"
              >
                <div
                  v-show="languageDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-emerald-100/50 overflow-hidden z-50"
                >
                  <div class="py-2">
                    <button
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      @click="
                        changeLocale(locale.code);
                        languageDropdownOpen = false;
                      "
                      class="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                      :class="{ 'bg-emerald-50 text-emerald-600': currentLocale === locale.code }"
                    >
                      <span class="text-xl">{{ locale.flag }}</span>
                      <span class="font-medium flex-1">{{ locale.name }}</span>
                      <svg
                        v-if="currentLocale === locale.code"
                        class="w-4 h-4 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Profil utilisateur connecté -->
          <div v-if="isLoggedIn" class="flex items-center">
            <div
              class="relative group"
              @mouseenter="openUserDropdown"
              @mouseleave="closeUserDropdown"
            >
              <button
                @click="toggleUserDropdown"
                class="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer"
              >
                <div class="relative">
                  <div
                    class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <div
                    class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"
                  ></div>
                </div>

                <div class="hidden md:flex flex-col items-start min-w-0">
                  <span
                    class="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors"
                  >
                    {{ currentUser?.email?.split('@')[0] || 'User' }}
                  </span>
                  <span
                    class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium capitalize"
                  >
                    {{ currentUser?.role?.toLowerCase() || 'user' }}
                  </span>
                </div>

                <svg
                  class="w-4 h-4 text-gray-500 group-hover:text-emerald-600 transition-colors"
                  :class="{ 'rotate-180': userDropdownOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown du profil -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 scale-95 translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-2"
              >
                <div
                  v-show="userDropdownOpen"
                  class="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-100/50 overflow-hidden z-50"
                  @mouseenter="cancelUserDropdownClose"
                  @mouseleave="closeUserDropdown"
                >
                  <!-- Header du profil -->
                  <div
                    class="px-6 py-5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100/50"
                  >
                    <div class="flex items-center gap-4">
                      <div class="relative">
                        <div
                          class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        >
                          {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                        <div
                          class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                        ></div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-base font-semibold text-gray-900 truncate">
                          {{ currentUser?.email?.split('@')[0] || 'User' }}
                        </p>
                        <p class="text-sm text-emerald-600 font-medium capitalize">
                          {{ t('nav.account') }} {{ currentUser?.role?.toLowerCase() }}
                        </p>
                        <p class="text-xs text-gray-500 truncate mt-1">
                          {{ currentUser?.email }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Menu d'actions -->
                  <div class="p-3 space-y-1">
                    <router-link
                      v-if="!canPostJob"
                      to="/profile"
                      class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                      @click="closeAllDropdowns"
                    >
                      <div
                        class="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-all duration-200"
                      >
                        <svg
                          class="w-5 h-5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium">{{ t('nav.myProfile') }}</p>
                        <p class="text-xs text-gray-500">{{ t('nav.manageAccount') }}</p>
                      </div>
                    </router-link>

                    <router-link
                      v-if="canPostJob"
                      to="/company"
                      class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                      @click="closeAllDropdowns"
                    >
                      <div
                        class="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all duration-200"
                      >
                        <svg
                          class="w-5 h-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium">{{ t('nav.myCompany') }}</p>
                        <p class="text-xs text-gray-500">{{ t('nav.manageOffers') }}</p>
                      </div>
                    </router-link>

                    <router-link
                      v-if="canPostJob"
                      to="/my-jobs"
                      class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                      @click="closeAllDropdowns"
                    >
                      <div
                        class="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-all duration-200"
                      >
                        <svg
                          class="w-5 h-5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium">Mes offres</p>
                        <p class="text-xs text-gray-500">Modifier ou supprimer vos publications</p>
                      </div>
                    </router-link>
                  </div>

                  <!-- Séparateur -->
                  <div class="border-t border-gray-200 mx-3"></div>

                  <!-- Déconnexion -->
                  <div class="p-3">
                    <button
                      @click="logout"
                      class="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <div
                        class="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-all duration-200"
                      >
                        <svg
                          class="w-5 h-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium">{{ t('nav.logout') }}</p>
                        <p class="text-xs text-red-500">{{ t('nav.leaveAccount') }}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Boutons connexion/inscription modernes -->
          <div v-else class="flex items-center ml-8 space-x-4">
            <!-- Sélecteur de langue -->
            <div
              class="relative mr-2"
              @mouseenter="languageDropdownOpen = true"
              @mouseleave="languageDropdownOpen = false"
            >
              <button
                @click="languageDropdownOpen = !languageDropdownOpen"
                class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-200 rounded-lg hover:bg-emerald-50/50"
              >
                <span class="text-lg">{{
                  availableLocales.find((l) => l.code === currentLocale)?.flag || '🌐'
                }}</span>
                <span class="hidden sm:inline text-sm font-medium">{{
                  availableLocales.find((l) => l.code === currentLocale)?.code.toUpperCase() || 'FR'
                }}</span>
                <svg
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': languageDropdownOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown des langues -->
              <transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 scale-95 translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-2"
              >
                <div
                  v-show="languageDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-emerald-100/50 overflow-hidden z-50"
                >
                  <div class="py-2">
                    <button
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      @click="
                        changeLocale(locale.code);
                        languageDropdownOpen = false;
                      "
                      class="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                      :class="{ 'bg-emerald-50 text-emerald-600': currentLocale === locale.code }"
                    >
                      <span class="text-xl">{{ locale.flag }}</span>
                      <span class="font-medium flex-1">{{ locale.name }}</span>
                      <svg
                        v-if="currentLocale === locale.code"
                        class="w-4 h-4 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Bouton mobile menu -->
            <button
              v-if="isMobile"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="lg:hidden text-gray-700 focus:outline-none z-50 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              :class="{ 'text-emerald-600': isMobileMenuOpen }"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <router-link
              to="/login"
              class="hidden lg:block px-5 py-2.5 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 rounded-xl hover:bg-emerald-50/50 border border-transparent hover:border-emerald-200"
              @click="closeAllDropdowns"
            >
              {{ t('nav.login') }}
            </router-link>
            <router-link
              to="/register"
              class="hidden lg:flex bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-emerald-600/25 items-center justify-center group"
              @click="closeAllDropdowns"
            >
              <span>{{ t('nav.register') }}</span>
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar Mobile Élégante -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobile && isMobileMenuOpen"
        class="fixed inset-0 z-40 lg:hidden"
        @click="closeAllDropdowns"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Sidebar -->
        <div
          class="fixed top-0 right-0 h-full w-80 max-w-[90vw] sm:max-w-[85vw] sm:w-80 bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-emerald-100/50 transform transition-transform duration-300 overflow-y-auto"
        >
          <div class="p-4 sm:p-6">
            <!-- Header sidebar -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span class="text-white font-bold text-lg">E</span>
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-lg font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent"
                  >
                    EXPAT JOBS Go
                  </span>
                  <span class="text-xs text-emerald-600 font-medium">International</span>
                </div>
              </div>
              <button
                @click="closeAllDropdowns"
                class="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <svg
                  class="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Sélecteur de langue mobile - En haut du menu -->
            <div class="mb-6 pb-6 border-b border-gray-200">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                {{ t('common.language', 'Language') }}
              </div>
              <div class="space-y-1">
                <button
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  @click="
                    changeLocale(locale.code);
                    closeAllDropdowns();
                  "
                  class="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                  :class="{
                    'bg-emerald-50 text-emerald-600 font-semibold': currentLocale === locale.code,
                  }"
                >
                  <span class="text-xl">{{ locale.flag }}</span>
                  <span class="font-medium flex-1 text-sm">{{ locale.name }}</span>
                  <svg
                    v-if="currentLocale === locale.code"
                    class="w-4 h-4 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="space-y-2 mb-8">
              <router-link
                to="/"
                class="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-all duration-200 group"
                active-class="bg-emerald-50 text-emerald-600"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span class="font-medium">{{ t('nav.home') }}</span>
              </router-link>

              <!-- Menu Emplois mobile -->
              <div class="space-y-1">
                <button
                  @click="toggleDropdown('jobs-mobile')"
                  class="flex items-center w-full text-left px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <svg
                    class="w-5 h-5 mr-4 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="font-medium">{{ t('nav.jobs') }}</span>
                  <svg
                    class="ml-auto w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': activeDropdown === 'jobs-mobile' }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-150 ease-in"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div
                    v-show="activeDropdown === 'jobs-mobile'"
                    class="ml-9 space-y-1 overflow-hidden"
                  >
                    <router-link
                      to="/jobs"
                      class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-emerald-600 rounded-lg transition-colors"
                      @click="closeAllDropdowns"
                    >
                      {{ t('nav.allJobs') }}
                    </router-link>
                    <div class="pt-1">
                      <div class="text-[11px] uppercase tracking-wide text-gray-400 px-3 mb-1">
                        Par type de contrat
                      </div>
                      <router-link
                        v-for="type in jobTypeLinks"
                        :key="type.value"
                        :to="{ name: 'jobsByType', query: { type: type.value } }"
                        class="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 rounded-lg transition-colors"
                        @click="closeAllDropdowns"
                      >
                        {{ type.label }}
                      </router-link>
                    </div>
                  </div>
                </transition>
              </div>

              <router-link
                v-if="canPostJob"
                to="/postjob"
                class="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                active-class="bg-emerald-50 text-emerald-600"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span class="font-medium">{{ t('nav.postJob') }}</span>
              </router-link>

              <router-link
                v-if="canPostJob"
                to="/my-jobs"
                class="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                active-class="bg-emerald-50 text-emerald-600"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-medium">Gérer mes offres</span>
              </router-link>

              <router-link
                to="/contact"
                class="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                active-class="bg-emerald-50 text-emerald-600"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span class="font-medium">{{ t('nav.contact') }}</span>
              </router-link>
            </nav>

            <!-- Séparateur -->
            <div class="border-t border-gray-200 mb-6"></div>

            <!-- Boutons auth -->
            <div class="space-y-3">
              <router-link
                v-if="!isLoggedIn"
                to="/login"
                class="flex items-center justify-center px-4 py-3 text-emerald-600 border border-emerald-200 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                @click="closeAllDropdowns"
              >
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {{ t('nav.login') }}
              </router-link>
              <router-link
                v-if="!isLoggedIn"
                to="/register"
                class="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                @click="closeAllDropdowns"
              >
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                {{ t('nav.register') }}
              </router-link>

              <!-- Profil utilisateur mobile -->
              <div v-if="isLoggedIn" class="border-t border-gray-200 pt-6">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg"
                    >
                      {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div
                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 truncate">
                      {{ currentUser?.email?.split('@')[0] || 'User' }}
                    </p>
                    <p class="text-xs text-emerald-600 font-medium capitalize">
                      {{ currentUser?.role?.toLowerCase() }}
                    </p>
                  </div>
                </div>

                <div class="space-y-2">
                  <router-link
                    to="/profile"
                    class="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    @click="closeAllDropdowns"
                  >
                    <div
                      class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors"
                    >
                      <svg
                        class="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium">{{ t('nav.myProfile') }}</p>
                      <p class="text-xs text-gray-500">{{ t('nav.manageAccount') }}</p>
                    </div>
                  </router-link>

                  <button
                    @click="logout"
                    class="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div
                      class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors"
                    >
                      <svg
                        class="w-5 h-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium">{{ t('nav.logout') }}</p>
                      <p class="text-xs text-red-500">{{ t('nav.leaveAccount') }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
/* Styles pour la navbar professionnelle */
.navbar-professional {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: linear-gradient(
    90deg,
    rgba(248, 250, 252, 0.96),
    rgba(240, 253, 250, 0.96),
    rgba(248, 250, 252, 0.96)
  );
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 45px rgba(15, 118, 110, 0.12);
}

/* Animations pour les dropdowns */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Indicateur de statut en ligne */
.status-indicator {
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Effets de survol pour les liens de navigation */
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::before {
  width: 100%;
}

/* Styles pour les cartes dans les dropdowns */
.dropdown-card {
  transition: all 0.2s ease;
}

.dropdown-card:hover {
  transform: translateX(2px);
}

/* Indicateur de chargement */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .navbar-professional .nav-links {
    display: none;
  }

  .navbar-professional .mobile-menu-btn {
    display: block;
  }
}

@media (max-width: 768px) {
  header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 50 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Navbar au top sur mobile */
  nav.navbar-professional {
    position: relative !important;
    top: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  nav {
    padding: 0 !important;
    margin: 0 !important;
  }

  nav > div {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    margin: 0 !important;
  }

  nav > div > div {
    height: 3.5rem !important;
    margin: 0 !important;
  }

  /* Logo réduit sur mobile */
  nav a .w-10 {
    width: 2rem !important;
    height: 2rem !important;
  }

  nav a .text-xl {
    font-size: 1rem !important;
  }

  nav a .text-xs {
    font-size: 0.625rem !important;
  }

  /* Bouton hamburger amélioré */
  button[aria-label='Toggle menu'] {
    padding: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  button[aria-label='Toggle menu'] svg {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }
}

@media (max-width: 640px) {
  .navbar-professional {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .navbar-professional .auth-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Sidebar mobile optimisée */
  div.fixed.top-0.right-0.h-full {
    width: 100% !important;
    max-width: 100% !important;
    left: 0 !important;
    right: 0 !important;
  }

  /* Header sidebar mobile */
  div.fixed.top-0.right-0.h-full > div {
    padding: 1rem !important;
  }

  /* Navigation mobile */
  nav.space-y-2 {
    gap: 0.5rem !important;
  }

  nav.space-y-2 > * {
    padding: 0.75rem 1rem !important;
    font-size: 0.9375rem !important;
  }

  /* Boutons auth mobile */
  div.space-y-3 > * {
    padding: 0.875rem 1rem !important;
    font-size: 0.9375rem !important;
  }

  /* Profil utilisateur mobile */
  div.border-t.border-gray-200.pt-6 {
    padding-top: 1rem !important;
    margin-top: 1rem !important;
  }

  div.border-t.border-gray-200.pt-6 .w-12 {
    width: 2.5rem !important;
    height: 2.5rem !important;
    font-size: 0.875rem !important;
  }

  div.border-t.border-gray-200.pt-6 .text-sm {
    font-size: 0.8125rem !important;
  }

  div.border-t.border-gray-200.pt-6 .text-xs {
    font-size: 0.75rem !important;
  }
}

@media (max-width: 480px) {
  nav > div {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  nav > div > div {
    height: 3.25rem;
  }

  /* Logo encore plus petit */
  nav a .w-10 {
    width: 1.75rem !important;
    height: 1.75rem !important;
  }

  nav a .text-xl {
    font-size: 0.875rem !important;
  }

  nav a .text-xs {
    font-size: 0.5625rem !important;
  }

  nav a .space-x-3 {
    gap: 0.5rem !important;
  }

  /* Sidebar mobile très petit */
  div.fixed.top-0.right-0.h-full > div {
    padding: 0.875rem !important;
  }

  /* Sélecteur de langue mobile */
  div.mb-6.pb-6 {
    margin-bottom: 1rem !important;
    padding-bottom: 1rem !important;
  }

  div.mb-6.pb-6 .text-xs {
    font-size: 0.625rem !important;
    padding: 0 0.5rem !important;
  }

  div.mb-6.pb-6 button {
    padding: 0.625rem 0.75rem !important;
    font-size: 0.8125rem !important;
  }

  div.mb-6.pb-6 .text-xl {
    font-size: 1rem !important;
  }

  div.mb-6.pb-6 .text-sm {
    font-size: 0.75rem !important;
  }

  /* Navigation mobile */
  nav.space-y-2 > * {
    padding: 0.625rem 0.875rem !important;
    font-size: 0.875rem !important;
  }

  nav.space-y-2 svg {
    width: 1.125rem !important;
    height: 1.125rem !important;
  }

  /* Boutons auth mobile */
  div.space-y-3 > * {
    padding: 0.75rem 0.875rem !important;
    font-size: 0.875rem !important;
  }

  div.space-y-3 svg {
    width: 1.125rem !important;
    height: 1.125rem !important;
  }

  /* Profil utilisateur mobile */
  div.border-t.border-gray-200.pt-6 .w-12 {
    width: 2.25rem !important;
    height: 2.25rem !important;
    font-size: 0.8125rem !important;
  }

  div.border-t.border-gray-200.pt-6 .space-y-2 > * {
    padding: 0.625rem 0.875rem !important;
  }

  div.border-t.border-gray-200.pt-6 .w-10 {
    width: 2rem !important;
    height: 2rem !important;
  }

  div.border-t.border-gray-200.pt-6 .w-10 svg {
    width: 1rem !important;
    height: 1rem !important;
  }
}

@media (max-width: 380px) {
  nav > div {
    padding-left: 0.375rem;
    padding-right: 0.375rem;
  }

  nav > div > div {
    height: 3rem;
  }

  /* Logo minimal */
  nav a .w-10 {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }

  nav a .text-xl {
    font-size: 0.8125rem !important;
  }

  nav a .text-xs {
    display: none !important;
  }

  /* Sidebar mobile ultra compact */
  div.fixed.top-0.right-0.h-full > div {
    padding: 0.75rem !important;
  }

  div.mb-6.pb-6 {
    margin-bottom: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }

  nav.space-y-2 {
    gap: 0.375rem !important;
  }

  nav.space-y-2 > * {
    padding: 0.5rem 0.75rem !important;
    font-size: 0.8125rem !important;
  }

  div.space-y-3 > * {
    padding: 0.625rem 0.75rem !important;
    font-size: 0.8125rem !important;
  }
}

/* Styles pour les scrollbars personnalisés */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(16, 185, 129, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #10b981, #059669);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #059669, #047857);
}
</style>
