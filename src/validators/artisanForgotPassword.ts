import validator from "validator";
import {
  ArtisanForgotPasswordOTPValidationErrors,
  ArtisanForgotPasswordResetPasswordValidationErrors,
  ArtisanForgotPasswordValidationErrors,
  ValidateArtisanForgotPasswordOTPParams,
  ValidateArtisanForgotPasswordParams,
  ValidateArtisanForgotPasswordResetPasswordParams,
} from "./types";

export const validateArtisanForgetPassword = ({
  phoneNumber,
}: ValidateArtisanForgotPasswordParams) => {
  let isValid = true;
  const validationErrors: ArtisanForgotPasswordValidationErrors = {};

  if (!validator.isMobilePhone(phoneNumber, "ar-DZ")) {
    isValid = false;
    validationErrors.phoneNumber = "invalid_phone_number";
  }
  return { isValid, validationErrors };
};

export const validateArtisanForgetPasswordOTP = ({
  otp,
}: ValidateArtisanForgotPasswordOTPParams) => {
  let isValid = true;
  const validationErrors: ArtisanForgotPasswordOTPValidationErrors = {};

  if (validator.isEmpty(otp)) {
    isValid = false;
    validationErrors.otp = "invalid_otp";
  }
  return { isValid, validationErrors };
};

export const validateArtisanForgetPasswordResetPassword = ({
  password,
  rePassword,
}: ValidateArtisanForgotPasswordResetPasswordParams) => {
  let isValid = true;
  const validationErrors: ArtisanForgotPasswordResetPasswordValidationErrors =
    {};
  if (validator.isEmpty(password)) {
    isValid = false;
    validationErrors.password = "empty_field";
  }
  if (password.length < 9) {
    isValid = false;
    validationErrors.password = "password_less_than_9";
  }
  if (!validator.equals(password, rePassword)) {
    isValid = false;
    validationErrors.password = "unmatched_passwords";
    validationErrors.rePassword = "unmatched_passwords";
  }
  return { isValid, validationErrors };
};
