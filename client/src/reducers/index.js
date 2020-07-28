import { combineReducers } from "redux";

import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import dogReducer from "./dogReducers";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  dogs: dogReducer
});