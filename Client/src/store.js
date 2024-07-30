import { configureStore, combineReducers } from "@reduxjs/toolkit";

import uptimeMonitorsReducer from "./Features/UptimeMonitors/uptimeMonitorsSlice";
import pageSpeedMonitorReducer from "./Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import authReducer from "./Features/Auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, createTransform } from "redux-persist";

const authTransform = createTransform(
  (inboundState) => {
    const { profileImage, ...rest } = inboundState;
    return rest;
  },
  // No transformation on rehydration
  null,
  // Only applies to auth
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitielist: ["auth", "monitors", "pageSpeed"],
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  uptimeMonitors: uptimeMonitorsReducer,
  auth: authReducer,
  pageSpeedMonitors: pageSpeedMonitorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
