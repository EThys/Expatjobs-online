<template>
  <div class="min-h-screen flex flex-col">
    <Navbar/>
    
    <!-- Écran d'accueil pour les nouveaux utilisateurs - seulement si le chargement est terminé et qu'il n'y a pas de profil complet -->
  <div v-if="!isLoading && !isProfileComplete && !showCreationWizard" class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4 py-8">
    <div class="max-w-lg w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
      <div class="p-8 text-center">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Bienvenue sur votre espace candidat !</h1>
        <p class="text-gray-600 mb-8">
          Créez votre profil professionnel en quelques étapes simples pour accéder aux meilleures opportunités d'emploi.
        </p>
        
        <button 
          @click="startProfileCreation"
          class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>Commencer la création du profil</span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Assistant de création de profil -->
  <div v-if="showCreationWizard" class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-24 md:pt-28">
    <div class="w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
      <!-- En-tête avec progression -->
      <div class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold">Assistant de création de profil</h2>
            <p class="text-emerald-100 mt-1">{{ currentStep.title }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-emerald-200">Étape {{ currentStepIndex + 1 }} sur {{ creationSteps.length }}</div>
            <div class="text-lg font-bold">{{ Math.round((currentStepIndex + 1) / creationSteps.length * 100) }}%</div>
          </div>
        </div>
        
        <!-- Barre de progression -->
        <div class="w-full bg-white/30 rounded-full h-2">
          <div 
            class="bg-white h-2 rounded-full transition-all duration-500"
            :style="{ width: `${((currentStepIndex + 1) / creationSteps.length) * 100}%` }"
          ></div>
        </div>
        
        <!-- Étapes -->
        <div class="flex justify-between mt-4">
          <div 
            v-for="(step, index) in creationSteps" 
            :key="step.title"
            class="text-center flex-1"
          >
            <div class="relative">
              <div 
                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300"
                :class="index < currentStepIndex ? 'bg-emerald-700 text-white' : 
                        index === currentStepIndex ? 'bg-white text-emerald-600' : 
                        'bg-white/30 text-emerald-100'"
              >
                <span v-if="index < currentStepIndex">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="text-[10px] sm:text-xs font-medium truncate px-0.5 sm:px-1">{{ step.title }}</div>
              <div v-if="index === currentStepIndex" class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu de l'étape -->
      <div class="p-4 sm:p-6 md:p-8">
        <!-- Étape 1: Informations de base -->
        <div v-if="currentStepIndex === 0" class="space-y-4 sm:space-y-6">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Étape 1 : Informations personnelles</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
              <input 
                v-model="step1Form.firstName" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
              <input 
                v-model="step1Form.lastName" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Votre nom"
              />
            </div>
          </div>
          

          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
            <input 
              v-model="step1Form.location" 
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="Ex: Paris, France"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Salaire minimum (€) *</label>
              <input 
                v-model="step1Form.salaryExpectationMin" 
                type="number" 
                min="10"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="40000"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Salaire maximum (€) *</label>
              <input 
                v-model="step1Form.salaryExpectationMax" 
                type="number" 
                min="10"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="65000"
              />
            </div>
          </div>
          

          
          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button 
              @click="cancelCreation"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
            >
              Annuler
            </button>
            <button 
              @click="saveStep1"
              :disabled="!step1Form.firstName || !step1Form.lastName || !step1Form.location"
              class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>Sauvegarder et continuer</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Étape 2: Expériences professionnelles -->
        <div v-if="currentStepIndex === 1" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Étape 2 : Expériences professionnelles</h3>
            <button 
              @click="addExperience" 
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Ajouter une expérience</span>
            </button>
          </div>
          
          <div v-if="step2Form.experiences.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <p class="text-gray-600 mb-4">Ajoutez votre première expérience professionnelle</p>
          </div>
          
          <div v-for="(exp, index) in step2Form.experiences" :key="index" class="border border-gray-200 rounded-xl p-6 space-y-4">
            <div class="flex justify-between items-start">
              <h4 class="text-lg font-semibold text-gray-900">Expérience {{ index + 1 }}</h4>
              <button 
                @click="removeExperience(index)" 
                class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Poste *</label>
                <input 
                  v-model="exp.jobTitle" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ex: Développeur Full-Stack"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Entreprise *</label>
                <input 
                  v-model="exp.companyName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ex: TechCorp"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
                <input 
                  v-model="exp.startDate" 
                  type="date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                <input 
                  v-model="exp.endDate" 
                  type="date" 
                  :disabled="exp.currentExperienceStatus === 'current'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
                />
                <div class="flex items-center mt-2">
                  <input 
                    v-model="exp.currentExperienceStatus" 
                    type="checkbox" 
                    value="current" 
                    :id="`current-${index}`"
                    class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label :for="`current-${index}`" class="ml-2 text-sm text-gray-700">Poste actuel</label>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                v-model="exp.description" 
                rows="3" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                placeholder="Décrivez vos responsabilités et réalisations..."
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button 
              @click="previousStep"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Retour</span>
            </button>
            <div class="flex space-x-3">
              <button 
                @click="skipStep2"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
              >
                Passer cette étape
              </button>
              <button 
                @click="saveStep2"
                :disabled="isSavingStep2 || !validateExperiences()"
                class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="isSavingStep2" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>Sauvegarder et continuer</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Étape 3: Formations -->
        <div v-if="currentStepIndex === 2" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Étape 3 : Formations et diplômes</h3>
            <button 
              @click="addEducation" 
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Ajouter une formation</span>
            </button>
          </div>
          
          <div v-if="step3Form.educations.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
            </svg>
            <p class="text-gray-600 mb-4">Ajoutez vos formations et diplômes</p>
          </div>
          
          <div v-for="(edu, index) in step3Form.educations" :key="index" class="border border-gray-200 rounded-xl p-6 space-y-4">
            <div class="flex justify-between items-start">
              <h4 class="text-lg font-semibold text-gray-900">Formation {{ index + 1 }}</h4>
              <button 
                @click="removeEducation(index)" 
                class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Établissement *</label>
                <input 
                  v-model="edu.institutionName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ex: Université Paris-Saclay"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Diplôme *</label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Domaine d'études *</label>
              <input 
                v-model="edu.fieldStudy" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ex: Informatique"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
                <input 
                  v-model="edu.startDate" 
                  type="date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin *</label>
                <input 
                  v-model="edu.endDate" 
                  type="date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            

          </div>
          
          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button 
              @click="previousStep"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Retour</span>
            </button>
            <div class="flex space-x-3">
              <button 
                @click="skipStep3"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
              >
                Passer cette étape
              </button>
              <button 
                @click="saveStep3"
                :disabled="isSavingStep3 || !validateEducations()"
                class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="isSavingStep3" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>Sauvegarder et continuer</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Étape 4: Compétences -->
        <div v-if="currentStepIndex === 3" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Étape 4 : Compétences et expertises</h3>
            <button 
              @click="addSkill" 
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Ajouter une compétence</span>
            </button>
          </div>
          
          <div v-if="step4Form.skills.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <p class="text-gray-600 mb-4">Ajoutez vos compétences techniques et professionnelles</p>
          </div>
          
          <div v-for="(skill, index) in step4Form.skills" :key="index" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Compétence *</label>
                <input 
                  v-model="skill.skillName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ex: JavaScript"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Années d'expérience *</label>
                <input 
                  v-model="skill.experienceYears" 
                  type="number" 
                  min="0"
                  max="50"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="3"
                />
              </div>
            </div>
            <button 
              @click="removeSkill(index)" 
              class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all mt-6"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button 
              @click="previousStep"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Retour</span>
            </button>
            <div class="flex space-x-3">
              <button 
                @click="skipStep4"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
              >
                Passer cette étape
              </button>
              <button 
                @click="saveStep4"
                :disabled="isSavingStep4 || !validateSkills()"
                class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="isSavingStep4" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>Terminer la création</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Profil complet (une fois créé) -->
  <!-- Loading State with Shimmer - pendant le chargement initial -->
  <div v-if="isLoading" class="min-h-screen bg-gray-50/30 pb-12 mt-10 sm:mt-10 md:mt-10">
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white pt-6 pb-8 sm:pt-8 sm:pb-10 md:py-12">
      <div class="container mx-auto px-3 sm:px-4 md:px-6">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl shimmer"></div>
          <div class="flex-1 space-y-3">
            <div class="h-8 bg-white/20 rounded shimmer w-3/4"></div>
            <div class="h-5 bg-white/20 rounded shimmer w-1/2"></div>
            <div class="flex gap-4">
              <div class="h-4 bg-white/20 rounded shimmer w-32"></div>
              <div class="h-4 bg-white/20 rounded shimmer w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        <div class="lg:col-span-1 space-y-4 sm:space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-40 mb-4"></div>
            <div class="h-16 bg-gray-200 rounded-xl shimmer"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-32 mb-4"></div>
            <div class="space-y-3">
              <div class="h-8 bg-gray-200 rounded shimmer"></div>
              <div class="h-8 bg-gray-200 rounded shimmer"></div>
              <div class="h-8 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2 space-y-4 sm:space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-48 mb-4"></div>
            <div class="space-y-4">
              <div class="h-20 bg-gray-200 rounded shimmer"></div>
              <div class="h-20 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 shimmer-container">
            <div class="h-6 bg-gray-200 rounded shimmer w-40 mb-4"></div>
            <div class="flex gap-2">
              <div class="h-8 bg-gray-200 rounded-full shimmer w-24"></div>
              <div class="h-8 bg-gray-200 rounded-full shimmer w-28"></div>
              <div class="h-8 bg-gray-200 rounded-full shimmer w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isProfileComplete && !showCreationWizard" class="min-h-screen bg-gray-50/30 pb-12 mt-10 sm:mt-10 md:mt-10">
    <!-- Header du profil avec gradient -->
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white pt-6 pb-8 sm:pt-8 sm:pb-10 md:py-12">
      <div class="container mx-auto px-3 sm:px-4 md:px-6">
        <!-- Layout mobile: stack vertical -->
        <div class="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <!-- Avatar et infos -->
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            <!-- Avatar avec edit button -->
            <div class="relative flex-shrink-0">
              <div class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <div class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-lg">
                  {{ getInitials(profile.firstName, profile.lastName) }}
                </div>
              </div>
              <button 
                @click="openEditSection('basics')"
                class="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500 rounded-full border-3 sm:border-4 border-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            
            <!-- Infos utilisateur -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-2">
                <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold truncate max-w-full">
                  {{ profile.firstName }} {{ profile.lastName }}
                </h1>
                <span class="bg-white/20 text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">Profil complet</span>
              </div>
              <p class="text-emerald-100 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 truncate">
                Candidate
              </p>
              <!-- Contact info - responsive grid -->
              <div class="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-4 text-emerald-100/90 text-sm sm:text-base">
                <div class="flex items-center space-x-1.5 sm:space-x-2">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="truncate max-w-[180px] sm:max-w-none">{{ profile.location || 'Location not specified' }}</span>
                </div>
                <div class="flex items-center space-x-1.5 sm:space-x-2">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span class="truncate max-w-[150px] sm:max-w-none">{{ profile.candidate?.phone || 'Phone not specified' }}</span>
                </div>
                <div class="flex items-center space-x-1.5 sm:space-x-2">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="truncate max-w-[180px] sm:max-w-none">{{ profile.candidate?.email || 'Email not specified' }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bouton Modifier - full width on mobile, auto on larger -->

        </div>
      </div>
    </div>

    <!-- Contenu du profil -->
    <div class="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        <!-- Colonne gauche -->
        <div class="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
          <!-- Attentes salariales -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditSection('salary')"
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
              Attentes salariales
            </h3>
            <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
              <div class="text-center">
                <div class="text-2xl font-bold text-emerald-700 mb-1">
                  {{ profile.salaryExpectationMin || 0 }}€ - {{ profile.salaryExpectationMax || 0 }}€
                </div>
                <div class="text-sm text-emerald-600">Fourchette annuelle</div>
              </div>
            </div>
          </div>

          <!-- Compétences -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditSection('skills')"
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
                Compétences
              </h3>
              <span class="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                {{ skills.length }}
              </span>
            </div>
            <div class="space-y-3">
              <div v-for="skill in skills" :key="skill.id" class="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-gray-800">{{ skill.skillName }}</span>
                    <span class="text-sm text-emerald-600 font-medium">{{ skill.experienceYears }} ans</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      :style="{ width: getSkillWidth(skill.experienceYears) }"
                    ></div>
                  </div>
                </div>
                <button 
                  @click="openEditSection('skills')"
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
                <p>Aucune compétence ajoutée</p>
                <button 
                  @click="openEditSection('skills')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium mt-2"
                >
                  Ajouter votre première compétence
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - shown first on mobile for better UX -->
        <div class="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
          <!-- À propos -->


          <!-- Expériences -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditSection('experience')"
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
                Expériences professionnelles
              </h2>
              <span class="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                {{ experiences.length }} expérience(s)
              </span>
            </div>
            <div class="space-y-6">
              <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 pb-6 border-l-2 border-emerald-200 last:pb-0 group hover:border-emerald-300 transition-colors">
                <div class="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <button 
                  @click="openEditSection('experience')"
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
                        {{ formatDate(exp.startDate) }} - {{ exp.currentExperienceStatus === 'current' ? 'Présent' : formatDate(exp.endDate) }}
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
                <p class="text-lg mb-2">Aucune expérience professionnelle</p>
                <button 
                  @click="openEditSection('experience')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Ajouter votre première expérience
                </button>
              </div>
            </div>
          </div>

          <!-- Formations -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="openEditSection('education')"
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
                Formations
              </h2>
              <span class="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                {{ educations.length }} formation(s)
              </span>
            </div>
            <div class="space-y-6">
              <div v-for="edu in educations" :key="edu.id" class="relative pl-8 pb-6 border-l-2 border-emerald-200 last:pb-0 group hover:border-emerald-300 transition-colors">
                <div class="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <button 
                  @click="openEditSection('education')"
                  class="absolute -right-2 top-0 w-8 h-8 bg-white hover:bg-emerald-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-110 shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <div class="bg-gradient-to-r from-white to-emerald-50/30 p-5 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 group-hover:shadow-sm">
                  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                    <h3 class="text-lg font-semibold text-gray-900">{{ edu.degree }} en {{ edu.fieldStudy }}</h3>
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

                </div>
              </div>
              <div v-if="educations.length === 0" class="text-center py-8 text-gray-500">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
                <p class="text-lg mb-2">Aucune formation ajoutée</p>
                <button 
                  @click="openEditSection('education')"
                  class="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Ajouter votre première formation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals d'édition par section -->
    <!-- Modal: Informations de base -->
    <div v-if="showEditModal === 'basics'" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold">Modifier les informations de base</h3>
            </div>
            <button 
              @click="showEditModal = null"
              :disabled="isLoadingModal"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoadingModal" class="p-6 flex items-center justify-center">
          <div class="flex flex-col items-center space-y-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p class="text-gray-600 text-sm">Chargement des données...</p>
          </div>
        </div>

        <div v-else class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input v-model="editForm.firstName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input v-model="editForm.lastName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            

            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
              <input v-model="editForm.location" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button @click="showEditModal = null" class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Annuler
              </button>
              <button @click="saveBasics" :disabled="isSaving" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center space-x-2">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: À propos -->


    <!-- Modal: Salaire -->
    <div v-if="showEditModal === 'salary'" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold">Modifier les attentes salariales</h3>
            </div>
            <button 
              @click="showEditModal = null"
              :disabled="isLoadingModal"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoadingModal" class="p-6 flex items-center justify-center">
          <div class="flex flex-col items-center space-y-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p class="text-gray-600 text-sm">Chargement des données...</p>
          </div>
        </div>

        <div v-else class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Salaire minimum (€)</label>
                <input v-model="editForm.salaryExpectationMin" type="number" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Salaire maximum (€)</label>
                <input v-model="editForm.salaryExpectationMax" type="number" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button @click="showEditModal = null" class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Annuler
              </button>
              <button @click="saveSalary" :disabled="isSaving" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center space-x-2">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Compétences -->
    <div v-if="showEditModal === 'skills'" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold">Gérer les compétences</h3>
            </div>
            <button 
              @click="showEditModal = null"
              :disabled="isLoadingModal"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoadingModal" class="p-6 flex items-center justify-center">
          <div class="flex flex-col items-center space-y-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p class="text-gray-600 text-sm">Chargement des données...</p>
          </div>
        </div>

        <div v-else class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Vos compétences</h4>
              <button @click="addEditSkill" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Ajouter</span>
              </button>
            </div>
            
            <div v-for="(skill, index) in editForm.skills" :key="index" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Compétence</label>
                  <input v-model="skill.skillName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
                  <input v-model="skill.experienceYears" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              <button @click="removeEditSkill(index)" class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all mt-6">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button @click="showEditModal = null" class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Annuler
              </button>
              <button @click="saveSkills" :disabled="isSaving" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center space-x-2">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Expériences -->
    <div v-if="showEditModal === 'experience'" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold">Gérer les expériences</h3>
            </div>
            <button 
              @click="showEditModal = null"
              :disabled="isLoadingModal"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoadingModal" class="p-6 flex items-center justify-center">
          <div class="flex flex-col items-center space-y-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p class="text-gray-600 text-sm">Chargement des données...</p>
          </div>
        </div>

        <div v-else class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Vos expériences</h4>
              <button @click="addEditExperience" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Ajouter</span>
              </button>
            </div>
            
            <div v-for="(exp, index) in editForm.experiences" :key="index" class="p-4 border border-gray-200 rounded-xl space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                  <input v-model="exp.jobTitle" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                  <input v-model="exp.companyName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                  <input v-model="exp.startDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                  <input v-model="exp.endDate" type="date" :disabled="exp.currentExperienceStatus === 'current'" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50" />
                  <div class="flex items-center mt-2">
                    <input v-model="exp.currentExperienceStatus" type="checkbox" value="current" :id="`edit-current-${index}`" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                    <label :for="`edit-current-${index}`" class="ml-2 text-sm text-gray-700">Poste actuel</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea v-model="exp.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"></textarea>
              </div>
              
              <div class="flex justify-end">
                <button @click="removeEditExperience(index)" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button @click="showEditModal = null" class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Annuler
              </button>
              <button @click="saveExperiences" :disabled="isSaving" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center space-x-2">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Formations -->
    <div v-if="showEditModal === 'education'" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div class="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold">Gérer les formations</h3>
            </div>
            <button
              :disabled="isLoadingModal"
              @click="showEditModal = null"
              class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoadingModal" class="p-6 flex items-center justify-center">
          <div class="flex flex-col items-center space-y-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p class="text-gray-600 text-sm">Chargement des données...</p>
          </div>
        </div>

        <div v-else class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Vos formations</h4>
              <button @click="addEditEducation" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Ajouter</span>
              </button>
            </div>
            
            <div v-for="(edu, index) in editForm.educations" :key="index" class="p-4 border border-gray-200 rounded-xl space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Établissement</label>
                  <input v-model="edu.institutionName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Diplôme</label>
                  <select v-model="edu.degree" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
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
                <label class="block text-sm font-medium text-gray-700 mb-2">Domaine d'études</label>
                <input v-model="edu.fieldStudy" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                  <input v-model="edu.startDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                  <input v-model="edu.endDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              

              
              <div class="flex justify-end">
                <button @click="removeEditEducation(index)" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button @click="showEditModal = null" class="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Annuler
              </button>
              <button @click="saveEducations" :disabled="isSaving" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center space-x-2">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Footer - toujours visible -->
    <Footer/>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import type { ICandidateData } from '@/utils/interface/candidate/ICandidateData'
import type { ICandidateProfile } from '@/utils/interface/candidate/ICandidateProfile'
import type { ICandidateEducation } from '@/utils/interface/candidate/ICandidateEducation'
import type { ICandidateExperience } from '@/utils/interface/candidate/ICandidateExperience'
import type { ICandidateSkill } from '@/utils/interface/candidate/ICandidateSkill'
import { useCandidateService } from '@/utils/service/CandidateService'
import { useNotif } from '@/composables/useNotif'
import Navbar from '../components/navbar/NavBarComponent.vue'
import Footer from '../components/footer/FooterComponent.vue'
import { getUser } from '@/stores/user';

const candidateService = useCandidateService();
const { notifySuccess, notifyError, notifyInfo } = useNotif();
const user = getUser();
const userId = user?.id ?? 0;

// Données du profil
const candidateData = ref<ICandidateData>({
  profile: {
    candidateProfileId: 0,
    candidate: { id: 0, email: "", phone: "", role: "CANDIDATE" },
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

const profile = computed(() => candidateData.value.profile)
const experiences = ref<any[]>([])
const educations = ref<any[]>([])
const skills = ref<any[]>([])

// Vérifier si le profil est complet (toutes les étapes de base sont remplies)
const isProfileComplete = computed(() => {
  // Le profil est complet si :
  // 1. Le profil existe (candidateProfileId > 0)
  // 2. Les informations de base sont remplies (firstName, lastName, location)
  const hasProfileId = profile.value.candidateProfileId > 0
  const hasBasicInfo = !!(
    profile.value.firstName && 
    profile.value.lastName && 
    profile.value.location
  )
  
  return hasProfileId && hasBasicInfo
})

// État de l'interface
const showCreationWizard = ref(false)
const showEditModal = ref<string | null>(null)
const currentStepIndex = ref(0)
const isLoading = ref(true)
const isLoadingModal = ref(false)
const isSaving = ref(false)
const isSavingStep2 = ref(false)
const isSavingStep3 = ref(false)
const isSavingStep4 = ref(false)

// Étapes de création
const creationSteps = [
  { title: 'Informations personnelles', description: 'Nom, titre et localisation' },
  { title: 'Expériences', description: 'Parcours professionnel' },
  { title: 'Formations', description: 'Diplômes et études' },
  { title: 'Compétences', description: 'Expertises techniques' }
]

const currentStep = computed(() => creationSteps[currentStepIndex.value])

// Formulaires pour la création
const step1Form = reactive({
  firstName: '',
  lastName: '',
  location: '',
  salaryExpectationMin: 40,
  salaryExpectationMax: 60
})

const step2Form = reactive({
  experiences: [] as any[]
})

const step3Form = reactive({
  educations: [] as any[]
})

const step4Form = reactive({
  skills: [] as any[]
})

// Formulaire pour l'édition
const editForm = reactive({
  firstName: '',
  lastName: '',
  location: '',
  salaryExpectationMin: 10,
  salaryExpectationMax: 10,
  skills: [] as any[],
  experiences: [] as any[],
  educations: [] as any[]
})

// Charger le profil
const loadCandidateProfile = async () => {
  if (!user) return
  
  try {
    isLoading.value = true
    const data = await candidateService.getCompleteCandidateData(userId)
    
    console.log('📥 DONNÉES BRUTES DE L\'API:', JSON.stringify(data, null, 2))
    
    // L'API retourne des objets paginés, extraire le .content
    const experiencesArray = Array.isArray(data.experiences) 
      ? data.experiences 
      : ((data.experiences as any)?.content || [])
    
    const educationsArray = Array.isArray(data.educations)
      ? data.educations
      : ((data.educations as any)?.content || [])
    
    const skillsArray = Array.isArray(data.skills)
      ? data.skills
      : ((data.skills as any)?.content || [])
    
    console.log('📦 Données extraites:')
    console.log('  - experiencesArray:', experiencesArray.length, 'items')
    console.log('  - educationsArray:', educationsArray.length, 'items')
    console.log('  - skillsArray:', skillsArray.length, 'items')
    
    // Mettre à jour candidateData
    candidateData.value = {
      profile: data.profile || candidateData.value.profile,
      experiences: [...experiencesArray],
      educations: [...educationsArray],
      skills: [...skillsArray]
    }
    
    // Forcer la mise à jour des refs
    experiences.value = [...experiencesArray]
    educations.value = [...educationsArray]
    skills.value = [...skillsArray]
    
    // Attendre le prochain tick pour s'assurer que Vue a mis à jour le DOM
    await nextTick()
    
    console.log('✅ Profil rechargé:', {
      experiences: experiences.value.length,
      educations: educations.value.length,
      skills: skills.value.length
    })
    
    console.log('📊 Détails skills:', skills.value)
    console.log('📊 Détails experiences:', experiences.value)
    console.log('📊 Détails educations:', educations.value)
  } catch (error) {
    console.error('❌ Erreur lors du chargement du profil:', error)
  } finally {
    isLoading.value = false
  }
}

// Démarrer la création
const startProfileCreation = () => {
  showCreationWizard.value = true
  currentStepIndex.value = 0
  
  // Réinitialiser les formulaires
  Object.assign(step1Form, {
    firstName: '',
    lastName: '',
    location: '',
    salaryExpectationMin: 40,
    salaryExpectationMax: 60
  })
  step2Form.experiences = []
  step3Form.educations = []
  step4Form.skills = []
}

const cancelCreation = () => {
  showCreationWizard.value = false
}

// Navigation création
const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

// Étape 1: Sauvegarder le profil
const saveStep1 = async () => {
  try {
    isSaving.value = true
    
    // Créer le profil de base
    const profileData = await candidateService.createCandidateProfile({
      userId,
      firstName: step1Form.firstName,
      lastName: step1Form.lastName,
      location: step1Form.location,
      salaryExpectationMin: step1Form.salaryExpectationMin,
      salaryExpectationMax: step1Form.salaryExpectationMax,
      resumeUrl: ''
    })
    
    // Mettre à jour avec titre et bio
    await candidateService.updateCandidateProfile(userId, {
      firstName: step1Form.firstName,
      lastName: step1Form.lastName,
      location: step1Form.location,
      salaryExpectationMin: step1Form.salaryExpectationMin,
      salaryExpectationMax: step1Form.salaryExpectationMax,
      resumeUrl: ''
    })
    
    // Mettre à jour les données locales
    candidateData.value.profile = {
      ...candidateData.value.profile,
      ...profileData
    }
    
    // Passer à l'étape suivante
    currentStepIndex.value = 1
    
  } catch (error) {
    console.error('Erreur lors de la création du profil:', error)
  } finally {
    isSaving.value = false
  }
}

// Étape 2: Gestion des expériences
const addExperience = () => {
  step2Form.experiences.push({
    jobTitle: '',
    companyName: '',
    description: '',
    startDate: '',
    endDate: '',
    currentExperienceStatus: 'previous',
    location: ''
  })
}

const removeExperience = (index: number) => {
  step2Form.experiences.splice(index, 1)
}

const validateExperiences = (): boolean => {
  if (step2Form.experiences.length === 0) return true // Optionnel
  return step2Form.experiences.every(exp => 
    exp.jobTitle && exp.companyName && exp.startDate
  )
}

const skipStep2 = () => {
  currentStepIndex.value = 2
}

const saveStep2 = async () => {
  try {
    isSavingStep2.value = true
    
    // Ajouter chaque expérience
    for (const exp of step2Form.experiences) {
      const newExp = await candidateService.createCandidateExperience({
        profileId: profile.value.candidateProfileId,
        companyName: exp.companyName,
        jobTitle: exp.jobTitle,
        description: exp.description || '',
        startDate: exp.startDate,
        endDate: exp.endDate
      })
      
      // Ajouter à la liste locale
      candidateData.value.experiences.push(newExp)
    }
    
    // Passer à l'étape suivante
    currentStepIndex.value = 2
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout des expériences:', error)
  } finally {
    isSavingStep2.value = false
  }
}

// Étape 3: Gestion des formations
const addEducation = () => {
  step3Form.educations.push({
    institutionName: '',
    degree: 'Bachelor',
    fieldStudy: '',
    startDate: '',
    endDate: ''
  })
}

const removeEducation = (index: number) => {
  step3Form.educations.splice(index, 1)
}

const validateEducations = (): boolean => {
  if (step3Form.educations.length === 0) return true // Optionnel
  return step3Form.educations.every(edu => 
    edu.institutionName && edu.degree && edu.fieldStudy && edu.startDate && edu.endDate
  )
}

const skipStep3 = () => {
  currentStepIndex.value = 3
}

const saveStep3 = async () => {
  try {
    isSavingStep3.value = true
    
    // Ajouter chaque formation
    for (const edu of step3Form.educations) {
      const newEdu = await candidateService.createCandidateEducation({
        profileId: profile.value.candidateProfileId,
        institutionName: edu.institutionName,
        degree: edu.degree,
        fieldStudy: edu.fieldStudy,
        startDate: edu.startDate,
        endDate: edu.endDate
      })
      
      // Ajouter à la liste locale
      candidateData.value.educations.push(newEdu)
    }
    
    // Passer à l'étape suivante
    currentStepIndex.value = 3
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout des formations:', error)
  } finally {
    isSavingStep3.value = false
  }
}

// Étape 4: Gestion des compétences
const addSkill = () => {
  step4Form.skills.push({
    skillName: '',
    experienceYears: 1
  })
}

const removeSkill = (index: number) => {
  step4Form.skills.splice(index, 1)
}

const validateSkills = (): boolean => {
  if (step4Form.skills.length === 0) return true // Optionnel
  return step4Form.skills.every(skill => 
    skill.skillName && skill.experienceYears > 0
  )
}

const skipStep4 = () => {
  showCreationWizard.value = false
  loadCandidateProfile()
}

const saveStep4 = async () => {
  try {
    isSavingStep4.value = true
    
    // Ajouter chaque compétence
    for (const skill of step4Form.skills) {
      const newSkill = await candidateService.createCandidateSkill({
        profileId: profile.value.candidateProfileId,
        skillName: skill.skillName,
        experienceYears: skill.experienceYears
      })
      
      // Ajouter à la liste locale
      candidateData.value.skills.push(newSkill)
    }
    
    // Terminer la création
    showCreationWizard.value = false
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout des compétences:', error)
  } finally {
    isSavingStep4.value = false
  }
}

// Édition des sections
const openEditSection = async (section: string) => {
  try {
    isLoadingModal.value = true
    
    // Charger les données fraîches depuis l'API
    await loadCandidateProfile()
    
    // Pré-remplir le formulaire d'édition avec les données actuelles
    Object.assign(editForm, {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      location: profile.value.location,
      salaryExpectationMin: profile.value.salaryExpectationMin || 10,
      salaryExpectationMax: profile.value.salaryExpectationMax || 10,
      skills: [...skills.value].map(skill => ({
        id: skill.id,
        skillName: skill.skillName,
        experienceYears: skill.experienceYears,
        profileId: skill.profileId
      })),
      experiences: [...experiences.value].map(exp => ({
        id: exp.id,
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        description: exp.description,
        startDate: exp.startDate,
        endDate: exp.endDate,
        currentExperienceStatus: exp.currentExperienceStatus,
        location: exp.location || '',
        profileId: exp.profileId
      })),
      educations: [...educations.value].map(edu => ({
        id: edu.id,
        institutionName: edu.institutionName,
        degree: edu.degree,
        fieldStudy: edu.fieldStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        profileId: edu.profileId
      }))
    })

    showEditModal.value = section
  } finally {
    isLoadingModal.value = false
  }
}

// Sauvegarde des sections
const saveBasics = async () => {
  try {
    isSaving.value = true
    await candidateService.updateCandidateProfile(userId, {
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      location: editForm.location,
      salaryExpectationMin: profile.value.salaryExpectationMin,
      salaryExpectationMax: profile.value.salaryExpectationMax,
      resumeUrl: profile.value.resumeUrl || ''
    })
    
    await loadCandidateProfile()
    showEditModal.value = null
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  } finally {
    isSaving.value = false
  }
}



const saveSalary = async () => {
  try {
    isSaving.value = true
    await candidateService.updateCandidateProfile(userId, {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      location: profile.value.location,
      salaryExpectationMin: editForm.salaryExpectationMin,
      salaryExpectationMax: editForm.salaryExpectationMax,
      resumeUrl: profile.value.resumeUrl || ''
    })
    
    await loadCandidateProfile()
    showEditModal.value = null
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  } finally {
    isSaving.value = false
  }
}

// Gestion des compétences (édition)
const addEditSkill = () => {
  // Ajouter en haut de la liste - SANS id pour que ce soit traité comme nouveau
  editForm.skills.unshift({
    skillName: '',
    experienceYears: 1,
    profileId: profile.value.candidateProfileId
    // Pas d'id = nouvel item
  })
}

const removeEditSkill = async (index: number) => {
  const skill = editForm.skills[index]
  if (skill.id) {
    try {
      await candidateService.deleteCandidateSkill(skill.id)
      notifySuccess('Compétence supprimée avec succès')
      // Recharger immédiatement
      await loadCandidateProfile()
    } catch (error) {
      console.error('Erreur suppression compétence:', error)
      notifyError('Erreur lors de la suppression de la compétence')
      return
    }
  }
  editForm.skills.splice(index, 1)
}

const saveSkills = async () => {
  try {
    isSaving.value = true
    
    console.log('🔵 Début sauvegarde skills, editForm.skills:', editForm.skills)
    
    // Séparer les nouveaux des existants
    const newSkills = editForm.skills.filter(skill => !skill.id)
    const existingSkills = editForm.skills.filter(skill => skill.id)
    
    console.log('➕ Nouveaux skills à créer:', newSkills.length)
    console.log('🔄 Skills existants à vérifier:', existingSkills.length)
    
    // Créer les nouveaux
    for (const skill of newSkills) {
      if (!skill.skillName || !skill.experienceYears) {
        console.warn('⚠️ Skill incomplet ignoré:', skill)
        continue
      }
      
      console.log('➕ Create skill:', skill.skillName)
      await candidateService.createCandidateSkill({
        profileId: profile.value.candidateProfileId,
        skillName: skill.skillName,
        experienceYears: skill.experienceYears
      })
    }
    
    // Mettre à jour les existants modifiés
    for (const skill of existingSkills) {
      const original = skills.value.find(s => s.id === skill.id)
      if (original && (original.skillName !== skill.skillName || original.experienceYears !== skill.experienceYears)) {
        console.log('🔄 Update skill:', skill.id, skill.skillName)
        await candidateService.updateCandidateSkill(skill.id, {
          profileId: profile.value.candidateProfileId,
          skillName: skill.skillName,
          experienceYears: skill.experienceYears,
          id: skill.id
        })
      }
    }
    
    console.log('✅ Skills sauvegardées, rechargement du profil...')
    
    // Recharger les données avec un petit délai pour s'assurer que le backend a fini
    await new Promise(resolve => setTimeout(resolve, 300))
    await loadCandidateProfile()
    
    console.log('✅ Profil rechargé, skills.value:', skills.value)
    
    showEditModal.value = null
    notifySuccess('Compétences sauvegardées avec succès')
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde des compétences:', error)
    notifyError('Erreur lors de la sauvegarde des compétences')
  } finally {
    isSaving.value = false
  }
}

// Gestion des expériences (édition)
const addEditExperience = () => {
  // Ajouter en haut de la liste - SANS id pour que ce soit traité comme nouveau
  editForm.experiences.unshift({
    companyName: '',
    jobTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    profileId: profile.value.candidateProfileId
    // Pas d'id = nouvel item
  })
}

const removeEditExperience = async (index: number) => {
  const exp = editForm.experiences[index]
  if (exp.id) {
    try {
      await candidateService.deleteCandidateExperience(exp.id)
      notifySuccess('Expérience supprimée avec succès')
      // Recharger immédiatement
      await loadCandidateProfile()
    } catch (error) {
      console.error('Erreur suppression expérience:', error)
      notifyError('Erreur lors de la suppression de l\'expérience')
      return
    }
  }
  editForm.experiences.splice(index, 1)
}

const saveExperiences = async () => {
  try {
    isSaving.value = true
    
    console.log('🔵 Début sauvegarde experiences, editForm.experiences:', editForm.experiences)
    
    // Séparer les nouveaux des existants
    const newExperiences = editForm.experiences.filter(exp => !exp.id)
    const existingExperiences = editForm.experiences.filter(exp => exp.id)
    
    console.log('➕ Nouvelles experiences à créer:', newExperiences.length)
    console.log('🔄 Experiences existantes à vérifier:', existingExperiences.length)
    
    // Créer les nouveaux
    for (const exp of newExperiences) {
      if (!exp.jobTitle || !exp.companyName || !exp.startDate) {
        console.warn('⚠️ Experience incomplète ignorée:', exp)
        continue
      }
      
      console.log('➕ Create experience:', exp.jobTitle)
      await candidateService.createCandidateExperience({
        profileId: profile.value.candidateProfileId,
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        description: exp.description || '',
        startDate: exp.startDate,
        endDate: exp.endDate
      })
    }
    
    // Mettre à jour les existants modifiés
    for (const exp of existingExperiences) {
      const original = experiences.value.find(e => e.id === exp.id)
      if (original && (
        original.jobTitle !== exp.jobTitle ||
        original.companyName !== exp.companyName ||
        original.description !== exp.description ||
        original.startDate !== exp.startDate ||
        original.endDate !== exp.endDate
      )) {
        console.log('🔄 Update experience:', exp.id, exp.jobTitle)
        await candidateService.updateCandidateExperience(exp.id, {
          profileId: profile.value.candidateProfileId,
          companyName: exp.companyName,
          jobTitle: exp.jobTitle,
          description: exp.description || '',
          startDate: exp.startDate,
          endDate: exp.endDate,
          id: exp.id
        })
      }
    }
    
    console.log('✅ Experiences sauvegardées, rechargement du profil...')
    
    // Recharger les données avec un petit délai
    await new Promise(resolve => setTimeout(resolve, 300))
    await loadCandidateProfile()
    
    console.log('✅ Profil rechargé, experiences.value:', experiences.value)
    
    showEditModal.value = null
    notifySuccess('Expériences sauvegardées avec succès')
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde des expériences:', error)
    notifyError('Erreur lors de la sauvegarde des expériences')
  } finally {
    isSaving.value = false
  }
}

// Gestion des formations (édition)
const addEditEducation = () => {
  // Ajouter en haut de la liste - SANS id pour que ce soit traité comme nouveau
  editForm.educations.unshift({
    institutionName: '',
    degree: 'Bachelor',
    fieldStudy: '',
    startDate: '',
    endDate: '',
    profileId: profile.value.candidateProfileId
    // Pas d'id = nouvel item
  })
}

const removeEditEducation = async (index: number) => {
  const edu = editForm.educations[index]
  if (edu.id) {
    try {
      await candidateService.deleteCandidateEducation(edu.id)
      notifySuccess('Formation supprimée avec succès')
      // Recharger immédiatement
      await loadCandidateProfile()
    } catch (error) {
      console.error('Erreur suppression formation:', error)
      notifyError('Erreur lors de la suppression de la formation')
      return
    }
  }
  editForm.educations.splice(index, 1)
}

const saveEducations = async () => {
  try {
    isSaving.value = true
    
    console.log('🔵 Début sauvegarde educations, editForm.educations:', editForm.educations)
    
    // Séparer les nouveaux des existants
    const newEducations = editForm.educations.filter(edu => !edu.id)
    const existingEducations = editForm.educations.filter(edu => edu.id)
    
    console.log('➕ Nouvelles educations à créer:', newEducations.length)
    console.log('🔄 Educations existantes à vérifier:', existingEducations.length)
    
    // Créer les nouveaux
    for (const edu of newEducations) {
      if (!edu.institutionName || !edu.degree || !edu.fieldStudy || !edu.startDate || !edu.endDate) {
        console.warn('⚠️ Education incomplète ignorée:', edu)
        continue
      }
      
      console.log('➕ Create education:', edu.institutionName)
      await candidateService.createCandidateEducation({
        profileId: profile.value.candidateProfileId,
        institutionName: edu.institutionName,
        degree: edu.degree,
        fieldStudy: edu.fieldStudy,
        startDate: edu.startDate,
        endDate: edu.endDate
      })
    }
    
    // Mettre à jour les existants modifiés
    for (const edu of existingEducations) {
      const original = educations.value.find(e => e.id === edu.id)
      if (original && (
        original.institutionName !== edu.institutionName ||
        original.degree !== edu.degree ||
        original.fieldStudy !== edu.fieldStudy ||
        original.startDate !== edu.startDate ||
        original.endDate !== edu.endDate ||
        original.description !== edu.description
      )) {
        console.log('🔄 Update education:', edu.id, edu.institutionName)
        await candidateService.updateCandidateEducation(edu.id, {
          profileId: profile.value.candidateProfileId,
          institutionName: edu.institutionName,
          degree: edu.degree,
          fieldStudy: edu.fieldStudy,
          startDate: edu.startDate,
          endDate: edu.endDate,
          id: edu.id
        })
      }
    }
    
    console.log('✅ Educations sauvegardées, rechargement du profil...')
    
    // Recharger les données avec un petit délai
    await new Promise(resolve => setTimeout(resolve, 300))
    await loadCandidateProfile()
    
    console.log('✅ Profil rechargé, educations.value:', educations.value)
    
    showEditModal.value = null
    notifySuccess('Formations sauvegardées avec succès')
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde des formations:', error)
    notifyError('Erreur lors de la sauvegarde des formations')
  } finally {
    isSaving.value = false
  }
}

// Utilitaires
const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Présent'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  } catch {
    return dateString
  }
}

const getSkillWidth = (years: number): string => {
  const safeSkills = skills.value
  if (safeSkills.length === 0 || years === 0) return '0%'
  const maxYears = Math.max(...safeSkills.map(s => s.experienceYears || 0), years)
  return `${(years / maxYears) * 100}%`
}

onMounted(() => {
  if (user) {
    loadCandidateProfile()
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Shimmer Effect */
.shimmer-container {
  position: relative;
  overflow: hidden;
}

.shimmer {
  position: relative;
  overflow: hidden;
  background-color: #e5e7eb;
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>