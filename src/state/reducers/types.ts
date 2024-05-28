import { Category, Commune, SubCategory, User, Wilaya } from "../../types";

interface Details {
  state_code?: string;
  details?: Array<string> | string;
}
interface Errors {
  details?: Array<string> | string;
  error?: string;
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
}

export interface AuthState {
  userIsLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  data: User | null;
  details: Details | null;
  errors: Errors | null;
  userDataFetchedFromToken: boolean;
}

export interface AdminState {
  adminIsLoading: boolean;
  data: Array<User> | null;
  details: Details | null;
  errors: Errors | null;
}

export interface ServicesState {
  servicesIsLoading: boolean;
  categories: Array<Category> | null;
  subCategories: Array<SubCategory> | null;
  wilayas: Array<Wilaya> | null;
  communes: Array<Commune> | null;
  errors: Errors | null;
}
