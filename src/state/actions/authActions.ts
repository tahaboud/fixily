import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";
import { anonConfig } from "../utils";
import {
  ArtisanLoginActionParams,
  ClientLoginActionParams,
  ConfirmEmailActionParams,
  RegisterArtisanActionParams,
  RegisterClientActionParams,
  ResetPasswordActionParams,
  SocialLoginActionParams,
  UpdateUserActionParams,
} from "./types";

export const getUser =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/user/`, config)
      .then((res) => {
        dispatch({ type: ActionEnums.GET_USER_SUCCESS, payload: res.data });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_USER_FAIL,
        });
      });
  };

export const clientLogin =
  ({ email, password }: ClientLoginActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
    };

    const data = JSON.stringify({ email, password });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/client/login/`,
        data,
        config
      )
      .then((res) => {
        dispatch({ type: ActionEnums.SIGN_IN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.SIGN_IN_FAIL,
          payload: err.response.data,
        });
      });
  };

export const artisanLogin =
  ({ phoneNumber, password }: ArtisanLoginActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const body = JSON.stringify({ phone_number: phoneNumber, password });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/artisan/login/`,
        body,
        anonConfig
      )
      .then((res) => {
        dispatch({ type: ActionEnums.SIGN_IN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.SIGN_IN_FAIL,
          payload: err.response.data,
        });
      });
  };

export const registerClient =
  ({ email, password, firstName, lastName }: RegisterClientActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/client/register/`,
        body,
        anonConfig
      )
      .then((res) => {
        dispatch({ type: ActionEnums.SIGN_UP_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.SIGN_UP_FAIL,
          payload: err.response.data,
        });
      });
  };

export const registerArtisan =
  ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    code,
  }: RegisterArtisanActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      code,
    });
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/artisan/register/`,
        body,
        anonConfig
      )
      .then((res) => {
        dispatch({ type: ActionEnums.SIGN_UP_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.SIGN_UP_FAIL,
          payload: err.response.data,
        });
      });
  };

export const logout =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout/`, null, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        dispatch({ type: ActionEnums.SIGNOUT_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: ActionEnums.SIGNOUT_FAIL });
      });
  };

export const sendOTP =
  ({ phoneNumber }: { phoneNumber: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({ phone_number: phoneNumber });
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/artisan/otp/`,
        body,
        anonConfig
      )
      .then((res) =>
        dispatch({ type: ActionEnums.SEND_OTP_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({
          type: ActionEnums.SEND_OTP_FAIL,
          payload: err.response.data,
        })
      );
  };

export const verifyOTP =
  ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({ phone_number: phoneNumber, code });
    axios
      .put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/artisan/otp/`,
        body,
        anonConfig
      )
      .then((res) =>
        dispatch({ type: ActionEnums.VERIFY_OTP_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({
          type: ActionEnums.VERIFY_OTP_FAIL,
          payload: err.response.data,
        })
      );
  };

export const requestStateCode =
  ({ provider }: { provider: "google" | "facebook" }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        provider,
      },
    };
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/social/login/`,
        config
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.GET_SOCIAL_STATE_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() => dispatch({ type: ActionEnums.GET_SOCIAL_STATE_FAIL }));
  };

export const socialLogin =
  ({ stateCode, code }: SocialLoginActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({ state_code: stateCode, code });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/social/login/`,
        body,
        anonConfig
      )
      .then((res) =>
        dispatch({ type: ActionEnums.SOCIAL_LOGIN_SUCCESS, payload: res.data })
      )
      .catch(() => dispatch({ type: ActionEnums.SOCIAL_LOGIN_FAIL }));
  };

export const confirmEmail =
  ({ email, code }: ConfirmEmailActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const body = JSON.stringify({ email, code });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/confirm-email/`,
        body,
        anonConfig
      )
      .then(() => dispatch({ type: ActionEnums.CONFIRM_EMAIL_SUCCESS }))
      .catch(() => dispatch({ type: ActionEnums.CONFIRM_EMAIL_FAIL }));
  };

export const requestResetPassword =
  ({ email, phoneNumber }: { email?: string; phoneNumber?: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    let body: string;
    if (email) {
      body = JSON.stringify({ email });
    } else {
      body = JSON.stringify({ phone_number: phoneNumber });
    }

    axios
      .post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/auth/request-reset-password/`,
        body,
        anonConfig
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.REQUEST_RESET_PASSWORD_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() => dispatch({ type: ActionEnums.REQUEST_RESET_PASSWORD_FAIL }));
  };

