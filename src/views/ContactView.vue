<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
//@ts-ignore
import NavBar from '@/components/navbar/NavBarComponent.vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Animation d'entrée
const animateElements = () => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach((el, i) => {
    el.classList.add('opacity-0', 'translate-y-6')
    setTimeout(() => {
      el.classList.add('transition-all', 'duration-500', 'ease-out')
      el.classList.remove('opacity-0', 'translate-y-6')
    }, 150 * i)
  })
}

const submitForm = async (event: Event) => {
  event.preventDefault()
  isSubmitting.value = true
  submitError.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    submitSuccess.value = true
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false,
    }
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  animateElements()
})
</script>

<template>
  <NavBar />
  <div class="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto text-center mb-16 animate-on-scroll">
      <div class="inline-flex items-center justify-center mb-6">
        <div
          class="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <h1
        class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl animate-on-scroll"
      >
        <span class="block">Contactez ExpatJobs</span>
      </h1>
      <p
        class="mt-5 max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed animate-on-scroll delay-100"
      >
        Nous connectons les talents internationaux avec les meilleures opportunités. Posez vos
        questions ou partagez vos besoins avec notre équipe dédiée.
      </p>
    </div>

    <!-- Stats Section -->
    <div class="max-w-7xl mx-auto mb-16 animate-on-scroll delay-200">
      <div
        class="bg-white rounded-2xl shadow-sm p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100"
      >
        <div class="text-center pl-0 md:pl-8 first:pl-0">
          <div class="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
          <div class="text-sm font-medium text-gray-500">Candidats actifs</div>
        </div>
        <div class="text-center pl-0 md:pl-8">
          <div class="text-4xl font-bold text-emerald-600 mb-2">500+</div>
          <div class="text-sm font-medium text-gray-500">Entreprises partenaires</div>
        </div>
        <div class="text-center pl-0 md:pl-8">
          <div class="text-4xl font-bold text-emerald-600 mb-2">95%</div>
          <div class="text-sm font-medium text-gray-500">Taux de satisfaction</div>
        </div>
        <div class="text-center pl-0 md:pl-8">
          <div class="text-4xl font-bold text-emerald-600 mb-2">24h</div>
          <div class="text-sm font-medium text-gray-500">Temps de réponse moyen</div>
        </div>
      </div>
    </div>

    <!-- Testimonial Section -->
    <div class="max-w-7xl mx-auto mb-16 animate-on-scroll delay-300">
      <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white">
        <div class="max-w-3xl mx-auto text-center">
          <svg
            class="h-8 w-8 text-emerald-300 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path
              d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
            />
          </svg>
          <blockquote class="text-xl font-medium mb-4">
            "ExpatJobs a transformé notre processus de recrutement international. Leur équipe est
            réactive, professionnelle et vraiment à l'écoute de nos besoins."
          </blockquote>
          <div class="flex items-center justify-center">
            <img
              class="h-12 w-12 rounded-full border-2 border-emerald-300"
              src="https://randomuser.me/api/portraits/women/43.jpg"
              alt="Sarah Johnson"
            />
            <div class="ml-4 text-left">
              <div class="font-medium">Sarah Johnson</div>
              <div class="text-emerald-200 text-sm">Directrice RH, GlobalTech</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form Section -->
    <div class="max-w-7xl mx-auto animate-on-scroll delay-400">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Informations de contact -->
          <div class="bg-gradient-to-br from-emerald-600 to-emerald-500 p-10 text-white">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold mb-8">Nos coordonnées</h2>

              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-emerald-500 rounded-lg p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Téléphone</h3>
                    <p class="mt-1 text-emerald-100">+243 810 417 461</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-emerald-500 rounded-lg p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Email</h3>
                    <p class="mt-1 text-emerald-100">contact@expatjobs.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-emerald-500 rounded-lg p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Heures d'ouverture</h3>
                    <p class="mt-1 text-emerald-100">
                      Lundi-Vendredi: 8h00-17h00<br />
                      Samedi: 9h00-13h00
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-12">
                <h3 class="text-lg font-medium mb-4">Suivez-nous</h3>
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="bg-emerald-500 hover:bg-emerald-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="bg-emerald-500 hover:bg-emerald-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="bg-emerald-500 hover:bg-emerald-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="bg-emerald-500 hover:bg-emerald-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire -->
          <div class="p-10">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>

              <form class="space-y-6" @submit="submitForm">
                <!-- Nom complet -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700"
                    >Nom complet <span class="text-emerald-600">*</span></label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.name"
                      type="text"
                      id="name"
                      name="name"
                      required
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="Votre nom complet"
                    />
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700"
                    >Email <span class="text-emerald-600">*</span></label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.email"
                      type="email"
                      id="email"
                      name="email"
                      required
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <!-- Téléphone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700"
                    >Téléphone (optionnel)</label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      id="phone"
                      name="phone"
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                </div>

                <!-- Sujet -->
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700"
                    >Sujet <span class="text-emerald-600">*</span></label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <select
                      v-model="formData.subject"
                      id="subject"
                      name="subject"
                      required
                      class="py-3 pl-10 pr-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none"
                    >
                      <option value="" disabled selected>Sélectionnez un sujet</option>
                      <option value="support">Support technique</option>
                      <option value="sales">Demande commerciale</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                    <div
                      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700"
                    >Message <span class="text-emerald-600">*</span></label
                  >
                  <div class="mt-1">
                    <textarea
                      v-model="formData.message"
                      id="message"
                      name="message"
                      rows="4"
                      required
                      class="py-3 px-4 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="Décrivez votre demande..."
                    ></textarea>
                  </div>
                </div>

                <!-- Consentement -->
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      v-model="formData.consent"
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      class="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="consent" class="font-medium text-gray-700">
                      J'accepte que mes données soient traitées conformément à la
                      <a href="#" class="text-emerald-600 hover:text-emerald-500 underline"
                        >politique de confidentialité</a
                      >.
                    </label>
                  </div>
                </div>

                <!-- Bouton de soumission -->
                <div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-75"
                  >
                    <svg
                      class="-ml-1 mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span v-if="!isSubmitting">Envoyer le message</span>
                    <span v-else>Envoi en cours...</span>
                  </button>
                </div>

                <!-- Messages de feedback -->
                <div v-if="submitSuccess" class="rounded-md bg-emerald-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-emerald-800">
                        Votre message a été envoyé avec succès !
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="submitError" class="rounded-md bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-red-800">{{ submitError }}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.delay-100 {
  transition-delay: 100ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.delay-300 {
  transition-delay: 300ms;
}
.delay-400 {
  transition-delay: 400ms;
}

/* Transition pour les inputs */
input,
select,
textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Style pour le focus */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  outline: none;
}

/* Bouton désactivé */
button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
</style>
