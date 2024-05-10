import validator from "validator";
import {
  ArtisanConfirmOTPValidationErrors,
  ArtisanSignUpPhoneNumberValidationErrors,
  ArtisanSignUpValidationErrors,
  ValidateArtisanConfirmOTPParams,
  ValidateArtisanPhoneNumberSignUpParams,
  ValidateArtisanSignUpParams,
} from "./types";

export const validateArtisanSignUp = ({
  password,
  email,
  firstName,
  lastName,
  rePassword,
  businessRegisterNumber,
}: ValidateArtisanSignUpParams) => {
  let isValid = true;
  const validationErrors: ArtisanSignUpValidationErrors = {};

  if (validator.isEmpty(password)) {
    isValid = false;
    validationErrors.password = "empty_field";
  }
  if (password.length < 9) {
    isValid = false;
    validationErrors.password = "password_less_than_9";
  }
  if (validator.isEmpty(firstName)) {
    isValid = false;
    validationErrors.firstName = "empty_field";
  }
  if (validator.isEmpty(lastName)) {
    isValid = false;
    validationErrors.lastName = "empty_field";
  }
  if (
    businessRegisterNumber !== undefined &&
    validator.isEmpty(businessRegisterNumber)
  ) {
    isValid = false;
    validationErrors.businessRegisterNumber = "empty_field";
  }
  if (!validator.equals(password, rePassword)) {
    isValid = false;
    validationErrors.password = "unmatched_passwords";
    validationErrors.rePassword = "unmatched_passwords";
  }
  if (!validator.isEmail(email)) {
    isValid = false;
    validationErrors.email = "invalid_email";
  }
  return { isValid, validationErrors };
};

export const validateArtisanConfirmOTP = ({
  otp,
}: ValidateArtisanConfirmOTPParams) => {
  let isValid = true;
  const validationErrors: ArtisanConfirmOTPValidationErrors = {};

  if (validator.isEmpty(otp)) {
    isValid = false;
    validationErrors.otp = "invalid_otp";
  }

  return { isValid, validationErrors };
};
export const validateArtisanPhoneNumberSignup = ({
  phoneNumber,
}: ValidateArtisanPhoneNumberSignUpParams) => {
  let isValid = true;
  const validationErrors: ArtisanSignUpPhoneNumberValidationErrors = {};

  if (!validator.isMobilePhone(phoneNumber, "ar-DZ")) {
    isValid = false;
    validationErrors.phoneNumber = "invalid_phone_number";
  }

  return { isValid, validationErrors };
};
