<template>
  <Navbar/>
  <div class="min-h-screen bg-gray-50/30 pt-20 pb-12">
    <div v-if="!profile.candidateProfileId" class="mx-auto mb-4 max-w-4xl px-4">
      <div class="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3">
        Aucun profil candidat n'est encore créé. Cliquez sur "Edit Profile" pour créer et commencer à ajouter vos expériences, formations et compétences.
      </div>
    </div>
    <!-- Loader retiré -->
    <div v-if="loadError" class="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
      <div class="max-w-md w-full mx-4 bg-white border border-red-200 text-red-800 rounded-xl shadow-lg p-6 space-y-4">
        <div class="flex items-start space-x-3">
          <div class="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">Impossible de charger le profil</h3>
            <p class="text-sm text-red-700">{{ loadError }}</p>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-3">
          <button 
            @click="loadCandidateProfile"
            class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <div class="w-24 h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <div class="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl lg:text-3xl font-bold shadow-lg">
                  {{ getInitials(profile.firstName, profile.lastName) }}
                </div>
              </div>
              <button 
                @click="openProfileWizard('basics')"
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            

            <div class="flex-1">
              <h1 class="text-2xl lg:text-4xl font-bold mb-2">
                {{ profile.firstName }} {{ profile.lastName }}
              </h1>
              <p class="text-emerald-100 text-lg lg:text-xl mb-3">
                {{ profile.title || 'Professional Candidate' }}
              </p>
              <div class="flex flex-wrap items-center gap-4 text-emerald-100/90">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{{ profile.location || 'Location not specified' }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>{{ profile.candidate?.phone || 'Phone not specified' }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>{{ profile.candidate?.email || 'Email not specified' }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3 mt-6 lg:mt-0">
            <button 
              v-if="profile.resumeUrl"
              @click="downloadCV"
              class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Download CV</span>
            </button>
            <button class="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Contact
            </button>
            <button 
              @click="openProfileWizard()"
              class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>Build profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('salary')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
              Salary Expectations
            </h3>
            <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
              <div class="text-center">
                <div class="text-2xl font-bold text-emerald-700 mb-1">
                  ${{ profile.salaryExpectationMin || 0 }}k - ${{ profile.salaryExpectationMax || 0 }}k
                </div>
                <div class="text-sm text-emerald-600">Annual salary range</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('skills')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Skills & Expertise
              </h3>
              <span class="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                {{ skills.length }} skills
              </span>
            </div>
            <div class="space-y-3">
              <div v-for="skill in skills" :key="skill.id" class="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-gray-800">{{ skill.skillName }}</span>
                    <span class="text-sm text-emerald-600 font-medium">{{ skill.experienceYears }}y</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      :style="{ width: getSkillWidth(skill.experienceYears) }"
                    ></div>
                  </div>
                </div>
                <button 
                  @click="openProfileWizard('skills')"
                  class="w-6 h-6 bg-white hover:bg-emerald-50 rounded flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 ml-2"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
              <div v-if="skills.length === 0" class="text-center py-4 text-gray-500">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <p>No skills added yet</p>
                <button 
                  @click="openProfileWizard('skills')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium mt-2"
                >
                  Add your first skill
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('contact')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Contact Information
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50/50 hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Email</div>
                  <div class="font-medium text-gray-900">{{ profile.candidate?.email || 'Not specified' }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50/50 hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Phone</div>
                  <div class="font-medium text-gray-900">{{ profile.candidate?.phone || 'Not specified' }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50/50 hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Location</div>
                  <div class="font-medium text-gray-900">{{ profile.location || 'Not specified' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('about')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              About Me
            </h2>
            <p class="text-gray-700 leading-relaxed">
              {{ profile.bio || 'Passionate and dedicated professional with extensive experience in the field. Always eager to take on new challenges and contribute to innovative projects.' }}
            </p>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('experience')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Work Experience
              </h2>
              <span class="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                {{ experiences.length }} positions
              </span>
            </div>
            <div class="space-y-6">
              <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 pb-6 border-l-2 border-emerald-200 last:pb-0 group hover:border-emerald-300 transition-colors">
                <div class="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <button 
                  @click="openProfileWizard('experience')"
                  class="absolute -right-2 top-0 w-8 h-8 bg-white hover:bg-emerald-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110 shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <div class="bg-gradient-to-r from-white to-emerald-50/30 p-5 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 group-hover:shadow-sm">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ exp.jobTitle }}</h3>
                    <div class="flex items-center space-x-2 mt-1 sm:mt-0">
                      <span class="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                        {{ formatDate(exp.startDate) }} - {{ exp.currentExperienceStatus === 'current' ? 'Present' : formatDate(exp.endDate) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 mb-3">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <span class="font-medium text-emerald-700">{{ exp.companyName }}</span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">{{ exp.description }}</p>
                </div>
              </div>
              <div v-if="experiences.length === 0" class="text-center py-8 text-gray-500">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <p class="text-lg mb-2">No work experience added</p>
                <button 
                  @click="openProfileWizard('experience')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Add your first work experience
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openProfileWizard('education')"
                class="w-8 h-8 bg-gray-100 hover:bg-emerald-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
                Education
              </h2>
              <span class="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                {{ educations.length }} degrees
              </span>
            </div>
            <div class="space-y-6">
              <div v-for="edu in educations" :key="edu.id" class="relative pl-8 pb-6 border-l-2 border-emerald-200 last:pb-0 group hover:border-emerald-300 transition-colors">
                <div class="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <button 
                  @click="openProfileWizard('education')"
                  class="absolute -right-2 top-0 w-8 h-8 bg-white hover:bg-emerald-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110 shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <div class="bg-gradient-to-r from-white to-emerald-50/30 p-5 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 group-hover:shadow-sm">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ edu.degree }} in {{ edu.fieldStudy }}</h3>
                    <div class="flex items-center space-x-2 mt-1 sm:mt-0">
                      <span class="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                        {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <span class="font-medium text-emerald-700">{{ edu.institutionName }}</span>
                  </div>
                  <p v-if="edu.description" class="text-gray-700 leading-relaxed mt-2">{{ edu.description }}</p>
                </div>
              </div>
              <div v-if="educations.length === 0" class="text-center py-8 text-gray-500">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
                <p class="text-lg mb-2">No education added</p>
                <button 
                  @click="openProfileWizard('education')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Add your first education
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showWizard" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden">
        <div class="p-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm uppercase tracking-wider opacity-80">Profile builder</p>
              <h3 class="text-2xl font-bold flex items-center gap-2">
                {{ currentStep.title }}
                <span class="text-xs px-3 py-1 bg-white/20 rounded-full">{{ currentStepIndex + 1 }} / {{ steps.length }}</span>
              </h3>
              <p class="text-sm opacity-90 mt-1">{{ currentStep.description }}</p>
            </div>
            <button 
              @click="closeWizard"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-3 mt-4">
            <div 
              v-for="(step, index) in steps" 
              :key="step.key"
              class="flex-1 flex items-center"
            >
              <div 
                class="w-full h-2 rounded-full"
                :class="index <= currentStepIndex ? 'bg-white' : 'bg-white/30'"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 max-h-[70vh]">
            <div class="lg:col-span-1 bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2 overflow-y-auto">
              <div 
                v-for="(step, index) in steps" 
                :key="step.key"
                @click="goToStep(index)"
                class="flex items-start space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="index === currentStepIndex ? 'bg-white shadow-sm border border-emerald-100' : 'hover:bg-white'"
              >
                <div class="mt-0.5">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                    :class="index <= currentStepIndex ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900">{{ step.title }}</div>
                  <div class="text-xs text-gray-600">{{ step.description }}</div>
                </div>
                <div v-if="index < currentStepIndex" class="text-emerald-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="lg:col-span-3 space-y-6 overflow-y-auto max-h-[70vh] pr-1">
              <!-- Step: basics -->
              <div v-if="currentStep.key === 'basics'" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input v-model="editForm.firstName" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter first name" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input v-model="editForm.lastName" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                  <input v-model="editForm.title" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Senior Software Developer" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input v-model="editForm.location" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Kinshasa, DR Congo" />
                </div>
              </div>

              <div v-if="currentStep.key === 'about'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea v-model="editForm.bio" rows="6" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none" placeholder="Describe your background, skills, and career goals"></textarea>
                </div>
              </div>

              <div v-if="currentStep.key === 'salary'" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Salary ($k)</label>
                    <input v-model="editForm.salaryExpectationMin" type="number" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="50" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Salary ($k)</label>
                    <input v-model="editForm.salaryExpectationMax" type="number" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="80" />
                  </div>
                </div>
              </div>

              <div v-if="currentStep.key === 'contact'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input v-model="editForm.email" type="email" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input v-model="editForm.phone" type="tel" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="+1234567890" />
                </div>
              </div>

              <div v-if="currentStep.key === 'skills'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="text-lg font-semibold text-gray-900">Skills</h4>
                  <button @click="addNewSkill" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <span>Add Skill</span>
                  </button>
                </div>
                <div v-for="(skill, index) in editForm.skills" :key="index" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                  <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                      <input v-model="skill.skillName" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. JavaScript" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                      <input v-model="skill.experienceYears" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="5" min="0" max="50" />
                    </div>
                  </div>
                  <button @click="removeSkill(index)" class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 mt-6">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div v-if="currentStep.key === 'experience'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="text-lg font-semibold text-gray-900">Work Experience</h4>
                  <button @click="addNewExperience" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <span>Add Experience</span>
                  </button>
                </div>
                <div v-for="(exp, index) in editForm.experiences" :key="index" class="p-4 border border-gray-200 rounded-xl space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input v-model="exp.jobTitle" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Senior Developer" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input v-model="exp.companyName" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Tech Company Inc." />
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input v-model="exp.startDate" type="date" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input v-model="exp.endDate" type="date" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                      <div class="flex items-center mt-2">
                        <input v-model="exp.currentExperienceStatus" type="checkbox" value="current" :id="`current-${index}`" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                        <label :for="`current-${index}`" class="ml-2 text-sm text-gray-700">Currently working here</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input v-model="exp.location" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Remote, New York, etc." />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea v-model="exp.description" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none" placeholder="Describe your responsibilities and achievements..."></textarea>
                  </div>
                  <div class="flex justify-end">
                    <button @click="removeExperience(index)" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="currentStep.key === 'education'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="text-lg font-semibold text-gray-900">Education</h4>
                  <button @click="addNewEducation" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <span>Add Education</span>
                  </button>
                </div>
                <div v-for="(edu, index) in editForm.educations" :key="index" class="p-4 border border-gray-200 rounded-xl space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      <input v-model="edu.institutionName" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. University of Technology" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <select v-model="edu.degree" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PhD">PhD</option>
                        <option value="Associate">Associate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                    <input v-model="edu.fieldStudy" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Computer Science" />
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input v-model="edu.startDate" type="date" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input v-model="edu.endDate" type="date" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea v-model="edu.description" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none" placeholder="Additional information about your education..."></textarea>
                  </div>
                  <div class="flex justify-end">
                    <button @click="removeEducation(index)" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div class="text-sm text-gray-500">Progress sauvegardé à chaque étape</div>
          <div class="flex items-center gap-3">
            <button @click="closeWizard" class="px-4 py-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl font-medium transition-all duration-200">Quitter</button>
            <div class="flex items-center gap-2">
              <button v-if="currentStepIndex > 0" @click="previousStep" class="px-4 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 rounded-xl font-semibold transition-all duration-200">Précédent</button>
              <button 
                @click="nextStep"
                :disabled="isLoading"
                class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ currentStepIndex === steps.length - 1 ? 'Terminer' : 'Étape suivante' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import type { ICandidateProfile} from '@/utils/interface/candidate/ICandidateProfile'
import type { ICandidateEducation} from '@/utils/interface/candidate/ICandidateEducation'
import type { ICandidateExperience} from '@/utils/interface/candidate/ICandidateExperience'
import type { ICandidateSkill} from '@/utils/interface/candidate/ICandidateSkill'
import type { ICandidateData} from '@/utils/interface/candidate/ICandidateData'
// Import du service
import { useCandidateService } from '@/utils/service/CandidateService'

//@ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../components/footer/FooterComponent.vue'
import { getUser } from '@/stores/user';

const candidateService = useCandidateService();

const user = getUser();
const userId = user?.id ?? 0;

const candidateData = ref<ICandidateData>({
  profile: {
    candidateProfileId: 0,
    candidate: {
      id: 0,
      email: "",
      phone: "",
      role: "CANDIDATE"
    },
    firstName: "",
    lastName: "",
    location: "",
    salaryExpectationMin: 10,
    salaryExpectationMax: 10,
    resumeUrl: "",
    bio: "",
    title: ""
  },
  experiences: [],
  educations: [],
  skills: []
})

const profile = ref(candidateData.value.profile)
const experiences = ref(candidateData.value.experiences)
const educations = ref(candidateData.value.educations)
const skills = ref(candidateData.value.skills)

const showWizard = ref(false)
const currentStepIndex = ref(0)
const isLoading = ref(false)
const loadError = ref('')
const isCreatingProfile = ref(false)
const profileReady = computed(() => !!profile.value?.candidateProfileId)
const steps = [
  { key: 'basics', title: 'Informations de base', description: 'Nom, titre professionnel et localisation' },
  { key: 'about', title: 'À propos', description: 'Présentez votre parcours' },
  { key: 'salary', title: 'Salaire', description: 'Fourchette salariale souhaitée' },
  { key: 'contact', title: 'Contact', description: 'Coordonnées principales' },
  { key: 'skills', title: 'Compétences', description: 'Ajoutez vos expertises' },
  { key: 'experience', title: 'Expériences', description: 'Renseignez vos postes clés' },
  { key: 'education', title: 'Formations', description: 'Diplômes et écoles' }
]
const currentStep = computed(() => steps[currentStepIndex.value])
const editForm = reactive({
  firstName: '',
  lastName: '',
  title: '',
  location: '',
  bio: '',
  salaryExpectationMin: 10,
  salaryExpectationMax: 10,
  email: '',
  phone: '',
  skills: [] as any[],
  experiences: [] as any[],
  educations: [] as any[]
})

// Charger les données du profil
const loadCandidateProfile = async () => {
  loadError.value = ''
  let timeoutId: number | undefined
  try {
    if (!user) {
      showNotification('info', 'Veuillez vous connecter pour consulter votre profil')
      return
    }
    isLoading.value = true
    timeoutId = window.setTimeout(() => {
      loadError.value = 'Impossible de joindre le serveur. Vérifiez que le backend tourne sur http://localhost:8080.'
      isLoading.value = false
    }, 12000)
    const data = await candidateService.getCompleteCandidateData(userId)
    if (timeoutId) window.clearTimeout(timeoutId)
    
    candidateData.value = data
    profile.value = data.profile
    experiences.value = Array.isArray(data.experiences) ? data.experiences : []
    educations.value = Array.isArray(data.educations) ? data.educations : []
    skills.value = Array.isArray(data.skills) ? data.skills : []
    
  } catch (error) {
    console.error('Error loading candidate profile:', error)
    showNotification('error', 'Failed to load profile data')
  } finally {
    if (timeoutId) window.clearTimeout(timeoutId)
    isLoading.value = false
  }
}

const openProfileWizard = async (initialStep?: string) => {
  if (!profileReady.value && !isCreatingProfile.value) {
    try {
      isCreatingProfile.value = true
      const created = await candidateService.createCandidateProfile({
        userId,
        firstName: profile.value.firstName || 'FirstName',
        lastName: profile.value.lastName || 'LastName',
        location: profile.value.location || '',
        salaryExpectationMin: profile.value.salaryExpectationMin || 10,
        salaryExpectationMax: profile.value.salaryExpectationMax || 10,
        resumeUrl: profile.value.resumeUrl || ''
      })
      profile.value = created
    } catch (err) {
      console.error('Erreur lors de la création du profil:', err)
      showNotification('error', 'Impossible de créer le profil')
      isCreatingProfile.value = false
      return
    }
    isCreatingProfile.value = false
  }

  // Pré-remplir le formulaire avec les données existantes
  Object.assign(editForm, {
    firstName: profile.value.firstName,
    lastName: profile.value.lastName,
    title: profile.value.title || '',
    location: profile.value.location,
    bio: profile.value.bio || '',
    salaryExpectationMin: profile.value.salaryExpectationMin || 10,
    salaryExpectationMax: profile.value.salaryExpectationMax || 10,
    email: profile.value.candidate?.email || '',
    phone: profile.value.candidate?.phone || '',
    skills: (Array.isArray(skills.value) ? skills.value : []).map(skill => ({
      id: skill.id,
      skillName: skill.skillName,
      experienceYears: skill.experienceYears,
      profileId: skill.profileId
    })),
    experiences: (Array.isArray(experiences.value) ? experiences.value : []).map(exp => ({
      id: exp.id,
      jobTitle: exp.jobTitle,
      companyName: exp.companyName,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.endDate,
      currentExperienceStatus: exp.currentExperienceStatus,
      location: exp.location,
      profileId: exp.profileId
    })),
    educations: (Array.isArray(educations.value) ? educations.value : []).map(edu => ({
      id: edu.id,
      institutionName: edu.institutionName,
      degree: edu.degree,
      fieldStudy: edu.fieldStudy,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
      profileId: edu.profileId
    }))
  })

  if (initialStep) {
    const index = steps.findIndex(step => step.key === initialStep)
    currentStepIndex.value = index >= 0 ? index : 0
  } else {
    currentStepIndex.value = 0
  }

  showWizard.value = true
}

const closeWizard = () => {
  showWizard.value = false
}

const saveStep = async (stepKey: string) => {
  if (!profileReady.value && stepKey !== 'basics') {
    showNotification('info', 'Créez d\'abord votre profil candidat.')
    return
  }

  if (stepKey === 'basics') {
    if (!profileReady.value) {
      const created = await candidateService.createCandidateProfile({
        userId,
        firstName: editForm.firstName || 'FirstName',
        lastName: editForm.lastName || 'LastName',
        title: editForm.title,
        location: editForm.location,
        salaryExpectationMin: Math.max(editForm.salaryExpectationMin || 10, 10),
        salaryExpectationMax: Math.max(editForm.salaryExpectationMax || 10, 10),
        resumeUrl: profile.value.resumeUrl || ''
      })
      profile.value = created
    } else {
      await candidateService.updateCandidateProfile(userId, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        title: editForm.title,
        location: editForm.location,
        salaryExpectationMin: Math.max(editForm.salaryExpectationMin || profile.value.salaryExpectationMin || 10, 10),
        salaryExpectationMax: Math.max(editForm.salaryExpectationMax || profile.value.salaryExpectationMax || 10, 10),
        resumeUrl: profile.value.resumeUrl || ''
      })
      profile.value.firstName = editForm.firstName
      profile.value.lastName = editForm.lastName
      profile.value.title = editForm.title
      profile.value.location = editForm.location
      profile.value.salaryExpectationMin = Math.max(editForm.salaryExpectationMin || 10, 10)
      profile.value.salaryExpectationMax = Math.max(editForm.salaryExpectationMax || 10, 10)
    }
    showNotification('success', 'Informations de base enregistrées')
  } else if (stepKey === 'about') {
    await candidateService.updateCandidateProfile(userId, {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      location: profile.value.location,
      title: profile.value.title,
      bio: editForm.bio
    })
    profile.value.bio = editForm.bio
    showNotification('success', 'Bio mise à jour')
  } else if (stepKey === 'salary') {
    await candidateService.updateCandidateProfile(userId, {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      location: profile.value.location,
      title: profile.value.title,
      bio: profile.value.bio,
      salaryExpectationMin: editForm.salaryExpectationMin,
      salaryExpectationMax: editForm.salaryExpectationMax
    })
    profile.value.salaryExpectationMin = editForm.salaryExpectationMin
    profile.value.salaryExpectationMax = editForm.salaryExpectationMax
    showNotification('success', 'Salaire mis à jour')
  } else if (stepKey === 'contact') {
    await candidateService.updateCandidateProfile(userId, {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      location: profile.value.location,
      title: profile.value.title,
      bio: profile.value.bio,
      salaryExpectationMin: profile.value.salaryExpectationMin,
      salaryExpectationMax: profile.value.salaryExpectationMax
    })
    showNotification('success', 'Contact synchronisé')
  } else if (stepKey === 'skills') {
    const updatedSkills = await Promise.all(
      editForm.skills.map(async (skill) => {
        if (skill.id) {
          return await candidateService.updateCandidateSkill(skill.id, {
            skillName: skill.skillName,
            experienceYears: skill.experienceYears
          })
        } else {
          return await candidateService.createCandidateSkill({
            skillName: skill.skillName,
            experienceYears: skill.experienceYears,
            profileId: profile.value.candidateProfileId
          })
        }
      })
    )
    skills.value = updatedSkills
    showNotification('success', 'Compétences mises à jour')
  } else if (stepKey === 'experience') {
    const updatedExperiences = await Promise.all(
      editForm.experiences.map(async (exp) => {
        if (exp.id) {
          return await candidateService.updateCandidateExperience(exp.id, {
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
            currentExperienceStatus: exp.currentExperienceStatus,
            location: exp.location
          })
        } else {
          return await candidateService.createCandidateExperience({
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
            currentExperienceStatus: exp.currentExperienceStatus,
            location: exp.location,
            profileId: profile.value.candidateProfileId
          })
        }
      })
    )
    experiences.value = updatedExperiences
    showNotification('success', 'Expériences mises à jour')
  } else if (stepKey === 'education') {
    const updatedEducations = await Promise.all(
      editForm.educations.map(async (edu) => {
        if (edu.id) {
          return await candidateService.updateCandidateEducation(edu.id, {
            institutionName: edu.institutionName,
            degree: edu.degree,
            fieldStudy: edu.fieldStudy,
            startDate: edu.startDate,
            endDate: edu.endDate,
            description: edu.description
          })
        } else {
          return await candidateService.createCandidateEducation({
            institutionName: edu.institutionName,
            degree: edu.degree,
            fieldStudy: edu.fieldStudy,
            startDate: edu.startDate,
            endDate: edu.endDate,
            description: edu.description,
            profileId: profile.value.candidateProfileId
          })
        }
      })
    )
    educations.value = updatedEducations
    showNotification('success', 'Formations mises à jour')
  }
}

const nextStep = async () => {
  try {
    isLoading.value = true
    await saveStep(currentStep.value.key)
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value += 1
    } else {
      showWizard.value = false
    }
  } catch (error) {
    console.error('Error saving step:', error)
    showNotification('error', 'Échec de la sauvegarde de cette étape')
  } finally {
    isLoading.value = false
  }
}

const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value -= 1
  }
}

const goToStep = (index: number) => {
  if (index <= currentStepIndex.value) {
    currentStepIndex.value = index
  }
}

const addNewSkill = () => {
  editForm.skills.push({
    skillName: '',
    experienceYears: 1
  })
}

const removeSkill = async (index: number) => {
  const skill = editForm.skills[index]
  if (skill.id) {
    try {
      await candidateService.deleteCandidateSkill(skill.id)
      showNotification('success', 'Skill deleted successfully')
    } catch (error) {
      console.error('Error deleting skill:', error)
      showNotification('error', 'Failed to delete skill')
      return
    }
  }
  editForm.skills.splice(index, 1)
}

const addNewExperience = () => {
  editForm.experiences.push({
    companyName: '',
    jobTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    currentExperienceStatus: 'previous',
    location: ''
  })
}

const removeExperience = async (index: number) => {
  const exp = editForm.experiences[index]
  if (exp.id) {
    try {
      await candidateService.deleteCandidateExperience(exp.id)
      showNotification('success', 'Experience deleted successfully')
    } catch (error) {
      console.error('Error deleting experience:', error)
      showNotification('error', 'Failed to delete experience')
      return
    }
  }
  editForm.experiences.splice(index, 1)
}

const addNewEducation = () => {
  editForm.educations.push({
    institutionName: '',
    degree: 'Bachelor',
    fieldStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeEducation = async (index: number) => {
  const edu = editForm.educations[index]
  if (edu.id) {
    try {
      await candidateService.deleteCandidateEducation(edu.id)
      showNotification('success', 'Education deleted successfully')
    } catch (error) {
      console.error('Error deleting education:', error)
      showNotification('error', 'Failed to delete education')
      return
    }
  }
  editForm.educations.splice(index, 1)
}

const downloadCV = () => {
  if (profile.value.resumeUrl) {
    window.open(profile.value.resumeUrl, '_blank')
  } else {
    showNotification('info', 'No CV available for download')
  }
}

const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
  console.log(`${type}: ${message}`)
}

// Fonctions utilitaires
const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return dateString
  }
}

const getSkillWidth = (years: number): string => {
  const safeSkills = Array.isArray(skills.value) ? skills.value : []
  if (safeSkills.length === 0) return '0%'
  const maxYears = Math.max(...safeSkills.map(s => s.experienceYears || 0))
  return maxYears > 0 ? `${(years / maxYears) * 100}%` : '0%'
}

onMounted(() => {
  loadCandidateProfile()
})
</script>

<style scoped>
.profile-enter-active {
  transition: all 0.3s ease-out;
}

.profile-leave-active {
  transition: all 0.2s ease-in;
}

.profile-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.profile-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(10px);
}


.loading-skeleton {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>