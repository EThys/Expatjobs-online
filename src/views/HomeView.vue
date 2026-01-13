<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
//@ts-ignore
import HeroComponent from '@/components/hero/HeroComponent.vue'
//@ts-ignore
import FeaturedJobsComponent from '@/components/jobs/FeaturedJobsComponent.vue'
//@ts-ignore
import AboutComponent from '@/components/about/AboutComponent.vue'
//@ts-ignore
import ProcessStepsComponent from '@/components/process/ProcessStepsComponent.vue'
//@ts-ignore
import EntrepriseRecruteComponent from '@/components/jobs/EntrepriseRecruteComponent.vue'
//@ts-ignore
import TestimonialComponent from '@/components/testimonial/TestimonialComponent.vue'
//@ts-ignore
import CTAComponent from '@/components/cta/CTAComponent.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
// @ts-ignore
import Footer from '../components/footer/FooterComponent.vue'
// @ts-ignore
import JobCategoriesComponent from '@/components/jobs/JobCategoriesComponent.vue'

// Initialiser les animations au scroll
useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
  once: true,
})
</script>
<template>
  <div class="home-page">
    <HeroComponent />

    <div class="my-24 animate-on-scroll animate-fade-up" data-delay="0">
      <JobCategoriesComponent />
    </div>

    <div class="mb-24 animate-on-scroll animate-fade-left" data-delay="200">
      <FeaturedJobsComponent />
    </div>

    <div class="animate-on-scroll animate-scale-in" data-delay="300">
      <AboutComponent />
    </div>
    
    <div class="animate-on-scroll animate-fade-right" data-delay="250">
      <CTAComponent />
    </div>
    
    <div class="animate-on-scroll animate-fade-up" data-delay="200">
      <ProcessStepsComponent />
    </div>
    
    <div class="animate-on-scroll animate-fade-left" data-delay="300">
      <EntrepriseRecruteComponent />
    </div>
    
    <div class="animate-on-scroll animate-scale-in" data-delay="250">
      <TestimonialComponent />
    </div>

    <Footer />
  </div>
</template>
<style scoped>
.home-page {
  overflow-x: hidden;
}

/* Animation variants with smoother, longer transitions */
.animate-fade-up {
  opacity: 0;
  transform: translateY(60px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.animate-fade-left {
  opacity: 0;
  transform: translateX(-60px);
  transition: all 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.animate-fade-right {
  opacity: 0;
  transform: translateX(60px);
  transition: all 1.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.85);
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-scale-in.animate-in {
  opacity: 1;
  transform: scale(1);
}
</style>
