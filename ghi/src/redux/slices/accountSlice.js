import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: null,
  email: "",
  password: "",
  zip_code: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    showModal: (state, action) => {
      state.show = action.payload;
    },
    clearForm: () => {
      return initialState;
    },
  },
});

export const { clearForm, updateField, showModal } = accountSlice.actions;

export const LOGIN_MODAL = "LOGIN_MODAL";
export const SIGNUP_MODAL = "SIGNUP_MODAL";
