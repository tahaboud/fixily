import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";
import { CreateJobParams } from "./types";

export const getCategories = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
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
  ({ categoryIds }: { categoryIds: Array<string> }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
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

export const getWilayas = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
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
  ({ wilayaId }: { wilayaId: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
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

export const clientGetJobs =
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/client/jobs/`,
        config
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.CLIENT_GET_JOBS_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() => dispatch({ type: ActionEnums.CLIENT_GET_JOBS_FAIL }));
  };

export const artisanGetJobs =
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
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/artisan/jobs/?radius=50000`,
        config
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.ARTISAN_GET_JOBS_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() => dispatch({ type: ActionEnums.ARTISAN_GET_JOBS_FAIL }));
  };

export const artisanGetPreviousJobs =
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
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/artisan/previous-jobs/`,
        config
      )
      .then((res) =>
        dispatch({
          type: ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_SUCCESS,
          payload: res.data,
        })
      )
      .catch(() =>
        dispatch({ type: ActionEnums.ARTISAN_GET_PREVIOUS_JOBS_FAIL })
      );
  };

export const createJob =
  ({
    token,
    description,
    subCategory,
    commune,
    wilaya,
    images,
  }: CreateJobParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const data = JSON.stringify({
      description,
      sub_category: subCategory,
      commune,
      wilaya,
    });

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/client/jobs/`,
        data,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.CREATE_JOB_SUCCESS,
          payload: res.data,
        });
        if (images) {
          dispatch(addJobImages({ token, images, jobId: res.data.id }));
        } else {
          dispatch(clientGetJobs({ token }));
        }
      })
      .catch(() => dispatch({ type: ActionEnums.CREATE_JOB_FAIL }));
  };

export const addJobImages =
  ({
    token,
    images,
    jobId,
  }: {
    token: string;
    jobId: string;
    images: Array<File>;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    const formData = new FormData();
    images.map((image, index) => {
      formData.append(`images[${index}]image`, image);
    });

    axios
      .post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/services/client/job-images/${jobId}/`,
        formData,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.ADD_JOB_IMAGES_SUCCESS,
          payload: res.data,
        });
        dispatch(clientGetJobs({ token }));
      })
      .catch(() => dispatch({ type: ActionEnums.ADD_JOB_IMAGES_FAIL }));
  };

export const deleteJob =
  ({ token, jobId }: { token: string; jobId: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.SERVICES_IS_LOADING });

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
        }/services/client/jobs/${jobId}/`,
        config
      )
      .then((res) => {
        dispatch({
          type: ActionEnums.DELETE_JOB_SUCCESS,
          payload: res.data,
        });
        dispatch(clientGetJobs({ token }));
      })
      .catch(() => dispatch({ type: ActionEnums.DELETE_JOB_FAIL }));
  };
