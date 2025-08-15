<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()

const goBack = () => {
  if (window.history.state.back) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  })
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4"
    style="
      background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
      background-blend-mode: overlay;
      background-size: cover;
    "
  >
    <div class="w-full max-w-md">
      <!-- Error card with animation -->
      <div
        class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-green-100 transform transition-all duration-500 hover:scale-[1.02]"
        data-aos="zoom-in"
      >
        <!-- Gradient stripe -->
        <div class="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>

        <div class="p-8 md:p-10">
          <!-- Custom SVG animation -->
          <div class="mx-auto mb-8">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="56" fill="#D1FAE5" class="animate-pulse" />
              <path
                d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z"
                stroke="#10B981"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M60 40V60"
                stroke="#10B981"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="animate-bounce"
              />
              <path
                d="M60 80H60.04"
                stroke="#10B981"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <!-- Title and message (bilingual) -->
          <div class="text-center mb-8">
            <h1
              class="text-3xl md:text-4xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600"
            >
              Access Restricted
            </h1>
            <p class="text-lg text-gray-600 mb-2">
              Sorry, you don't have permission to access this resource.
            </p>
          </div>

          <!-- Animated separator -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 bg-white text-sm text-gray-500"> What would you like to do? </span>
            </div>
          </div>

          <!-- Main actions -->
          <div class="space-y-4 mb-6">
            <router-link
              to="/"
              class="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
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
              Return to Home
            </router-link>

            <button
              @click="goBack"
              class="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-emerald-600 border-2 border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Previous Page
            </button>
          </div>

          <!-- Support -->
          <div class="text-center pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-500 mb-2">Need help? Our team is here for you</p>
            <a
              href="mailto:support@expatjobs.com"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 rounded-lg transition-all duration-300 hover:bg-emerald-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
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
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animation for main button */
.bg-gradient-to-r {
  background-size: 200% auto;
  transition: background-position 0.5s ease;
}

.bg-gradient-to-r:hover {
  background-position: right center;
}

/* SVG animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Bounce animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 1.5s ease-in-out infinite;
}
</style>
