import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AuthState } from "./types";

const initialState: AuthState = {
  userIsLoading: false,
  isAuthenticated: false,
  isArtisan: false,
  token: null,
  data: null,
  detail: null,
  errors: null,
  userDataFetchedFromToken: false,
  notifications: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): AuthState => {
  switch (type) {
    case ActionEnums.AUTH_IS_LOADING:
      return { ...state, userIsLoading: true };

    case ActionEnums.CLEAN_AUTH_STATE:
      return { ...state, userIsLoading: false, detail: null };
    case ActionEnums.SWITCH_TO_CLIENT:
      return { ...state, userIsLoading: false, isArtisan: !state.isArtisan };

    case ActionEnums.SIGN_IN_SUCCESS:
    case ActionEnums.SIGN_UP_SUCCESS:
    case ActionEnums.SOCIAL_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userIsLoading: false,
        isAuthenticated: true,
        userDataFetchedFromToken: true,
        token: payload.token,
        data: payload.user,
        isArtisan: payload.user.is_artisan,
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
        isArtisan: payload.is_artisan,
      };
    case ActionEnums.UPDATE_USER_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        data: payload,
        errors: null,
        detail: { detail: "user updated successfully" },
        userIsLoading: false,
      };
    case ActionEnums.GET_SOCIAL_STATE_SUCCESS:
      return {
        ...state,
        detail: payload,
        errors: null,
        userIsLoading: false,
      };
    case ActionEnums.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        notifications: payload,
      };
    case ActionEnums.SEND_OTP_SUCCESS:
    case ActionEnums.VERIFY_OTP_SUCCESS:
    case ActionEnums.MARK_NOTIFICATIONS_AS_READ_SUCCESS:
    case ActionEnums.CONFIRM_EMAIL_SUCCESS:
    case ActionEnums.REQUEST_RESET_PASSWORD_SUCCESS:
    case ActionEnums.RESET_PASSWORD_SUCCESS:
    case ActionEnums.RESET_PASSWORD_OTP_SUCCESS:
    case ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_SUCCESS:
      return {
        ...state,
        errors: null,
        detail: payload,
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
    case ActionEnums.MARK_NOTIFICATIONS_AS_READ_FAIL:
    case ActionEnums.GET_NOTIFICATIONS_FAIL:
    case ActionEnums.SOCIAL_LOGIN_FAIL:
      return {
        ...state,
        errors: payload,
        detail: null,
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
