export interface Wilaya {
  pk: string;
  name_ar: string;
  name_en: string;
}

export interface Commune {
  pk: string;
  name_ar: string;
  name_en: string;
}

export interface PreviousWorkPhoto {
  pk: string;
  image: string;
}

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
  categories: Array<string> | null;
  sub_categories: Array<string> | null;
  wilaya: Wilaya | null;
  commune: Commune | null;
  picture: string | null;
  years_of_experience: number;
  bio: string | null;
  is_on_holiday_mode: boolean;
  previous_work_photos: Array<PreviousWorkPhoto>;
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

export interface Category {
  pk: string;
  name_ar: string;
  name_en: string;
  image: string;
}

export interface SubCategory {
  pk: string;
  name_ar: string;
  name_en: string;
  point_cost: number;
  category: number;
}
