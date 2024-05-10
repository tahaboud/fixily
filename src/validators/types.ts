export interface ValidateClientLoginParams {
  email: string;
  password: string;
}
export interface ClientLoginValidationErrors {
  email?: string;
  password?: string;
}
export interface ValidateArtisanLoginParams {
  phoneNumber: string;
  password: string;
}
export interface ArtisanLoginValidationErrors {
  phoneNumber?: string;
  password?: string;
}
export interface ValidateArtisanSignUpParams {
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  businessRegisterNumber?: string;
  email: string;
}
export interface ValidateClientForgotPasswordParams {
  email: string;
}
export interface ValidateClientForgotPasswordOTPParams {
  otp: string;
}
export interface ValidateClientForgotPasswordResetPasswordParams {
  password: string;
  rePassword: string;
}
export interface ValidateArtisanForgotPasswordParams {
  phoneNumber: string;
}
export interface ValidateArtisanForgotPasswordOTPParams {
  otp: string;
}
export interface ValidateArtisanForgotPasswordResetPasswordParams {
  password: string;
  rePassword: string;
}
export interface ValidateArtisanPhoneNumberSignUpParams {
  phoneNumber: string;
}
export interface ValidateClientSignUpParams {
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface ArtisanSignUpValidationErrors {
  password?: string;
  rePassword?: string;
  firstName?: string;
  lastName?: string;
  businessRegisterNumber?: string;
  email?: string;
}
export interface ClientForgotPasswordValidationErrors {
  email?: string;
}
export interface ClientForgotPasswordOTPValidationErrors {
  otp?: string;
}
export interface ClientForgotPasswordResetPasswordValidationErrors {
  password?: string;
  rePassword?: string;
}
export interface ArtisanForgotPasswordValidationErrors {
  phoneNumber?: string;
}
export interface ArtisanForgotPasswordOTPValidationErrors {
  otp?: string;
}
export interface ArtisanForgotPasswordResetPasswordValidationErrors {
  password?: string;
  rePassword?: string;
}
export interface ArtisanSignUpPhoneNumberValidationErrors {
  phoneNumber?: string;
}
export interface ClientSignUpValidationErrors {
  password?: string;
  rePassword?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface ValidateArtisanConfirmOTPParams {
  otp: string;
}
export interface ArtisanConfirmOTPValidationErrors {
  otp?: string;
}
