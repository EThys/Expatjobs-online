<script setup lang="ts">
import { ref } from 'vue'
// Importez vos icônes ou utilisez des icônes d'une bibliothèque comme Heroicons
import {
  CodeBracketIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  BanknotesIcon,
  BeakerIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/vue/24/outline'

const featuredJobs = ref([
  {
    title: 'Développeur Full Stack',
    company: 'TechSolutions Inc.',
    location: 'Moscou, Remote possible',
    salary: '180 000 - 220 000 ₽/mois',
    type: 'full-time',
    typeLabel: 'Temps plein',
    excerpt:
      'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe produit.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    logo: 'https://via.placeholder.com/40',
  },
  {
    title: 'Designer UX/UI',
    company: 'Creative Agency',
    location: 'Saint-Pétersbourg',
    salary: '150 000 - 190 000 ₽/mois',
    type: 'full-time',
    typeLabel: 'Temps plein',
    excerpt: 'Créez des expériences utilisateur exceptionnelles pour nos clients internationaux.',
    skills: ['Figma', 'Sketch', 'Prototypage', 'User Research'],
    logo: 'https://via.placeholder.com/40',
  },
  {
    title: 'Data Scientist',
    company: 'Data Insights',
    location: 'Remote',
    salary: '200 000 - 250 000 ₽/mois',
    type: 'contract',
    typeLabel: 'Contrat',
    excerpt: 'Analyse de données complexes et création de modèles prédictifs pour nos clients.',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    logo: 'https://via.placeholder.com/40',
  },
  {
    title: 'Responsable Marketing Digital',
    company: 'Global Brands',
    location: 'Kazan',
    salary: '160 000 - 200 000 ₽/mois',
    type: 'full-time',
    typeLabel: 'Temps plein',
    excerpt: 'Gérez nos campagnes digitales et optimisez notre présence en ligne.',
    skills: ['SEO', 'Google Ads', 'Réseaux sociaux', 'Analytics'],
    logo: 'https://via.placeholder.com/40',
  },
])

const jobCategories = ref([
  {
    name: 'Développement',
    jobs: '1,240',
    icon: CodeBracketIcon,
    color: '#16a34a',
  },
  {
    name: 'Business',
    jobs: '890',
    icon: BriefcaseIcon,
    color: '#10B981',
  },
  {
    name: 'Data',
    jobs: '540',
    icon: ChartBarIcon,
    color: '#F59E0B',
  },
  {
    name: 'Design',
    jobs: '720',
    icon: ComputerDesktopIcon,
    color: '#EC4899',
  },
  {
    name: 'Finance',
    jobs: '680',
    icon: BanknotesIcon,
    color: '#06B6D4',
  },
  {
    name: 'Scientifique',
    jobs: '320',
    icon: BeakerIcon,
    color: '#8B5CF6',
  },
  {
    name: 'Marketing',
    jobs: '950',
    icon: GlobeAltIcon,
    color: '#F97316',
  },
  {
    name: 'Mobile',
    jobs: '430',
    icon: DevicePhoneMobileIcon,
    color: '#16a34a',
  },
])
</script>
<template>
  <section class="featured-jobs">
    <div class="container">
      <!-- Section Catégories en premier -->
      <div class="categories-section">
        <div class="section-header">
          <h2 class="section-title">Explorez par Catégories</h2>
          <p class="section-subtitle">Trouvez le poste qui correspond à vos compétences</p>
        </div>
        <div class="categories-grid">
          <a v-for="(category, index) in jobCategories" :key="index" href="#" class="category-card">
            <div class="category-icon" :style="{ backgroundColor: category.color }">
              <component :is="category.icon" />
            </div>
            <div class="category-info">
              <h4>{{ category.name }}</h4>
              <p>{{ category.jobs }} offres</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Section Opportunités en vedette après -->
      <div class="jobs-section">
        <!-- Remplacez la section header existante par : -->
        <div class="section-header text-left">
          <!-- Ajoutez text-left ici -->
          <h2 class="section-title">Opportunités en Vedette</h2>
          <p class="section-subtitle">Découvrez les postes les plus recherchés actuellement</p>
          <a href="#" class="view-all">
            Voir toutes les offres
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div class="jobs-grid">
          <div v-for="(job, index) in featuredJobs" :key="index" class="job-card">
            <div class="card-header">
              <div class="company-logo">
                <img :src="job.logo" :alt="`Logo ${job.company}`" loading="lazy" />
              </div>
              <div class="job-meta">
                <span class="job-type" :class="job.type">{{ job.typeLabel }}</span>
                <span class="salary-range">{{ job.salary }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="job-title">{{ job.title }}</h3>
              <div class="company-info">
                <span class="company-name">{{ job.company }}</span>
                <span class="location">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ job.location }}
                </span>
              </div>
              <p class="job-excerpt">{{ job.excerpt }}</p>
            </div>
            <div class="card-footer">
              <div class="skills">
                <span v-for="(skill, i) in job.skills" :key="i" class="skill-tag">{{ skill }}</span>
              </div>
              <router-link to="/detail/jobs" class="apply-button">
                Postuler
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-jobs {
  padding: 5rem 0;
  background-color: #f9fafb;
  z-index: 1;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: left;
  margin-bottom: 3rem;
  position: relative;
  max-width: none;
  margin-left: 0;
  padding-left: 0;
}

.section-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.125rem;
  text-align: left;
  color: #6b7280;
  max-width: 600px;
  position: relative;
  max-width: none;
  margin-left: 0;
  padding-left: 0;
}

.view-all {
  display: inline-flex;
  align-items: center;
  color: #16a34a;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all .icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.view-all:hover {
  color: #15803d;
}

.view-all:hover .icon {
  transform: translateX(4px);
}

.jobs-section {
  margin-top: 4rem;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background: radial-gradient(circle at top left, #ecfdf5 0, #f9fafb 45%, #ffffff 100%);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow:
    0 18px 45px rgba(15, 118, 110, 0.12);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.job-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow:
    0 22px 55px rgba(5, 150, 105, 0.25);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
}

.company-logo img {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.job-type {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.job-type.full-time {
  background-color: #d1fae5;
  color: #065f46;
}

.job-type.contract {
  background-color: #e0e7ff;
  color: #3730a3;
}

.salary-range {
  font-size: 0.875rem;
  font-weight: 600;
  color: #16a34a;
}

.card-body {
  padding: 1.25rem 1.5rem;
  flex-grow: 1;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.company-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}

.company-name {
  font-size: 0.875rem;
  color: #6b7280;
}

.location {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.location svg {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  color: #9ca3af;
}

.job-excerpt {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-size: 0.75rem;
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.apply-button {
  display: inline-flex;
  align-items: center;
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.apply-button:hover {
  background-color: #15803d;
}

.apply-button svg {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.categories-section {
  margin-bottom: 4rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 1rem;
  padding: 1.4rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.18);
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.category-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.category-info p {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .jobs-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.875rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .featured-jobs {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .job-card,
  .category-card {
    padding: 1.25rem;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding: 1rem;
  }
}

@media (max-width: 380px) {
  .section-header {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.375rem;
  }

  .job-title {
    font-size: 1.125rem;
  }

  .category-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .category-info h4 {
    font-size: 0.9375rem;
  }
}
</style>
