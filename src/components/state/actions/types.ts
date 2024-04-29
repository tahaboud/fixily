export interface LoginActionParams {
  email: string;
  password: string;
  provider: "email" | "google" | "facebook";
}
export interface SignupActionParams {
  email: string;
  password: string;
}

export interface UpdateAdminPrivilegesParams {
  isAdmin: boolean;
}

export interface UpdateUserDataParams {
  uid: string;
  disabled?: boolean;
  isVerified?: boolean;
}
