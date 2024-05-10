import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";
import {
  AdminDeleteUserActionParams,
  AdminUpdateUserActionParams,
} from "./types";

export const adminGetUsers =
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/admin/users/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.ADMIN_GET_ALL_USERS_FAIL,
        });
      });
  };

export const adminUpdateUser =
  ({
    token,
    isActive,
    isAdmin,
    isIDVerified,
    points,
    userId,
  }: AdminUpdateUserActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const body = JSON.stringify({
      is_active: isActive,
      is_admin: isAdmin,
      is_id_verified: isIDVerified,
      points: points,
    });

    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/admin/users/${userId}/`,
        body,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_USER_SUCCESS,
          payload: res.data,
        });
        dispatch(adminGetUsers({ token }));
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_USER_FAIL,
        });
      });
  };

export const adminDeleteUser =
  ({ token, userId }: AdminDeleteUserActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/admin/users/${userId}/`,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_USER_SUCCESS,
        });
        dispatch(adminGetUsers({ token }));
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_USER_FAIL,
        });
      });
  };
