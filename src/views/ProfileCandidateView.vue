<template>
  <Navbar/>
  <div class="min-h-screen bg-gray-50/30 pt-20 pb-12">
    <!-- Header avec background gradient -->
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div class="flex items-center space-x-6">
            <!-- Avatar avec édition -->
            <div class="relative">
              <div class="w-24 h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <div class="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl lg:text-3xl font-bold shadow-lg">
                  {{ getInitials(profile.firstName, profile.lastName) }}
                </div>
              </div>
              <button 
                @click="openEditModal('avatar')"
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            
            <!-- Info principale -->
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
                  <span>{{ profile.candidate.phone }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>{{ profile.candidate.email }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-3 mt-6 lg:mt-0">
            <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105">
              Download CV
            </button>
            <button class="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Contact
            </button>
            <!-- Bouton d'édition principal -->
            <button 
              @click="openEditModal('profile')"
              class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 sm:px-6 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Salary Expectations -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('salary')"
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
                  ${{ profile.salaryExpectationMin }}k - ${{ profile.salaryExpectationMax }}k
                </div>
                <div class="text-sm text-emerald-600">Annual salary range</div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('skills')"
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
                  @click="editSkill(skill)"
                  class="w-6 h-6 bg-white hover:bg-emerald-50 rounded flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 ml-2"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('contact')"
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
                  <div class="font-medium text-gray-900">{{ profile.candidate.email }}</div>
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
                  <div class="font-medium text-gray-900">{{ profile.candidate.phone }}</div>
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

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('about')"
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

          <!-- Work Experience -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('experience')"
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
                  @click="editExperience(exp)"
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
            </div>
          </div>

          <!-- Education -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditModal('education')"
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
                  @click="editEducation(edu)"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'édition -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <!-- Header du modal -->
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold">{{ getModalTitle() }}</h3>
            <button 
              @click="closeEditModal"
              class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenu du modal -->
        <div class="p-6">
          <!-- Formulaire de profil -->
          <div v-if="editMode === 'profile'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  v-model="editForm.firstName"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Enter first name"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  v-model="editForm.lastName"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Enter last name"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input 
                v-model="editForm.title"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="e.g. Senior Software Developer"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                v-model="editForm.location"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="e.g. Kinshasa, DR Congo"
              >
            </div>
          </div>

          <!-- Formulaire About -->
          <div v-if="editMode === 'about'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                v-model="editForm.bio"
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                placeholder="Describe your professional background, skills, and aspirations..."
              ></textarea>
            </div>
          </div>

          <!-- Formulaire Salary -->
          <div v-if="editMode === 'salary'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Salary ($k)</label>
                <input 
                  v-model="editForm.salaryExpectationMin"
                  type="number" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="50"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Salary ($k)</label>
                <input 
                  v-model="editForm.salaryExpectationMax"
                  type="number" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="80"
                >
              </div>
            </div>
          </div>

          <!-- Formulaire Contact -->
          <div v-if="editMode === 'contact'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="editForm.email"
                type="email" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="your.email@example.com"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                v-model="editForm.phone"
                type="tel" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="+1234567890"
              >
            </div>
          </div>

          <!-- Formulaire Skills -->
          <div v-if="editMode === 'skills'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Manage Skills</h4>
              <button 
                @click="addNewSkill"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
              >
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
                  <input 
                    v-model="skill.skillName"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. JavaScript"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                  <input 
                    v-model="skill.experienceYears"
                    type="number" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="5"
                    min="0"
                    max="50"
                  >
                </div>
              </div>
              <button 
                @click="removeSkill(index)"
                class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 mt-6"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Formulaire Experience -->
          <div v-if="editMode === 'experience'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Work Experience</h4>
              <button 
                @click="addNewExperience"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
              >
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
                  <input 
                    v-model="exp.jobTitle"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. Senior Developer"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input 
                    v-model="exp.companyName"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. Tech Company Inc."
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    v-model="exp.startDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input 
                    v-model="exp.endDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                  <div class="flex items-center mt-2">
                    <input 
                      v-model="exp.currentExperienceStatus"
                      type="checkbox" 
                      value="current"
                      :id="`current-${index}`"
                      class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    >
                    <label :for="`current-${index}`"  class="ml-2 text-sm text-gray-700">Currently working here</label>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  v-model="exp.location"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Remote, New York, etc."
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  v-model="exp.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Describe your responsibilities and achievements..."
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button 
                  @click="removeExperience(index)"
                  class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Formulaire Education -->
          <div v-if="editMode === 'education'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Education</h4>
              <button 
                @click="addNewEducation"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
              >
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
                  <input 
                    v-model="edu.institutionName"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. University of Technology"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <select 
                    v-model="edu.degree"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
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
                <input 
                  v-model="edu.fieldStudy"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Computer Science"
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    v-model="edu.startDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input 
                    v-model="edu.endDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  v-model="edu.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Additional information about your education..."
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button 
                  @click="removeEducation(index)"
                  class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Actions du modal -->
          <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button 
              @click="closeEditModal"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button 
              @click="saveChanges"
              class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { 
  ICandidateProfile, 
  ICandidateExperience, 
  ICandidateEducation, 
  ICandidateSkill,
  ICandidateData 
} from '@/interface/candidate/ICandidateData'

//@ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import Footer from '../components/footer/FooterComponent.vue'

// Données mockées
const candidateData = ref<ICandidateData>({
  profile: {
    candidateProfileId: 1,
    candidate: {
      id: 318,
      email: "user@example.com",
      phone: "+243813233432",
      role: "CANDIDATE"
    },
    firstName: "John",
    lastName: "Doe",
    location: "Kinshasa, DR Congo",
    salaryExpectationMin: 50,
    salaryExpectationMax: 80,
    resumeUrl: "https://example.com/resume.pdf",
    bio: "Experienced software developer with 5+ years in web development. Passionate about creating efficient and scalable solutions. Strong background in full-stack development and team leadership.",
    title: "Senior Software Developer"
  },
  experiences: [
    {
      id: 1,
      profileId: 1,
      companyName: "WebInnovations",
      jobTitle: "Java QA Engineer",
      description: "Responsible for quality assurance and testing of Java-based applications. Implemented automated testing frameworks and improved testing processes.",
      startDate: "2023-05-23",
      endDate: "2025-03-30",
      currentExperienceStatus: "current",
      location: "Remote"
    },
    {
      id: 2,
      profileId: 1,
      companyName: "TechSolutions Inc",
      jobTitle: "Software Developer",
      description: "Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      startDate: "2021-01-15",
      endDate: "2023-05-20",
      currentExperienceStatus: "previous",
      location: "New York, USA"
    }
  ],
  educations: [
    {
      id: 1,
      profileId: 1,
      institutionName: "University of Technology",
      degree: "Master",
      fieldStudy: "Software Engineering",
      startDate: "2018-09-01",
      endDate: "2020-06-30",
      description: "Specialized in software architecture and distributed systems. Graduated with honors."
    },
    {
      id: 2,
      profileId: 1,
      institutionName: "State University",
      degree: "Bachelor",
      fieldStudy: "Computer Science",
      startDate: "2014-09-01",
      endDate: "2018-06-30",
      description: "Focus on algorithms, data structures, and software development methodologies."
    }
  ],
  skills: [
    { id: 1, profileId: 1, skillName: "Java Development", experienceYears: 5 },
    { id: 2, profileId: 1, skillName: "Quality Assurance", experienceYears: 4 },
    { id: 3, profileId: 1, skillName: "Automated Testing", experienceYears: 3 },
    { id: 4, profileId: 1, skillName: "Spring Framework", experienceYears: 4 },
    { id: 5, profileId: 1, skillName: "SQL & Databases", experienceYears: 4 },
    { id: 6, profileId: 1, skillName: "API Development", experienceYears: 3 }
  ]
})

const { profile, experiences, educations, skills } = candidateData.value

// États pour la gestion des modals
const showEditModal = ref(false)
const editMode = ref('')
const editForm = reactive({
  firstName: '',
  lastName: '',
  title: '',
  location: '',
  bio: '',
  salaryExpectationMin: 0,
  salaryExpectationMax: 0,
  email: '',
  phone: '',
  skills: [] as any[],
  experiences: [] as any[],
  educations: [] as any[]
})

// Fonctions pour ouvrir les modals
const openEditModal = (mode: string) => {
  editMode.value = mode
  showEditModal.value = true
  
  // Pré-remplir le formulaire avec les données actuelles
  if (mode === 'profile') {
    editForm.firstName = profile.firstName
    editForm.lastName = profile.lastName
    editForm.title = profile.title || ''
    editForm.location = profile.location
  } else if (mode === 'about') {
    editForm.bio = profile.bio || ''
  } else if (mode === 'salary') {
    editForm.salaryExpectationMin = profile.salaryExpectationMin
    editForm.salaryExpectationMax = profile.salaryExpectationMax
  } else if (mode === 'contact') {
    editForm.email = profile.candidate.email
    editForm.phone = profile.candidate.phone
  } else if (mode === 'skills') {
    editForm.skills = skills.map(skill => ({ ...skill }))
  } else if (mode === 'experience') {
    editForm.experiences = experiences.map(exp => ({ ...exp }))
  } else if (mode === 'education') {
    editForm.educations = educations.map(edu => ({ ...edu }))
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editMode.value = ''
  // Réinitialiser le formulaire
  Object.assign(editForm, {
    firstName: '',
    lastName: '',
    title: '',
    location: '',
    bio: '',
    salaryExpectationMin: 0,
    salaryExpectationMax: 0,
    email: '',
    phone: '',
    skills: [],
    experiences: [],
    educations: []
  })
}

const saveChanges = () => {
  // Sauvegarder les modifications selon le mode
  if (editMode.value === 'profile') {
    profile.firstName = editForm.firstName
    profile.lastName = editForm.lastName
    profile.title = editForm.title
    profile.location = editForm.location
  } else if (editMode.value === 'about') {
    profile.bio = editForm.bio
  } else if (editMode.value === 'salary') {
    profile.salaryExpectationMin = editForm.salaryExpectationMin
    profile.salaryExpectationMax = editForm.salaryExpectationMax
  } else if (editMode.value === 'contact') {
    profile.candidate.email = editForm.email
    profile.candidate.phone = editForm.phone
  } else if (editMode.value === 'skills') {
    // Mettre à jour les compétences
    skills.length = 0
    skills.push(...editForm.skills.map((skill, index) => ({
      id: index + 1,
      profileId: 1,
      skillName: skill.skillName,
      experienceYears: Number(skill.experienceYears)
    })))
  } else if (editMode.value === 'experience') {
    // Mettre à jour les expériences
    experiences.length = 0
    experiences.push(...editForm.experiences.map((exp, index) => ({
      id: index + 1,
      profileId: 1,
      companyName: exp.companyName,
      jobTitle: exp.jobTitle,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.currentExperienceStatus === 'current' ? '' : exp.endDate,
      currentExperienceStatus: exp.currentExperienceStatus || 'previous',
      location: exp.location
    })))
  } else if (editMode.value === 'education') {
    // Mettre à jour les formations
    educations.length = 0
    educations.push(...editForm.educations.map((edu, index) => ({
      id: index + 1,
      profileId: 1,
      institutionName: edu.institutionName,
      degree: edu.degree,
      fieldStudy: edu.fieldStudy,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description
    })))
  }
  
  // Simuler un appel API
  console.log('Saving changes:', editForm)
  
  closeEditModal()
}

// Fonctions pour gérer les listes dynamiques
const addNewSkill = () => {
  editForm.skills.push({
    skillName: '',
    experienceYears: 1
  })
}

const removeSkill = (index: number) => {
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

const removeExperience = (index: number) => {
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

const removeEducation = (index: number) => {
  editForm.educations.splice(index, 1)
}

const editSkill = (skill: ICandidateSkill) => {
  openEditModal('skills')
  // Vous pouvez implémenter une logique pour éditer une compétence spécifique
}

const editExperience = (experience: ICandidateExperience) => {
  openEditModal('experience')
  // Vous pouvez implémenter une logique pour éditer une expérience spécifique
}

const editEducation = (education: ICandidateEducation) => {
  openEditModal('education')
  // Vous pouvez implémenter une logique pour éditer une formation spécifique
}

const getModalTitle = () => {
  const titles: { [key: string]: string } = {
    profile: 'Edit Profile Information',
    about: 'Edit About Section',
    salary: 'Edit Salary Expectations',
    skills: 'Manage Skills',
    experience: 'Manage Work Experience',
    education: 'Manage Education',
    contact: 'Edit Contact Information',
    avatar: 'Update Profile Picture'
  }
  return titles[editMode.value] || 'Edit Information'
}

// Fonctions utilitaires existantes
const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const getSkillWidth = (years: number): string => {
  const maxYears = Math.max(...skills.map(s => s.experienceYears))
  return maxYears > 0 ? `${(years / maxYears) * 100}%` : '0%'
}

onMounted(() => {
  console.log('Profile page mounted')
})
</script>

<style scoped>
/* Styles personnalisés pour les animations */
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

/* Animation pour le modal */
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
</style>