import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;
