import { Availability } from "../state/actions/types";

export interface Wilaya {
  id: string;
  name_ar: string;
  name_en: string;
}

export interface Commune {
  id: string;
  name_ar: string;
  name_en: string;
}

export interface PreviousWorkPhoto {
  id: string;
  image: string;
}

export interface User {
  is_active: boolean;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  is_artisan: boolean;
  points: number;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  id_status: "verified" | "stale" | "rejected" | "review_asked";
  auth_provider: "facebook" | "email" | "google";
  is_admin: boolean;
  is_superuser: boolean;
  commercial_register_number: string | null;
  front_id_image: string | null;
  back_id_image: string | null;
  categories: Array<Category>;
  sub_categories: Array<SubCategory>;
  wilaya: Wilaya | null;
  commune: Commune | null;
  picture: string | null;
  years_of_experience: number;
  bio: string | null;
  is_on_holiday_mode: boolean;
  previous_work_photos: Array<PreviousWorkPhoto>;
  created_at: string;
  availability: Array<Availability>;
  review: string;
  last_online: string;
  language: "fr" | "ar";
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
  id: string;
  name_ar: string;
  name_en: string;
  image: string;
}

export interface SubCategory {
  id: string;
  name_ar: string;
  name_en: string;
  point_cost: number;
  category: number;
}

export interface JobUser {
  id: string;
  first_name: string;
  last_name: string;
  picture: string | null;
  id_status: "stale" | "verified" | "rejected";
  commune: Commune;
  wilaya: Wilaya;
  email: string | null;
  phone_number: string | null;
  created_at: string;
  review: number;
}

interface JobImage {
  id: string;
  image: string;
  job: string;
}

interface JobReview {
  id: string;
  client: string;
  artisan: string;
  job: string;
  review: number;
  description: string;
}

export interface Job {
  id: string;
  client: JobUser;
  artisan: JobUser | null;
  description: string;
  wilaya: Wilaya;
  commune: Commune;
  sub_category: SubCategory;
  is_done: boolean;
  images: Array<JobImage>;
  rooms_count: number;
  review: JobReview | null;
  created_at: string;
  done_at: string | null;
}

export interface PreviousJob {
  id: string;
  client: JobUser;
  sub_category: SubCategory;
  review: {
    id: string;
    review: number;
    description: string;
  } | null;
}

export interface ChatRoom {
  id: string;
  client: JobUser;
  artisan: JobUser;
  job: string;
  sub_category: SubCategory;
  latest_message: {
    text: string | null;
    image: string | null;
  };
  num_of_unread_messages: number;
}

export interface Notification {
  id: string;
  notification_type:
    | "new_job_added"
    | "new_job_request"
    | "job_request_approved"
    | "job_request_rejected";
  notification_object_id: string;
  seen: boolean;
}

export interface ErrorResponse {
  attr: string | null;
  code: string;
  detail: string;
}
