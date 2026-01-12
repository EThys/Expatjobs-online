<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  CodeBracketIcon,
  BriefcaseIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  CogIcon,
  WrenchIcon,
  HomeIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { useJobService } from '@/utils/service/jobService'
import type { IJobResponse } from '@/utils/interface/IJobOffers'

const router = useRouter()
const { t } = useI18n()
const jobService = useJobService()

const featuredJobs = ref<any[]>([])
const loading = ref(false)

const jobCategories = computed(() => [
  {
    id: 'development',
    name: t('hero.categories.development'),
    icon: CodeBracketIcon,
    color: '#16a34a',
    sectors: ['IT'],
  },
  {
    id: 'business',
    name: t('hero.categories.business'),
    icon: BriefcaseIcon,
    color: '#10B981',
    sectors: ['SALES', 'CONSULTING', 'BUSINESS'],
  },
  {
    id: 'finance',
    name: t('hero.categories.finance'),
    icon: BanknotesIcon,
    color: '#06B6D4',
    sectors: ['FINANCE', 'ACCOUNTING', 'BANKING'],
  },
  {
    id: 'marketing',
    name: t('hero.categories.marketing'),
    icon: GlobeAltIcon,
    color: '#F97316',
    sectors: ['MARKETING', 'COMMUNICATION', 'ADVERTISING'],
  },
  {
    id: 'design',
    name: t('hero.categories.design'),
    icon: ComputerDesktopIcon,
    color: '#EC4899',
    sectors: ['DESIGN', 'CREATIVE', 'ARTS'],
  },
  {
    id: 'health',
    name: t('hero.categories.health'),
    icon: BeakerIcon,
    color: '#DC2626',
    sectors: ['HEALTH', 'MEDICAL', 'SOCIAL', 'CARE'],
  },
  {
    id: 'education',
    name: t('hero.categories.education'),
    icon: AcademicCapIcon,
    color: '#8B5CF6',
    sectors: ['EDUCATION', 'TRAINING', 'TEACHING'],
  },
  {
    id: 'construction',
    name: t('hero.categories.engineering'),
    icon: WrenchScrewdriverIcon,
    color: '#F59E0B',
    sectors: ['CONSTRUCTION', 'BUILDING', 'ENGINEERING'],
  },
  {
    id: 'logistics',
    name: t('hero.categories.logistics'),
    icon: TruckIcon,
    color: '#475569',
    sectors: ['LOGISTICS', 'TRANSPORT', 'SUPPLY_CHAIN'],
  },
  {
    id: 'retail',
    name: t('hero.categories.sales'),
    icon: ShoppingBagIcon,
    color: '#84CC16',
    sectors: ['RETAIL', 'SALES', 'COMMERCE'],
  },
  {
    id: 'hospitality',
    name: t('hero.categories.hospitality'),
    icon: BuildingStorefrontIcon,
    color: '#EC4899',
    sectors: ['HOSPITALITY', 'RESTAURANT', 'TOURISM'],
  },
  {
    id: 'admin',
    name: t('hero.categories.hr'),
    icon: DocumentTextIcon,
    color: '#6B7280',
    sectors: ['ADMINISTRATION', 'SECRETARIAL', 'OFFICE'],
  },
  {
    id: 'production',
    name: t('hero.categories.legal'),
    icon: CogIcon,
    color: '#1E40AF',
    sectors: ['PRODUCTION', 'MANUFACTURING', 'INDUSTRY'],
  },
  {
    id: 'maintenance',
    name: t('hero.categories.maintenance'),
    icon: WrenchIcon,
    color: '#D97706',
    sectors: ['MAINTENANCE', 'REPAIR', 'TECHNICAL'],
  },
  {
    id: 'cleaning',
    name: t('hero.categories.cleaning'),
    icon: HomeIcon,
    color: '#059669',
    sectors: ['CLEANING', 'DOMESTIC', 'SERVICES'],
  },
  {
    id: 'security',
    name: t('hero.categories.security'),
    icon: ShieldCheckIcon,
    color: '#374151',
    sectors: ['SECURITY', 'SURVEILLANCE', 'PROTECTION'],
  },
])

const showAllCategories = ref(false)
const initialCategoriesCount = 8

const displayedCategories = computed(() => {
  if (showAllCategories.value) {
    return jobCategories.value
  }
  return jobCategories.value.slice(0, initialCategoriesCount)
})

