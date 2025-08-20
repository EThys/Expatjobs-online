
<script setup>
import { ref, computed } from 'vue';
import SearchFilters from '@/components/filter/SearchFilters.vue';
import OffreCard from '@/components/cards/OffreCard.vue';
//@ts-ignore
import Navbar from '../../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../../components/footer/FooterComponent.vue'

const offres = ref([
  {
    id: 1,
    titre: "Développeur Full-Stack",
    entreprise: "TechGreen",
    localisation: "Kinshasa",
    typeContrat: "CDI",
    salaire: "3000 - 5000 USD",
    competences: ["JavaScript", "Vue.js", "Node.js"],
    datePublication: "Il y a 2 jours",
    urgent: true,
    remote: true
  },
  {
    id: 2,
    titre: "Designer UI/UX Senior",
    entreprise: "CréaGreen",
    localisation: "Lubumbashi",
    typeContrat: "Freelance",
    salaire: "2000 - 4000 USD",
    competences: ["Figma", "Adobe XD", "CSS", "Prototypage"],
    datePublication: "Il y a 1 semaine",
    featured: true
  },
  {
    id: 3,
    titre: "Chef de Projet IT",
    entreprise: "ProjetGreen",
    localisation: "Goma",
    typeContrat: "CDD",
    salaire: "3500 - 6000 USD",
    competences: ["Gestion de projet", "Agile", "Scrum", "Jira"],
    datePublication: "Il y a 3 jours"
  },
  {
    id: 4,
    titre: "Data Scientist",
    entreprise: "DataGreen",
    localisation: "Remote",
    typeContrat: "CDI",
    salaire: "4000 - 7000 USD",
    competences: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    datePublication: "Aujourd'hui",
    remote: true
  },
  {
    id: 5,
    titre: "Marketing Digital Manager",
    entreprise: "GrowthGreen",
    localisation: "Kinshasa",
    typeContrat: "CDI",
    salaire: "2500 - 4500 USD",
    competences: ["SEO", "Google Ads", "Réseaux sociaux", "Analytics"],
    datePublication: "Il y a 5 jours"
  },
  {
    id: 6,
    titre: "DevOps Engineer",
    entreprise: "CloudGreen",
    localisation: "Remote",
    typeContrat: "CDI",
    salaire: "4500 - 7500 USD",
    competences: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    datePublication: "Hier",
    remote: true,
    featured: true
  }
]);

const filters = ref({
  localisation: "",
  typeContrat: "",
  salaireMin: "",
  remoteOnly: false
});

const applyFilters = (newFilters) => {
  filters.value = newFilters;
};

const resetFilters = () => {
  filters.value = {
    localisation: "",
    typeContrat: "",
    salaireMin: "",
    remoteOnly: false
  };
};

const filteredOffres = computed(() => {
  return offres.value.filter((offre) => {
    const matchesLocalisation = filters.value.localisation
      ? offre.localisation.toLowerCase().includes(filters.value.localisation.toLowerCase())
      : true;
    const matchesTypeContrat = filters.value.typeContrat
      ? offre.typeContrat === filters.value.typeContrat
      : true;
    const matchesSalaire = filters.value.salaireMin
      ? parseInt(offre.salaire.split(" ")[0]) >= parseInt(filters.value.salaireMin)
      : true;
    const matchesRemote = filters.value.remoteOnly
      ? offre.remote === true
      : true;
    return matchesLocalisation && matchesTypeContrat && matchesSalaire && matchesRemote;
  });
});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header amélioré -->
    <!-- <header class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">JobGreen</span>
          </div>
          
          <div class="hidden md:flex items-center space-x-4">
            <nav class="flex space-x-8">
              <a href="#" class="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Accueil</a>
              <a href="#" class="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Offres</a>
              <a href="#" class="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Entreprises</a>
              <a href="#" class="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Ressources</a>
            </nav>
            
            <div class="relative">
              <input
                type="text"
                placeholder="Rechercher une offre..."
                class="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div class="flex space-x-3">
              <button class="px-4 py-2 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
                Connexion
              </button>
              <button class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:from-emerald-600 hover:to-teal-500 transition-all shadow-md hover:shadow-emerald-200">
                S'inscrire
              </button>
            </div>
          </div>
          
         
          <button class="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header> -->
    <Navbar />
    <!-- Bannière Hero améliorée -->
     <section class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-emerald-800 to-teal-500 py-28 px-4 sm:px-6 lg:px-8">
  <!-- Effets de fond dynamiques -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-cyan-500/20"></div>
    <!-- Particules lumineuses -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-300/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse-slow"></div>
    <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-300/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse-fast"></div>
    <!-- Lignes de lumière -->
    <div class="absolute top-0 right-0 w-[2px] h-full bg-white/20 transform rotate-15"></div>
    <div class="absolute bottom-0 left-0 w-full h-[2px] bg-white/20"></div>
  </div>

  <!-- Contenu principal -->
  <div class="max-w-5xl mx-auto text-center relative z-10">
    <!-- Éléments décoratifs -->
    <div class="flex justify-center mb-8">
      <div class="w-20 h-1 bg-white/30 rounded-full mb-4 animate-expand"></div>
      <div class="w-3 h-3 bg-white/30 rounded-full mx-2 animate-float"></div>
      <div class="w-3 h-3 bg-white/30 rounded-full mx-2 animate-float-delay"></div>
      <div class="w-3 h-3 bg-white/30 rounded-full mx-2 animate-float-long"></div>
      <div class="w-20 h-1 bg-white/30 rounded-full mb-4 animate-expand-delay"></div>
    </div>

    <!-- Titre principal avec effet 3D -->
    <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-emerald-100 animate-text-reveal">
      Trouvez <span class="relative inline-block">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400 drop-shadow-glow">l'offre</span>
        <svg class="absolute -bottom-2 left-0 w-full h-2 text-emerald-300" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" fill="currentColor" opacity="0.3"></path>
        </svg>
      </span> qui vous correspond
    </h1>

    <!-- Sous-titre avec effet de machine à écrire -->
    <p class="text-2xl text-emerald-50 max-w-3xl mx-auto mb-12 font-light typewriter">
      Explorez nos offres <strong class="text-white font-medium">exclusives</strong> et boostez votre carrière à l'international
    </p>

    <!-- Boutons d'action futuristes -->
    <div class="flex flex-wrap justify-center gap-6">
      <button class="relative group overflow-hidden px-8 py-4 bg-white/90 text-emerald-700 font-medium rounded-xl shadow-2xl hover:shadow-emerald-400/30 transition-all duration-500 transform hover:-translate-y-1">
        <span class="relative z-10">Découvrir les offres</span>
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        <svg class="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-700 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7m0 0l-7 7m7-7H6" />
        </svg>
      </button>
      <button class="relative group overflow-hidden px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:border-white/60 transition-all duration-500">
        <span class="relative z-10">Filtres avancés</span>
        <div class="absolute inset-0 border-2 border-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
      </button>
    </div>

    <!-- Illustration abstraite -->
    <div class="mt-16 opacity-80">
      <svg class="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" fill="none">
        <path d="M100,100 Q300,50 500,100 Q700,150 750,50" stroke="url(#gradient)" stroke-width="3" stroke-linecap="round" class="animate-draw"/>
        <path d="M50,150 Q250,100 450,150 Q650,200 750,100" stroke="url(#gradient)" stroke-width="2" stroke-linecap="round" stroke-dasharray="5,5" class="animate-draw-delay"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="cyan" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>

  <!-- Forme décorative en bas -->
  <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-white/30 transform skew-y-[-4deg] animate-wave-subtle"></div>
