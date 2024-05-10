import validator from "validator";
import {
  ClientLoginValidationErrors,
  ValidateClientLoginParams,
} from "./types";

export const validateClientLogin = ({
  email,
  password,
}: ValidateClientLoginParams) => {
  let isValid = true;
  const validationErrors: ClientLoginValidationErrors = {};
  if (!validator.isEmail(email)) {
    isValid = false;
    validationErrors.email = "invalid_email";
  }
  if (validator.isEmpty(password)) {
    isValid = false;
    validationErrors.password = "empty_field";
  }
  return { isValid, validationErrors };
};
