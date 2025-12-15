<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
//@ts-ignore
import HeroComponent from '@/components/hero/HeroComponent.vue'
//@ts-ignore
import FeaturedJobsComponent from '@/components/jobs/FeaturedJobsComponent.vue'
//@ts-ignore
import AboutComponent from '@/components/about/AboutComponent.vue'
//@ts-ignore
import EntrepriseRecruteComponent from '@/components/jobs/EntrepriseRecruteComponent.vue'
//@ts-ignore
import TestimonialComponent from '@/components/testimonial/TestimonialComponent.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

// Initialiser les animations au scroll
useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
  once: true
})
</script>
<template>
  <div class="home-page">
    <HeroComponent />
    <AboutComponent />
    <EntrepriseRecruteComponent />
  </div>
</template>
<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>