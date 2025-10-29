<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
    <!-- Fond animé avec particules subtiles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow"></div>
      <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-fast"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIj48L3JlY3Q+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiIvPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZmZmYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZmZmYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9zdmc+')] opacity-10"></div>
    </div>

    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- En-tête avec badge -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center px-5 py-3 mb-6 bg-white rounded-full shadow-sm border border-gray-100">
          <svg class="w-6 h-6 mr-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 18a9 9 0 019-9" />
          </svg>
          <span class="text-sm font-medium text-gray-700">Plateforme internationale de recrutement</span>
        </div>

        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          <span class="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            ExpatJobs connecte
          </span>
          <span class="block mt-2">les talents aux opportunités mondiales</span>
        </h1>

        <p class="max-w-3xl mx-auto text-xl text-gray-600">
          La première plateforme dédiée au recrutement international, conçue pour surmonter les barrières géographiques et culturelles.
        </p>
      </div>

      <!-- Grille de fonctionnalités avec effets 3D -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <!-- Carte 1: Pour les talents -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-2 transform perspective-1000">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 transform group-hover:translate-y-[-5px] transition-transform duration-500">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 mb-6">
              <svg class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Pour les talents internationaux</h3>
            <p class="text-gray-600 mb-6">Accédez à des opportunités vérifiées dans plus de 50 pays avec un support dédié à l'expatriation.</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Offres avec détails complets</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Alertes personnalisées</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.044M12 20v-8m0 8l2 2m-2-2l-2 2" />
                </svg>
                <span>Support multilingue 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte 2: Notre mission (highlight) -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-8 text-white shadow-lg transform perspective-1000 hover:scale-[1.02] transition-transform duration-500">
          <div class="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div class="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
          <div class="relative z-10">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 mb-6">
              <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Notre mission</h3>
            <p class="text-emerald-100 mb-6">Révolutionner le recrutement international en connectant les talents aux opportunités sans frontières.</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l8-8V5H4v2l8 8z" />
                </svg>
                <span>Plateforme sécurisée et conforme</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Algorithmes de matching intelligents</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Communauté internationale engagée</span>
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
        <div class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-2 transform perspective-1000">
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 transform group-hover:translate-y-[-5px] transition-transform duration-500">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 mb-6">
              <svg class="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Pour les entreprises</h3>
            <p class="text-gray-600 mb-6">Trouvez les meilleurs talents internationaux avec nos outils de recrutement spécialisés.</p>
            <ul class="space-y-3">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 18a9 9 0 019-9" />
                </svg>
                <span>Accès à notre base de talents qualifiés</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Outils de gestion des candidatures</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-cyan-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Support administratif complet</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Processus en 3 étapes -->
      <div class="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-3xl p-8 md:p-12 ">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Notre processus simplifié</h2>
          <p class="max-w-2xl mx-auto text-lg text-gray-600">En 3 étapes seulement, connectez-vous aux meilleures opportunités internationales</p>
        </div>

        <div class="relative">
          <!-- Ligne de connexion -->
          <div class="absolute top-16 left-0 right-0 h-2 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <!-- Étape 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm relative z-10">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.332 5.477 3 6.253v13.494C4.332 19.523 5.918 20 7.5 20s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.668 5.477 21 6.253v13.494C19.668 19.523 18.082 20 16.5 20s-1.668-.477-3-1.253z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center pt-6">1. Création de profil</h3>
              <p class="text-gray-600 text-center">Complétez votre profil avec vos compétences et préférences en 2 minutes</p>
            </div>

            <!-- Étape 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm relative z-10">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center pt-6">2. Matching intelligent</h3>
              <p class="text-gray-600 text-center">Notre algorithme trouve les meilleures correspondances selon vos critères</p>
            </div>

            <!-- Étape 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm relative z-10">
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.795.242-.795.464m7.536-7.536a11.956 11.956 0 01-8.385 2.8M12 21a12 12 0 01-8.5-3.5A12 12 0 0112 3a12 12 0 018.5 8.5A12 12 0 0112 21z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center pt-6">3. Connexion réussie</h3>
              <p class="text-gray-600 text-center">Nous facilitons la mise en relation et le processus d'embauche</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script setup>
// Pas besoin d'importer des icônes pour ce design
</script>

<style scoped>
/* Animations fluides */
@keyframes blobSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -50px) scale(1.05); }
}

@keyframes blobFast {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, 20px) scale(1.03); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.animate-blob-slow {
  animation: blobSlow 12s ease-in-out infinite;
}

.animate-blob-fast {
  animation: blobFast 15s ease-in-out infinite;
}

.animate-gradient-text {
  background-size: 200% auto;
  animation: gradient 4s ease infinite alternate;
}

/* Effets 3D et transitions */
.perspective-1000 {
  perspective: 1000px;
}

.group:hover .group-hover\:translate-y-\\[-5px\\] {
  transform: translateY(-5px);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3 {
    grid-template-columns: 1fr;
  }

  .text-5xl.md\:text-6xl {
    font-size: 2.5rem;
  }
}
</style>
