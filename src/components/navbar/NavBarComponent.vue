<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getAuthData, 
  clearAuthData, 
  getUser 
} from '@/stores/authStorage'
import type { IUser } from '@/utils/interface/user/IUser'
//@ts-ignore
import { useToast } from 'vue-toast-notification'

const toast = useToast();
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

// Charger l'utilisateur au montage
const loadUser = () => {
  const authData = getAuthData()
  if (authData) {
    currentUser.value = authData.user
  } else {
    const userString = localStorage.getItem('user')
    if (userString) {
      currentUser.value = JSON.parse(userString)
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

// Se déconnecter
const logout = () => {
  clearAuthData()
  currentUser.value = null
  userDropdownOpen.value = false
  closeAllDropdowns()
  
  toast.open({
    message: 'Déconnexion réussie',
    type: 'success',
    position: 'bottom',
    duration: 3000
  })
  
  router.push('/')
}

// Basculer le dropdown utilisateur
const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  if (userDropdownOpen.value) {
    activeDropdown.value = null
  }
}

// Ouvrir le dropdown utilisateur
const openUserDropdown = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  userDropdownOpen.value = true
  activeDropdown.value = null
}

// Fermer le dropdown utilisateur
const closeUserDropdown = () => {
  if (!isMobile.value) {
    hoverTimeout.value = window.setTimeout(() => {
      userDropdownOpen.value = false
    }, 300)
  }
}

// Annuler la fermeture du dropdown utilisateur
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

// Observer les changements de route pour fermer les dropdowns
watch(() => router.currentRoute.value.path, () => {
  closeAllDropdowns()
})

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
  <!-- Navbar -->
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100"
    :class="{ 'shadow-sm': isScrolled }"
  >
    <div
      v-if="!isMobile && !isLoggedIn"
      class="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-2 px-4 text-center text-sm font-medium"
    >
      <div class="container mx-auto flex items-center justify-center gap-2">
        <span>Find your dream job or the perfect candidate - Sign up for free!</span>
        <router-link
          to="/register"
          class="ml-2 underline underline-offset-2 hover:text-emerald-100 transition-colors"
        >
          Join now
        </router-link>
      </div>
    </div>

    <!-- Main Navbar -->
    <div class="container mx-auto px-4 sm:px-6">
      <nav class="flex items-center justify-between py-3">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-2 z-50 group"
          @click="closeAllDropdowns"
        >
          <div
            class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
              <path
                d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"
              />
            </svg>
          </div>
          <span
            class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent"
            >ExpatJobs</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div v-if="!isMobile" class="hidden lg:flex items-center space-x-1">
          <div class="flex items-center space-x-1">
            <router-link
              to="/"
              class="relative px-4 py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors group"
              active-class="text-emerald-600"
              @click="closeAllDropdowns"
            >
              Home
              <span
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                v-if="$route.path === '/'"
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full"
              ></span>
            </router-link>

            <div class="relative" @mouseenter="openDropdown('jobs')" @mouseleave="closeDropdown">
              <button
                @click="toggleDropdown('jobs')"
                class="flex items-center px-4 py-3 cursor-pointer text-gray-700 hover:text-emerald-600 font-medium transition-colors group"
                :class="{ 'text-emerald-600': activeDropdown === 'jobs' }"
              >
                Jobs
                <svg
                  class="ml-1 w-4 h-4 transition-transform duration-200"
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
              <div
                v-show="activeDropdown === 'jobs'"
                class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                @mouseenter="cancelDropdownClose"
                @mouseleave="closeDropdown"
              >
                <router-link
                  to="/alljobs"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                  @click="closeAllDropdowns"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-gray-400 group-hover:text-emerald-500"
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
                  All Jobs
                </router-link>
                <router-link
                  to="/jobs/remote"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                  @click="closeAllDropdowns"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-gray-400 group-hover:text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Remote Work
                </router-link>
                <router-link
                  to="/jobs/international"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                  @click="closeAllDropdowns"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-gray-400 group-hover:text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  International Opportunities
                </router-link>
              </div>
            </div>

            <router-link
              v-if="canPostJob"
              to="/postjob"
              class="relative px-4 py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors group"
              active-class="text-emerald-600"
              @click="closeAllDropdowns"
            >
              Post a Job
              <span
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                v-if="$route.path === '/postjob'"
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full"
              ></span>
            </router-link>

            <router-link
              to="/contact"
              class="relative px-4 py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors group"
              active-class="text-emerald-600"
              @click="closeAllDropdowns"
            >
              Contact
              <span
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                v-if="$route.path === '/contact'"
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full"
              ></span>
            </router-link>
          </div>

          <!-- User Menu (Logged In) - Version améliorée -->
          <div v-if="isLoggedIn" class="flex items-center space-x-2 ml-4">
            <div class="relative" 
                 @mouseenter="openUserDropdown" 
                 @mouseleave="closeUserDropdown">
              <button
                @click="toggleUserDropdown"
                class="flex items-center space-x-3 px-4 py-2.5 rounded-xl border border-emerald-100 bg-white hover:bg-emerald-50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div class="relative">
                  <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-inner">
                    {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div class="flex flex-col items-start min-w-0 max-w-32">
                  <span class="text-sm font-semibold text-gray-800 group-hover:text-emerald-900 truncate w-full">
                    {{ currentUser?.email?.split('@')[0] || 'User' }}
                  </span>
                  <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 capitalize">
                    {{ currentUser?.role?.toLowerCase() || 'user' }}
                  </span>
                </div>
                
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:text-emerald-600"
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
              
              <!-- User Dropdown Menu -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-show="userDropdownOpen"
                  class="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl py-3 z-50 border border-gray-100 backdrop-blur-sm bg-white/95"
                  @mouseenter="cancelUserDropdownClose"
                  @mouseleave="closeUserDropdown"
                >
                  <!-- Header du dropdown -->
                  <div class="px-4 py-3 border-b border-gray-100 mb-1">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 truncate">
                          {{ currentUser?.email?.split('@')[0] || 'User' }}
                        </p>
                        <p class="text-xs text-emerald-600 font-medium capitalize mt-0.5">
                          {{ currentUser?.role?.toLowerCase() }} account
                        </p>
                        <p class="text-xs text-gray-500 truncate mt-1">
                          {{ currentUser?.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Menu Items -->
                  <div class="space-y-1 px-2">
                    <router-link
                      to="/profile"
                      class="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                      @click="closeAllDropdowns"
                    >
                      <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium">My Profile</p>
                        <p class="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </router-link>
                    
                    <router-link
                      to="/dashboard"
                      class="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                      @click="closeAllDropdowns"
                    >
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <svg
                          class="w-4 h-4 text-blue-600"
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
                      </div>
                      <div>
                        <p class="text-sm font-medium">Dashboard</p>
                        <p class="text-xs text-gray-500">View your dashboard</p>
                      </div>
                    </router-link>
                  </div>
                  
                  <div class="border-t border-gray-100 my-2"></div>
                  
                  <!-- Logout Button -->
                  <button
                    @click="logout"
                    class="flex items-center w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group mx-2"
                  >
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                      <svg
                        class="w-4 h-4 text-red-600"
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
                      <p class="text-sm font-medium">Sign Out</p>
                      <p class="text-xs text-red-500">Logout from your account</p>
                    </div>
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <!-- Login/Register Buttons (Logged Out) -->
          <div v-else class="flex items-center space-x-2 ml-4">
            <router-link
              to="/login"
              class="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors rounded-lg hover:bg-emerald-50"
              @click="closeAllDropdowns"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              @click="closeAllDropdowns"
            >
              <span class="relative z-10">Register</span>
              <span
                class="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
              ></span>
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          v-if="isMobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden text-gray-700 focus:outline-none z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
      </nav>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobile && isMobileMenuOpen"
          class="lg:hidden bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden mt-2 border border-gray-100"
        >
          <div class="px-2 pt-2 pb-4 space-y-1">
            <!-- User Info Mobile (Logged In) -->
            <div v-if="isLoggedIn" class="px-4 py-3 border-b border-gray-100 mb-2">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {{ currentUser?.email?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ currentUser?.email?.split('@')[0] || 'User' }}
                  </p>
                  <p class="text-xs text-emerald-600 font-medium capitalize mt-0.5">
                    {{ currentUser?.role?.toLowerCase() || 'user' }}
                  </p>
                  <p class="text-xs text-gray-500 truncate mt-1">
                    {{ currentUser?.email }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Rest of mobile menu remains the same -->
            <!-- ... -->
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  padding-top: 80px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>