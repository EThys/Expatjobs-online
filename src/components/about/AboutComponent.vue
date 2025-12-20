<template>
  <section class="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
    <!-- Fond dynamique sophistiqué -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent opacity-60"></div>
      <div class="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-blob-slow mix-blend-multiply"></div>
      <div class="absolute top-[40%] -left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-blob-fast mix-blend-multiply"></div>
      <!-- Pattern grid subtil -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgNDBoMXYtMWgtMXptMjAgMjBoMXYtMWgtMXptMjAtMjBoMXYtMWgtMXoiIGZpbGw9IiM5NDRhMzgiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60"></div>
    </div>

    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- En-tête Hero -->
      <div class="text-center max-w-4xl mx-auto mb-20 sm:mb-28 animate-fade-in-up">
      
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
          {{ t('about.title') }}
          <span class="relative inline-block">
            <span class="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 animate-gradient-x">
              ExpatJobs
            </span>
            <span class="absolute -bottom-2 left-0 w-full h-3 bg-emerald-200/30 -rotate-2 rounded-full blur-sm"></span>
          </span>
        </h1>

        <p class="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {{ t('about.description') }}
        </p>
      </div>

      <!-- Bande de statistiques flottante -->
     

      <!-- Grille de cartes (Talents / Mission / Entreprises) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-7">
        
        <!-- Carte Talents -->
        <div class="group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
           <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div class="relative z-10 flex flex-col h-full">
             <div class="w-14 h-14 rounded-2xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
             </div>
             <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ t('about.forTalents.title') }}</h3>
             <p class="text-gray-600 flex-grow leading-relaxed">{{ t('about.forTalents.description') }}</p>
             
             <ul class="mt-8 space-y-4">
                <li class="flex items-center text-sm text-gray-600">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 mr-3"></span>
                  {{ t('about.forTalents.feature1') }}
                </li>
                <li class="flex items-center text-sm text-gray-600">
                   <span class="w-2 h-2 rounded-full bg-emerald-400 mr-3"></span>
                   {{ t('about.forTalents.feature2') }}
                </li>
             </ul>
           </div>
        </div>

        <!-- Carte Mission (Highlighted) -->
        <div class="group relative bg-white rounded-[2rem] p-8 border border-emerald-100 shadow-2xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden md:scale-110 md:z-10 ring-8 ring-white/50">
           <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-[80px] group-hover:bg-emerald-200/40 transition-colors"></div>
           
           <div class="relative z-10 flex flex-col h-full">
             <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
             
             <h3 class="text-3xl font-bold mb-4 text-gray-900 group-hover:text-emerald-700 transition-colors">{{ t('about.mission.title') }}</h3>
             <p class="text-gray-600 flex-grow leading-relaxed text-lg">{{ t('about.mission.description') }}</p>
             
              <div class="mt-8 pt-8 border-t border-emerald-100">
                <p class="text-sm font-medium text-emerald-600 mb-2">Impact Global</p>
                <div class="flex items-center gap-4">
                  <div>
                    <span class="text-2xl font-bold text-gray-900">50+</span>
                    <span class="text-xs text-gray-500 block">Pays</span>
                  </div>
                  <div class="h-8 w-px bg-emerald-100"></div>
                  <div>
                     <span class="text-2xl font-bold text-gray-900">10K+</span>
                     <span class="text-xs text-gray-500 block">Success Stories</span>
                  </div>
                </div>
              </div>
           </div>
        </div>

        <!-- Carte Entreprises -->
        <div class="group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10 flex flex-col h-full">
              <div class="w-14 h-14 rounded-2xl bg-blue-100/50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ t('about.forCompanies.title') }}</h3>
              <p class="text-gray-600 flex-grow leading-relaxed">{{ t('about.forCompanies.description') }}</p>
              
              <ul class="mt-8 space-y-4">
                 <li class="flex items-center text-sm text-gray-600">
                   <span class="w-2 h-2 rounded-full bg-blue-400 mr-3"></span>
                   {{ t('about.forCompanies.feature1') }}
                 </li>
                 <li class="flex items-center text-sm text-gray-600">
                    <span class="w-2 h-2 rounded-full bg-blue-400 mr-3"></span>
                    {{ t('about.forCompanies.feature2') }}
                 </li>
              </ul>
            </div>
         </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.animate-blob-slow {
  animation: blob 10s infinite;
}
.animate-blob-fast {
  animation: blob 8s infinite reverse;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
