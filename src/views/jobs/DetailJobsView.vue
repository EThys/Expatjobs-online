<script setup lang="ts">
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  LinkIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ArrowLongRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/vue/24/outline'

const job = {
  title: 'Développeur Full Stack Senior',
  company: 'TechSolutions Inc.',
  location: 'Moscou, Remote possible',
  salary: '180 000 - 220 000 ₽/mois',
  type: 'full-time',
  typeLabel: 'Temps plein',
  postedDate: 'Publiée il y a 3 jours',
  description: `
    <p>Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe produit et contribuer au développement de nos solutions innovantes.</p>
    <p class="mt-4">En tant que développeur full stack, vous serez responsable de :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Développer de nouvelles fonctionnalités pour nos applications web</li>
      <li>Collaborer avec les designers pour créer des interfaces utilisateur exceptionnelles</li>
      <li>Optimiser les performances des applications existantes</li>
      <li>Participer aux revues de code et aux sessions de pair programming</li>
      <li>Mettre en place des tests automatisés</li>
    </ul>
    <p class="mt-4">Notre stack technique :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Frontend : React 18, TypeScript, Tailwind CSS</li>
      <li>Backend : Node.js, NestJS, PostgreSQL</li>
      <li>Infrastructure : AWS, Docker, Kubernetes</li>
    </ul>
  `,
  requirements: `
    <p>Ce que nous recherchons :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>5+ ans d'expérience en développement full stack</li>
      <li>Maîtrise de JavaScript/TypeScript, HTML5, CSS3</li>
      <li>Expérience avec React et au moins un framework backend Node.js</li>
      <li>Connaissance des bases de données relationnelles et NoSQL</li>
      <li>Expérience avec les architectures microservices</li>
      <li>Capacité à travailler en équipe et excellentes compétences en communication</li>
      <li>Niveau d'anglais intermédiaire ou supérieur</li>
    </ul>
  `,
  benefits: `
    <p>Ce que nous offrons :</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Environnement de travail flexible (remote/hybride/bureau)</li>
      <li>Équipement haut de gamme fourni</li>
      <li>Budget formation annuel</li>
      <li>Assurance santé premium</li>
      <li>Abonnement sport/wellness</li>
      <li>Snacks et boissons illimités au bureau</li>
      <li>Événements d'équipe réguliers</li>
    </ul>
  `,
  skills: ['React', 'Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD'],
  logo: 'https://via.placeholder.com/80',
  website: 'https://techsolutions.com',
  recruiter: {
    name: 'Alexandra Petrova',
    position: 'Responsable Recrutement Tech',
    email: 'recrutement@techsolutions.com',
    phone: '+7 123 456 7890',
  },
  applicationCount: '24 candidatures',
}

const similarJobs = [
  {
    title: 'Développeur Backend',
    company: 'DataSystems',
    location: 'Remote',
    salary: '160 000 - 200 000 ₽/mois',
    type: 'full-time',
    logo: 'https://via.placeholder.com/40',
  },
  {
    title: 'Ingénieur DevOps',
    company: 'CloudTech',
    location: 'Saint-Pétersbourg',
    salary: '190 000 - 230 000 ₽/mois',
    type: 'full-time',
    logo: 'https://via.placeholder.com/40',
  },
  {
    title: 'Développeur Frontend',
    company: 'WebInnovations',
    location: 'Moscou',
    salary: '150 000 - 180 000 ₽/mois',
    type: 'contract',
    logo: 'https://via.placeholder.com/40',
  },
]
</script>

