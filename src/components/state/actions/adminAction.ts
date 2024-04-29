import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import {
  deleteUserAdminFunction,
  editAdminPrivileges,
  updateUserDataAdminFunction,
} from "../../../config/functions";
import { AppDispatch } from "../../../store";
import { ActionEnums } from "../types/actionEnums";
import { UpdateAdminPrivilegesParams, UpdateUserDataParams } from "./types";

export const getAllUsers = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.ADMIN_IS_LOADING });
  getDocs(collection(db, "users"))
    .then((res) => {
      const users = res.docs
        .map((doc) => {
          const userData = doc.data();
          if (!userData.isSuperuser) {
            return { ...userData, id: doc.id };
          }
        })
        .filter((user) => user !== undefined);

      dispatch({
        type: ActionEnums.ADMIN_GET_ALL_USERS_SUCCESS,
        payload: users,
      });
    })
    .catch((err) =>
      dispatch({ type: ActionEnums.ADMIN_GET_ALL_USERS_FAIL, payload: err })
    );
};

export const updateAdminPrivileges =
  ({ body, uid }: { body: UpdateAdminPrivilegesParams; uid: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });
    editAdminPrivileges({ uid, isAdmin: body.isAdmin })
      .then(() => {
        dispatch({ type: ActionEnums.ADMIN_UPDATE_USER_SUCCESS });
        dispatch(getAllUsers());
      })
      .catch(() => {
        dispatch({ type: ActionEnums.ADMIN_UPDATE_USER_FAIL });
      });
  };

export const deleteUser =
  ({ uid }: { uid: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });
    deleteUserAdminFunction({ uid })
      .then(() => {
        dispatch({ type: ActionEnums.ADMIN_DELETE_USER_SUCCESS });
        dispatch(getAllUsers());
      })
      .catch(() => {
        dispatch({ type: ActionEnums.ADMIN_DELETE_USER_FAIL });
      });
  };

export const updateUser =
  (data: UpdateUserDataParams) => (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.ADMIN_IS_LOADING });
    updateUserDataAdminFunction({ ...data })
      .then(() => {
        dispatch({ type: ActionEnums.ADMIN_UPDATE_USER_SUCCESS });
        dispatch(getAllUsers());
      })
      .catch(() => {
        dispatch({ type: ActionEnums.ADMIN_UPDATE_USER_FAIL });
      });
  };
