import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const apiSlice = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({
    baseUrl: ProcessingInstruction.env.REACT_APP_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = apiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Account",
    "Token",
    "Adoption_Application",
    "Pet",
    "Rescue",
    "Success_Story",
  ],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts",
        method: "post",
        body: data,
        credentials: "include",
      }),
      provideTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append.append("username", info.email);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFufilled }) {
        try {
          await queryFufilled;
          dispatch(clearForm());
        } catch (error) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include,",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    addPet: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((acc, [key, value]) => {
          acc[key] = Number.parseInt(value) || value;
          return acc;
        }, {});
        return {
          method: "post",
          url: "/api/pets",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{type: 'Pet', id: "LIST" }],
    }),
    getPets: builder.query({
        query: () => `/api/pets`,
        
    }),

  }),
});
