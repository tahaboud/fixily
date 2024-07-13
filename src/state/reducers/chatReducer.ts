import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { ChatState } from "./types";

const initialState: ChatState = {
  chatIsLoading: false,
  rooms: null,
  errors: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): ChatState => {
  switch (type) {
    case ActionEnums.CHAT_IS_LOADING:
      return {
        ...state,
        chatIsLoading: true,
      };
    case ActionEnums.GET_CHAT_ROOMS_SUCCESS:
      return {
        ...state,
        chatIsLoading: false,
        rooms: payload,
      };
    case ActionEnums.GET_CHAT_ROOMS_FAIL:
      return {
        ...state,
        chatIsLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
