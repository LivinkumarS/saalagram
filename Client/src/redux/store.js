import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./theme/themeSlice.js";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const config = {
  key: "user",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

//without persistor
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice.js";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
