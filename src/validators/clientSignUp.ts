import validator from "validator";
import {
  ClientSignUpValidationErrors,
  ValidateClientSignUpParams,
} from "./types";

export const validateClientSignUp = ({
  password,
  email,
  firstName,
  lastName,
  rePassword,
}: ValidateClientSignUpParams) => {
  let isValid = true;
  const validationErrors: ClientSignUpValidationErrors = {};

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
