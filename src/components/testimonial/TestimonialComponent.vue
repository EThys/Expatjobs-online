<script setup lang="ts">
import { ref } from 'vue'
import {
  UserGroupIcon,
  BriefcaseIcon,
  MapPinIcon,
  ArrowPathIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

const testimonials = ref([
  {
    id: 1,
    name: 'Alexandre Petrov',
    role: 'Développeur Senior',
    company: 'Yandex',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content:
      "Grâce à cette plateforme, j'ai trouvé un poste qui correspond parfaitement à mes compétences en seulement 2 semaines. Le processus de recrutement était transparent et efficace.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Elena Volkova',
    role: 'Designer UX',
    company: 'Mail.ru Group',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content:
      "Je recommande vivement cette plateforme aux professionnels du design. Les offres sont de qualité et les entreprises vraiment sérieuses. J'ai doublé mon salaire en changeant de poste.",
    rating: 4,
  },
  {
    id: 3,
    name: 'Dmitri Sokolov',
    role: 'Data Scientist',
    company: 'Tinkoff',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    content:
      "Le matching algorithmique entre mon profil et les offres d'emploi est impressionnant. J'ai reçu des propositions pertinentes sans avoir à chercher activement.",
    rating: 5,
  },
])

const stats = ref([
  {
    id: 1,
    name: 'Candidats placés',
    value: '12,000+',
    icon: UserGroupIcon,
    color: 'text-green-500',
  },
  {
    id: 2,
    name: 'Entreprises partenaires',
    value: '850+',
    icon: BriefcaseIcon,
    color: 'text-blue-500',
  },
  { id: 3, name: 'Villes couvertes', value: '45+', icon: MapPinIcon, color: 'text-purple-500' },
  { id: 4, name: 'Taux de réussite', value: '92%', icon: ArrowPathIcon, color: 'text-yellow-500' },
])
</script>

<template>
  <section class="success-stories">
    <div class="container">
      <!-- Section Statistiques -->
      <div class="stats-section">
        <div class="section-header">
          <h2 class="section-title">
            <SparklesIcon class="sparkle-icon" />
            Transformez votre carrière
          </h2>
          <p class="section-subtitle">
            Rejoignez des milliers de professionnels qui ont accéléré leur parcours professionnel
          </p>
        </div>

        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-card">
            <div class="stat-icon" :class="stat.color">
              <component :is="stat.icon" />
            </div>
            <div class="stat-content">
              <p class="stat-value">{{ stat.value }}</p>
              <p class="stat-name">{{ stat.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Témoignages -->
      <div class="testimonials-section">
        <div class="section-header">
          <h2 class="section-title">Ils parlent de nous</h2>
          <p class="section-subtitle">
            Découvrez ce que nos utilisateurs disent de leur expérience
          </p>
        </div>

        <div class="testimonials-grid">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
            <div class="testimonial-header">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar" />
              <div class="user-info">
                <h4 class="user-name">{{ testimonial.name }}</h4>
                <p class="user-role">{{ testimonial.role }} @ {{ testimonial.company }}</p>
              </div>
              <div class="rating">
                <span v-for="star in 5" :key="star" :class="{ active: star <= testimonial.rating }">
                  ★
                </span>
              </div>
            </div>
            <div class="testimonial-content">
              <p>"{{ testimonial.content }}"</p>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h3 class="cta-title">Prêt à donner un nouvel élan à votre carrière ?</h3>
          <div class="cta-buttons">
            <a href="#" class="cta-button primary">Créer mon profil</a>
            <a href="#" class="cta-button secondary">Voir les offres</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.success-stories {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.sparkle-icon {
  width: 1.5em;
  height: 1.5em;
  color: #f59e0b;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Statistiques */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.stat-icon svg {
  width: 1.75rem;
  height: 1.75rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
  line-height: 1;
}

.stat-name {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Témoignages */
.testimonials-section {
  margin-top: 6rem;
  position: relative;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #16a34a, #06b6d4);
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.user-info {
  margin-left: 1rem;
  flex: 1;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.875rem;
  color: #6b7280;
}

.rating {
  display: flex;
  gap: 0.25rem;
  color: #e5e7eb;
  font-size: 1rem;
}

.rating span.active {
  color: #f59e0b;
}

.testimonial-content {
  font-size: 1rem;
  line-height: 1.625;
  color: #4b5563;
  font-style: italic;
  position: relative;
  padding-left: 1.5rem;
}

.testimonial-content::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -0.5rem;
  font-size: 3rem;
  color: #e5e7eb;
  font-family: serif;
  line-height: 1;
}

/* CTA */
.cta-section {
  margin-top: 5rem;
  text-align: center;
  background: linear-gradient(to right, #16a34a, #06b6d4);
  padding: 4rem 2rem;
  border-radius: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.cta-section::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.cta-button {
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-button.primary {
  background: white;
  color: #16a34a;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .success-stories {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 1.875rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.625rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
    align-items: center;
  }

  .testimonial-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .user-info {
    margin-left: 0;
    text-align: center;
  }

  .rating {
    justify-content: center;
  }

  .testimonial-content {
    padding-left: 0;
    text-align: center;
  }

  .testimonial-content::before {
    display: none;
  }

  .cta-section {
    padding: 3rem 1.5rem;
  }
}
</style>
