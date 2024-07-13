import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import servicesReducer from "./servicesReducer";

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  services: servicesReducer,
  chat: chatReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;
