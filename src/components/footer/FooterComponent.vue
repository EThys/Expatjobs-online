<template>
  <footer class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Section -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center mb-4">
            <div class="bg-white/20 p-2 rounded-xl mr-3 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold">EXPAT JOBS Go</h2>
          </div>
          <p class="text-emerald-100/90 text-sm leading-relaxed mb-5">
            {{ $t('footer.description') }}
          </p>
          <!-- Social Links -->
          <div class="flex flex-wrap gap-2 text-white/80">
            <!-- Rutube -->
            <a
              href="#"
              title="Rutube"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden p-2 group"
            >
              <img
                :src="rutubeLogo"
                alt="Rutube"
                class="w-full h-full object-contain rounded-full filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </a>
            <!-- YouTube -->
            <a
              href="#"
              title="YouTube"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden p-2 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                alt="YouTube"
                class="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </a>
            <!-- VK -->
            <a
              href="#"
              title="VK"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden p-2 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg"
                alt="VK"
                class="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </a>
            <!-- Telegram -->
            <a
              href="#"
              title="Telegram"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden p-2 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
                class="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
            {{ $t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-2.5">
            <li>
              <router-link
                to="/"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ $t('footer.home') }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/jobs"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ $t('footer.jobs') }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/companies"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ $t('footer.companies') }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ $t('footer.blog') }}
              </router-link>
            </li>
            <li v-if="isRecruiter">
              <router-link
                to="/my-jobs"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ $t('footer.manageMyOffers') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
            {{ $t('footer.contact') }}
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="bg-white/10 p-1.5 rounded mr-3 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                :href="`mailto:${$t('footer.emailValue')}`"
                class="text-emerald-100/80 hover:text-white text-sm transition-colors"
              >
                {{ $t('footer.emailValue') }}
              </a>
            </li>
            <li class="flex items-start">
              <div class="bg-white/10 p-1.5 rounded mr-3 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-emerald-300"
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
              <div class="text-emerald-100/80 text-sm">
                <div class="mb-1">
                  <span class="text-emerald-300 font-medium">{{ $t('footer.mobile') }}:</span>
                  <a
                    :href="`tel:${$t('footer.mobileValue').replace(/\s/g, '')}`"
                    class="hover:text-white transition-colors"
                    >{{ $t('footer.mobileValue') }}</a
                  >
                </div>
                <div>
                  <span class="text-emerald-300 font-medium">{{ $t('footer.office') }}:</span>
                  <a
                    :href="`tel:${$t('footer.officeValue').replace(/\s/g, '')}`"
                    class="hover:text-white transition-colors"
                    >{{ $t('footer.officeValue') }}</a
                  >
                </div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-white/10 p-1.5 rounded mr-3 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="text-emerald-100/80 text-sm leading-relaxed">
                <div>{{ $t('footer.postalIndex') }}</div>
                <div>{{ $t('footer.city') }}</div>
                <div>{{ $t('footer.street') }}</div>
                <div class="mt-1 text-emerald-300/80 text-xs">{{ $t('footer.inn') }}</div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
            {{ $t('footer.newsletter') }}
          </h3>
          <p class="text-emerald-100/80 text-sm mb-4">
            {{ $t('footer.newsletterDescription') }}
          </p>
          <form @submit.prevent class="flex flex-col gap-2">
            <input
              type="email"
              :placeholder="$t('footer.newsletterPlaceholder')"
              class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-lg text-sm transition-all duration-300 hover:shadow-lg"
            >
              {{ $t('footer.newsletterSubscribe') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 sm:px-6 py-5">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-emerald-100/70 text-xs sm:text-sm text-center sm:text-left">
            © {{ new Date().getFullYear() }} EXPAT JOBS Go. {{ $t('footer.rights') }}.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="#"
              class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors"
            >
              {{ $t('footer.legal') }}
            </a>
            <a
              href="#"
              class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors"
            >
              {{ $t('footer.confidentiality') }}
            </a>
            <a
              href="#"
              class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors"
            >
              {{ $t('footer.termsShort') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUser } from '@/stores/authStorage'
import { useI18n } from 'vue-i18n'
// @ts-ignore
import rutubeLogo from '@/assets/rutube.jpg'

const { t } = useI18n()
const isRecruiter = ref(false)

onMounted(() => {
  const user = getUser()
  if (user && (user.role === 'RECRUITER' || user.role === 'ADMIN')) {
    isRecruiter.value = true
  }
})
</script>

<style scoped>
footer {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}
</style>
