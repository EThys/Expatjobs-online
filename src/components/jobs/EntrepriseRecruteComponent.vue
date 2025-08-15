<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

interface Company {
  id: number
  name: string
  logo: string
  location: string
  jobsCount: number
  industry: string
  isFavorite: boolean
  highlights: string[]
}

const companies = ref<Company[]>([
  {
    id: 1,
    name: 'Yandex',
    logo: 'https://logo.clearbit.com/yandex.com',
    location: 'Moscou, Russie',
    jobsCount: 42,
    industry: 'Technologie',
    isFavorite: false,
    highlights: ['Flex-office', 'Télétravail', 'Bonus annuel'],
  },
  {
    id: 2,
    name: 'Tinkoff',
    logo: 'https://logo.clearbit.com/tinkoff.ru',
    location: 'Remote',
    jobsCount: 28,
    industry: 'Fintech',
    isFavorite: true,
    highlights: ['100% remote', 'Stock options', 'Équipe internationale'],
  },
  {
    id: 3,
    name: 'Wildberries',
    logo: 'https://logo.clearbit.com/wildberries.ru',
    location: 'Saint-Pétersbourg',
    jobsCount: 15,
    industry: 'E-commerce',
    isFavorite: false,
    highlights: ['Croissance rapide', 'Panier repas', 'Horaires flexibles'],
  },
  {
    id: 4,
    name: 'VK (Mail.ru Group)',
    logo: 'https://logo.clearbit.com/vk.com',
    location: 'Moscou',
    jobsCount: 36,
    industry: 'Réseaux sociaux',
    isFavorite: false,
    highlights: ['Projets innovants', 'Formations', 'Événements tech'],
  },
  {
    id: 5,
    name: 'Ozon',
    logo: 'https://logo.clearbit.com/ozon.ru',
    location: 'Kazan',
    jobsCount: 19,
    industry: 'E-commerce',
    isFavorite: true,
    highlights: ['Programme de formation', 'Crèche', 'Tickets restaurant'],
  },
  {
    id: 6,
    name: 'SberTech',
    logo: 'https://logo.clearbit.com/sber.ru',
    location: 'Moscou',
    jobsCount: 31,
    industry: 'Banque & Tech',
    isFavorite: false,
    highlights: ['Laboratoire R&D', 'Conférences', 'Prime de transport'],
  },
  {
    id: 7,
    name: 'Gazprom Neft',
    logo: 'https://logo.clearbit.com/gazprom-neft.com',
    location: 'Saint-Pétersbourg',
    jobsCount: 22,
    industry: 'Énergie',
    isFavorite: false,
    highlights: ['Avantages sociaux', 'Stabilité', 'Programme de carrière'],
  },
  {
    id: 8,
    name: 'MTS',
    logo: 'https://logo.clearbit.com/mts.ru',
    location: 'Moscou',
    jobsCount: 17,
    industry: 'Télécommunications',
    isFavorite: false,
    highlights: ['Forfait mobile', 'Télétravail partiel', 'Bonus performance'],
  },
])

const activeFilter = ref('all')
const currentSlide = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

const toggleFavorite = (id: number) => {
  const company = companies.value.find((c) => c.id === id)
  if (company) {
    company.isFavorite = !company.isFavorite
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % Math.ceil(companies.value.length / 3)
}

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + Math.ceil(companies.value.length / 3)) %
    Math.ceil(companies.value.length / 3)
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    nextSlide()
  }

  if (touchStartX.value - touchEndX.value < -50) {
    prevSlide()
  }
}
</script>

