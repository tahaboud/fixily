import validator from "validator";
import {
  ArtisanLoginValidationErrors,
  ValidateArtisanLoginParams,
} from "./types";

export const validateArtisanLogin = ({
  phoneNumber,
  password,
}: ValidateArtisanLoginParams) => {
  let isValid = true;
  const validationErrors: ArtisanLoginValidationErrors = {};

  if (!validator.isMobilePhone(phoneNumber, "ar-DZ")) {
    isValid = false;
    validationErrors.phoneNumber = "invalid_phone_number";
  }
  if (validator.isEmpty(password)) {
    isValid = false;
    validationErrors.password = "empty_field";
  }
  return { isValid, validationErrors };
};
