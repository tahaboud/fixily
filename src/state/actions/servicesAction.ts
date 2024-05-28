import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";

export const getCategories =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/categories/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_CATEGORIES_FAIL,
        });
      });
  };

export const getSubCategories =
  ({ token, categoryIds }: { token: string; categoryIds: Array<string> }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: {
        categories: categoryIds.join(","),
      },
    };

    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/sub-categories/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_SUB_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_SUB_CATEGORIES_FAIL,
        });
      });
  };

export const getWilayas =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/wilayas/`, config)
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_WILAYAS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_WILAYAS_FAIL,
        });
      });
  };

export const getCommunes =
  ({ token, wilayaId }: { token: string; wilayaId: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/communes/${wilayaId}`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_COMMUNES_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_COMMUNES_FAIL,
        });
      });
  };