<template>
  <section class="hiring-companies relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-white/50"></div>

    <div class="container relative">
      <div class="section-header">
        <div class="flex items-center justify-center gap-3">
          <BuildingOfficeIcon class="header-icon" />
          <h2 class="section-title">
            Entreprises qui <span class="text-emerald-600">recrutent</span>
          </h2>
        </div>
        <p class="section-subtitle">
          Découvrez les entreprises les plus dynamiques du marché et leurs offres d'emploi
        </p>
      </div>

      <!-- <div class="filters">
        <button
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
          class="filter-btn"
        >
          Toutes
        </button>
        <button
          :class="{ active: activeFilter === 'tech' }"
          @click="activeFilter = 'tech'"
          class="filter-btn"
        >
          Technologie
        </button>
        <button
          :class="{ active: activeFilter === 'finance' }"
          @click="activeFilter = 'finance'"
          class="filter-btn"
        >
          Finance
        </button>
        <button
          :class="{ active: activeFilter === 'ecommerce' }"
          @click="activeFilter = 'ecommerce'"
          class="filter-btn"
        >
          E-commerce
        </button>
      </div> -->

      <div class="relative">
        <button @click="prevSlide" class="carousel-control prev" aria-label="Previous slide">
          <ChevronLeftIcon class="control-icon" />
        </button>

        <div
          class="carousel-container"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
            class="companies-carousel"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div v-for="company in companies" :key="company.id" class="company-card">
              <div class="card-header">
                <div class="company-logo">
                  <img
                    :src="company.logo"
                    :alt="company.name"
                    @error="(e: any) => (e.target.src = 'https://via.placeholder.com/80x80')"
                  />
                  <CheckBadgeIcon v-if="company.isFavorite" class="verified-badge" />
                </div>
                <button
                  @click="toggleFavorite(company.id)"
                  class="favorite-btn"
                  :aria-label="company.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
                >
                  <HeartIconSolid v-if="company.isFavorite" class="text-red-500" />
                  <HeartIcon v-else />
                </button>
              </div>

              <div class="card-body">
                <h3 class="company-name">{{ company.name }}</h3>
                <div class="company-meta">
                  <span class="location">
                    <MapPinIcon />
                    {{ company.location }}
                  </span>
                  <span class="industry">{{ company.industry }}</span>
                </div>

                <div class="highlights">
                  <span
                    v-for="(highlight, index) in company.highlights"
                    :key="index"
                    class="highlight"
                  >
                    {{ highlight }}
                  </span>
                </div>
              </div>

              <div class="card-footer">
                <span class="jobs-count">
                  <ArrowPathIcon />
                  {{ company.jobsCount }} postes ouverts
                </span>
                <a href="#" class="view-jobs">Voir les offres →</a>
              </div>
            </div>
          </div>
        </div>

        <button @click="nextSlide" class="carousel-control next" aria-label="Next slide">
          <ChevronRightIcon class="control-icon" />
        </button>
      </div>

      <div class="carousel-indicators">
        <button
          v-for="i in Math.ceil(companies.length / 3)"
          :key="i"
          :class="{ active: currentSlide === i - 1 }"
          @click="goToSlide(i - 1)"
          class="indicator"
          :aria-label="`Go to slide ${i}`"
        ></button>
      </div>

      <div class="cta-section">
        <p class="cta-text">Votre entreprise recrute ?</p>
        <a href="#" class="cta-button">Publier vos offres</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hiring-companies {
  padding: 8rem 0;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0;
  line-height: 1.2;
}

.header-icon {
  width: 2rem;
  height: 2rem;
  color: #10b981;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 1rem auto 0;
}

/* Filters */
.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.625rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #e2e8f0;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  background-color: #cbd5e1;
  color: #334155;
}

.filter-btn.active {
  background-color: #10b981;
  color: white;
}

/* Carousel */
.carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
}

.companies-carousel {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.company-card {
  flex: 0 0 calc(33.333% - 1.5rem);
  margin: 0 0.75rem;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #e5e7eb;
}

.company-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-control:hover {
  background-color: #10b981;
  color: white;
}

.carousel-control.prev {
  left: -1.75rem;
}

.carousel-control.next {
  right: -1.75rem;
}

.control-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator.active {
  background-color: #10b981;
  transform: scale(1.2);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.75rem 1.75rem 0;
}

.company-logo {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 1rem;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.company-logo img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.verified-badge {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 1.75rem;
  height: 1.75rem;
  color: #10b981;
  background: white;
  border-radius: 50%;
  padding: 0.25rem;
  box-shadow: 0 0 0 2px white;
  border: 1px solid #e5e7eb;
}

.favorite-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  color: #64748b;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  background-color: #e2e8f0;
  color: #475569;
}

.favorite-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Card Body */
.card-body {
  padding: 1.75rem;
  flex-grow: 1;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.company-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.company-meta span {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.company-meta svg {
  width: 1rem;
  height: 1rem;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.highlight {
  font-size: 0.8125rem;
  padding: 0.5rem 0.875rem;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1;
}

/* Card Footer */
.card-footer {
  padding: 1.5rem 1.75rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jobs-count {
  font-size: 0.875rem;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.jobs-count svg {
  width: 1rem;
  height: 1rem;
  color: #64748b;
}

.view-jobs {
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
  text-decoration: none;
  transition: all 0.2s ease;
}

.view-jobs:hover {
  color: #059669;
  text-decoration: underline;
}

/* CTA Section */
.cta-section {
  margin-top: 5rem;
  text-align: center;
  background: linear-gradient(to right, #059669, #10b981);
  padding: 4rem 2rem;
  border-radius: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.cta-text {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  font-weight: 600;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.5rem;
  background: white;
  color: #059669;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive */
@media (max-width: 1280px) {
  .company-card {
    flex: 0 0 calc(50% - 1rem);
    margin: 0 0.5rem;
  }
}

@media (max-width: 1024px) {
  .hiring-companies {
    padding: 6rem 0;
  }

  .carousel-control.prev {
    left: -1rem;
  }

  .carousel-control.next {
    right: -1rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .company-card {
    flex: 0 0 calc(100% - 1rem);
    margin: 0 0.5rem;
  }

  .carousel-control {
    width: 3rem;
    height: 3rem;
  }

  .carousel-control.prev {
    left: -0.5rem;
  }

  .carousel-control.next {
    right: -0.5rem;
  }

  .cta-section {
    padding: 3rem 1.5rem;
  }

  .cta-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 640px) {
  .hiring-companies {
    padding: 4rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .filters::-webkit-scrollbar {
    display: none;
  }

  .filter-btn {
    flex-shrink: 0;
  }

  .carousel-control {
    width: 2.5rem;
    height: 2.5rem;
  }

  .control-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .header-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .cta-section {
    padding: 2.5rem 1.25rem;
  }

  .cta-text {
    font-size: 1.125rem;
  }

  .cta-button {
    padding: 0.75rem 2rem;
  }
}
</style>
