import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AdminState } from "./types";

const initialState: AdminState = {
  adminIsLoading: false,
  allUsers: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): AdminState => {
  switch (type) {
    case ActionEnums.ADMIN_IS_LOADING:
      return { ...state, adminIsLoading: true };

    case ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS:
      return { ...state, adminIsLoading: false, allUsers: payload };
    case ActionEnums.ADMIN_GET_ALL_USERS_FAIL:
      return { ...state, adminIsLoading: false };
    case ActionEnums.ADMIN_UPDATE_USER_SUCCESS:
      return { ...state, adminIsLoading: false };
    case ActionEnums.ADMIN_UPDATE_USER_FAIL:
      return { ...state, adminIsLoading: false };
    case ActionEnums.ADMIN_DELETE_USER_SUCCESS:
      return { ...state, adminIsLoading: false };
    case ActionEnums.ADMIN_DELETE_USER_FAIL:
      return { ...state, adminIsLoading: false };

    default:
      return state;
  }
};