const toggleCategories = () => {
  showAllCategories.value = !showAllCategories.value
}

const navigateToCategory = (categoryId: string) => {
  router.push(`/jobs/categories?category=${categoryId}`)
}

// Fonction pour déterminer les catégories d'un job basée uniquement sur le secteur
const determineJobCategories = (job: any): string[] => {
  const categories = new Set<string>()

  if (job.sector) {
    jobCategories.value.forEach((category) => {
      if (category.sectors.includes(job.sector)) {
        categories.add(category.id)
      }
    })
  }

  if (categories.size === 0) {
    categories.add('other')
  }

  return Array.from(categories)
}

// Obtenir le nombre d'offres par catégorie
const getJobsCountByCategory = computed(() => {
  const counts: { [key: string]: number } = {}

  jobCategories.value.forEach((category) => {
    counts[category.id] = 0
  })
  counts['other'] = 0

  featuredJobs.value.forEach((job) => {
    const jobCategoriesList = determineJobCategories(job)
    jobCategoriesList.forEach((categoryId) => {
      if (counts[categoryId] !== undefined) {
        counts[categoryId]++
      } else {
        counts['other']++
      }
    })
  })

  return counts
})

const getFormattedJobsCount = (categoryId: string) => {
  const count = getJobsCountByCategory.value[categoryId] || 0
  return `${count}+`
}

// Fetch jobs purely for counting purposes (no enrichment needed)
const fetchFeaturedJobs = async () => {
  try {
    loading.value = true
    const response: IJobResponse = await jobService.getAllJobs(0, 50)

    if (response && Array.isArray(response.content)) {
      featuredJobs.value = response.content
    } else {
      featuredJobs.value = []
    }
  } catch (error: any) {
    console.error('Error fetching jobs for categories:', error)
    featuredJobs.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFeaturedJobs()
})
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 categories-section">
    <div class="section-header with-toggle">
      <div class="header-content">
        <div class="header-text">
          <h2 class="section-title">{{ t('hero.categories.title') }}</h2>
          <p class="section-subtitle">{{ t('hero.categories.subtitle') }}</p>
        </div>

        <div class="header-toggle" v-if="jobCategories.length > initialCategoriesCount">
          <button @click="toggleCategories" class="toggle-button header-toggle-btn">
            <span>{{
              showAllCategories ? t('hero.categories.viewLess') : t('hero.categories.viewMore')
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="toggle-icon"
              :class="{ rotated: showAllCategories }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="categories-container">
      <div class="categories-grid" :class="{ expanded: showAllCategories }">
        <button
          v-for="(category, index) in displayedCategories"
          :key="category.id"
          @click="navigateToCategory(category.id)"
          class="category-card"
          :style="{ '--animation-delay': `${index * 0.05}s` }"
        >
          <div class="category-card-inner">
            <div class="category-icon" :style="{ backgroundColor: category.color }">
              <component :is="category.icon" class="category-icon-svg" />
              <div class="icon-glow" :style="{ backgroundColor: category.color }"></div>
            </div>
            <div class="category-info">
              <h4>{{ category.name }}</h4>
              <p class="category-count">
                <span class="count-number">{{ getFormattedJobsCount(category.id) }}</span>
                <span class="count-label">{{ t('hero.categories.offers') }}</span>
              </p>
            </div>
            <div class="category-hover-effect" :style="{ backgroundColor: category.color }"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Copied styles relevant to categories */
.section-header.with-toggle {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}

.header-text {
  flex: 1;
  max-width: 600px;
}

.header-toggle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.5;
}

.toggle-button.header-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  border: 2px solid #e5e7eb;
  color: #6b7280;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.toggle-button.header-toggle-btn:hover {
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
  border-color: #10b981;
  color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.toggle-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.category-card {
  position: relative;
  background: white;
  border-radius: 1rem;
  padding: 0; /* Handled by inner */
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.category-card-inner {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 2;
  background: white;
  height: 100%;
}

.category-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.4s ease;
}

.category-icon-svg {
  width: 1.75rem;
  height: 1.75rem;
  color: white;
  position: relative;
  z-index: 2;
}

.category-info h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.category-count {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.count-number {
  font-weight: 600;
  color: #10b981;
}

/* Responsive */
@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-toggle {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
