import { ActionEnums } from "../types/actionEnums";
import { ActionType } from "../types/actionTypes";
import { ServicesState } from "./types";

const initialState: ServicesState = {
  servicesIsLoading: false,
  categories: null,
  subCategories: null,
  wilayas: null,
  communes: null,
  jobs: null,
  previousJobs: null,
  errors: null,
  details: null,
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
    case ActionEnums.CLIENT_GET_JOBS_SUCCESS:
    case ActionEnums.ARTISAN_GET_JOBS_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        jobs: payload,
      };
    case ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        previousJobs: payload,
      };
    case ActionEnums.CREATE_JOB_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        details: "job created successfully",
      };
    case ActionEnums.GET_CATEGORIES_FAIL:
    case ActionEnums.GET_SUB_CATEGORIES_FAIL:
    case ActionEnums.CLIENT_GET_JOBS_FAIL:
    case ActionEnums.ARTISAN_GET_JOBS_FAIL:
    case ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_FAIL:
    case ActionEnums.CREATE_JOB_FAIL:
    case ActionEnums.ADD_JOB_IMAGES_FAIL:
    case ActionEnums.ADD_JOB_IMAGES_SUCCESS:
    case ActionEnums.DELETE_JOB_FAIL:
    case ActionEnums.DELETE_JOB_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
