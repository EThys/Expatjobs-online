<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  location: string
}

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    name: 'Svetlana Petrova',
    role: 'Marketing Manager',
    company: 'Yandex',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    content:
      "EXPAT JOBS Go m'a permis de trouver un poste incroyable chez Yandex à Moscou. Le processus était fluide et très professionnel.",
    rating: 5,
    location: 'Saint-Pétersbourg → Moscou',
  },
  {
    id: 2,
    name: 'Chidi Okafor',
    role: 'Senior Developer',
    company: 'Kaspersky',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    content:
      "Venant du Nigeria, je cherchais une opportunité en Russie. En moins d'un mois, j'ai rejoint une super équipe à Kazan. L'accompagnement était top !",
    rating: 5,
    location: 'Lagos → Kazan',
  },
  {
    id: 3,
    name: 'Michel Kabasele',
    role: 'Logistics Coordinator',
    company: 'Gazprom',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    content:
      "Une expérience formidable. J'ai pu obtenir un emploi à Novossibirsk depuis Kinshasa sans tracas. Merci pour le soutien durant la relocation !",
    rating: 5,
    location: 'Kinshasa → Novossibirsk',
  },
])

const stats = ref([
  { value: '50K+', label: 'Candidats placés', icon: '👥' },
  { value: '2,500+', label: 'Entreprises partenaires', icon: '🏢' },
  { value: '95%', label: 'Taux de satisfaction', icon: '⭐' },
  { value: '45+', label: 'Pays couverts', icon: '🌍' },
])

const currentIndex = ref(0)
const isAutoPlaying = ref(true)
let intervalId: ReturnType<typeof setInterval> | null = null

const visibleTestimonials = ref<Testimonial[]>([])

const updateVisibleTestimonials = () => {
  const total = testimonials.value.length
  visibleTestimonials.value = [
    testimonials.value[(currentIndex.value - 1 + total) % total],
    testimonials.value[currentIndex.value],
    testimonials.value[(currentIndex.value + 1) % total],
  ]
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  updateVisibleTestimonials()
}

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  updateVisibleTestimonials()
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  updateVisibleTestimonials()
}

const startAutoPlay = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (isAutoPlaying.value) nextSlide()
  }, 5000)
}

const pauseAutoPlay = () => {
  isAutoPlaying.value = false
}

const resumeAutoPlay = () => {
  isAutoPlaying.value = true
}

onMounted(() => {
  updateVisibleTestimonials()
  startAutoPlay()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section
    class="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden relative"
  >
    <!-- Background Decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 -left-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-blob"
      ></div>
      <div
        class="absolute bottom-20 -right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-blob-delay"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/10 to-teal-100/10 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up"
        >
          {{ $t('testimonials.title') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            {{ $t('testimonials.titleHighlight') }}
          </span>
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
        <!-- Navigation Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-xl transition-all duration-300 group"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-xl transition-all duration-300 group"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Cards Container -->
        <div
          class="flex justify-center items-stretch gap-4 sm:gap-6 py-4 px-12 lg:px-16 overflow-hidden"
        >
          <div
            v-for="(testimonial, idx) in visibleTestimonials"
            :key="testimonial.id"
            :class="[
              'testimonial-card',
              idx === 1 ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-50 hidden lg:block',
            ]"
          >
            <!-- Quote Icon -->
            <div
              class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>
            </div>

            <!-- Card Content -->
            <div
              class="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 h-full flex flex-col"
            >
              <!-- Rating -->
              <div class="flex gap-1 mb-4">
                <span
                  v-for="star in 5"
                  :key="star"
                  :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-200'"
                  class="text-xl"
                >
                  ★
                </span>
              </div>

              <!-- Content -->
              <p class="text-gray-700 leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                "{{ testimonial.content }}"
              </p>

              <!-- Author -->
              <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div class="relative">
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-emerald-100"
                  />
                  <div
                    class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 truncate">{{ testimonial.name }}</h4>
                  <p class="text-sm text-gray-500 truncate">
                    {{ testimonial.role }} @ {{ testimonial.company }}
                  </p>
                  <div class="flex items-center gap-1 mt-1">
                    <svg
                      class="w-3.5 h-3.5 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <span class="text-xs text-emerald-600 font-medium">{{
                      testimonial.location
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center gap-2 mt-6 sm:mt-8">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-gray-300 hover:bg-gray-400',
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-card {
  width: 100%;
  max-width: 28rem;
  flex-shrink: 0;
  transition: all 500ms ease;
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-blob-delay {
  animation: blob 7s infinite 2s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.delay-100 {
  animation-delay: 100ms;
}

/* Hover effects for cards */
.testimonial-card:hover {
  transform: scale(1.02);
}
</style>
