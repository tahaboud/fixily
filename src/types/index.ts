export interface User {
  is_active: boolean;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  is_artisan: boolean;
  points: number;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_id_verified: boolean;
  auth_provider: "facebook" | "email" | "google";
  is_admin: boolean;
  is_superuser: boolean;
  commercial_register_number: string | null;
  front_id_image: string | null;
  back_id_image: string | null;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface SocialUserResponse {
  user: User;
  token: string;
  is_new_user: boolean;
}
