import {
  Category,
  Commune,
  SocialUserResponse,
  SubCategory,
  User,
  UserResponse,
  Wilaya,
} from "../../types";
import { ActionEnums } from "./actionEnums";

interface CleanStateAction {
  type: ActionEnums.CLEAN_AUTH_STATE;
  payload: null;
}

interface AuthAction {
  type: ActionEnums.SIGN_IN_SUCCESS | ActionEnums.SIGN_UP_SUCCESS;
  payload: UserResponse;
}

interface SocialAuthAction {
  type: ActionEnums.SOCIAL_LOGIN_SUCCESS;
  payload: SocialUserResponse;
}

interface GetUserAction {
  type: ActionEnums.GET_USER_SUCCESS;
  payload: User;
}

interface OTPAction {
  type: ActionEnums.SEND_OTP_SUCCESS | ActionEnums.VERIFY_OTP_SUCCESS;
  payload: { details: Array<string> };
}

interface ConfirmEmailAction {
  type: ActionEnums.CONFIRM_EMAIL_SUCCESS;
  payload: null;
}

interface ResetPasswordAction {
  type:
    | ActionEnums.REQUEST_RESET_PASSWORD_SUCCESS
    | ActionEnums.RESET_PASSWORD_SUCCESS;
  payload: null;
}

interface ResetPasswordVerifyOTPAction {
  type: ActionEnums.RESET_PASSWORD_OTP_SUCCESS;
  payload: { details: Array<string> };
}

interface AdminGetAllUsersAction {
  type: ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS;
  payload: Array<User>;
}

interface UpdateUserAction {
  type: ActionEnums.UPDATE_USER_SUCCESS;
  payload: User;
}

interface GetSocialStateAction {
  type: ActionEnums.GET_SOCIAL_STATE_SUCCESS;
  payload: {
    id: number;
    state_code: string;
    provider: "google" | "facebook";
  };
}

interface GetCategoriesAction {
  type: ActionEnums.GET_CATEGORIES_SUCCESS;
  payload: Array<Category>;
}

interface GetSubCategoriesAction {
  type: ActionEnums.GET_SUB_CATEGORIES_SUCCESS;
  payload: Array<SubCategory>;
}

interface GetWilayasAction {
  type: ActionEnums.GET_WILAYAS_SUCCESS;
  payload: Array<Wilaya>;
}

interface GetCommunesAction {
  type: ActionEnums.GET_COMMUNES_SUCCESS;
  payload: Array<Commune>;
}

interface DeletePreviousWorkPhotoAction {
  type: ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_SUCCESS;
  payload: null;
}

interface IsLoadingAction {
  type:
    | ActionEnums.AUTH_IS_LOADING
    | ActionEnums.ADMIN_IS_LOADING
    | ActionEnums.SERVICES_IS_LOADING;
  payload: null;
}

interface ErrorAction {
  type:
    | ActionEnums.SIGN_IN_FAIL
    | ActionEnums.SIGN_UP_FAIL
    | ActionEnums.SIGNOUT_SUCCESS
    | ActionEnums.SIGNOUT_FAIL
    | ActionEnums.GET_USER_FAIL
    | ActionEnums.VERIFY_OTP_FAIL
    | ActionEnums.GET_SOCIAL_STATE_FAIL
    | ActionEnums.SOCIAL_LOGIN_FAIL
    | ActionEnums.CONFIRM_EMAIL_FAIL
    | ActionEnums.REQUEST_RESET_PASSWORD_FAIL
    | ActionEnums.RESET_PASSWORD_FAIL
    | ActionEnums.UPDATE_USER_FAIL
    | ActionEnums.SEND_OTP_FAIL
    | ActionEnums.ADMIN_GET_ALL_USERS_FAIL
    | ActionEnums.GET_SUB_CATEGORIES_FAIL
    | ActionEnums.GET_CATEGORIES_FAIL
    | ActionEnums.GET_WILAYAS_FAIL
    | ActionEnums.GET_COMMUNES_FAIL
    | ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_FAIL
    | ActionEnums.RESET_PASSWORD_OTP_FAIL;
  payload: {
    error?: string;
    details?: Array<string>;
  };
}

export type ActionType =
  | AuthAction
  | GetUserAction
  | OTPAction
  | GetSocialStateAction
  | SocialAuthAction
  | ConfirmEmailAction
  | ResetPasswordAction
  | ResetPasswordVerifyOTPAction
  | AdminGetAllUsersAction
  | UpdateUserAction
  | GetCategoriesAction
  | GetSubCategoriesAction
  | GetWilayasAction
  | GetCommunesAction
  | DeletePreviousWorkPhotoAction
  | IsLoadingAction
  | ErrorAction
  | CleanStateAction;
