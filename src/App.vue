<template>
  <div class="app-layout">
    <main class="app-main">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import FooterComponent from '@/components/footer/FooterComponent.vue'
</script>

<style>
body {
  padding: 0 !important;
  margin: 0 !important;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1 0 auto;
}
</style>