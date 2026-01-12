<template>
  <div v-if="totalPages > 1" class="mt-10">
    <div class="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Info -->
        <p class="text-sm text-gray-600">
          Page {{ currentPage + 1 }} sur {{ totalPages }}
          <span class="text-gray-400 mx-2">•</span>
          {{ totalElements }} résultat{{ totalElements !== 1 ? 's' : '' }}
        </p>

        <!-- Navigation -->
        <nav class="flex items-center space-x-2">
          <!-- Previous -->
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 0 || loading"
            class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group"
          >
            <svg
              v-if="loading && currentPage > 0"
              class="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 group-hover:text-emerald-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Pages -->
          <template v-for="(page, index) in visiblePages" :key="index">
            <button
              v-if="typeof page === 'number'"
              @click="changePage(page - 1)"
              :disabled="loading"
              :class="[
                'px-4 py-2 rounded-xl font-medium transition-all duration-300 min-w-[44px] flex items-center justify-center',
                currentPage === page - 1
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transform scale-105'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50',
              ]"
            >
              <svg
                v-if="loading && currentPage === page - 1"
                class="animate-spin h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ page }}
            </button>
            <span v-else class="px-2 text-gray-400"> ... </span>
          </template>

          <!-- Next -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= totalPages - 1 || loading"
            class="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group"
          >
            <svg
              v-if="loading && currentPage < totalPages - 1"
              class="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 group-hover:text-emerald-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>

        <!-- Quick Jump -->
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>Aller à:</span>
          <select
            v-model="quickPage"
            @change="goToQuickPage"
            :disabled="loading"
            class="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          >
            <option v-for="page in totalPages" :key="page" :value="page - 1">
              Page {{ page }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalElements: number
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'change', page: number): void
}>()

const quickPage = ref(props.currentPage)

watch(
  () => props.currentPage,
  (newVal) => {
    quickPage.value = newVal
  },
)

const changePage = (page: number) => {
  if (page >= 0 && page < props.totalPages) {
    emit('update:currentPage', page)
    emit('change', page)
  }
}

const goToQuickPage = () => {
  changePage(quickPage.value)
}

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage + 1

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})
</script>
