<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <!-- Fond animé avec particules subtiles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -left-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow"></div>
      <div class="absolute -bottom-40 -right-40 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-fast"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIj48L3JlY3Q+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiIvPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZmZmYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZmZmYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9zdmc+')] opacity-10"></div>
    </div>

    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto relative z-10 container-responsive">
      <!-- En-tête avec fond -->
      <div class="relative text-center mb-6 sm:mb-10 md:mb-12 animate-on-scroll overflow-hidden rounded-3xl" data-delay="0">
        <!-- Fond avec image et couleur -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-teal-600 opacity-95">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-cyan-600/80 to-teal-700/80"></div>
        </div>
        
        <!-- Contenu texte -->
        <div class="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 drop-shadow-lg">
            <span class="block">
              {{ t('about.title') }}
            </span>
            <span class="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">{{ t('about.subtitle') }}</span>
          </h1>

          <p class="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/95 px-4 drop-shadow-md">
            {{ t('about.description') }}
          </p>
        </div>
      </div>

      <!-- Bande de statistiques inspirée des plateformes de jobs modernes -->
      <div class="metrics-grid-wrapper mb-12 sm:mb-16 md:mb-20">
        <div class="metrics-grid">
          <div class="metric-card group">
            <div class="metric-icon-wrapper">
              <svg class="metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="metric-value">100K+</div>
            <div class="metric-label">candidatures traitées</div>
            <div class="metric-caption">Des profils qualifiés partout dans le monde</div>
          </div>
          <div class="metric-card group">
            <div class="metric-icon-wrapper">
              <svg class="metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="metric-value">2 000+</div>
            <div class="metric-label">offres publiées</div>
            <div class="metric-caption">CDI, missions freelance et stages</div>
          </div>
          <div class="metric-card group">
            <div class="metric-icon-wrapper">
              <svg class="metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="metric-value">80+</div>
            <div class="metric-label">pays couverts</div>
            <div class="metric-caption">Europe, Afrique, Moyen‑Orient & plus</div>
          </div>
          <div class="metric-card group">
            <div class="metric-icon-wrapper">
              <svg class="metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="metric-value">24/7</div>
            <div class="metric-label">plateforme disponible</div>
            <div class="metric-caption">Trouvez ou publiez une offre à tout moment</div>
          </div>
        </div>
      </div>

      <!-- Grille de fonctionnalités avec effets 3D -->
      <div class="features-grid-section mt-16 sm:mt-20 md:mt-24">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 stagger-children">
        <!-- Carte 1: Pour les talents -->
        <div class="group relative overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-emerald-100/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-3 hover:scale-[1.02] transform animate-on-scroll" data-delay="100">
          <!-- Fond animé avec dégradé -->
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <!-- Effet de lumière -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative z-10">
            <!-- Icône améliorée -->
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">{{ t('about.forTalents.title') }}</h3>
            <p class="text-gray-600 mb-8 text-base leading-relaxed">{{ t('about.forTalents.description') }}</p>
            
            <!-- Liste de fonctionnalités améliorée -->
            <div class="space-y-4">
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-emerald-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forTalents.feature1') }}</span>
              </div>
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-emerald-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forTalents.feature2') }}</span>
              </div>
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-emerald-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.044M12 20v-8m0 8l2 2m-2-2l-2 2" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forTalents.feature3') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte 2: Notre mission (highlight) -->
        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-600 p-8 sm:p-10 text-white shadow-2xl border-2 border-emerald-400/30 transform hover:scale-[1.03] hover:shadow-emerald-500/30 transition-all duration-500 animate-on-scroll" data-delay="200">
          <!-- Effets de lumière animés -->
          <div class="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-pulse"></div>
          <div class="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
          
          <!-- Pattern décoratif -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 20px 20px;"></div>
          </div>
          
          <div class="relative z-10">
            <!-- Icône améliorée -->
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm mb-6 shadow-xl border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
              <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-white drop-shadow-lg">{{ t('about.mission.title') }}</h3>
            <p class="text-white/95 mb-8 text-base leading-relaxed drop-shadow-md">{{ t('about.mission.description') }}</p>
            
            <!-- Liste de fonctionnalités améliorée -->
            <div class="space-y-4 mb-8">
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-white/25 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-white group-hover/item:scale-110 transition-all duration-200">
                  <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15l8-8V5H4v2l8 8z" />
                  </svg>
                </div>
                <span class="text-white font-medium">{{ t('about.mission.feature1') }}</span>
              </div>
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-white/25 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-white group-hover/item:scale-110 transition-all duration-200">
                  <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span class="text-white font-medium">{{ t('about.mission.feature2') }}</span>
              </div>
              <div class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-white/25 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-white group-hover/item:scale-110 transition-all duration-200">
                  <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span class="text-white font-medium">{{ t('about.mission.feature3') }}</span>
              </div>
            </div>
            
            <!-- Statistiques améliorées -->
            <div class="pt-8 border-t border-white/30">
              <div class="flex items-center justify-between">
                <div class="text-center sm:text-left">
                  <p class="text-4xl font-extrabold text-white mb-1 drop-shadow-lg">10K+</p>
                  <p class="text-sm text-white/90 font-medium">Opportunités créées</p>
                </div>
                <div class="text-center sm:text-right">
                  <p class="text-4xl font-extrabold text-white mb-1 drop-shadow-lg">50+</p>
                  <p class="text-sm text-white/90 font-medium">Pays couverts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte 3: Pour les entreprises -->
        <div class="group relative overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-cyan-100/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-3 hover:scale-[1.02] transform animate-on-scroll" data-delay="300">
          <!-- Fond animé avec dégradé -->
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 via-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <!-- Effet de lumière -->
          <div class="absolute top-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative z-10">
            <!-- Icône améliorée -->
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 mb-6 shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-700 transition-colors duration-300">{{ t('about.forCompanies.title') }}</h3>
            <p class="text-gray-600 mb-8 text-base leading-relaxed">{{ t('about.forCompanies.description') }}</p>
            
            <!-- Liste de fonctionnalités améliorée -->
            <ul class="space-y-4">
              <li class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-cyan-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-cyan-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 18a9 9 0 019-9" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forCompanies.feature1') }}</span>
              </li>
              <li class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-cyan-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-cyan-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forCompanies.feature2') }}</span>
              </li>
              <li class="flex items-start group/item">
                <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center mt-0.5 mr-3 group-hover/item:bg-cyan-500 transition-colors duration-200">
                  <svg class="h-4 w-4 text-cyan-600 group-hover/item:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ t('about.forCompanies.feature3') }}</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>

      <!-- Processus Révolutionnaire - Design Ultra-Moderne -->
      <div class="process-section relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 animate-on-scroll overflow-hidden" data-delay="400">
        <!-- Fond dynamique avec particules -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-20 left-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl animate-float opacity-60"></div>
          <div class="absolute bottom-20 right-20 w-48 h-48 bg-green-200/15 rounded-full blur-3xl animate-float-reverse opacity-50"></div>
          <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl animate-pulse opacity-40"></div>

        </div>

        <!-- Header révolutionnaire -->
        <div class="process-header relative z-10 mb-16 sm:mb-20">
          <div class="process-header-left">
            <!-- Petite illustration à gauche du badge -->
            <div
              class="process-illustration animate-on-scroll"
              data-delay="460"
            >
              <div class="illustration-circle">
                <div class="illustration-inner">
                  <span class="illustration-step">3</span>
                  <span class="illustration-label">steps</span>
                </div>
              </div>
            </div>

            <div
              class="process-badge animate-on-scroll"
              data-delay="480"
            >
              <span class="badge-dot"></span>
              <span class="badge-text">
                {{ t('about.process.badge', 'Seulement 3 étapes') }}
              </span>
            </div>

            <h2
              class="process-title animate-on-scroll"
              data-delay="500"
            >
              {{ t('about.process.title') }}
              <span class="process-title-highlight">
                {{ t('about.process.highlight') }}
              </span>
            </h2>

            <p
              class="process-subtitle animate-on-scroll"
              data-delay="600"
            >
              {{ t('about.process.description') }}
            </p>
          </div>

          <div class="process-header-right animate-on-scroll" data-delay="650">
            <div class="process-mini-grid">
              <div class="process-mini-card">
                <div class="mini-label">Étape 1</div>
                <div class="mini-title">{{ t('about.process.step1.title') }}</div>
                <div class="mini-desc">{{ t('about.process.step1.feature1') }}</div>
              </div>
              <div class="process-mini-card">
                <div class="mini-label">Étape 2</div>
                <div class="mini-title">{{ t('about.process.step2.title') }}</div>
                <div class="mini-desc">{{ t('about.process.step2.feature1') }}</div>
              </div>
              <div class="process-mini-card">
                <div class="mini-label">Étape 3</div>
                <div class="mini-title">{{ t('about.process.step3.title') }}</div>
                <div class="mini-desc">{{ t('about.process.step3.feature1') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline verticale interactive -->
        <div class="relative max-w-6xl mx-auto container-responsive">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-8 relative stagger-children">
            <!-- Étape 1 - Création Ultra-Moderne -->
            <div class="text-center lg:text-right animate-on-scroll" data-delay="700">
              <div class="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100/50 hover:shadow-emerald-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden">
                <!-- Fond animé -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- Numéro et icône -->
                <div class="relative z-10 flex justify-center lg:justify-end mb-6">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                    <span class="text-2xl sm:text-3xl font-bold text-white">1</span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="relative z-10">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {{ t('about.process.step1.title') }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    {{ t('about.process.step1.description') }}
                  </p>

                  <!-- Fonctionnalités -->
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step1.feature1') }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step1.feature2') }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step1.feature3') }}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Étape 2 - Matching IA -->
            <div class="animate-on-scroll" data-delay="800">
              <div class="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100/50 hover:shadow-green-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden">
                <!-- Fond animé -->
                <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- Numéro et icône -->
                <div class="relative z-10 flex justify-center mb-6">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
                    <span class="text-2xl sm:text-3xl font-bold text-white">2</span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="relative z-10 text-center">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-700 transition-colors duration-300">
                    {{ t('about.process.step2.title') }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    {{ t('about.process.step2.description') }}
                  </p>

                  <!-- Fonctionnalités -->
                  <div class="space-y-3">
                    <div class="flex items-center justify-center space-x-3 text-sm text-green-700">
                      <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step2.feature1') }}</span>
                    </div>
                    <div class="flex items-center justify-center space-x-3 text-sm text-green-700">
                      <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step2.feature2') }}</span>
                    </div>
                    <div class="flex items-center justify-center space-x-3 text-sm text-green-700">
                      <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step2.feature3') }}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Étape 3 - Connexion Instantanée -->
            <div class="text-center lg:text-left animate-on-scroll" data-delay="900">
              <div class="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100/50 hover:shadow-emerald-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden">
                <!-- Fond animé -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- Numéro et icône -->
                <div class="relative z-10 flex justify-center lg:justify-start mb-6">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-emerald-600/50 transition-all duration-300 group-hover:scale-110">
                    <span class="text-2xl sm:text-3xl font-bold text-white">3</span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="relative z-10">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {{ t('about.process.step3.title') }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    {{ t('about.process.step3.description') }}
                  </p>

                  <!-- Fonctionnalités -->
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step3.feature1') }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step3.feature2') }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm text-emerald-700">
                      <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span>{{ t('about.process.step3.feature3') }}</span>
                    </div>
                  </div>
                </div>

                <!-- Indicateur de succès -->
                <div class="absolute top-4 right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Gestion des animations au scroll
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec animate-on-scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll')
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Cleanup
  return () => {
    animatedElements.forEach((el) => {
      observer.unobserve(el)
    })
  }
}

