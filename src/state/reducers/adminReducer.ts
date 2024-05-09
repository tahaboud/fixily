import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AdminState } from "./types";

const initialState: AdminState = {
  adminIsLoading: false,
  data: null,
  details: null,
  errors: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): AdminState => {
  switch (type) {
    case ActionEnums.ADMIN_IS_LOADING:
      return { ...state, adminIsLoading: true };

    case ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        adminIsLoading: false,
        data: payload,
        errors: null,
      };

    default:
      return state;
  }
};
