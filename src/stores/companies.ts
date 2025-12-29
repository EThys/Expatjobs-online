import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCompanyService } from '@/utils/service/CompagnyService';
import type { ICompany, ICompanyCreate } from '@/utils/interface/ICompagny';

export const useCompanyStore = defineStore('companies', () => {
    const companyService = useCompanyService();

    // State
    const myCompanies = ref<ICompany[]>([]);
    const currentCompany = ref<ICompany | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Actions
    const fetchMyCompanies = async (userId: number) => {
        loading.value = true;
        error.value = null;
        try {
            const list = await companyService.getCompaniesByUser(userId);
            myCompanies.value = Array.isArray(list) ? list : (list ? [list] : []);
        } catch (err: any) {
            // Handle 404/204 gracefully
            if (err.response?.status === 404 || err.response?.status === 204) {
                myCompanies.value = [];
            } else {
                error.value = err.message || 'Erreur lors du chargement des entreprises';
                console.error(err);
            }
        } finally {
            loading.value = false;
        }
    };

    const fetchCompanyById = async (id: number) => {
        loading.value = true;
        error.value = null;
        try {
            const company = await companyService.getCompanyById(id);
            currentCompany.value = company;
            return company;
        } catch (err: any) {
            error.value = err.message || 'Erreur récupération entreprise';
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const createCompany = async (companyData: ICompanyCreate) => {
        loading.value = true;
        error.value = null;
        try {
            const newCompany = await companyService.createCompany(companyData);
            myCompanies.value.push(newCompany);
            return newCompany;
        } catch (err: any) {
            error.value = err.message || 'Erreur création entreprise';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateCompany = async (id: number, companyData: Partial<ICompanyCreate>) => {
        loading.value = true;
        error.value = null;
        try {
            const updated = await companyService.updateCompany(id, companyData);

            // Update local state
            const index = myCompanies.value.findIndex(c => c.id === id);
            if (index !== -1) myCompanies.value[index] = updated;

            if (currentCompany.value?.id === id) {
                currentCompany.value = updated;
            }

            return updated;
        } catch (err: any) {
            error.value = err.message || 'Erreur mise à jour entreprise';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteCompany = async (id: number) => {
        loading.value = true;
        error.value = null;
        try {
            await companyService.deleteCompany(id);
            myCompanies.value = myCompanies.value.filter(c => c.id !== id);
            if (currentCompany.value?.id === id) {
                currentCompany.value = null;
            }
        } catch (err: any) {
            error.value = err.message || 'Erreur suppression entreprise';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        myCompanies,
        currentCompany,
        loading,
        error,

        fetchMyCompanies,
        fetchCompanyById,
        createCompany,
        updateCompany,
        deleteCompany
    };
});
