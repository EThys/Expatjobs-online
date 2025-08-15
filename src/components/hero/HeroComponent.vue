<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
//@ts-ignore
import jobSearch from '../../assets/carousel-1.jpg'
//@ts-ignore
import hiring from '../../assets/carousel-3.jpg'
//@ts-ignore
import remoteWork from '../../assets/carousel-2.jpg'
//@ts-ignore
import careerGrowth from '../../assets/carousel-4.jpg'
//@ts-ignore
import Navbar from '../navbar/NavbarComponent.vue'
import { MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'

const slides = ref([
  {
    image: jobSearch,
    title: 'Find your perfect job',
    highlight: 'in Russia and beyond',
    subtitle: 'Thousands of opportunities waiting for you',
    description:
      'Access the best job listings across all industries with competitive salaries and benefits.',
    cta: 'Browse jobs',
  },
  {
    image: hiring,
    title: 'Looking for talent?',
    highlight: "We've got you covered",
    subtitle: 'Connect with qualified professionals',
    description: 'Our platform helps companies find the right candidates quickly and efficiently.',
    cta: 'Post a job',
  },
  {
    image: remoteWork,
    title: 'Flexible work',
    highlight: 'opportunities',
    subtitle: 'Find positions that fit your lifestyle',
    description: 'Discover full-time, part-time and remote jobs across various sectors.',
    cta: 'Find flexible jobs',
  },
  {
    image: careerGrowth,
    title: 'Career development',
    highlight: 'made easy',
    subtitle: 'Take the next step in your professional journey',
    description: 'Get matched with positions that align with your skills and aspirations.',
    cta: 'Advance your career',
  },
])

const currentSlide = ref(0)
const isHovering = ref(false)
const isTransitioning = ref(false)
let interval: number

// Search form data
const searchQuery = ref('')
const locationQuery = ref('')
const jobType = ref('')

const jobTypes = ref([
  { value: '', label: 'All Types' },
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
])

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const goToSlide = (index: number) => {
  if (isTransitioning.value || currentSlide.value === index) return
  isTransitioning.value = true
  currentSlide.value = index
  resetTimer()
  setTimeout(() => (isTransitioning.value = false), 1000)
}

const startAutoPlay = () => {
  interval = setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  clearInterval(interval)
}

const resetTimer = () => {
  stopAutoPlay()
  if (!isHovering.value) startAutoPlay()
}

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching for:', {
    query: searchQuery.value,
    location: locationQuery.value,
    type: jobType.value,
  })
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <Navbar />
  <div class="hero-carousel h-screen relative overflow-hidden">
    <div
      id="carouselId"
      class="carousel-container w-full h-full"
      @mouseenter="
        () => {
          isHovering = true
          stopAutoPlay()
        }
      "
      @mouseleave="
        () => {
          isHovering = false
          startAutoPlay()
        }
      "
    >
      <!-- Carousel Slides -->
      <div
        class="slides-container flex h-full"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide-item w-full h-full flex-shrink-0 relative"
        >
          <div class="gradient-overlay"></div>
          <img
            :src="slide.image"
            class="w-full h-full object-cover transition-transform duration-1000"
            :class="{ 'scale-105': currentSlide === index }"
            :alt="`Slide ${index + 1}: ${slide.title}`"
            loading="lazy"
          />

          <!-- Slide Content -->
          <div class="slide-content">
            <div class="content-wrapper">
              <div
                class="text-content transition-all duration-700 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-10 opacity-0': currentSlide !== index,
                }"
              >
                <h5 class="slide-pre-title">
                  {{ slide.title }} <span class="highlight-text">{{ slide.highlight }}</span>
                </h5>
                <h4 class="slide-title">
                  {{ slide.subtitle }}
                </h4>
                <p class="slide-description">
                  {{ slide.description }}
                </p>
                <!-- <a href="#" class="cta-button">
                  {{ slide.cta }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="cta-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <button class="carousel-control prev" @click="prevSlide" aria-label="Previous slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button class="carousel-control next" @click="nextSlide" aria-label="Next slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Carousel Indicators -->
      <div class="indicators-container">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="['indicator', { active: currentSlide === index }]"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        >
          <span class="progress-bar" v-if="currentSlide === index && !isHovering"></span>
        </button>
      </div>

      <!-- Modern Search Bar -->
      <div class="search-container">
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="search-input-group">
            <MagnifyingGlassIcon class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Job title, keywords, or company"
              class="search-input"
            />
          </div>
          <div class="search-input-group">
            <MapPinIcon class="search-icon" />
            <input
              v-model="locationQuery"
              type="text"
              placeholder="Location"
              class="search-input"
            />
          </div>
          <div class="search-input-group">
            <BriefcaseIcon class="search-icon" />
            <select v-model="jobType" class="search-select">
              <option v-for="type in jobTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
          <button type="submit" class="search-button">
            <span>Search Jobs</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="button-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
    <div class="transition-spacer"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.hero-carousel {
  --primary-color: #10b981;
  --primary-hover: #059669;
  --accent-color: #d1fae5;
  --text-color: #ffffff;
  --dark-text: #1f2937;
  --transition-speed: 0.5s;
  font-family: 'Inter', sans-serif;
}
.transition-spacer {
  height: 6rem; /* Ajustez selon vos besoins */
  position: relative;
  z-index: 5;
  background: linear-gradient(to bottom, transparent 0%, #f9fafb 100%);
  margin-top: -6rem; /* Remonte l'élément pour qu'il chevauche */
}

.carousel-container {
  position: relative;
}

.slides-container {
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-item {
  position: relative;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
}

.slide-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.text-content {
  max-width: 600px;
  will-change: transform, opacity;
}

.slide-pre-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  transition:
    transform 0.7s ease-out,
    opacity 0.7s ease-out;
}

.highlight-text {
  color: var(--primary-color);
  font-weight: 700;
}

.slide-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.7s ease-out 0.1s,
    opacity 0.7s ease-out 0.1s;
}

.slide-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  transition:
    transform 0.7s ease-out 0.2s,
    opacity 0.7s ease-out 0.2s;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all var(--transition-speed) ease 0.3s;
  text-decoration: none;
  font-size: 1.125rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  will-change: transform;
}