<template>
  <div class="job-details-page bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" class="flex items-center text-green-600 hover:text-green-700">
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          <span class="font-medium">Retour aux offres</span>
        </a>
        <div class="flex space-x-4">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <BookmarkIcon class="h-5 w-5 text-gray-500 hover:text-green-600" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100">
            <ShareIcon class="h-5 w-5 text-gray-500 hover:text-green-600" />
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="lg:w-2/3">
          <!-- Job Header -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <img
                  :src="job.logo"
                  :alt="job.company"
                  class="w-16 h-16 object-contain rounded-lg"
                />
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">{{ job.title }}</h1>
                  <div class="flex items-center mt-1">
                    <BuildingOfficeIcon class="h-4 w-4 text-gray-500 mr-1" />
                    <span class="text-gray-600">{{ job.company }}</span>
                  </div>
                </div>
              </div>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {{ job.typeLabel }}
              </span>
            </div>

            <!-- Job Meta -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center">
                <MapPinIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.location }}</span>
              </div>
              <div class="flex items-center">
                <CurrencyDollarIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.salary }}</span>
              </div>
              <div class="flex items-center">
                <BriefcaseIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.typeLabel }}</span>
              </div>
              <div class="flex items-center">
                <CalendarIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">{{ job.postedDate }}</span>
              </div>
            </div>

            <!-- Skills -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-500 mb-2">COMPÉTENCES REQUISES</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(skill, index) in job.skills"
                  :key="index"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#apply"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors flex items-center justify-center"
              >
                Postuler maintenant
                <ArrowLongRightIcon class="h-5 w-5 ml-2" />
              </a>
              <a
                :href="job.website"
                target="_blank"
                class="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <LinkIcon class="h-5 w-5 mr-2" />
                Site de l'entreprise
              </a>
            </div>
          </div>

          <!-- Job Description -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Description du poste</h2>
            <div class="prose text-gray-700" v-html="job.description"></div>
          </div>

          <!-- Requirements -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Exigences</h2>
            <div class="prose text-gray-700" v-html="job.requirements"></div>
          </div>

          <!-- Benefits -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Avantages</h2>
            <div class="prose text-gray-700" v-html="job.benefits"></div>
          </div>

          <!-- Application Form -->
          <div id="apply" class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Postuler à cette offre</h2>
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1"
                    >Prénom</label
                  >
                  <input
                    type="text"
                    id="first-name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1"
                    >Nom</label
                  >
                  <input
                    type="text"
                    id="last-name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1"
                  >Téléphone</label
                >
                <input
                  type="tel"
                  id="phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label for="resume" class="block text-sm font-medium text-gray-700 mb-1"
                  >CV (PDF, DOC, DOCX)</label
                >
                <div class="mt-1 flex items-center">
                  <label
                    for="resume-upload"
                    class="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Choisir un fichier
                  </label>
                  <input id="resume-upload" name="resume-upload" type="file" class="sr-only" />
                  <span class="ml-3 text-sm text-gray-500">Aucun fichier sélectionné</span>
                </div>
              </div>

              <div>
                <label for="cover-letter" class="block text-sm font-medium text-gray-700 mb-1"
                  >Lettre de motivation (optionnelle)</label
                >
                <textarea
                  id="cover-letter"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <div class="flex items-center">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="consent" class="ml-2 block text-sm text-gray-700">
                  J'accepte que mes données soient utilisées pour cette candidature et à des fins de
                  recrutement.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  Envoyer ma candidature
                  <ArrowLongRightIcon class="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-1/3">
          <!-- Recruiter Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Votre recruteur</h3>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 font-medium text-lg">AP</span>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ job.recruiter.name }}</h4>
                <p class="text-sm text-gray-500">{{ job.recruiter.position }}</p>
                <div class="mt-3 space-y-2">
                  <a href="#" class="flex items-center text-sm text-green-600 hover:text-green-700">
                    <EnvelopeIcon class="h-4 w-4 mr-2" />
                    {{ job.recruiter.email }}
                  </a>
                  <a href="#" class="flex items-center text-sm text-green-600 hover:text-green-700">
                    <PhoneIcon class="h-4 w-4 mr-2" />
                    {{ job.recruiter.phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Stats -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Statistiques de l'offre</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Date de publication</span>
                <span class="text-sm font-medium text-gray-900">{{ job.postedDate }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Type de contrat</span>
                <span class="text-sm font-medium text-gray-900">{{ job.typeLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Localisation</span>
                <span class="text-sm font-medium text-gray-900">{{ job.location }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Salaire</span>
                <span class="text-sm font-medium text-gray-900">{{ job.salary }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Candidatures</span>
                <span class="text-sm font-medium text-gray-900">{{ job.applicationCount }}</span>
              </div>
            </div>
          </div>

          <!-- Similar Jobs -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Offres similaires</h3>
            <div class="space-y-4">
              <a
                v-for="(similarJob, index) in similarJobs"
                :key="index"
                href="#"
                class="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div class="flex items-start space-x-3">
                  <img
                    :src="similarJob.logo"
                    :alt="similarJob.company"
                    class="w-10 h-10 object-contain rounded"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900">{{ similarJob.title }}</h4>
                    <p class="text-sm text-gray-500">{{ similarJob.company }}</p>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                      <MapPinIcon class="h-3.5 w-3.5 mr-1" />
                      <span>{{ similarJob.location }}</span>
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <span
                      class="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800"
                    >
                      {{ similarJob.salary }}
                    </span>
                  </div>
                </div>
              </a>
              <a
                href="#"
                class="block text-center text-green-600 hover:text-green-700 font-medium py-2"
              >
                Voir plus d'offres
                <ArrowLongRightIcon class="h-4 w-4 inline ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.prose ul {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.job-details-page {
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.prose {
  max-width: 100%;
  line-height: 1.6;
}

.prose p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.prose p:first-child {
  margin-top: 0;
}

.prose p:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .job-actions {
    flex-direction: column;
    width: 100%;
  }

  .job-actions a {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .job-meta {
    grid-template-columns: 1fr;
  }
}
</style>
