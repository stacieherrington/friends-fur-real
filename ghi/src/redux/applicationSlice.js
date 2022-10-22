import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  address_one: "",
  address_two: "",
  city: "",
  state: "",
  zip_code: "",
  phone_number: "",
  date_ready: "",
  landlord_restrictions: "",
  residence_type: "",
  has_small_children: false,
  has_dogs: false,
  has_cats: false,
  wants_prepproval: false,
  agrees_to_terms: false,
  residence_owned: false,
  smoke_free_home: true,
  
};

export const applicationSlice = createSlice({
  name: "application",
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

export const { clearForm, updateField, showModal } = applicationSlice.actions;

export const APPLICATION_MODAL = "APPLICATION_MODAL";
