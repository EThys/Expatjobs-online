<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// @ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue';
import { useModernToast } from '@/composables/useModernToast';
import { useCompanyStore } from '@/stores/companies';
import { storeToRefs } from 'pinia';
import type { ICompany } from '@/utils/interface/ICompagny';
import { getUser } from '@/stores/authStorage';
// @ts-ignore
import Footer from '../components/footer/FooterComponent.vue';


const { t } = useI18n();
const toast = useModernToast();
const router = useRouter();
const companyStore = useCompanyStore();
const { myCompanies: companies } = storeToRefs(companyStore);

const user = getUser();
const userId = user?.id;

const loading = ref(false);
const saving = ref(false);
const deletingId = ref<number | null>(null);
const selectedCompanyId = ref<number | null>(null);

const editForm = ref({
  name: '',
  description: '',
  location: '',
  webSiteUrl: ''
});

const hasCompany = computed(() => companies.value.length > 0);
const selectedCompany = computed(() =>
  companies.value.find(c => c.id === selectedCompanyId.value) || null
);

const loadCompanies = async () => {
  if (!userId) {
    toast.warning(t('companyManagement.mustLogin'));
    router.push('/login');
    return;
  }

  try {
    loading.value = true;
    await companyStore.fetchMyCompanies(userId);
    
    if (companies.value.length > 0) {
      // Select first only if none selected
      if (!selectedCompanyId.value) {
          selectedCompanyId.value = companies.value[0].id;
          const c = companies.value[0] as any;
          editForm.value = {
            name: c.name ?? c.companyName ?? '',
            description: c.description ?? '',
            location: c.location ?? '',
            webSiteUrl: c.webSiteUrl ?? c.websiteUrl ?? ''
          };
      }
    } else {
      selectedCompanyId.value = null;
    }
  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des entreprises:', error);

    const status = error?.response?.status;
    if (status !== 404 && status !== 204) {
      toast.error(t('companyManagement.loadError'));
    }
  } finally {
    loading.value = false;
  }
};

const selectCompany = (company: ICompany) => {
  selectedCompanyId.value = company.id;
  const c = company as any;
  editForm.value = {
    name: c.name ?? c.companyName ?? '',
    description: c.description ?? '',
    location: c.location ?? '',
    webSiteUrl: c.webSiteUrl ?? c.websiteUrl ?? ''
  };
};

const saveCompany = async () => {
  if (!selectedCompany.value) return;
  if (!editForm.value.name.trim() || !editForm.value.location.trim()) {
    toast.warning(t('companyManagement.validationError'));
    return;
  }

  try {
    saving.value = true;
    const payload = {
      userId: userId!, // Ensure userId is passed if needed by API, though update usually just uses ID
      name: editForm.value.name.trim(),
      description: editForm.value.description?.trim() || '',
      location: editForm.value.location.trim(),
      webSiteUrl: editForm.value.webSiteUrl?.trim() || ''
    };
    
    await companyStore.updateCompany(selectedCompany.value.id, payload);

    toast.success(t('companyManagement.updateSuccess'));
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
    toast.error(t('companyManagement.updateError'));
  } finally {
    saving.value = false;
  }
};

const removeCompany = async (company: ICompany) => {
  if (!confirm(`${t('companyManagement.deleteConfirm')} "${(company as any).name ?? (company as any).companyName}" ?`)) {
    return;
  }
  try {
    deletingId.value = company.id;
    await companyStore.deleteCompany(company.id);
    
    if (selectedCompanyId.value === company.id) {
      selectedCompanyId.value = companies.value[0]?.id ?? null;
      if (companies.value[0]) {
        selectCompany(companies.value[0]);
      }
    }
    toast.success(t('companyManagement.deleteSuccess'));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entreprise:', error);
    toast.error(t('companyManagement.deleteError'));
  } finally {
    deletingId.value = null;
  }
};

const goToCreateCompany = () => {
  router.push('/company/create');
};

onMounted(() => {
  loadCompanies();
});
</script>