export const checkResetPasswordOTP =
  ({
    email,
    otp,
    phoneNumber,
  }: {
    email?: string;
    otp: string;
    phoneNumber?: string;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
      params: {
        otp,
      },
    };
    if (email) {
      config.params.email = email;
    } else {
      config.params.phone_number = phoneNumber;
    }

    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/auth/request-reset-password/`,
        config
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.RESET_PASSWORD_OTP_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: ActionEnums.RESET_PASSWORD_OTP_FAIL,
          payload: err.response.data,
        })
      );
  };

export const resetPassword =
  ({ email, otp, password, phoneNumber }: ResetPasswordActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    let body: string;
    if (email) {
      body = JSON.stringify({ email, otp, password });
    } else {
      body = JSON.stringify({ phone_number: phoneNumber, otp, password });
    }

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/reset-password/`,
        body,
        anonConfig
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.RESET_PASSWORD_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() => dispatch({ type: ActionEnums.RESET_PASSWORD_FAIL }));
  };

export const updateUser =
  ({
    firstName,
    lastName,
    frontIDImage,
    backIDImage,
    token,
    categories,
    subCategories,
    wilaya,
    commune,
    picture,
    previousWorkPhotos,
    bio,
    setUploadProgress,
    setUploading,
    availability,
    isOnHolidayMode,
    email,
  }: UpdateUserActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    if (setUploadProgress && picture) {
      config.onUploadProgress = (progress) => {
        const uploadProgress = (progress.loaded * 100) / picture.size;
        setUploadProgress(uploadProgress > 100 ? 100 : uploadProgress);
      };
    }

    if (setUploadProgress && previousWorkPhotos) {
      config.onUploadProgress = (progress) => {
        let totalSize = 0;
        Array.from(previousWorkPhotos).map(
          (photo) => (totalSize += photo.size)
        );
        const uploadProgress = (progress.loaded * 100) / totalSize;
        setUploadProgress(uploadProgress > 100 ? 100 : uploadProgress);
      };
    }

    const formData = new FormData();
    if (firstName) {
      formData.append("first_name", firstName);
    }
    if (lastName) {
      formData.append("last_name", lastName);
    }
    if (frontIDImage) {
      formData.append("front_id_image", frontIDImage);
    }
    if (backIDImage) {
      formData.append("back_id_image", backIDImage);
    }
    if (wilaya) {
      formData.append("wilaya", wilaya);
    }
    if (commune) {
      formData.append("commune", commune);
    }
    if (picture !== undefined) {
      formData.append("picture", picture || "");
    }
    if (email !== undefined) {
      formData.append("email", email);
    }
    if (categories) {
      categories.map((category) => formData.append("categories", category));
    }
    if (subCategories) {
      subCategories.map((subCategory) =>
        formData.append("sub_categories", subCategory)
      );
    }
    if (previousWorkPhotos) {
      Array.from(previousWorkPhotos).map((photo, index) =>
        formData.append(`previous_work_photos[${index}]image`, photo)
      );
    }
    if (bio) {
      formData.append("bio", bio);
    }
    if (availability) {
      availability.map((dayAvailability, index) => {
        formData.append(`availability[${index}]day`, dayAvailability.day);
        formData.append(
          `availability[${index}]is_holiday`,
          dayAvailability.is_holiday ? "true" : "false"
        );
        formData.append(
          `availability[${index}]from_time`,
          dayAvailability.from_time ? dayAvailability.from_time : ""
        );
        formData.append(
          `availability[${index}]to_time`,
          dayAvailability.to_time ? dayAvailability.to_time : ""
        );
      });
    }
    if (isOnHolidayMode !== undefined) {
      formData.append("is_on_holiday_mode", isOnHolidayMode ? "true" : "false");
    }

    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/user/`,
        formData,
        config
      )
      .then((res) => {
        if (setUploading) {
          setUploading(false);
        }
        dispatch({ type: ActionEnums.UPDATE_USER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        if (setUploading) {
          setUploading(false);
        }
        dispatch({
          type: ActionEnums.UPDATE_USER_FAIL,
          payload: err.response.data,
        });
      });
  };

export const deletePreviousWorkPhoto =
  ({ token, photoId }: { token: string; photoId: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/auth/artisan/previous-work-photos/${photoId}/`,
        config
      )
      .then(() => {
        dispatch({ type: ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_SUCCESS });
        dispatch(getUser({ token }));
      })
      .catch(() =>
        dispatch({ type: ActionEnums.DELETE_PREVIOUS_WORK_PHOTO_FAIL })
      );
  };

export const getNotifications =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/notifications/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_NOTIFICATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => dispatch({ type: ActionEnums.GET_NOTIFICATIONS_FAIL }));
  };

export const markNotificationsAsRead =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/notifications/`,
        null,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.MARK_NOTIFICATIONS_AS_READ_SUCCESS,
        });
        dispatch(getNotifications({ token }));
      })
      .catch(() =>
        dispatch({ type: ActionEnums.MARK_NOTIFICATIONS_AS_READ_FAIL })
      );
  };
