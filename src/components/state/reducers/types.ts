import { AllUsersData, UserData, UserDetails } from "../../../types";

export interface AuthState {
  userIsLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  data: UserData | null;
  details: UserDetails | null;
}

export interface AdminState {
  adminIsLoading: boolean;
  allUsers: Array<AllUsersData> | null;
}
