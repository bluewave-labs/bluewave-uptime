import { configureStore } from "@reduxjs/toolkit";
import monitorsReducer from "./Features/Monitors/monitorsSlice";

export default configureStore({
  reducer: { monitors: monitorsReducer },
});
