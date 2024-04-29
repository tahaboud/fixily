export interface EditAdminPrivilegesParams {
  uid: string;
  isAdmin: boolean;
}
export interface DeleteUserParams {
  uid: string;
}
export interface UpdateUserParams {
  uid: string;
  disabled?: boolean;
  isVerified?: boolean;
}
export interface DataToUpdate {
  disabled?: boolean;
  isVerified?: boolean;
}
