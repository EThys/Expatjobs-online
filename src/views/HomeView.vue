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

    <div class="my-24">
      <JobCategoriesComponent />
    </div>

    <div class="mb-24">
      <FeaturedJobsComponent />
    </div>

    <AboutComponent />
    <CTAComponent />
    <ProcessStepsComponent />
    <EntrepriseRecruteComponent />
    <TestimonialComponent />

    <Footer />
  </div>
</template>
<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>
