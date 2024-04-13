import { UserData } from "../../../types";

export interface AuthState {
  userIsLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  data: UserData | null;
}
