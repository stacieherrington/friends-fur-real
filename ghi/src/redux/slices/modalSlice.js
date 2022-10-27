// import { ModalButton, ModalWrapper } from "./";
// export default function ReduxModal() {
//   return (
//     <>
//       <ModalButton />
//       <ModalWrapper />
//     </>
//   );
// }
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const LOGIN_MODAL = "LOGIN_MODAL";
export const SIGNUP_MODAL = "SIGNUP_MODAL";
export const PROFILE_MODAL = "PROFILE_MODAL";
export const ADOPT_MODAL = "ADOPT_MODAL";
