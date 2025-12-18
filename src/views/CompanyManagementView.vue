<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// @ts-ignore
import Navbar from '../components/navbar/NavBarComponent.vue';
import { useToast } from 'vue-toast-notification';
import { useCompanyService } from '@/utils/service/CompagnyService';
import type { ICompany } from '@/utils/interface/ICompagny';
import { getUser } from '@/stores/authStorage';
// @ts-ignore
import Footer from '../components/footer/FooterComponent.vue';

const toast = useToast();
const router = useRouter();
const companyService = useCompanyService();

const user = getUser();
const userId = user?.id;

const loading = ref(false);
const saving = ref(false);
const deletingId = ref<number | null>(null);
const companies = ref<ICompany[]>([]);
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
    toast.open({
      message: 'Vous devez être connecté pour voir vos entreprises.',
      type: 'warning',
      position: 'top-right',
    });
    router.push('/login');
    return;
  }

  try {
    loading.value = true;
    const list = await companyService.getCompaniesByUser(userId);
    companies.value = Array.isArray(list) ? list : (list ? [list] : []);
    if (companies.value.length > 0) {
      selectedCompanyId.value = companies.value[0].id;
      const c = companies.value[0] as any;
      editForm.value = {
        name: c.name ?? c.companyName ?? '',
        description: c.description ?? '',
        location: c.location ?? '',
        webSiteUrl: c.webSiteUrl ?? c.websiteUrl ?? ''
      };
    } else {
      selectedCompanyId.value = null;
    }
  } catch (error: any) {
    console.error('❌ Erreur lors du chargement des entreprises:', error);

    const status = error?.response?.status;
    // Si le backend renvoie 404 / 204 ou aucune donnée, on considère simplement qu'il n'y a pas d'entreprise
    if (status === 404 || status === 204) {
      companies.value = [];
      selectedCompanyId.value = null;
    } else {
      toast.open({
        message: 'Impossible de charger vos entreprises. Réessayez plus tard.',
        type: 'error',
        position: 'top-right',
      });
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
    toast.open({
      message: 'Le nom et la localisation sont obligatoires.',
      type: 'warning',
      position: 'top-right',
    });
    return;
  }

  try {
    saving.value = true;
    const payload = {
      name: editForm.value.name.trim(),
      description: editForm.value.description?.trim() || '',
      location: editForm.value.location.trim(),
      webSiteUrl: editForm.value.webSiteUrl?.trim() || ''
    };
    const updated = await companyService.updateCompany(selectedCompany.value.id, payload);
    companies.value = companies.value.map(c =>
      c.id === updated.id ? updated : c
    );
    toast.open({
      message: 'Entreprise mise à jour avec succès.',
      type: 'success',
      position: 'top-right',
    });
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de l\'entreprise:', error);
    toast.open({
      message: 'Erreur lors de la mise à jour de l\'entreprise.',
      type: 'error',
      position: 'top-right',
    });
  } finally {
    saving.value = false;
  }
};

const removeCompany = async (company: ICompany) => {
  if (!confirm(`Supprimer définitivement l'entreprise "${(company as any).name ?? (company as any).companyName}" ?`)) {
    return;
  }
  try {
    deletingId.value = company.id;
    await companyService.deleteCompany(company.id);
    companies.value = companies.value.filter(c => c.id !== company.id);
    if (selectedCompanyId.value === company.id) {
      selectedCompanyId.value = companies.value[0]?.id ?? null;
      if (companies.value[0]) {
        selectCompany(companies.value[0]);
      }
    }
    toast.open({
      message: 'Entreprise supprimée avec succès.',
      type: 'success',
      position: 'top-right',
    });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'entreprise:', error);
    toast.open({
      message: 'Erreur lors de la suppression de l\'entreprise.',
      type: 'error',
      position: 'top-right',
    });
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

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/40 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Mes <span class="text-emerald-600">entreprises</span>
          </h1>
          <p class="mt-2 text-gray-600 text-sm md:text-base">
            Gérez les entreprises associées à votre compte pour publier et gérer vos offres d'emploi.
          </p>
        </div>
        <button
          type="button"
          @click="goToCreateCompany"
          class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer une entreprise
        </button>
      </div>

      <!-- Contenu principal -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <!-- Liste des entreprises -->
          <div class="border-b lg:border-b-0 lg:border-r border-gray-100">
            <div class="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Mes entreprises
              </h2>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
              >
                {{ companies.length }} enregistrée(s)
              </span>
            </div>

            <div class="p-4 lg:max-h-[420px] lg:overflow-y-auto">
              <div v-if="loading" class="flex items-center justify-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>

              <div v-else-if="!hasCompany" class="text-center text-gray-500 text-sm py-8 px-4">
                <p class="mb-2 font-medium text-gray-700">
                  Aucune entreprise créée pour le moment.
                </p>
                <p class="text-xs">
                  Cliquez sur <span class="font-semibold text-emerald-600">"Créer une entreprise"</span> pour commencer.
                </p>
              </div>

              <div v-else class="space-y-2">
                <button
                  v-for="c in companies"
                  :key="c.id"
                  type="button"
                  @click="selectCompany(c)"
                  class="w-full text-left px-3 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3"
                  :class="selectedCompanyId === c.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/40'"
                >
                  <div
                    class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow"
                    :class="selectedCompanyId === c.id ? 'bg-emerald-500' : 'bg-emerald-400'"
                  >
                    {{ ((c as any).name ?? (c as any).companyName ?? 'E')[0] }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 truncate">
                      {{ (c as any).name ?? (c as any).companyName }}
                    </p>
                    <p class="text-xs text-gray-500 truncate">
                      {{ (c as any).location || 'Localisation inconnue' }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click.stop="removeCompany(c)"
                    class="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      v-if="deletingId !== c.id"
                      class="w-4 h-4"
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
                      class="animate-spin w-4 h-4 text-red-500"
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
                </button>
              </div>
            </div>
          </div>

          <!-- Formulaire d'édition -->
          <div class="lg:col-span-2">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  Détails de l'entreprise
                </h2>
                <p class="text-xs text-gray-500 mt-1">
                  Modifiez les informations de votre entreprise.
                </p>
              </div>
            </div>

            <div class="p-6">
              <div v-if="!selectedCompany">
                <p class="text-sm text-gray-500">
                  Sélectionnez une entreprise dans la colonne de gauche pour voir et modifier ses détails.
                </p>
              </div>

              <form
                v-else
                @submit.prevent="saveCompany"
                class="space-y-6"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.name"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Nom de l'entreprise"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Localisation <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="editForm.location"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Ex: Kinshasa, RDC"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Site web
                    </label>
                    <input
                      v-model="editForm.webSiteUrl"
                      type="url"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      placeholder="https://votre-entreprise.com"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    v-model="editForm.description"
                    rows="5"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white resize-vertical"
                    placeholder="Décrivez brièvement votre entreprise..."
                  ></textarea>
                </div>

                <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    @click="selectedCompany && selectCompany(selectedCompany)"
                    class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Annuler les modifications
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <svg
                      v-if="saving"
                      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    <span>{{ saving ? 'Enregistrement...' : 'Enregistrer les modifications' }}</span>
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


