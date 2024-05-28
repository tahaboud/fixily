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
}
export interface AdminUpdateUserActionParams {
  token: string;
  userId: number;
  points?: string;
  isIDVerified?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
}
export interface AdminDeleteUserActionParams {
  token: string;
  userId: number;
}