onMounted(() => {
  // Délai pour s'assurer que le DOM est chargé
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  // Cleanup automatique par Vue
})
</script>

<style scoped>
/* Animations ultra-modernes pour le processus */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  33% { transform: translateY(-20px) rotate(1deg) scale(1.05); }
  66% { transform: translateY(10px) rotate(-0.5deg) scale(0.95); }
}

@keyframes float-reverse {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  33% { transform: translateY(20px) rotate(-1deg) scale(1.03); }
  66% { transform: translateY(-10px) rotate(0.5deg) scale(0.97); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-8px); }
  70% { transform: translateY(-4px); }
  90% { transform: translateY(-2px); }
}

@keyframes draw-path {
  0% { stroke-dasharray: 0, 1000; }
  100% { stroke-dasharray: 1000, 0; }
}

@keyframes scale-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Classes d'animation */
.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 10s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 6s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-draw-path {
  stroke-dasharray: 0, 1000;
  animation: draw-path 3s ease-in-out forwards;
}

.scale-in {
  animation: scale-in 0.6s ease-out forwards;
}

/* Effets de hover avancés */
.process-card {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.process-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
}


/* Glassmorphism effects */
.glassmorphism {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Indicateurs de performance - Styles dans .metrics-grid améliorée ci-dessous */

/* Animations d'entrée échelonnées */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-on-scroll.animate {
  opacity: 1;
  transform: translateY(0);
}

/* Grille de métriques améliorée */
.metrics-grid-wrapper {
  position: relative;
  z-index: 10;
  margin-top: 3rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: white;
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #06b6d4);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.metric-card:hover::before {
  transform: scaleX(1);
}

.metric-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04);
  border-color: #10b981;
}