</section>
    <!-- Section Filtres + Offres modernisée -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- Filtres -->
        <aside class="lg:w-1/4">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-28 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 mr-2 text-emerald-500" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zm0 6h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
              </svg>
              Filtres
            </h3>

            <SearchFilters @filter="applyFilters" />

            <div class="mt-6">
              <button 
                @click="resetFilters"
                class="text-sm font-medium text-emerald-600 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </aside>

        <!-- Liste des offres -->
        <div class="lg:w-3/4 space-y-8">
          <!-- Header résultats -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 class="text-2xl font-bold text-gray-800">
              Offres disponibles
              <span class="ml-2 text-gray-400 text-lg font-normal">
                ({{ filteredOffres.length }} résultats)
              </span>
            </h2>
            
            <div class="flex items-center gap-3">
              <label class="text-sm text-gray-500">Trier par :</label>
              <select class="text-sm border-gray-200 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                <option>Pertinence</option>
                <option>Date</option>
                <option>Salaire ↑</option>
                <option>Salaire ↓</option>
              </select>
            </div>
          </div>

          <!-- Cards des offres -->
          <div v-if="filteredOffres.length > 0" class="grid sm:grid-cols-2 gap-6">
            <OffreCard
              v-for="offre in filteredOffres"
              :key="offre.id"
              :offre="offre"
              class="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-200"
            />
          </div>

          <!-- Si aucune offre -->
          <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 14h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2h10zm-6 4h.01" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Aucune offre trouvée</h3>
            <p class="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
            <button 
              @click="resetFilters"
              class="px-5 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>

          <!-- Pagination -->
          <div class="pt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button class="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button class="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium shadow">1</button>
              <button class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">2</button>
              <button class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">3</button>
              <span class="px-2 text-gray-400">...</span>
              <button class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">8</button>
              <button class="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>


    <!-- Section CTA -->
    <section class="bg-gradient-to-r from-emerald-50 to-teal-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Vous recrutez ?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Publiez vos offres d'emploi et atteignez des milliers de candidats qualifiés en Afrique et dans le monde.
        </p>
        <button class="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-500 transition-all shadow-lg hover:shadow-xl">
          Publier une offre
        </button>
      </div>
    </section>

  </div>
  <Footer />
</template>
<style>
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.05); opacity: 0.4; }
  }

  @keyframes pulseFast {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.03); opacity: 0.35; }
  }

  @keyframes expand {
    0%, 100% { width: 5rem; }
    50% { width: 7rem; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes textReveal {
    0% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes draw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes waveSubtle {
    0%, 100% { transform: translateY(0) skewY(-4deg); }
    50% { transform: translateY(-3px) skewY(-4deg); }
  }

  .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
  .animate-pulse-fast { animation: pulseFast 6s ease-in-out infinite; }
  .animate-expand { animation: expand 4s ease-in-out infinite; }
  .animate-expand-delay { animation: expand 4s ease-in-out infinite 1s; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-float-delay { animation: float 3s ease-in-out infinite 0.5s; }
  .animate-float-long { animation: float 4s ease-in-out infinite 1s; }
  .animate-text-reveal {
    background-size: 100% 200%;
    animation: textReveal 1.5s ease-out forwards;
  }
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 5s steps(160) forwards;
  }
  .animate-draw {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 3s ease-in-out forwards;
  }
  .animate-draw-delay {
    animation-delay: 0.5s;
  }
  .animate-wave-subtle { animation: waveSubtle 6s ease-in-out infinite; }
  .drop-shadow-glow {
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
  }

  @media (max-width: 768px) {
    section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    h1 {
      font-size: 2.5rem !important;
    }
    .absolute.bottom-0 {
      height: 16px;
    }
  }

</style>
