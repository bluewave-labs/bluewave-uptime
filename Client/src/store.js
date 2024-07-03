import { configureStore, combineReducers } from "@reduxjs/toolkit";
import monitorsReducer from "./Features/Monitors/monitorsSlice";
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
  whitielist: ["auth", "monitors"],
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  monitors: monitorsReducer,
  auth: authReducer,
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
