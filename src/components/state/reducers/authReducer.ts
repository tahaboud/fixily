import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AuthState } from "./types";

const initialState: AuthState = {
  userIsLoading: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  data: null,
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
      localStorage.setItem("accessToken", payload.stsTokenManager.accessToken);
      localStorage.setItem(
        "refreshToken",
        payload.stsTokenManager.refreshToken
      );
      return {
        ...state,
        userIsLoading: false,
        isAuthenticated: true,
        accessToken: payload.stsTokenManager.accessToken,
        refreshToken: payload.stsTokenManager.refreshToken,
        data: payload,
      };

    case ActionEnums.SIGN_IN_FAIL:
    case ActionEnums.SIGN_UP_FAIL:
      localStorage.clear();
      return initialState;

    default:
      return state;
  }
};
