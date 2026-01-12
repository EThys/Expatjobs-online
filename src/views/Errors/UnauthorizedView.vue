<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  ShieldExclamationIcon,
  LockClosedIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}

const contactSupport = () => {
  window.location.href =
    'mailto:support@expatjobs.com?subject=Demande%20d%27accès%20à%20une%20page%20protégée'
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Effets de fond animés -->
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
      <!-- Illustration 403 -->
      <div class="mb-8 relative">
        <div class="relative inline-block">
          <!-- Illustration personnalisée -->
          <div class="w-48 h-48 mx-auto mb-6 relative">
            <!-- Forme principale (403) -->
            <div
              class="absolute top-0 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-9xl opacity-10"
            >
              403
            </div>
            <!-- Éléments décoratifs (cadenas) -->
            <div
              class="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-br from-green-400 to-teal-400 rounded-t-lg rounded-b-3xl"
            >
              <div
                class="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-b-lg"
              ></div>
            </div>
            <!-- Personnage minimaliste (visage triste) -->
            <div
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-green-500 flex items-center justify-center"
            >
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <!-- Bras croisés -->
            <div
              class="absolute top-16 left-8 w-16 h-4 bg-green-500/30 rounded-full origin-left rotate-45"
            ></div>
            <div
              class="absolute top-16 right-8 w-16 h-4 bg-green-500/30 rounded-full origin-right -rotate-45"
            ></div>
          </div>
        </div>

        <!-- Titre et description -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Accès refusé</h1>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto">
          Désolé, vous n'avez pas la permission d'accéder à cette page. Si vous pensez que c'est une
          erreur, contactez-nous pour obtenir les droits nécessaires.
        </p>

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

        <!-- Options supplémentaires -->
        <div class="mt-8">
          <button
            @click="contactSupport"
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            <ShieldExclamationIcon class="h-5 w-5" />
            Demander l'accès
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
            support@expatjobs.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations (identiques à la 404) */
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

/* Effet de survol des boutons */
button:hover {
  transform: translateY(-1px);
}

/* Transition douce */
button {
  transition: all 0.3s ease;
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
