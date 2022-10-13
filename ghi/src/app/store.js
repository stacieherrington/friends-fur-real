import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./auth";
import { accountSlice } from "./accountSlice";
import { petSlice } from "./pet";
import { rescueSlice } from "./rescue";
import { adoptionApplicationSlice } from "./adoptionApplicationSlice";
import { successStorySlice } from "./successStorySlice";
import { allAccountSlice } from "./allAccountSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [adoptionApplicationSlice.reducerPath]: adoptionApplicationSlice.reducer,
    [rescueSlice.reducerPath]: rescueSlice.reducer,
    [petSlice.reducerPath]: petSlice.reducer,
    [successStorySlice.reducerPath]: successStorySlice.reducer,
    [allAccountSlice.reducerPath]: allAccountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(adoptionApplicationSlice.middleware)
      .concat(rescueSlice.middleware)
      .concat(petSlice.middleware)
      .concat(successStorySlice.middleware)
      .concat(allAccountSlice.middleware);
    // .concat(accountSlice.middleware)
  },
});

setupListeners(store.dispatch);
