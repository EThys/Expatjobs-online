<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Effets de fond animés (optionnel) -->
    <div class="absolute inset-0 overflow-hidden -z-10">
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-reverse"
      ></div>
    </div>

    <!-- Conteneur principal -->
    <div class="max-w-3xl mx-auto text-center px-4">
      <!-- Illustration 404 -->
      <div class="mb-8 relative">
        <div class="relative inline-block">
          <!-- Illustration personnalisée -->
          <div class="w-48 h-48 mx-auto mb-6 relative">
            <!-- Forme principale (404) -->
            <div
              class="absolute top-0 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-9xl opacity-10"
            >
              404
            </div>
            <!-- Éléments décoratifs -->
            <div
              class="absolute top-8 left-0 w-16 h-24 bg-gradient-to-br from-green-400 to-teal-400 rounded-l-lg rounded-tr-lg transform -rotate-12"
            ></div>
            <div
              class="absolute bottom-8 right-0 w-20 h-20 bg-gradient-to-br from-green-300 to-teal-300 rounded-lg transform rotate-12"
            ></div>
            <!-- Personnage minimaliste -->
            <div
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-green-500 flex items-center justify-center"
            >
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <!-- Bras -->
            <div
              class="absolute top-16 left-8 w-16 h-4 bg-green-500/30 rounded-full origin-left animate-wave"
            ></div>
          </div>
        </div>

        <!-- Titre et description -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Oups ! Page introuvable</h1>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto">
          La page que vous cherchez semble avoir disparu ou n'existe pas. Pas de panique, nous
          sommes là pour vous aider !
        </p>

        <!-- Barre de recherche -->
        <div class="max-w-md mx-auto mb-8 relative">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une opportunité, une entreprise..."
              class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition-all"
              @keyup.enter="search"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <button
              @click="search"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <kbd class="px-2 py-1 bg-gray-100 text-xs rounded border border-gray-200">Entrée</kbd>
            </button>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="goBack"
            class="px-6 py-3 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon class="h-5 w-5" />
            Retour
          </button>
          <button
            @click="goHome"
            class="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white hover:from-green-700 hover:to-teal-600 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <HomeIcon class="h-5 w-5" />
            Retour à l'accueil
          </button>
        </div>

        <!-- Lien de contact -->
        <div class="mt-12 pt-6 border-t border-gray-100">
          <p class="text-gray-500 mb-2">Besoin d'aide ?</p>
          <a
            href="mailto:support@expatjobs.com"
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            <EnvelopeIcon class="h-5 w-5" />
            Contactez notre support
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation des éléments flottants */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-reverse {
  animation: float 8s ease-in-out infinite reverse;
}

/* Animation du personnage (bras) -->
@keyframes wave {
  0%, 100% { transform: origin-left rotate(0deg); }
  25% { transform: origin-left rotate(15deg); }
  75% { transform: origin-left rotate(-10deg); }
}
.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

/* Effet de survol des boutons */
button:hover {
  transform: translateY(-1px);
}

/* Transition douce */
button,
input {
  transition: all 0.3s ease;
}

/* Focus personnalisé */
input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

/* Responsive */
@media (max-width: 640px) {
  .text-9xl {
    font-size: 6rem;
  }
  .max-w-xl {
    max-width: 100%;
  }
}
</style>
