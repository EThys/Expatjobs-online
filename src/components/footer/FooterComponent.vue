<template>
  <footer class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        <!-- Brand Section -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center mb-4">
            <div class="bg-white/20 p-2 rounded-xl mr-3 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold">
              Expat<span class="font-light">Jobs</span>
            </h2>
          </div>
          <p class="text-emerald-100/90 text-sm leading-relaxed mb-5">
            {{ $t('footer.description') }}
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a href="#" class="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/>
              </svg>
            </a>
            <a href="#" class="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" class="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
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
              <router-link to="/" class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ $t('footer.home') }}
              </router-link>
            </li>
            <li>
              <router-link to="/jobs" class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ $t('footer.jobs') }}
              </router-link>
            </li>
            <li>
              <router-link to="/company" class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ $t('footer.companies') }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ $t('footer.blog') }}
              </router-link>
            </li>
            <li>
              <router-link to="/my-jobs" class="text-emerald-100/80 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Gérer mes offres
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"/>
                </svg>
              </div>
              <a href="mailto:contact@expatjobs.com" class="text-emerald-100/80 hover:text-white text-sm transition-colors">
                contact@expatjobs.com
              </a>
            </li>
            <li class="flex items-start">
              <div class="bg-white/10 p-1.5 rounded mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <span class="text-emerald-100/80 text-sm">+243 854 434 602</span>
            </li>
            <li class="flex items-start">
              <div class="bg-white/10 p-1.5 rounded mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-emerald-100/80 text-sm">
                123 Rue des Opportunités<br/>75000 Paris, France
              </span>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
            Newsletter
          </h3>
          <p class="text-emerald-100/80 text-sm mb-4">
            Recevez les dernières offres d'emploi directement dans votre boîte mail.
          </p>
          <form @submit.prevent class="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Votre email"
              class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all"
            />
            <button 
              type="submit"
              class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-lg text-sm transition-all duration-300 hover:shadow-lg"
            >
              S'abonner
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
            © {{ new Date().getFullYear() }} ExpatJobs. Tous droits réservés.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#" class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors">
              Mentions légales
            </a>
            <a href="#" class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors">
              Confidentialité
            </a>
            <a href="#" class="text-emerald-100/70 hover:text-white text-xs sm:text-sm transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Composant Footer simplifié et optimisé
</script>

<style scoped>
footer {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}
</style>