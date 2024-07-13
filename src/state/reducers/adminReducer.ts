import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { AdminState } from "./types";

const initialState: AdminState = {
  adminIsLoading: false,
  data: null,
  details: null,
  errors: null,
  paymentReceipts: null,
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

    case ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_SUCCESS:
      return {
        ...state,
        adminIsLoading: false,
        errors: null,
        paymentReceipts: payload,
      };

    case ActionEnums.ADMIN_UPDATE_CATEGORY_SUCCESS:
    case ActionEnums.ADMIN_CREATE_ADMIN_SUCCESS:
    case ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_SUCCESS:
      return {
        ...state,
        adminIsLoading: false,
        errors: null,
      };

    case ActionEnums.ADMIN_UPDATE_CATEGORY_FAIL:
    case ActionEnums.ADMIN_CREATE_ADMIN_FAIL:
    case ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_FAIL:
    case ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_FAIL:
      return {
        ...state,
        adminIsLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
