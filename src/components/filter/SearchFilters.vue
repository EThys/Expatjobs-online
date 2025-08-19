<template>
  <div class="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtres</h3>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
        <input
          type="text"
          v-model="localFilters.localisation"
          placeholder="Ex: Kinshasa"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type de Contrat</label>
        <select
          v-model="localFilters.typeContrat"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Tous</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Salaire Minimum (USD)</label>
        <input
          type="number"
          v-model="localFilters.salaireMin"
          placeholder="Ex: 2000"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        @click="applyFilters"
        class="w-full px-4 py-2 bg-primary  text-emerald-600 rounded-lg hover:bg-dark transition"
      >
        Appliquer les filtres
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter']);

const localFilters = ref({
  localisation: "",
  typeContrat: "",
  salaireMin: "",
});

const applyFilters = () => {
  emit('filter', { ...localFilters.value });
};
</script>