.metric-icon-wrapper {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.4s ease;
}

.metric-card:hover .metric-icon-wrapper {
  background: linear-gradient(135deg, #10b981, #059669);
  transform: scale(1.1) rotate(5deg);
}

.metric-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #10b981;
  transition: color 0.4s ease;
}

.metric-card:hover .metric-icon {
  color: white;
}

.metric-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #065f46, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #374151;
  margin-bottom: 0.375rem;
}

.metric-caption {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Header du processus en 2 colonnes */
.process-header {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.2fr);
  gap: 2.5rem;
  align-items: center;
}

.process-header-left {
  text-align: left;
}

.process-illustration {
  margin-bottom: 1rem;
}

.illustration-circle {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: conic-gradient(from 180deg, #22c55e, #0ea5e9, #22c55e);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 30px rgba(16, 185, 129, 0.35),
    0 0 0 1px rgba(209, 250, 229, 0.9);
}

.illustration-inner {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  background: #ecfdf5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.05rem;
}

.illustration-step {
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1;
  color: #059669;
}

.illustration-label {
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #6b7280;
}

.process-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1.3rem;
  background: #ecfdf5;
  border-radius: 999px;
  border: 1px solid #bbf7d0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #047857;
  margin-bottom: 1rem;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.16);
}

.process-badge .badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: radial-gradient(circle, #22c55e 0, #16a34a 40%, #0f766e 100%);
  margin-right: 0.55rem;
}

