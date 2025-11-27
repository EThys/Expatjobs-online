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
      <!-- En-tête avec badge -->
      <div class="text-center mb-8 sm:mb-12 md:mb-16 animate-on-scroll" data-delay="0">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
          <span class="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            {{ t('about.title') }}
          </span>
          <span class="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{{ t('about.subtitle') }}</span>
        </h1>

        <p class="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 px-4">
          {{ t('about.description') }}
        </p>
      </div>

      <!-- Grille de fonctionnalités avec effets 3D -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 stagger-children">
        <!-- Carte 1: Pour les talents -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-2 transform perspective-1000 animate-on-scroll" data-delay="100">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 transform group-hover:translate-y-[-5px] transition-transform duration-500">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 mb-6">
              <svg class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('about.forTalents.title') }}</h3>
            <p class="text-gray-600 mb-6">{{ t('about.forTalents.description') }}</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ t('about.forTalents.feature1') }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ t('about.forTalents.feature2') }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.044M12 20v-8m0 8l2 2m-2-2l-2 2" />
                </svg>
                <span>{{ t('about.forTalents.feature3') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte 2: Notre mission (highlight) -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-6 sm:p-8 text-white shadow-lg transform perspective-1000 hover:scale-[1.02] transition-transform duration-500 animate-on-scroll" data-delay="200">
          <div class="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div class="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
          <div class="relative z-10">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 mb-6">
              <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ t('about.mission.title') }}</h3>
            <p class="text-emerald-100 mb-6">{{ t('about.mission.description') }}</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l8-8V5H4v2l8 8z" />
                </svg>
                <span>{{ t('about.mission.feature1') }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{{ t('about.mission.feature2') }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ t('about.mission.feature3') }}</span>
              </div>
            </div>
            <div class="mt-8 pt-6 border-t border-white/20">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-3xl font-bold text-white">10K+</p>
                  <p class="text-sm text-emerald-100">Opportunités créées</p>
                </div>
                <div>
                  <p class="text-3xl font-bold text-white">50+</p>
                  <p class="text-sm text-emerald-100">Pays couverts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte 3: Pour les entreprises -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-2 transform perspective-1000 animate-on-scroll" data-delay="300">
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 transform group-hover:translate-y-[-5px] transition-transform duration-500">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 mb-6">
              <svg class="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('about.forCompanies.title') }}</h3>
            <p class="text-gray-600 mb-6">{{ t('about.forCompanies.description') }}</p>
            <ul class="space-y-3">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 18a9 9 0 019-9" />
                </svg>
                <span>{{ t('about.forCompanies.feature1') }}</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{{ t('about.forCompanies.feature2') }}</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>{{ t('about.forCompanies.feature3') }}</span>
              </li>
            </ul>
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
        <div class="text-center mb-20 relative z-10">


          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 mb-6 sm:mb-8 px-4 animate-on-scroll" data-delay="500">
            {{ t('about.process.title') }} <span class="font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">{{ t('about.process.highlight') }}</span>
          </h2>

          <p class="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 px-4 animate-on-scroll" data-delay="600">
            {{ t('about.process.description') }}
          </p>

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

/* Indicateurs de performance */
.metric-card {
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.15);
}

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

/* Responsive design */
@media (max-width: 1024px) {
  .process-section {
    padding-left: 2rem;
    padding-right: 2rem;
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
