import {
  Category,
  ChatRoom,
  Commune,
  ErrorResponse,
  Job,
  Notification,
  PreviousJob,
  SocialUserResponse,
  SubCategory,
  User,
  UserResponse,
  Wilaya,
} from "../../types";
import { PaymentReceipt } from "../reducers/types";
import { ActionEnums } from "./actionEnums";

interface CleanStateAction {
  type: ActionEnums.CLEAN_AUTH_STATE;
  payload: null;
}

interface AuthAction {
  type: ActionEnums.SIGN_IN_SUCCESS | ActionEnums.SIGN_UP_SUCCESS;
  payload: UserResponse;
}

interface SocialAuthAction {
  type: ActionEnums.SOCIAL_LOGIN_SUCCESS;
  payload: SocialUserResponse;
}

interface GetUserAction {
  type: ActionEnums.GET_USER_SUCCESS;
  payload: User;
}

interface OTPAction {
  type: ActionEnums.SEND_OTP_SUCCESS | ActionEnums.VERIFY_OTP_SUCCESS;
  payload: { detail: Array<string> };
}

interface ConfirmEmailAction {
  type: ActionEnums.CONFIRM_EMAIL_SUCCESS;
  payload: null;
}

interface ResetPasswordAction {
  type:
    | ActionEnums.REQUEST_RESET_PASSWORD_SUCCESS
    | ActionEnums.RESET_PASSWORD_SUCCESS;
  payload: null;
}

interface ResetPasswordVerifyOTPAction {
  type: ActionEnums.RESET_PASSWORD_OTP_SUCCESS;
  payload: { detail: Array<string> };
}

interface AdminGetAllUsersAction {
  type: ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS;
  payload: Array<User>;
}

interface UpdateUserAction {
  type: ActionEnums.UPDATE_USER_SUCCESS;
  payload: User;
}

interface GetSocialStateAction {
  type: ActionEnums.GET_SOCIAL_STATE_SUCCESS;
  payload: {
    id: number;
    state_code: string;
    provider: "google" | "facebook";
  };
}

interface GetCategoriesAction {
  type: ActionEnums.GET_CATEGORIES_SUCCESS;
  payload: Array<Category>;
}

interface GetSubCategoriesAction {
  type: ActionEnums.GET_SUB_CATEGORIES_SUCCESS;
  payload: Array<SubCategory>;
}

interface GetWilayasAction {
  type: ActionEnums.GET_WILAYAS_SUCCESS;
  payload: Array<Wilaya>;
}

interface ClientGetJobsAction {
  type: ActionEnums.CLIENT_GET_JOBS_SUCCESS;
  payload: Array<Job>;
}

interface ArtisanGetJobsAction {
  type: ActionEnums.ARTISAN_GET_JOBS_SUCCESS;
  payload: Array<Job>;
}

interface ArtisanGetPreviousJobsAction {
  type: ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_SUCCESS;
  payload: Array<PreviousJob>;
}

interface GetNotificationsAction {
  type: ActionEnums.GET_NOTIFICATIONS_SUCCESS;
  payload: {
    unseen_notifications_count: number;
    notifications: Array<Notification>;
  };
}

interface GetCommunesAction {
  type: ActionEnums.GET_COMMUNES_SUCCESS;
  payload: Array<Commune>;
}

interface GetChatRoomsAction {
  type: ActionEnums.GET_CHAT_ROOMS_SUCCESS;
  payload: Array<ChatRoom>;
}

interface AdminGetPaymentReceiptsAction {
  type: ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_SUCCESS;
  payload: Array<PaymentReceipt>;
}

interface AdminUpdatePaymentReceiptsAction {
  type: ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_SUCCESS;
  payload: null;
}

interface CreateJobAction {
  type: ActionEnums.CREATE_JOB_SUCCESS;
  payload: Job;
}

interface AddJobImagesAction {
  type: ActionEnums.ADD_JOB_IMAGES_SUCCESS;
  payload: null;
}

interface SetUserDataFetchedFromTokenTrueAction {
  type: ActionEnums.SET_USER_DATA_FETCHED_FROM_TOKEN_TRUE;
  payload: null;
}

interface DeleteJobAction {
  type: ActionEnums.DELETE_JOB_SUCCESS;
  payload: null;
}

interface DeletePreviousWorkPhotoAction {
  type: ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_SUCCESS;
  payload: null;
}

interface AdminUpdateCategoryAction {
  type: ActionEnums.ADMIN_UPDATE_CATEGORY_SUCCESS;
  payload: null;
}

interface AdminGetJobsAction {
  type: ActionEnums.ADMIN_GET_JOBS_SUCCESS;
  payload: Array<Job>;
}

interface AdminCreateCategoryAction {
  type: ActionEnums.ADMIN_CREATE_CATEGORY_SUCCESS;
  payload: null;
}

interface AdminCreateAdminAction {
  type: ActionEnums.ADMIN_CREATE_ADMIN_SUCCESS;
  payload: null;
}

interface AdminUpdateSubCategoryAction {
  type: ActionEnums.ADMIN_UPDATE_SUB_CATEGORY_SUCCESS;
  payload: null;
}

