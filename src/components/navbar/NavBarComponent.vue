<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const hoverTimeout = ref<number | null>(null)

const isMobile = computed(() => windowWidth.value < 1024)

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
  }
}

const openDropdown = (menu: string) => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  if (!isMobile.value) {
    activeDropdown.value = menu
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
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
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
      v-if="!isMobile"
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
                  to="/jobs"
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
                  Browse All Jobs
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
              to="/post-job"
              class="relative px-4 py-3 text-gray-700 hover:text-emerald-600 font-medium transition-colors group"
              active-class="text-emerald-600"
              @click="closeAllDropdowns"
            >
              Post a Job
              <span
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <span
                v-if="$route.path === '/post-job'"
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

          <div class="flex items-center space-x-2 ml-4">
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
            <router-link
              to="/"
              class="flex items-center py-3 px-4 rounded-lg hover:bg-emerald-50 text-gray-800 font-medium group transition-colors"
              @click="closeAllDropdowns"
              :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/' }"
            >
              <svg
                class="w-5 h-5 mr-3 text-gray-500 group-hover:text-emerald-500"
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
              Home
            </router-link>

            <div class="border-t border-gray-100 mx-4 my-1"></div>

            <button
              @click="toggleDropdown('mobile-jobs')"
              class="w-full flex justify-between items-center py-3 px-4 rounded-lg hover:bg-emerald-50 text-gray-800 font-medium transition-colors group"
              :class="{ 'bg-emerald-50 text-emerald-600': activeDropdown === 'mobile-jobs' }"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-3 text-gray-500 group-hover:text-emerald-500"
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
                Jobs
              </div>
              <svg
                class="w-4 h-4 text-gray-500 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'mobile-jobs' }"
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
              enter-to-class="opacity-100 max-h-40"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-show="activeDropdown === 'mobile-jobs'" class="pl-12 space-y-1">
                <router-link
                  to="/jobs"
                  class="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm transition-colors"
                  @click="closeAllDropdowns"
                >
                  Browse All Jobs
                </router-link>
                <router-link
                  to="/jobs/remote"
                  class="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm transition-colors"
                  @click="closeAllDropdowns"
                >
                  Remote Work
                </router-link>
                <router-link
                  to="/jobs/international"
                  class="block py-2.5 px-4 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm transition-colors"
                  @click="closeAllDropdowns"
                >
                  International Opportunities
                </router-link>
              </div>
            </transition>

            <router-link
              to="/post-job"
              class="flex items-center py-3 px-4 rounded-lg hover:bg-emerald-50 text-gray-800 font-medium group transition-colors"
              @click="closeAllDropdowns"
              :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/post-job' }"
            >
              <svg
                class="w-5 h-5 mr-3 text-gray-500 group-hover:text-emerald-500"
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
              Post a Job
            </router-link>

            <router-link
              to="/contact"
              class="flex items-center py-3 px-4 rounded-lg hover:bg-emerald-50 text-gray-800 font-medium group transition-colors"
              @click="closeAllDropdowns"
              :class="{ 'bg-emerald-50 text-emerald-600': $route.path === '/contact' }"
            >
              <svg
                class="w-5 h-5 mr-3 text-gray-500 group-hover:text-emerald-500"
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
            </router-link>

            <div class="border-t border-gray-100 mx-4 my-1"></div>

            <div class="grid grid-cols-2 gap-2 px-2">
              <router-link
                to="/login"
                class="flex items-center justify-center py-3 px-4 rounded-lg border border-emerald-600 text-emerald-600 font-medium group transition-colors hover:bg-emerald-50"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 mr-2 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </router-link>
              <router-link
                to="/register"
                class="flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-md hover:from-emerald-700 hover:to-emerald-800 transition-all"
                @click="closeAllDropdowns"
              >
                <svg
                  class="w-5 h-5 mr-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Register
              </router-link>
            </div>
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
