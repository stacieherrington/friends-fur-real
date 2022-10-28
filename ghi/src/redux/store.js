import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api";
import { accountSlice } from "./slices/accountSlice";
import { applicationSlice } from "./slices/applicationSlice";
import { modalSlice } from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

setupListeners(store.dispatch);
