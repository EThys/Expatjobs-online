<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
//@ts-ignore
import jobSearch from '../../assets/carousel-1.jpg'
//@ts-ignore
import hiring from '../../assets/carousel-3.jpg'
//@ts-ignore
import remoteWork from '../../assets/carousel-2.jpg'
//@ts-ignore
import careerGrowth from '../../assets/carousel-4.jpg'
//@ts-ignore
import Navbar from '../navbar/NavBarComponent.vue'

const router = useRouter()
const { t, locale } = useI18n()

const slides = computed(() => [
  {
    image: jobSearch,
    title: t('hero.slide1.title'),
    highlight: t('hero.slide1.highlight'),
    subtitle: t('hero.slide1.subtitle'),
    description: t('hero.slide1.description'),
    cta: t('hero.slide1.cta'),
  },
  {
    image: hiring,
    title: t('hero.slide2.title'),
    highlight: t('hero.slide2.highlight'),
    subtitle: t('hero.slide2.subtitle'),
    description: t('hero.slide2.description'),
    cta: t('hero.slide2.cta'),
  },
  {
    image: remoteWork,
    title: t('hero.slide3.title'),
    highlight: t('hero.slide3.highlight'),
    subtitle: t('hero.slide3.subtitle'),
    description: t('hero.slide3.description'),
    cta: t('hero.slide3.cta'),
  },
  {
    image: careerGrowth,
    title: t('hero.slide4.title'),
    highlight: t('hero.slide4.highlight'),
    subtitle: t('hero.slide4.subtitle'),
    description: t('hero.slide4.description'),
    cta: t('hero.slide4.cta'),
  },
])

const currentSlide = ref(0)
const isLoaded = ref(false)
const displayedTitle = ref('')
const displayedDescription = ref('')
const isTyping = ref(false)
let typingInterval: number | null = null

// Tous les textes pour l'animation (utilise tous les slides)
const allTexts = computed(() => {
  return slides.value.map((slide, index) => ({
    subtitle: slide.subtitle,
    description: slide.description,
    title: slide.title,
    highlight: slide.highlight,
    animationType: ['zoom', 'spin', 'fade', 'slide'][index % 4], // Alterner les types d'animations
  }))
})

// Index du texte actuellement affiché
const currentTextIndex = ref(0)
const isAnimating = ref(false)
const titleVisible = ref(false)
const subtitleVisible = ref(false)
const currentAnimationType = ref('fade')

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/jobs',
      query: { title: searchQuery.value },
    })
  }
}

// Fonction pour l'animation séquentielle : titre puis sous-titre, puis disparition
const startTypingEffect = () => {
  if (typingInterval) clearTimeout(typingInterval)
  isTyping.value = true

  const cycleTexts = () => {
    if (isAnimating.value) return

    const texts = allTexts.value
    if (texts.length === 0) return

    currentSlide.value = currentTextIndex.value // Sync slide with text
    const currentText = texts[currentTextIndex.value]
    currentAnimationType.value = currentText.animationType

    // Étape 1: Le titre apparaît et reste
    isAnimating.value = true
    titleVisible.value = false
    subtitleVisible.value = false
    displayedTitle.value = currentText.subtitle
    displayedDescription.value = currentText.description

    // Animation d'entrée du titre (petit délai pour éviter le chevauchement)
    setTimeout(() => {
      titleVisible.value = true

      // Étape 2: Le sous-titre apparaît après le titre (0.6s après pour laisser le titre s'afficher)
      setTimeout(() => {
        subtitleVisible.value = true

        // Étape 3: Après 5 secondes, les deux disparaissent ensemble
        typingInterval = setTimeout(() => {
          titleVisible.value = false
          subtitleVisible.value = false

          // Attendre la fin complète de l'animation de sortie (max 0.7s pour spin, 0.6s pour les autres)
          const leaveDuration = currentText.animationType === 'spin' ? 700 : 600
          setTimeout(() => {
            // Petit délai supplémentaire pour éviter le chevauchement visuel
            setTimeout(() => {
              isAnimating.value = false
              currentTextIndex.value = (currentTextIndex.value + 1) % texts.length
              cycleTexts() // Relancer le cycle avec le prochain texte
            }, 100)
          }, leaveDuration)
        }, 5000)
      }, 500)
    }, 100)
  }

  // Démarrer le cycle
  cycleTexts()
}

