import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export const editAdminPrivileges = httpsCallable<{
  uid: string;
  isAdmin: boolean;
}>(functions, "editAdminPrivilegesFn");

export const deleteUserAdminFunction = httpsCallable<{
  uid: string;
}>(functions, "deleteUserFn");

export const updateUserDataAdminFunction = httpsCallable<{
  uid: string;
  disabled?: boolean;
  isVerified?: boolean;
}>(functions, "updateUserFn");