<template>
  <Navbar />

  <!-- Hero Section -->
  <div class="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto relative">
      <!-- Main Hero Card -->
      <div class="relative rounded-[3rem] overflow-hidden min-h-[550px] bg-[#1e3a5f] shadow-2xl">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop" 
            alt="Construction Team" 
            class="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <!-- Gradient Overlays for Readability -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] via-[#1e3a5f]/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent opacity-80"></div>
        </div>

        <!-- Content (Left Aligned) -->
        <div class="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 pb-32 md:pb-24 max-w-3xl">
          <div class="animate-fade-in-up">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {{ t('companyManagement.title').split(t('companyManagement.titleHighlight'))[0] }}
              <br />
              <span class="text-blue-200">{{ t('companyManagement.titleHighlight') }}</span>
            </h1>
            <p class="text-blue-100 text-lg md:text-xl font-medium tracking-wide max-w-xl opacity-90">
              {{ t('companyManagement.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Cutout Button Container (Bottom Right) -->
        <div class="absolute bottom-0 right-0 z-20 hidden md:block">
          <div class="relative bg-[#f9fafb] rounded-tl-[2.5rem] pt-8 pl-8 pr-8 pb-8 flex items-center gap-4">
             <!-- Inverse Corner Smoothing (Top Left of the white box) -->
             <div class="absolute -top-[40px] right-0 w-[40px] h-[40px] overflow-hidden">
                <div class="absolute bottom-0 right-0 w-full h-full bg-transparent rounded-br-[2.5rem] shadow-[10px_10px_0_10px_#f9fafb]"></div>
             </div>
             <!-- Inverse Corner Smoothing (Bottom Left - optional, connects to the left side if we were full width, but here we are just a corner tab, so we need the left side to be smooth against the image) -->
             <div class="absolute bottom-0 -left-[40px] w-[40px] h-[40px] overflow-hidden">
                <div class="absolute bottom-0 right-0 w-full h-full bg-transparent rounded-br-[2.5rem] shadow-[10px_10px_0_10px_#f9fafb]"></div>
             </div>

             <button
               type="button"
               @click="goToCreateCompany"
               class="px-8 py-4 rounded-xl bg-[#1e3a5f] text-white font-bold text-lg hover:bg-[#2d4a6f] transition-all duration-300 shadow-lg hover:shadow-[#1e3a5f]/30 flex items-center"
             >
               {{ t('companyManagement.createCompany') }}
             </button>
             <button
               type="button"
               class="px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-lg hover:bg-white hover:border-gray-400 transition-all duration-300 bg-white"
             >
               {{ t('companyManagement.myCompanies') }}
             </button>
          </div>
        </div>

        <!-- Mobile Buttons (visible only on small screens, simple layout) -->
        <div class="absolute bottom-6 left-6 right-6 md:hidden z-20 flex flex-col gap-3">
          <button
             @click="goToCreateCompany"
             class="w-full py-3.5 rounded-xl bg-white text-[#1e3a5f] font-bold shadow-lg"
          >
            {{ t('companyManagement.createCompany') }}
          </button>
          <button
             class="w-full py-3.5 rounded-xl bg-[#1e3a5f]/50 backdrop-blur border border-white/30 text-white font-bold"
          >
            {{ t('companyManagement.myCompanies') }}
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-32 relative z-20">
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Total Entreprises</p>
              <p class="text-3xl font-bold text-[#1e3a5f]">{{ companies.length }}</p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Entreprise Active</p>
              <p class="text-3xl font-bold text-green-600">{{ selectedCompany ? '1' : '0' }}</p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Statut</p>
              <p class="text-lg font-bold text-purple-600">{{ loading ? 'Chargement...' : 'Prêt' }}</p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <!-- Liste des entreprises -->
          <div class="border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-br from-gray-50 to-white">
            <div class="px-6 py-5 flex items-center justify-between border-b border-gray-200 bg-white">
              <h2 class="text-base font-bold text-[#1e3a5f] uppercase tracking-wide flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {{ t('companyManagement.myCompanies') }}
              </h2>
              <span
                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white shadow-md"
              >
                {{ companies.length }}
              </span>
            </div>

            <div class="p-5 lg:max-h-[500px] lg:overflow-y-auto custom-scrollbar">
              <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-[#1e3a5f] mb-4"></div>
                <p class="text-sm text-gray-500 font-medium">Chargement...</p>
              </div>

              <div v-else-if="!hasCompany" class="text-center text-gray-500 py-12 px-4">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p class="mb-2 font-bold text-gray-700 text-lg">
                  {{ t('companyManagement.noCompanies') }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ t('companyManagement.noCompaniesHint') }}
                </p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="c in companies"
                  :key="c.id"
                  @click="selectCompany(c)"
                  class="group w-full text-left px-4 py-4 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden"
                  :class="selectedCompanyId === c.id
                    ? 'border-[#1e3a5f] bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md'"
                >
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
                    :class="selectedCompanyId === c.id ? 'bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f]' : 'bg-gradient-to-br from-blue-400 to-blue-500'"
                  >
                    {{ ((c as any).name ?? (c as any).companyName ?? 'E')[0] }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-bold text-gray-900 truncate mb-1">
                      {{ (c as any).name ?? (c as any).companyName }}
                    </p>
                    <p class="text-sm text-gray-600 truncate flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ (c as any).location || 'Localisation inconnue' }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click.stop="removeCompany(c)"
                    class="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      v-if="deletingId !== c.id"
                      class="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 01-.894-.553L6.382 4.276A1 1 0 017.276 3h9.448a1 1 0 01.894.553L18 7"
                      />
                    </svg>
                    <svg
                      v-else
                      class="animate-spin w-5 h-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
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
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire d'édition -->
          <div class="lg:col-span-2">
            <div class="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div>
                  <h2 class="text-base font-bold text-white uppercase tracking-wide">
                    {{ t('companyManagement.companyDetails') }}
                  </h2>
                  <p class="text-xs text-blue-200 mt-1">
                    {{ t('companyManagement.editHint') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-8">
              <div v-if="!selectedCompany" class="text-center py-16">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p class="text-lg font-semibold text-gray-700 mb-2">
                  {{ t('companyManagement.selectCompany') }}
                </p>
                <p class="text-sm text-gray-500">
                  Sélectionnez une entreprise dans la liste pour modifier ses informations
                </p>
              </div>

              <form
                v-else
                @submit.prevent="saveCompany"
                class="space-y-6"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {{ t('companyManagement.companyName') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="editForm.name"
                      type="text"
                      class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#1e3a5f] transition-all duration-200 bg-white font-medium text-gray-900"
                      :placeholder="t('companyManagement.companyName')"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ t('companyManagement.location') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="editForm.location"
                      type="text"
                      class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#1e3a5f] transition-all duration-200 bg-white font-medium text-gray-900"
                      :placeholder="t('companyManagement.locationPlaceholder')"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      {{ t('companyManagement.website') }}
                    </label>
                    <input
                      v-model="editForm.webSiteUrl"
                      type="url"
                      class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#1e3a5f] transition-all duration-200 bg-white font-medium text-gray-900"
                      :placeholder="t('companyManagement.websitePlaceholder')"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    {{ t('companyManagement.description') }}
                  </label>
                  <textarea
                    v-model="editForm.description"
                    rows="5"
                    class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#1e3a5f] transition-all duration-200 bg-white resize-vertical font-medium text-gray-900"
                    :placeholder="t('companyManagement.descriptionPlaceholder')"
                  ></textarea>
                </div>

                <div class="pt-6 border-t-2 border-gray-100 flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    @click="selectedCompany && selectCompany(selectedCompany)"
                    class="px-6 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm font-bold transition-all duration-200 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {{ t('companyManagement.cancel') }}
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white text-sm font-bold shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                  >
                    <svg
                      v-if="saving"
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    <svg v-else class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ saving ? t('companyManagement.saving') : t('companyManagement.save') }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>


