import { AllUsersData, UserData, UserDetails } from "../../../types";
import { ActionEnums } from "./actionEnums";

interface AuthAction {
  type:
    | ActionEnums.SIGN_IN_SUCCESS
    | ActionEnums.SIGN_UP_SUCCESS
    | ActionEnums.GET_USER_SUCCESS;
  payload: UserData;
}

interface GetUserDetailsAction {
  type: ActionEnums.GET_USER_DETAILS_SUCCESS;
  payload: UserDetails;
}

interface AdminGetAllUsersAction {
  type: ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS;
  payload: Array<AllUsersData>;
}

interface AdminUpdateUserAction {
  type:
    | ActionEnums.ADMIN_UPDATE_USER_SUCCESS
    | ActionEnums.ADMIN_DELETE_USER_SUCCESS;
  payload: null;
}

interface IsLoadingAction {
  type: ActionEnums.AUTH_IS_LOADING | ActionEnums.ADMIN_IS_LOADING;
  payload: null;
}

interface ErrorAction {
  type:
    | ActionEnums.SIGN_IN_FAIL
    | ActionEnums.SIGN_UP_FAIL
    | ActionEnums.SIGNOUT_FAIL
    | ActionEnums.SIGNOUT_SUCCESS
    | ActionEnums.GET_USER_FAIL
    | ActionEnums.GET_USER_DETAILS_FAIL
    | ActionEnums.ADMIN_GET_ALL_USERS_FAIL
    | ActionEnums.ADMIN_UPDATE_USER_FAIL
    | ActionEnums.ADMIN_DELETE_USER_FAIL;
  payload: {
    error: string;
  };
}

export type ActionType =
  | AuthAction
  | GetUserDetailsAction
  | AdminGetAllUsersAction
  | AdminUpdateUserAction
  | IsLoadingAction
  | ErrorAction;
