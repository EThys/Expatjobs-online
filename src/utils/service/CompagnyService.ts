import { useAxiosRequestWithToken } from './axios_api';
import { ApiRoutes } from './endpoints/api';
import type { ICompany, ICompanyCreate, ICompanyResponse } from '@/utils/interface/ICompagny';
import { getToken } from '@/stores/token';

export const useCompanyService = () => {
  const token = getToken() as string;

  const createCompany = async (companyData: ICompanyCreate): Promise<ICompany> => {
    try {
      const response = await useAxiosRequestWithToken(token).post(
        `${ApiRoutes.addCompagny}`,
        companyData
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'entreprise:', error);
      throw error;
    }
  };

  const getCompaniesByUser = async (userId: number): Promise<ICompany[]> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getAllCompagny}/by-user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des entreprises de l'utilisateur ${userId}:`, error);
      throw error;
    }
  };

  const getAllCompanies = async (
    page: number = 0,
    size: number = 50,
    sort: string = 'name,asc'
  ): Promise<ICompanyResponse> => {
    try {
      const response = await useAxiosRequestWithToken().get(
        `${ApiRoutes.getAllCompagny}`,
        {
          params: {
            page,
            size,
            sort
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des entreprises:', error);
      throw error;
    }
  };

  const getCompanyById = async (id: number): Promise<ICompany> => {
    try {
      const response = await useAxiosRequestWithToken(token).get(
        `${ApiRoutes.getAllCompagny}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de l'entreprise ${id}:`, error);
      throw error;
    }
  };

  const updateCompany = async (id: number, companyData: Partial<ICompanyCreate>): Promise<ICompany> => {
    try {
      const response = await useAxiosRequestWithToken(token).put(
        `${ApiRoutes.getAllCompagny}/${id}`,
        companyData
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'entreprise ${id}:`, error);
      throw error;
    }
  };

  return {
    createCompany,
    getCompaniesByUser,
    getAllCompanies,
    getCompanyById,
    updateCompany
  };
};