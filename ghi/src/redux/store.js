import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api";
import { accountSlice } from "./accountSlice";
import { applicationSlice } from "./applicationSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

setupListeners(store.dispatch);
