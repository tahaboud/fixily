import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AuthState } from "./types";

const initialState: AuthState = {
  userIsLoading: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  data: null,
  details: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): AuthState => {
  switch (type) {
    case ActionEnums.AUTH_IS_LOADING:
      return { ...state, userIsLoading: true };

    case ActionEnums.SIGN_IN_SUCCESS:
    case ActionEnums.SIGN_UP_SUCCESS:
    case ActionEnums.GET_USER_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        isAuthenticated: true,
        accessToken: payload.stsTokenManager.accessToken,
        refreshToken: payload.stsTokenManager.refreshToken,
        data: payload,
      };

    case ActionEnums.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        details: payload,
      };
    case ActionEnums.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        details: null,
      };

    case ActionEnums.SIGN_IN_FAIL:
    case ActionEnums.SIGN_UP_FAIL:
    case ActionEnums.SIGNOUT_SUCCESS:
    case ActionEnums.SIGNOUT_FAIL:
    case ActionEnums.GET_USER_FAIL:
      return initialState;

    default:
      return state;
  }
};
