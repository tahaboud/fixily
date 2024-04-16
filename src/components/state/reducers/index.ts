import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;
