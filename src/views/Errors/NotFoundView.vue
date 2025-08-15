<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 flex items-start justify-center p-4 pt-20"
  >
    <div class="w-full max-w-md text-center" data-aos="fade-up" data-aos-duration="800">
      <!-- Error Card -->
      <div
        class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-2xl"
      >
        <!-- Colored bar -->
        <div class="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>

        <div class="p-8 md:p-10">
          <!-- 404 Illustration -->
          <div class="relative mx-auto mb-8 w-48 h-48" data-aos="zoom-in">
            <div class="absolute inset-0 bg-emerald-100 rounded-full opacity-20"></div>
            <div class="absolute inset-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-32 w-32 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div
              class="absolute bottom-0 right-0 bg-white rounded-full shadow-md w-16 h-16 flex items-center justify-center"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <span class="text-2xl font-bold text-emerald-600">404</span>
            </div>
          </div>

          <!-- Title and message -->
          <h1
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Page Not Found
          </h1>
          <p class="text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="200">
            Oops! The page you're looking for seems to have vanished into thin air.
          </p>
          <div
            class="w-20 h-1 bg-emerald-500 rounded-full mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          ></div>

          <!-- Actions -->
          <div class="space-y-4">
            <router-link
              to="/"
              class="block w-full px-5 py-3 text-center font-medium text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i class="fas fa-home mr-2"></i> Return to Homepage
            </router-link>

            <button
              @click="goBack"
              class="w-full px-5 py-3 text-center font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <i class="fas fa-arrow-left mr-2"></i> Go Back
            </button>

            <div class="pt-4 border-t border-gray-200" data-aos="fade-up" data-aos-delay="600">
              <p class="text-sm text-gray-500 mb-2">Looking for something specific?</p>
              <div class="relative max-w-xs mx-auto">
                <input
                  type="text"
                  placeholder="Search our site..."
                  class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                <button
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'

const router = useRouter()

const goBack = () => {
  if (window.history.state.back) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  // Initialize AOS
  AOS.init({
    once: true, // Animations will only happen once
    easing: 'ease-out-quad',
    duration: 800,
  })

  // Scroll to top when component mounts
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* Animation for the illustration */
svg {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Transition for buttons */
button,
a {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Style for search input */
input {
  transition: all 0.2s ease;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
</style>
