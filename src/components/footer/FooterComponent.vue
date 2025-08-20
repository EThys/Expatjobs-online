<template>
  <footer class="bg-gradient-to-br from-emerald-800 via-teal-700 to-teal-800 text-white pt-16 pb-10 relative overflow-hidden">
    <!-- Éléments décoratifs -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-emerald-400 filter blur-3xl"></div>
      <div class="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-teal-400 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative">
      <!-- Contenu principal du footer -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Colonne Logo + Description -->
        <div class="md:col-span-2">
          <div class="flex items-center mb-6">
            <div class="bg-white/20 p-2.5 rounded-xl mr-4 backdrop-blur-sm transform transition duration-500 hover:rotate-12 hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9 text-white"
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
            <h2 class="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
              Expat<span class="font-light">Jobs</span>
            </h2>
          </div>
          <p class="text-emerald-100/90 text-lg mb-6 leading-relaxed">
            Votre passerelle vers des opportunités professionnelles internationales. 
            Nous connectons les talents aux meilleures entreprises à travers le monde.
          </p>
          <div class="flex space-x-5">
            <a href="#" class="text-white hover:text-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" class="text-white hover:text-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
            <a href="#" class="text-white hover:text-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" class="text-white hover:text-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Colonne Liens rapides -->
        <div>
          <h3 class="text-xl font-semibold mb-5 pb-2 relative inline-block">
            <span class="relative z-10">Liens rapides</span>
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/50 rounded-full"></span>
          </h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="flex items-center text-emerald-100/90 hover:text-white transition-all duration-300 group">
                <span class="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Accueil</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-emerald-100/90 hover:text-white transition-all duration-300 group">
                <span class="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Offres d'emploi</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-emerald-100/90 hover:text-white transition-all duration-300 group">
                <span class="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Entreprises</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-emerald-100/90 hover:text-white transition-all duration-300 group">
                <span class="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Blog</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-emerald-100/90 hover:text-white transition-all duration-300 group">
                <span class="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Témoignages</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Colonne Contact -->
        <div>
          <h3 class="text-xl font-semibold mb-5 pb-2 relative inline-block">
            <span class="relative z-10">Contact</span>
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/50 rounded-full"></span>
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start group">
              <div class="bg-emerald-900/30 p-1.5 rounded-lg mr-3 group-hover:bg-emerald-700/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-emerald-300"
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
              <span class="text-emerald-100/90 group-hover:text-white transition-colors duration-300">contact@expatjobs.com</span>
            </li>
            <li class="flex items-start group">
              <div class="bg-emerald-900/30 p-1.5 rounded-lg mr-3 group-hover:bg-emerald-700/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-emerald-300"
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
              <span class="text-emerald-100/90 group-hover:text-white transition-colors duration-300">+243 854 434 602</span>
            </li>
            <li class="flex items-start group">
              <div class="bg-emerald-900/30 p-1.5 rounded-lg mr-3 group-hover:bg-emerald-700/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-emerald-300"
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
              <span class="text-emerald-100/90 group-hover:text-white transition-colors duration-300">
                123 Rue des Opportunités<br />75000 Moscou, Russie
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <!-- <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-10 border border-white/10">
        <h3 class="text-xl font-semibold mb-3 text-white">Abonnez-vous à notre newsletter</h3>
        <p class="text-emerald-100/90 mb-4">Recevez les dernières offres d'emploi directement dans votre boîte mail.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Votre email" 
            class="flex-grow px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
          >
          <button class="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-emerald-500/20">
            S'abonner
          </button>
        </div>
      </div> -->

      <!-- Copyright et mentions légales -->
      <div class="border-t border-emerald-500/20 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-emerald-100/80 text-sm mb-4 md:mb-0">
          © 2025 ExpatJobs. Tous droits réservés.
        </p>
        <div class="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" class="text-emerald-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4">
            Mentions légales
          </a>
          <a href="#" class="text-emerald-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4">
            Politique de confidentialité
          </a>
          <a href="#" class="text-emerald-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4">
            Conditions d'utilisation
          </a>
          <a href="#" class="text-emerald-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Animation des icônes sociales */
a:hover svg {
  filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.3));
}

/* Effet de vague optionnel (décommenter pour utiliser) */
/*
footer::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 50px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%230f766e' opacity='.25'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%230f766e' opacity='.5'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%2314b8a6'/%3E%3C/svg%3E");
  background-size: cover;
  background-repeat: no-repeat;
}
*/
</style>