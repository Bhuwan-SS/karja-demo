import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import userReducer from "./User/reducer";
import registrationReducer from "./Registration/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  registration: registrationReducer,
});
export default rootReducer;
