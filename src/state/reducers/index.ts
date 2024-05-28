import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import servicesReducer from "./servicesReducer";

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  services: servicesReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;
