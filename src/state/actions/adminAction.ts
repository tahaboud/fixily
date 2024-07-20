import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";
import { getCategories, getSubCategories } from "./servicesAction";
import {
  AdminCreateAdminActionParams,
  AdminCreateCategoryActionParams,
  AdminCreateSubCategoryActionParams,
  AdminDeleteCategoryActionParams,
  AdminDeleteSubCategoryActionParams,
  AdminDeleteUserActionParams,
  AdminUpdateCategoryActionParams,
  AdminUpdateSubCategoryActionParams,
  AdminUpdateUserActionParams,
} from "./types";

export const adminGetUsers =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

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
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    interface JsonBody {
      is_active?: boolean;
      is_admin?: boolean;
      id_status?: "verified" | "rejected";
      points?: number;
    }
    const jsonBody: JsonBody = {};
    if (isActive !== undefined) {
      jsonBody.is_active = isActive;
    }
    if (isAdmin !== undefined) {
      jsonBody.is_admin = isAdmin;
    }
    if (isIDVerified !== undefined) {
      jsonBody.id_status = isIDVerified ? "verified" : "rejected";
    }
    if (points !== undefined) {
      jsonBody.points = points;
    }
    const body = JSON.stringify(jsonBody);

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
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

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

export const adminUpdateCategory =
  ({
    token,
    categoryId,
    nameAr,
    nameEn,
    image,
  }: AdminUpdateCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    const data = new FormData();
    data.append("name_ar", nameAr);
    data.append("name_en", nameEn);
    if (image) {
      data.append("image", image);
    }

    axios
      .patch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/categories/${categoryId}/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_CATEGORY_SUCCESS,
        });
        dispatch(getCategories());
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminDeleteCategory =
  ({ token, categoryId }: AdminDeleteCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/categories/${categoryId}/`,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_CATEGORY_SUCCESS,
        });
        dispatch(getCategories());
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminCreateCategory =
  ({ token, nameAr, nameEn, image }: AdminCreateCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    const data = new FormData();
    data.append("name_ar", nameAr);
    data.append("name_en", nameEn);
    data.append("image", image);

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/admin/categories/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_CATEGORY_SUCCESS,
        });
        dispatch(getCategories());
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminUpdateSubCategory =
  ({
    token,
    subCategoryId,
    nameAr,
    nameEn,
    points,
    categoryId,
  }: AdminUpdateSubCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const data = JSON.stringify({
      name_ar: nameAr,
      name_en: nameEn,
      point_cost: points,
    });

    axios
      .patch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/sub-categories/${subCategoryId}/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_SUB_CATEGORY_SUCCESS,
        });
        dispatch(getSubCategories({ categoryIds: [categoryId] }));
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_SUB_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminDeleteSubCategory =
  ({ token, subCategoryId, categoryId }: AdminDeleteSubCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/sub-categories/${subCategoryId}/`,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_SUB_CATEGORY_SUCCESS,
        });
        dispatch(getSubCategories({ categoryIds: [categoryId] }));
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_DELETE_SUB_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminCreateSubCategory =
  ({
    token,
    nameAr,
    nameEn,
    points,
    categoryId,
  }: AdminCreateSubCategoryActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const data = JSON.stringify({
      name_ar: nameAr,
      name_en: nameEn,
      point_cost: points,
    });

    axios
      .post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/sub-categories/${categoryId}/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_SUB_CATEGORY_SUCCESS,
        });
        dispatch(getSubCategories({ categoryIds: [categoryId] }));
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_SUB_CATEGORY_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminCreateAdmin =
  ({
    token,
    firstName,
    lastName,
    password,
    email,
  }: AdminCreateAdminActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const data = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password,
    });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/admin/create-admin/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_ADMIN_SUCCESS,
        });
        dispatch(adminGetUsers({ token }));
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_CREATE_ADMIN_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminGetPaymentReceipts =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/payment-receipts/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_GET_PAYMENT_RECEIPT_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminUpdatePaymentReceipt =
  ({
    token,
    receiptId,
    status,
  }: {
    token: string;
    receiptId: string;
    status: "approved" | "denied";
  }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const data = JSON.stringify({
      status,
    });

    axios
      .patch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/admin/payment-receipts/${receiptId}/`,
        data,
        config
      )
      .then(() => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_SUCCESS,
        });
        dispatch(adminGetPaymentReceipts({ token }));
      })
      .catch((err) => {
        dispatch({
          type: ActionEnums.ADMIN_UPDATE_PAYMENT_RECEIPT_FAIL,
          payload: err.response.data,
        });
      });
  };

export const adminGetJobs =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/admin/jobs/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.ADMIN_GET_JOBS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.ADMIN_GET_JOBS_FAIL,
        });
      });
  };
