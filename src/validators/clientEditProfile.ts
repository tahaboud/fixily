import validator from "validator";
import {
  ClientEditProfileValidationErrors,
  ValidateClientEditProfileParams,
} from "./types";

export const validateClientEditProfile = ({
  firstName,
  lastName,
  email,
  bio,
}: ValidateClientEditProfileParams) => {
  let isValid = true;
  const validationErrors: ClientEditProfileValidationErrors = {};

  if (firstName !== undefined && validator.isEmpty(firstName)) {
    isValid = false;
    validationErrors.firstName = "empty_field";
  }
  if (lastName !== undefined && validator.isEmpty(lastName)) {
    isValid = false;
    validationErrors.lastName = "empty_field";
  }
  if (!validator.isEmail(email)) {
    isValid = false;
    validationErrors.email = "invalid_email";
  }
  if (validator.isEmpty(bio)) {
    isValid = false;
    validationErrors.bio = "empty_field";
  }
  return { isValid, validationErrors };
};
