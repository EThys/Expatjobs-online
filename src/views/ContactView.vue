<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PaperAirplaneIcon, PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import { useNotif } from '@/composables/useNotif'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
//@ts-ignore
import NavBar from '../components/navbar/NavBarComponent.vue'

const { t } = useI18n()
const { notifySuccess } = useNotif()
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitForm = () => {
  notifySuccess(t('contactPage.successMessage'))
  // Réinitialiser le formulaire
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<template>
  <NavBar />
  <header
    class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-emerald-800/90 to-cyan-600/90 py-24 w-full"
  >
    <!-- Effets de fond animés -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Dégradé principal -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-cyan-500/20"></div>
      <!-- Blobs animés -->
      <div
        class="absolute top-10 left-20 w-64 h-64 bg-purple-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"
      ></div>
      <div
        class="absolute top-20 right-32 w-72 h-72 bg-yellow-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <!-- Badge "Contact" avec effet de verre -->
      <div
        class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
      >
        <svg
          class="w-5 h-5 mr-2 text-emerald-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span class="text-sm font-medium text-white">{{ t('contactPage.badge') }}</span>
      </div>

      <!-- Titre principal avec effet de dégradé animé -->
      <h1
        class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100 animate-gradient-text"
      >
        <span class="block">{{ t('contactPage.title') }}</span>
        <span
          class="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400 mt-2"
        >
          {{ t('contactPage.subtitle') }}
        </span>
      </h1>

      <!-- Sous-titre avec animation -->
      <p class="text-xl text-emerald-50 max-w-2xl mx-auto mb-10 animate-fade-in">
        {{ t('contactPage.description') }}
        <strong class="text-white">{{ t('contactPage.descriptionHighlight') }}</strong
        >.
      </p>

      <!-- Boutons d'action -->
      <div class="flex flex-wrap justify-center gap-4">
        <a
          href="#contact-form"
          class="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {{ t('contactPage.writeUs') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
        <a
          href="tel:+243123456789"
          class="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
        >
          {{ t('contactPage.callUs') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Forme décorative en bas -->
    <div
      class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"
    ></div>
  </header>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 sm:mt-7 lg:px-8">
    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Formulaire de contact -->
          <div class="py-10 px-6 sm:px-10 lg:px-12">
            <h2 class="text-lg font-semibold text-gray-900 mb-8">
              {{ t('contactPage.formTitle') }}
            </h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                  {{ t('contactPage.nameLabel') }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :placeholder="t('contactPage.namePlaceholder')"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  {{ t('contactPage.emailLabel') }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :placeholder="t('contactPage.emailPlaceholder')"
                />
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700">
                  {{ t('contactPage.subjectLabel') }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.subject"
                  type="text"
                  id="subject"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :placeholder="t('contactPage.subjectPlaceholder')"
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">
                  {{ t('contactPage.messageLabel') }} <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="5"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :placeholder="t('contactPage.messagePlaceholder')"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  <PaperAirplaneIcon class="w-5 h-5 mr-2" />
                  {{ t('contactPage.submitButton') }}
                </button>
              </div>
            </form>
          </div>

          <!-- Informations de contact -->
          <div class="py-10 px-6 sm:px-10 lg:px-12 bg-green-50">
            <h2 class="text-lg font-semibold text-gray-900 mb-8">
              {{ t('contactPage.contactInfoTitle') }}
            </h2>
            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <EnvelopeIcon class="w-6 h-6 text-green-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium text-gray-900">{{ t('footer.email') }}</h3>
                  <a
                    :href="`mailto:${t('contactPage.emailValue')}`"
                    class="mt-1 text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {{ t('contactPage.emailValue') }}
                  </a>
                </div>
              </div>

              <!-- Téléphones -->
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <PhoneIcon class="w-6 h-6 text-green-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium text-gray-900">{{ t('footer.phone') }}</h3>
                  <div class="mt-1 space-y-1">
                    <div>
                      <span class="text-gray-700 font-medium">{{ t('contactPage.mobile') }}:</span>
                      <a
                        :href="`tel:${t('contactPage.mobileValue').replace(/\s/g, '')}`"
                        class="ml-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {{ t('contactPage.mobileValue') }}
                      </a>
                    </div>
                    <div>
                      <span class="text-gray-700 font-medium">{{ t('contactPage.office') }}:</span>
                      <a
                        :href="`tel:${t('contactPage.officeValue').replace(/\s/g, '')}`"
                        class="ml-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {{ t('contactPage.officeValue') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Adresse -->
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <MapPinIcon class="w-6 h-6 text-green-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium text-gray-900">{{ t('footer.address') }}</h3>
                  <div class="mt-1 text-gray-600 leading-relaxed">
                    <div>{{ t('contactPage.postalIndex') }}</div>
                    <div>{{ t('contactPage.city') }}</div>
                    <div>{{ t('contactPage.street') }}</div>
                    <div class="mt-1 text-gray-500 text-xs">{{ t('contactPage.inn') }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Carte intégrée (optionnelle) -->
            <div class="mt-8 h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.527139749253!2d15.29215031475134!3d-4.325813696633325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a31d9f3b28b2d!2sKinshasa!5e0!3m2!1sen!2sus!4v1684320000000!5m2!1sen!2sus"
                class="w-full h-full border-0"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped>
/* Animation subtile pour le bouton */
button:hover {
  transform: translateY(-1px);
}

/* Style pour les inputs */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
</style>
