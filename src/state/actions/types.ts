export interface ClientLoginActionParams {
  email: string;
  password: string;
}
export interface ArtisanLoginActionParams {
  phoneNumber: string;
  password: string;
}
export interface RegisterClientActionParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface RegisterArtisanActionParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  code: string;
}
export interface SocialLoginActionParams {
  stateCode: string;
  code: string;
}
export interface ResetPasswordActionParams {
  email?: string;
  phoneNumber?: string;
  otp: string;
  password: string;
}
export interface ConfirmEmailActionParams {
  email: string;
  code: string;
}

export interface Availability {
  day:
    | "saturday"
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";
  from_time: string | null;
  to_time: string | null;
  is_holiday: boolean;
}

export interface UpdateUserActionParams {
  token: string;
  firstName?: string;
  lastName?: string;
  frontIDImage?: File;
  backIDImage?: File;
  categories?: Array<string>;
  subCategories?: Array<string>;
  wilaya?: string;
  commune?: string;
  picture?: File | null;
  previousWorkPhotos?: FileList;
  bio?: string;
  setUploadProgress?: React.Dispatch<React.SetStateAction<number>>;
  setUploading?: React.Dispatch<React.SetStateAction<boolean>>;
  availability?: Array<Availability>;
  isOnHolidayMode?: boolean;
  email?: string;
}
export interface AdminUpdateUserActionParams {
  token: string;
  userId: string;
  points?: number;
  isIDVerified?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
}

export interface AdminDeleteUserActionParams {
  token: string;
  userId: number;
}

export interface AdminUpdateCategoryActionParams {
  token: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  image?: File;
}

export interface AdminDeleteCategoryActionParams {
  token: string;
  categoryId: string;
}

export interface AdminCreateCategoryActionParams {
  token: string;
  nameAr: string;
  nameEn: string;
  image: File;
}

export interface AdminUpdateSubCategoryActionParams {
  token: string;
  subCategoryId: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  points: number;
}

export interface AdminDeleteSubCategoryActionParams {
  token: string;
  subCategoryId: string;
  categoryId: string;
}

export interface AdminCreateSubCategoryActionParams {
  token: string;
  nameAr: string;
  nameEn: string;
  categoryId: string;
  points: number;
}

export interface AdminCreateAdminActionParams {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateJobParams {
  token: string;
  description: string;
  wilaya: string;
  commune: string;
  subCategory: string;
  images: Array<File> | null;
}
