export interface ICompany {
  id: number;
  userId: number;
  name: string;
  description: string;
  location: string;
  webSiteUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompanyCreate {
  userId: number;
  name: string;
  description: string;
  location: string;
  webSiteUrl: string;
}

export interface ICompanyResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ICompany[];
  number: number;
  sort: Sort[];
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort[];
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}