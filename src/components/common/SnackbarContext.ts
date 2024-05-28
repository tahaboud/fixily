import { SetStateAction, createContext } from "react";

export const SnackbarContext = createContext<SnackbarContextType>({
  snack: {
    message: "",
    color: "success",
    open: false,
  },
  setSnack: function (
    _value: SetStateAction<{
      message: string;
      color: "success" | "info" | "warning" | "error";
      open: boolean;
    }>
  ): void {
    throw new Error("Function not implemented.");
  },
});

export type SnackbarContextType = {
  snack: {
    message: string;
    color: "success" | "info" | "warning" | "error";
    open: boolean;
    duration?: number;
  };
  setSnack: React.Dispatch<
    React.SetStateAction<{
      message: string;
      color: "success" | "info" | "warning" | "error";
      open: boolean;
      duration?: number;
    }>
  >;
};