.process-title {
  font-size: 2.2rem;
  line-height: 1.25;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.9rem;
}

.process-title-highlight {
  display: block;
  background: linear-gradient(90deg, #059669, #10b981, #0ea5e9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.process-subtitle {
  font-size: 1.02rem;
  color: #4b5563;
  max-width: 560px;
}

.process-header-right {
  display: flex;
  justify-content: flex-end;
}

.process-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.process-mini-card {
  background: white;
  border-radius: 0.9rem;
  border: 1px solid #e5e7eb;
  padding: 0.85rem 0.9rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.mini-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin-bottom: 0.2rem;
}

.mini-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.2rem;
}

.mini-desc {
  font-size: 0.78rem;
  color: #6b7280;
}

/* Responsive design */
@media (max-width: 1024px) {
  .process-section {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
  
  .metric-card {
    padding: 1.75rem 1.25rem;
  }
  
  .metric-value {
    font-size: 1.75rem;
  }

  .process-header {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.2fr);
  }

  .process-title {
    font-size: 2rem;
  }

  .process-mini-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .process-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .text-5xl.md\\:text-6xl.lg\\:text-7xl {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  .text-4xl.md\\:text-5xl.lg\\:text-6xl {
    font-size: 2rem;
  }

  .grid.grid-cols-1.lg\\:grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .lg\\:text-right,
  .lg\\:text-left {
    text-align: center;
  }

  .lg\\:justify-end,
  .lg\\:justify-start {
    justify-content: center;
  }

  .flex.flex-wrap.items-center.justify-center.gap-8 {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .process-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .text-xl.text-gray-600.leading-relaxed {
    font-size: 1rem;
    line-height: 1.6;
  }

  .max-w-4xl.mx-auto {
    max-width: 100%;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  
  .metric-card {
    padding: 1.5rem 1rem;
  }
  
  .metric-icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.75rem;
  }
  
  .metric-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
  
  .metric-label {
    font-size: 0.8125rem;
  }
  
  .metric-caption {
    font-size: 0.75rem;
  }

  .process-header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .process-header-left {
    text-align: left;
  }

  .process-title {
    font-size: 1.8rem;
  }

  .process-header-right {
    justify-content: flex-start;
  }

  .process-mini-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Optimisations pour les écrans tactiles */
@media (hover: none) and (pointer: coarse) {
  .process-card:hover {
    transform: none;
  }

  .metric-card:hover {
    transform: none;
  }
}

/* Animation des chemins SVG */
svg path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-svg 2s ease-in-out forwards;
}

@keyframes draw-svg {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
