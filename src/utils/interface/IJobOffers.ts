export interface IJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  sector: string;
  createdAt: string;
}

import type { ICompany } from "./ICompagny";

export interface IJobOffers {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: string;
  experienceLevel: string;
  status: string;
  sector: string;
  createdAt: string;
  // Ajouter ces propriétés pour l'interface
  company?: ICompany;
  skills?: ISkillCreate[];
}

export interface IJobCreate {
  companyId: number;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  sector: string;
}

export interface IJobResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: IJob[];
  number: number;
  sort: Sort[];
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ISkill {
  id: number;
  skillName: string;
  jobOfferId: number;
  experienceYear: number;
}

export interface ISkillCreate {
  skillName: string;
  jobOfferId: number;
  experienceYear: number;
}

export interface ISkillResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ISkill[];
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

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
  INTERNSHIP = "INTERNSHIP"
}

export enum ExperienceLevel {
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
  EXPERT = "EXPERT"
}

export enum JobStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CLOSED = "CLOSED",
  ARCHIVED = "ARCHIVED"
}