const stopTypingEffect = () => {
  if (typingInterval) {
    clearTimeout(typingInterval)
    typingInterval = null
  }
  isTyping.value = false
  isAnimating.value = false
  titleVisible.value = false
  subtitleVisible.value = false
  // Réinitialiser l'affichage avec le premier texte
  if (allTexts.value.length > 0) {
    displayedTitle.value = allTexts.value[0].subtitle
    displayedDescription.value = allTexts.value[0].description
    currentTextIndex.value = 0
    currentAnimationType.value = allTexts.value[0].animationType
  }
}

// Watch pour réagir aux changements de slide (synchroniser le texte avec l'image)
watch(
  () => currentSlide.value,
  (newSlide) => {
    // Mettre à jour le texte affiché selon le slide actuel
    if (allTexts.value.length > newSlide) {
      currentTextIndex.value = newSlide
      displayedTitle.value = allTexts.value[newSlide].subtitle
      displayedDescription.value = allTexts.value[newSlide].description
      currentAnimationType.value = allTexts.value[newSlide].animationType
      // Réinitialiser les animations pour afficher immédiatement
      titleVisible.value = true
      subtitleVisible.value = true
    }
  },
  { immediate: true },
)

// Watch pour réagir aux changements de langue
watch(
  () => locale.value,
  () => {
    // Réinitialiser l'affichage quand la langue change
    stopTypingEffect()
    // Mettre à jour les textes
    if (allTexts.value.length > 0) {
      currentTextIndex.value = 0
      displayedTitle.value = allTexts.value[0].subtitle
      displayedDescription.value = allTexts.value[0].description
      currentAnimationType.value = allTexts.value[0].animationType
    }
    // Relancer après un court délai
    setTimeout(() => {
      startTypingEffect()
    }, 500)
  },
)

// Watch pour réagir aux changements des textes (slides)
watch(
  () => allTexts.value,
  () => {
    // Réinitialiser si les textes changent
    stopTypingEffect()
    if (allTexts.value.length > 0) {
      currentTextIndex.value = 0
      displayedTitle.value = allTexts.value[0].subtitle
      displayedDescription.value = allTexts.value[0].description
      currentAnimationType.value = allTexts.value[0].animationType
      setTimeout(() => {
        startTypingEffect()
      }, 500)
    }
  },
  { deep: true },
)

onMounted(() => {
  // Trigger animation after component is mounted
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  // Démarrer l'effet typing après un court délai
  setTimeout(() => {
    startTypingEffect()
  }, 500)
})

onUnmounted(() => {
  stopTypingEffect()
})
</script>

