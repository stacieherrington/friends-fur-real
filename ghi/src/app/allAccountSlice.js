import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import providesList from "./functions/providesList";

export const allAccountSlice = createApi({
  reducerPath: "allAccountSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["AllAccountSlice"],
  endpoints: (builder) => ({
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
          url: "/api/accounts",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "AllAccountSlice", id: "LIST" }],
    }),
    listAccounts: builder.query({
      query: () => `/api/accounts`,
      providesTags: (result) => providesList(result, "AllAccountSlice"),
    }),
    singleAccount: builder.query({
      query: (allAccountSliceId) => `/api/accounts/${allAccountSliceId}`,
      providesTags: (result, error, allAccountSliceId) => [
        { type: "AllAccountSlice", id: allAccountSliceId },
      ],
    }),
    patchUpdateAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/${allAccountSliceId}`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "AllAccountSlice", id: allAccountSliceId },
      ],
    }),
    patchPromoteAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/promote/${allAccountSliceId}`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "AllAccountSlice", id: allAccountSliceId },
      ],
    }),
    patchDemoteAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/demote/${allAccountSliceId}`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "AllAccountSlice", id: allAccountSliceId },
      ],
    }),
    patchLocalizeAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/localize/${allAccountSliceId}`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "AllAccountSlice", id: allAccountSliceId },
      ],
    }),
  }),
});

export const {
  useAddAccountMutation,
  useListAccountsQuery,
  useSingleAccountQuery,
  usePatchUpdateAccountMutation,
  usePatchPromoteAccountMutation,
  usePatchDemoteAccountMutation,
  usePatchLocalizeAccountMutation,
} = allAccountSlice;
