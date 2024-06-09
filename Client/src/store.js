import { configureStore } from "@reduxjs/toolkit";
import monitorsReducer from "./Features/Monitors/monitorsSlice";
import authReducer from "./Features/Auth/authSlice";

export default configureStore({
  reducer: { monitors: monitorsReducer, auth: authReducer },
});
