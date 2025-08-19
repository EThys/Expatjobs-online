<template>
  <div class="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition">
    <div class="flex items-center space-x-3 mb-4">
      <div class="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
        <span class="text-primary font-bold">{{ offre.entreprise.charAt(0) }}</span>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ offre.titre }}</h3>
        <p class="text-sm text-gray-600">{{ offre.entreprise }}</p>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span class="material-icons text-xs">location_on</span>
        <span>{{ offre.localisation }}</span>
      </div>
      <div class="flex items-center space-x-2 text-sm text-gray-600 mt-1">
        <span class="material-icons text-xs">work</span>
        <span>{{ offre.typeContrat }}</span>
      </div>
      <div class="flex items-center space-x-2 text-sm font-medium text-primary mt-1">
        <span class="material-icons text-xs">attach_money</span>
        <span>{{ offre.salaire }}</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="competence in offre.competences"
        :key="competence"
        class="px-3 py-1 bg-gray-100 text-xs text-gray-700 rounded-full"
      >
        {{ competence }}
      </span>
    </div>

    <div class="flex justify-between items-center">
      <span class="text-xs text-gray-500">{{ offre.datePublication }}</span>
      <button class="px-4 py-2 bg-secondary text-white text-sm rounded-lg hover:bg-light transition">
        Postuler
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  offre: {
    type: Object,
    required: true,
  },
});
</script>
