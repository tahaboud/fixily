import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { ServicesState } from "./types";

const initialState: ServicesState = {
  servicesIsLoading: false,
  categories: null,
  subCategories: null,
  wilayas: null,
  communes: null,
  errors: null,
};

export default (
  state = initialState,
  { type, payload }: ActionType
): ServicesState => {
  switch (type) {
    case ActionEnums.SERVICES_IS_LOADING:
      return { ...state, servicesIsLoading: true };

    case ActionEnums.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        categories: payload,
      };
    case ActionEnums.GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        subCategories: payload,
      };
    case ActionEnums.GET_WILAYAS_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        wilayas: payload,
      };
    case ActionEnums.GET_COMMUNES_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        communes: payload,
      };
    case ActionEnums.GET_CATEGORIES_FAIL:
    case ActionEnums.GET_SUB_CATEGORIES_FAIL:
      return {
        ...state,
        servicesIsLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