<template>
  <Navbar />
  <div class="hero-landing relative w-full h-screen">
    <!-- Main Hero Container -->
    <div class="w-full h-full">
      <div class="relative w-full h-full overflow-hidden group">
        <!-- Carousel Background Images -->
        <div class="absolute inset-0">
          <transition-group name="fade">
            <template v-for="(slide, index) in slides" :key="index">
              <div v-show="currentSlide === index" class="absolute inset-0 w-full h-full">
                <img
                  :src="slide.image"
                  class="w-full h-full object-cover transition-transform duration-[10s] ease-linear transform scale-100 group-hover:scale-110"
                  alt="Hero Background"
                />
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"
                ></div>
              </div>
            </template>
          </transition-group>
        </div>

        <!-- Content Area -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-10 md:pb-20">
          <div class="relative z-10 max-w-3xl">
            <!-- Dynamic Text Content -->
            <transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="translate-y-4 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="-translate-y-4 opacity-0"
              mode="out-in"
            >
              <div :key="currentSlide">
                <!-- Subtitle (Small Top Text) -->
                <h2
                  class="text-lg md:text-xl font-medium text-emerald-400 mb-2 md:mb-4 tracking-wide uppercase"
                >
                  {{ allTexts[currentSlide]?.subtitle }}
                </h2>

                <!-- Main Title (Big Bottom Text) -->
                <h1
                  class="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                >
                  {{ allTexts[currentSlide]?.title }}
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300"
                  >
                    {{ allTexts[currentSlide]?.highlight }}
                  </span>
                </h1>

                <!-- Description (Optional) -->
                <p
                  class="text-slate-300 text-base md:text-lg max-w-2xl hidden md:block opacity-90 mb-8"
                >
                  {{ allTexts[currentSlide]?.description }}
                </p>

                <!-- Statistics - Consolidated -->
                <div class="flex flex-wrap items-center gap-6 md:gap-12 mt-4 md:mt-8">
                  <div class="flex flex-col">
                    <span class="text-2xl md:text-3xl font-bold text-white tracking-tight"
                      >82K+</span
                    >
                    <span
                      class="text-xs md:text-sm font-medium text-emerald-400 uppercase tracking-wide"
                      >{{ t('hero.stats.companies', 'Entreprises') }}</span
                    >
                  </div>

                  <div class="w-px h-8 md:h-10 bg-white/20"></div>

                  <div class="flex flex-col">
                    <span class="text-2xl md:text-3xl font-bold text-white tracking-tight"
                      >670M+</span
                    >
                    <span
                      class="text-xs md:text-sm font-medium text-emerald-400 uppercase tracking-wide"
                      >{{ t('hero.stats.visitors', 'Visiteurs') }}</span
                    >
                  </div>

                  <div class="w-px h-8 md:h-10 bg-white/20 hidden sm:block"></div>

                  <div class="flex flex-col">
                    <span class="text-2xl md:text-3xl font-bold text-white tracking-tight"
                      >16.8M+</span
                    >
                    <span
                      class="text-xs md:text-sm font-medium text-emerald-400 uppercase tracking-wide"
                      >{{ t('hero.stats.vacantJobs', 'Postes Vacants') }}</span
                    >
                  </div>
                </div>

                <!-- Search Bar - Moved Here -->
                <div class="mt-8 md:mt-12 w-full max-w-xl">
                  <div
                    class="relative flex items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 focus-within:bg-white/20 focus-within:border-emerald-400/50 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-emerald-300 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      v-model="searchQuery"
                      @keyup.enter="handleSearch"
                      type="text"
                      :placeholder="t('hero.searchPlaceholder', 'Rechercher un poste...')"
                      class="bg-transparent border-none outline-none text-white placeholder-emerald-100/70 w-full font-medium text-sm sm:text-base"
                    />
                    <button
                      @click="handleSearch"
                      class="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg p-2 sm:px-4 sm:py-2 font-semibold transition-all duration-300 shadow-lg flex items-center gap-2"
                    >
                      <span class="hidden sm:inline">{{ t('common.search', 'Go') }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Font Poppins removed - using global Outfit */

:root {
  --primary-color: #10b981;
  --primary-hover: #059669;
  --accent-color: #d1fae5;
  --text-color: #ffffff;
  --dark-text: #1f2937;
  --transition-speed: 0.5s;
}

.hero-landing {
  font-family:
    'Outfit',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

/* Custom Tailwind animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(20px, 20px) scale(1.05);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }
}

@keyframes float-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes draw-line {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

@keyframes typing-cursor {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-blob {
  animation: blob 20s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-subtle {
  animation: float-subtle 3s ease-in-out infinite;
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.animate-draw-line {
  animation: draw-line 3s ease-out forwards;
}

.grid-animation {
  animation: grid-move 20s linear infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

.delay-2000 {
  animation-delay: 2s;
}

@keyframes ken-burns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

.animate-ken-burns {
  animation: ken-burns 15s ease-out forwards;
}

/* ===== ZOOM ANIMATIONS ===== */
.text-zoom-title-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-zoom-title-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.text-zoom-title-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

.animate-progress {
  animation: progress 5s linear forwards;
}

/* Slow spin animation for slide indicator */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow linear infinite;
}

/* Remove old styles as we're using Tailwind now */

.carousel-container {
  position: relative;
}

.slides-container {
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-item {
  position: relative;
}

/* Styles removed - using Tailwind CSS classes instead */

@keyframes progress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
