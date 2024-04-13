import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "../../../config/firebase";
import { AppDispatch } from "../../../store";
import { ActionEnums } from "../types/actionEnums";
import { LoginActionParams, SignupActionParams } from "./types";

export const login =
  ({ email, password, provider }: LoginActionParams) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.AUTH_IS_LOADING });
    switch (provider) {
      case "email":
        signInWithEmailAndPassword(auth, email, password)
          .then((res) =>
            dispatch({
              type: ActionEnums.SIGN_IN_SUCCESS,
              payload: res.user.toJSON(),
            })
          )
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
            createUserDetails({ uid: res.user.uid });
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
            createUserDetails({ uid: res.user.uid });
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
        createUserDetails({ uid: res.user.uid });
      })
      .catch((err) =>
        dispatch({ type: ActionEnums.SIGN_UP_FAIL, payload: err.code })
      );
  };

const createUserDetails = async ({ uid }: { uid: string }) => {
  const userDetailsRef = doc(db, "users", uid);
  const userDetails = await getDoc(userDetailsRef);
  if (!userDetails.exists()) {
    await setDoc(userDetailsRef, {
      is_superadmin: false,
      is_admin: false,
      points: 10,
      is_artisan: false,
      is_verified: false,
    });
  }
};