.cta-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.75rem;
  transition: transform var(--transition-speed) ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(4px);
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  color: white;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all var(--transition-speed) ease;
  opacity: 0.9;
}

.carousel-control:hover {
  opacity: 1;
  background-color: var(--primary-color);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.indicators-container {
  position: absolute;
  bottom: 8rem; /* Adjusted to make space for search bar */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.indicator {
  width: 3rem;
  height: 0.375rem;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.indicator:hover {
  transform: scaleY(1.5);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--primary-color);
  animation: progress 5s linear forwards;
  transform-origin: left;
}

@keyframes progress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

/* Modern Search Bar Styles */
.search-container {
  position: absolute;
  bottom: -2.5rem; /* Déplace la barre vers le bas pour qu'elle dépasse */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  z-index: 10;
}

.search-form {
  display: flex;
  background: white;
  border-radius: 1rem; /* Bordure plus arrondie */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Ombre plus prononcée */
  overflow: hidden;
  padding: 0.75rem; /* Plus d'espace interne */
  gap: 0.75rem; /* Plus d'espace entre les éléments */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Bordure subtile */
  backdrop-filter: blur(4px); /* Effet de flou léger */
}

.search-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1.25rem; /* Plus d'espace interne */
  background: rgba(248, 250, 252, 0.8); /* Léger effet de transparence */
  border-radius: 0.75rem; /* Bordure plus arrondie */
  transition: all 0.3s ease;
  border: 1px solid rgba(203, 213, 225, 0.3); /* Bordure subtile */
}

.search-input-group:focus-within {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 2px var(--primary-color);
  border-color: var(--primary-color);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  padding: 1.125rem 0; /* Un peu plus de hauteur */
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  font-weight: 500; /* Texte un peu plus gras */
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.search-select {
  flex: 1;
  padding: 1.125rem 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  font-weight: 500;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  white-space: nowrap;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}

.search-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.search-button:active {
  transform: translateY(0);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.search-button:hover .button-icon {
  transform: translateX(3px);
}

/* Effet de vague au survol */
.search-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
  opacity: 0;
}

.search-button:hover::after {
  transform: scale(1);
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .search-container {
    bottom: -2rem;
  }

  .search-form {
    flex-wrap: wrap;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .search-input-group {
    flex: 1 1 40%;
    min-width: 200px;
    padding: 0 1rem;
  }

  .search-button {
    padding: 1rem 1.5rem;
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .search-container {
    bottom: -1.5rem;
    width: 95%;
  }

  .search-form {
    flex-direction: column;
  }

  .search-input-group {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .search-container {
    bottom: -1rem;
  }

  .search-input {
    padding: 1rem 0;
    font-size: 0.9375rem;
  }

  .search-select {
    padding: 1rem 0;
    font-size: 0.9375rem;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .slide-content {
    padding: 0 5%;
  }

  .slide-title {
    font-size: 2.25rem;
  }

  .slide-description {
    font-size: 1.125rem;
  }

  .search-form {
    flex-wrap: wrap;
  }

  .search-input-group {
    flex: 1 1 40%;
    min-width: 200px;
  }

  .search-button {
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .slide-content {
    padding: 0 2rem;
    justify-content: center;
    text-align: center;
  }

  .text-content {
    max-width: 100%;
  }

  .gradient-overlay {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  }

  .slide-title {
    font-size: 2rem;
  }

  .carousel-control {
    width: 3rem;
    height: 3rem;
  }

  .indicators-container {
    bottom: 7rem;
  }

  .search-container {
    bottom: 1rem;
    width: 95%;
  }

  .search-form {
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-input-group {
    width: 100%;
  }

  .search-button {
    width: 100%;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .slide-pre-title {
    font-size: 1rem;
  }

  .slide-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .slide-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  .carousel-control {
    width: 2.5rem;
    height: 2.5rem;
  }

  .control-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .indicators-container {
    bottom: 6rem;
  }

  .indicator {
    width: 2rem;
    height: 0.25rem;
  }

  .search-container {
    padding: 0 1rem;
  }
}
</style>
