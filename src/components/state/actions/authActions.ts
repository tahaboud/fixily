import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "../../../config/firebase";
import { AppDispatch } from "../../../store";
import { UserData } from "../../../types";
import { ActionEnums } from "../types/actionEnums";
import { LoginActionParams, SignupActionParams } from "./types";

export const login =
  ({ email, password, provider }: LoginActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    switch (provider) {
      case "email":
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            dispatch({
              type: ActionEnums.SIGN_IN_SUCCESS,
              payload: res.user.toJSON(),
            });
            dispatch(getUserDetails({ uid: res.user.uid }));
          })
          .catch((err) =>
            dispatch({ type: ActionEnums.SIGN_IN_FAIL, payload: err.code })
          );
        break;
      case "google":
        signInWithPopup(auth, googleProvider)
          .then((res) => {
            dispatch({
              type: ActionEnums.SIGN_IN_SUCCESS,
              payload: res.user.toJSON(),
            });
            createUserDetails({
              userData: res.user.toJSON() as UserData,
              dispatch,
            });
          })
          .catch((err) =>
            dispatch({ type: ActionEnums.SIGN_IN_FAIL, payload: err.code })
          );
        break;
      case "facebook":
        signInWithPopup(auth, facebookProvider)
          .then((res) => {
            dispatch({
              type: ActionEnums.SIGN_IN_SUCCESS,
              payload: res.user.toJSON(),
            });
            createUserDetails({
              userData: res.user.toJSON() as UserData,
              dispatch,
            });
          })
          .catch((err) =>
            dispatch({ type: ActionEnums.SIGN_IN_FAIL, payload: err.code })
          );
        break;
      default:
        break;
    }
  };

export const signup =
  ({ email, password }: SignupActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({
          type: ActionEnums.SIGN_UP_SUCCESS,
          payload: res.user.toJSON(),
        });
        createUserDetails({
          userData: res.user.toJSON() as UserData,
          dispatch,
        });
      })
      .catch((err) =>
        dispatch({ type: ActionEnums.SIGN_UP_FAIL, payload: err.code })
      );
  };

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.AUTH_IS_LOADING });
  signOut(auth)
    .then(() => dispatch({ type: ActionEnums.SIGNOUT_SUCCESS }))
    .catch(() => dispatch({ type: ActionEnums.SIGNOUT_FAIL }));
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.AUTH_IS_LOADING });
  if (auth.currentUser !== null) {
    dispatch({
      type: ActionEnums.GET_USER_SUCCESS,
      payload: auth.currentUser.toJSON(),
    });
    dispatch(getUserDetails({ uid: auth.currentUser.uid }));
  } else {
    dispatch({ type: ActionEnums.GET_USER_FAIL });
  }
};

export const getUserDetails =
  ({ uid }: { uid: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    const userDetailsRef = doc(db, "users", uid);

    getDoc(userDetailsRef)
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_USER_DETAILS_SUCCESS,
          payload: res.data(),
        });
      })
      .catch((err) =>
        dispatch({ type: ActionEnums.GET_USER_DETAILS_FAIL, payload: err })
      );
  };

const createUserDetails = async ({
  userData,
  dispatch,
}: {
  userData: UserData;
  dispatch: AppDispatch;
}) => {
  const userDetailsRef = doc(db, "users", userData.uid);
  const userDetails = await getDoc(userDetailsRef);
  if (!userDetails.exists()) {
    await setDoc(userDetailsRef, {
      email: userData.email,
      emailVerified: userData.emailVerified,
      displayName: userData.providerData.displayName ?? null,
      phoneNumber: userData.providerData.phoneNumber ?? null,
      photoUrl: userData.providerData.photoURL ?? null,
      isSuperadmin: false,
      isAdmin: false,
      points: 15,
      isArtisan: false,
      isVerified: false,
      createdAt: userData.createdAt,
    });
  }
  dispatch(getUserDetails({ uid: userData.uid }));
};
