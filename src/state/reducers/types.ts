import { User } from "../../types";

interface Details {
  state_code?: string;
  details?: Array<string>;
}
interface Errors {
  details?: Array<string>;
  error?: string;
}

export interface AuthState {
  userIsLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  data: User | null;
  details: Details | null;
  errors: Errors | null;
}

export interface AdminState {
  adminIsLoading: boolean;
  data: Array<User> | null;
  details: Details | null;
  errors: Errors | null;
}
