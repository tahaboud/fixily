import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { UsersState } from "./types";

const initialState: UsersState = {
  usersIsLoading: false,
  allUsers: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): UsersState => {
  switch (type) {
    case ActionEnums.USERS_IS_LOADING:
      return { ...state, usersIsLoading: true };

    case ActionEnums.GET_ALL_USERS_SUCCESS:
      return { ...state, usersIsLoading: false, allUsers: payload };
    case ActionEnums.GET_ALL_USERS_FAIL:
      return { ...state, usersIsLoading: false };

    default:
      return state;
  }
};
