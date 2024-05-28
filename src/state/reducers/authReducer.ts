import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AuthState } from "./types";

const initialState: AuthState = {
  userIsLoading: false,
  isAuthenticated: false,
  token: null,
  data: null,
  details: null,
  errors: null,
  userDataFetchedFromToken: false,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): AuthState => {
  switch (type) {
    case ActionEnums.AUTH_IS_LOADING:
      return { ...state, userIsLoading: true };

    case ActionEnums.CLEAN_AUTH_STATE:
      return { ...state, userIsLoading: false, details: null };

    case ActionEnums.SIGN_IN_SUCCESS:
    case ActionEnums.SIGN_UP_SUCCESS:
    case ActionEnums.SOCIAL_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userIsLoading: false,
        isAuthenticated: true,
        token: payload.token,
        data: payload.user,
        errors: null,
      };

    case ActionEnums.GET_USER_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        data: payload,
        errors: null,
        userIsLoading: false,
        userDataFetchedFromToken: true,
      };
    case ActionEnums.UPDATE_USER_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        data: payload,
        errors: null,
        details: { details: "user updated successfully" },
        userIsLoading: false,
      };
    case ActionEnums.GET_SOCIAL_STATE_SUCCESS:
      return {
        ...state,
        details: payload,
        errors: null,
        userIsLoading: false,
      };
    case ActionEnums.SEND_OTP_SUCCESS:
    case ActionEnums.VERIFY_OTP_SUCCESS:
    case ActionEnums.CONFIRM_EMAIL_SUCCESS:
    case ActionEnums.REQUEST_RESET_PASSWORD_SUCCESS:
    case ActionEnums.RESET_PASSWORD_SUCCESS:
    case ActionEnums.RESET_PASSWORD_OTP_SUCCESS:
    case ActionEnums.SOCIAL_LOGIN_FAIL:
    case ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_SUCCESS:
      return {
        ...state,
        errors: null,
        details: payload,
        userIsLoading: false,
      };

    case ActionEnums.SIGN_IN_FAIL:
    case ActionEnums.SIGN_UP_FAIL:
    case ActionEnums.UPDATE_USER_FAIL:
    case ActionEnums.RESET_PASSWORD_FAIL:
    case ActionEnums.RESET_PASSWORD_OTP_FAIL:
    case ActionEnums.REQUEST_RESET_PASSWORD_FAIL:
    case ActionEnums.GET_SOCIAL_STATE_FAIL:
    case ActionEnums.SEND_OTP_FAIL:
    case ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_FAIL:
    case ActionEnums.VERIFY_OTP_FAIL:
      return {
        ...state,
        errors: payload,
        details: null,
        userIsLoading: false,
      };
    case ActionEnums.SIGNOUT_SUCCESS:
    case ActionEnums.SIGNOUT_FAIL:
    case ActionEnums.GET_USER_FAIL:
      localStorage.removeItem("token");
      return { ...initialState, userDataFetchedFromToken: true };

    default:
      return state;
  }
};
