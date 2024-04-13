export interface LoginActionParams {
  email: string;
  password: string;
  provider: "email" | "google" | "facebook";
}
export interface SignupActionParams {
  email: string;
  password: string;
}
