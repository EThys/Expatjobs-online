<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 pt-40 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8"
  >
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated gradient orbs -->
      <div
        class="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-blob"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"
      ></div>

      <!-- Grid pattern -->
      <div
        class="absolute inset-0 opacity-10"
        style="
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        "
      ></div>

      <!-- Custom background slot -->
      <slot name="background"></slot>
    </div>

    <div class="max-w-7xl mx-auto relative z-10 text-center">
      <!-- Title Section -->
      <slot name="header">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight"
        >
          <slot name="title">{{ title }}</slot>
        </h1>

        <p
          v-if="subtitle || $slots.subtitle"
          class="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </slot>

      <!-- Content/Search Section -->
      <div class="w-full">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
