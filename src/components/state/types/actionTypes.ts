import { UserData } from "../../../types";
import { ActionEnums } from "./actionEnums";

interface AuthAction {
  type: ActionEnums.SIGN_IN_SUCCESS | ActionEnums.SIGN_UP_SUCCESS;
  payload: UserData;
}

interface IsLoadingAction {
  type: ActionEnums.AUTH_IS_LOADING;
  payload: null;
}

interface ErrorAction {
  type: ActionEnums.SIGN_IN_FAIL | ActionEnums.SIGN_UP_FAIL;
  payload: {
    error: string;
  };
}

export type ActionType = AuthAction | IsLoadingAction | ErrorAction;
