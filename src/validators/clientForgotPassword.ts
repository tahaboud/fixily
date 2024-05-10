import validator from "validator";
import {
  ClientForgotPasswordOTPValidationErrors,
  ClientForgotPasswordResetPasswordValidationErrors,
  ClientForgotPasswordValidationErrors,
  ValidateClientForgotPasswordOTPParams,
  ValidateClientForgotPasswordParams,
  ValidateClientForgotPasswordResetPasswordParams,
} from "./types";

export const validateClientForgetPassword = ({
  email,
}: ValidateClientForgotPasswordParams) => {
  let isValid = true;
  const validationErrors: ClientForgotPasswordValidationErrors = {};

  if (!validator.isEmail(email)) {
    isValid = false;
    validationErrors.email = "invalid_email";
  }
  return { isValid, validationErrors };
};

export const validateClientForgetPasswordOTP = ({
  otp,
}: ValidateClientForgotPasswordOTPParams) => {
  let isValid = true;
  const validationErrors: ClientForgotPasswordOTPValidationErrors = {};

  if (validator.isEmpty(otp)) {
    isValid = false;
    validationErrors.otp = "invalid_otp";
  }
  return { isValid, validationErrors };
};

export const validateClientForgetPasswordResetPassword = ({
  password,
  rePassword,
}: ValidateClientForgotPasswordResetPasswordParams) => {
  let isValid = true;
  const validationErrors: ClientForgotPasswordResetPasswordValidationErrors =
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
