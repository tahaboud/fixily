import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppDispatch } from "../../../store";
import { ActionEnums } from "../types/actionEnums";

export const getAllUsers = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionEnums.USERS_IS_LOADING });
  getDocs(collection(db, "users"))
    .then((res) => {
      const users = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      dispatch({ type: ActionEnums.GET_ALL_USERS_SUCCESS, payload: users });
    })
    .catch((err) =>
      dispatch({ type: ActionEnums.GET_ALL_USERS_FAIL, payload: err })
    );
};
