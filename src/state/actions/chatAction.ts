import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "../../store";
import { ActionEnums } from "../types/actionEnums";

export const getChatRooms =
  ({ token }: { token: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: ActionEnums.CHAT_IS_LOADING });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/chats/rooms/`, config)
      .then((res) => {
        dispatch({
          type: ActionEnums.GET_CHAT_ROOMS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionEnums.GET_CHAT_ROOMS_FAIL,
        });
      });
  };
