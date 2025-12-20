<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const steps = [
  {
    id: 1,
    icon: DocumentTextIcon,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    darkBorder: 'group-hover:border-emerald-200',
    shadow: 'group-hover:shadow-emerald-500/10',
    translationKey: 'about.process.step1'
  },
  {
    id: 2,
    icon: SparklesIcon,
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-100',
    darkBorder: 'group-hover:border-green-200',
    shadow: 'group-hover:shadow-green-500/10',
    translationKey: 'about.process.step2'
  },
  {
    id: 3,
    icon: ChatBubbleLeftRightIcon,
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-100',
    darkBorder: 'group-hover:border-teal-200',
    shadow: 'group-hover:shadow-teal-500/10',
    translationKey: 'about.process.step3'
  }
]
</script>

<template>
  <section class="py-20 sm:py-24 bg-white relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-50/50 rounded-full blur-[120px]"></div>
      <div class="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-green-50/50 rounded-full blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
        <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          {{ t('about.process.title') }}
          <span class="transparent-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            {{ t('about.process.highlight') }}
          </span>
        </h2>
        
        <p class="text-xl text-gray-500 leading-relaxed">
          {{ t('about.process.description') }}
        </p>
      </div>

      <!-- Process Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-[3.5rem] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-100 via-green-100 to-teal-100 z-0"></div>

        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="group relative z-10"
          :class="{ 'md:mt-12': index === 1 }"
        >
          <!-- Card Content -->
          <div 
            class="bg-white rounded-3xl p-8 border transition-all duration-300 h-full relative overflow-hidden"
            :class="[step.borderColor, step.darkBorder, step.shadow]"
          >
            <!-- Hover Gradient Background -->
            <div 
              class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              :class="step.color"
            ></div>

            <!-- Step Number Badge -->
            <div class="absolute top-6 right-6 font-black text-6xl opacity-5 select-none" :class="step.iconColor">
              0{{ step.id }}
            </div>

            <!-- Icon Container -->
            <div class="relative mb-8 inline-block">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                :class="`bg-gradient-to-br ${step.color}`"
              >
                <component :is="step.icon" class="w-10 h-10" />
              </div>
              
              <!-- Connection Dot (Mobile only) -->
              <div v-if="index !== steps.length - 1" class="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-100"></div>
            </div>

            <!-- Text Content -->
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
              {{ t(`${step.translationKey}.title`) }}
            </h3>
            
            <p class="text-gray-500 mb-8 leading-relaxed">
              {{ t(`${step.translationKey}.description`) }}
            </p>

            <!-- Features List -->
            <ul class="space-y-3">
              <li 
                v-for="i in 3" 
                :key="i"
                class="flex items-start gap-3 text-sm text-gray-600"
              >
                <CheckCircleIcon class="w-5 h-5 flex-shrink-0" :class="step.iconColor" />
                <span>{{ t(`${step.translationKey}.feature${i}`) }}</span>
              </li>
            </ul>

            <!-- Bottom Arrow Action -->
            <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between group-cursor-pointer">
               <span class="text-sm font-semibold" :class="step.iconColor">{{ t('common.learnMore') }}</span>
               <ArrowRightIcon class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" :class="step.iconColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
