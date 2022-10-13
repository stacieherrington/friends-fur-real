import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import providesList from "./providesList";

export const rescueSlice = createApi({
  reducerPath: "rescues",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["Rescue"],
  endpoints: (builder) => ({
    addRescue: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((pet, [key, value]) => {
          pet[key] = Number.parseInt(value) || value;
          return pet;
        }, {});
        return {
          method: "POST",
          url: "/api/rescues/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Rescue", id: "LIST" }],
    }),
    listRescues: builder.query({
      query: () => `/api/rescues/`,
      providesTags: (result) => providesList(result, "Rescue"),
    }),
    getRescue: builder.query({
      query: (rescueId) => `/api/rescue/${rescueId}`,
      providesTags: (result, error, id) => [{ type: "Rescue", id }],
    }),
    putRescue: builder.mutation({
      query: (rescueId) => ({
        method: "PUT",
        url: `/api/rescue/${rescueId}`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
    deleteRescue: builder.mutation({
      query: (rescueId) => ({
        method: "DELETE",
        url: `/api/rescue/${rescueId}`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
  }),
});

export const {
  useAddRescueMutation,
  useListRescuesQuery,
  useGetRescueQuery,
  usePutRescueMutation,
  useDeleteRescueMutation,
} = rescueSlice;
