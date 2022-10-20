import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const apiSlice = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = apiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account", "Token"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/",
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
          formData = new FormData();
          formData.append("username", info.email.value);
          formData.append("password", info.password.value);
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
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token/",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    deleteSessions: builder.mutation({
      query: (account_id) => ({
        method: "DELETE",
        url: `/api/sessions/${account_id}/`,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
    addAccount: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((app, [key, value]) => {
          app[key] = Number.parseInt(value) || value;
          return app;
        }, {});
        return {
          method: "POST",
          url: "/api/accounts/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Account", id: "LIST" }],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetTokenQuery,
  useDeleteSessionsMutation,
  useAddAccountMutation,
} = apiSlice;