interface AdminCreateSubCategoryAction {
  type: ActionEnums.ADMIN_CREATE_SUB_CATEGORY_SUCCESS;
  payload: null;
}

interface AdminDeleteSubCategoryAction {
  type: ActionEnums.ADMIN_DELETE_SUB_CATEGORY_SUCCESS;
  payload: null;
}

interface AdminDeleteCategoryAction {
  type: ActionEnums.ADMIN_DELETE_CATEGORY_SUCCESS;
  payload: null;
}

interface MarkNotifcationsAsReadAction {
  type: ActionEnums.MARK_NOTIFICATIONS_AS_READ_SUCCESS;
  payload: null;
}

interface IsLoadingAction {
  type:
    | ActionEnums.AUTH_IS_LOADING
    | ActionEnums.ADMIN_IS_LOADING
    | ActionEnums.SERVICES_IS_LOADING
    | ActionEnums.CHAT_IS_LOADING;
  payload: null;
}

interface ErrorAction {
  type:
    | ActionEnums.SIGN_IN_FAIL
    | ActionEnums.SIGN_UP_FAIL
    | ActionEnums.SIGNOUT_SUCCESS
    | ActionEnums.SIGNOUT_FAIL
    | ActionEnums.GET_USER_FAIL
    | ActionEnums.VERIFY_OTP_FAIL
    | ActionEnums.GET_SOCIAL_STATE_FAIL
    | ActionEnums.SOCIAL_LOGIN_FAIL
    | ActionEnums.CONFIRM_EMAIL_FAIL
    | ActionEnums.REQUEST_RESET_PASSWORD_FAIL
    | ActionEnums.RESET_PASSWORD_FAIL
    | ActionEnums.UPDATE_USER_FAIL
    | ActionEnums.SEND_OTP_FAIL
    | ActionEnums.ADMIN_GET_ALL_USERS_FAIL
    | ActionEnums.GET_SUB_CATEGORIES_FAIL
    | ActionEnums.GET_CATEGORIES_FAIL
    | ActionEnums.GET_WILAYAS_FAIL
    | ActionEnums.GET_COMMUNES_FAIL
    | ActionEnums.CLIENT_GET_JOBS_FAIL
    | ActionEnums.ARTISAN_GET_JOBS_FAIL
    | ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_FAIL
    | ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_FAIL
    | ActionEnums.ADMIN_UPDATE_CATEGORY_FAIL
    | ActionEnums.ADMIN_CREATE_CATEGORY_FAIL
    | ActionEnums.ADMIN_UPDATE_SUB_CATEGORY_FAIL
    | ActionEnums.ADMIN_CREATE_SUB_CATEGORY_FAIL
    | ActionEnums.ADMIN_DELETE_CATEGORY_FAIL
    | ActionEnums.ADMIN_DELETE_SUB_CATEGORY_FAIL
    | ActionEnums.ADMIN_CREATE_ADMIN_FAIL
    | ActionEnums.GET_CHAT_ROOMS_FAIL
    | ActionEnums.MARK_NOTIFICATIONS_AS_READ_FAIL
    | ActionEnums.GET_NOTIFICATIONS_FAIL
    | ActionEnums.SWITCH_TO_CLIENT
    | ActionEnums.CREATE_JOB_FAIL
    | ActionEnums.DELETE_JOB_FAIL
    | ActionEnums.ADD_JOB_IMAGES_FAIL
    | ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_FAIL
    | ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_FAIL
    | ActionEnums.ADMIN_GET_JOBS_FAIL
    | ActionEnums.RESET_PASSWORD_OTP_FAIL;
  payload: { type: string; errors: Array<ErrorResponse> } | null;
}

export type ActionType =
  | AuthAction
  | GetUserAction
  | OTPAction
  | GetSocialStateAction
  | SocialAuthAction
  | ConfirmEmailAction
  | ResetPasswordAction
  | ResetPasswordVerifyOTPAction
  | AdminGetAllUsersAction
  | UpdateUserAction
  | GetCategoriesAction
  | GetSubCategoriesAction
  | GetWilayasAction
  | GetCommunesAction
  | ClientGetJobsAction
  | ArtisanGetJobsAction
  | ArtisanGetPreviousJobsAction
  | DeletePreviousWorkPhotoAction
  | AdminUpdateCategoryAction
  | AdminCreateCategoryAction
  | AdminUpdateSubCategoryAction
  | AdminCreateSubCategoryAction
  | AdminDeleteCategoryAction
  | AdminDeleteSubCategoryAction
  | AdminCreateAdminAction
  | GetChatRoomsAction
  | GetNotificationsAction
  | MarkNotifcationsAsReadAction
  | CreateJobAction
  | AddJobImagesAction
  | DeleteJobAction
  | AdminGetPaymentReceiptsAction
  | AdminUpdatePaymentReceiptsAction
  | AdminGetJobsAction
  | SetUserDataFetchedFromTokenTrueAction
  | IsLoadingAction
  | ErrorAction
  | CleanStateAction;
