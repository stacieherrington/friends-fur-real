import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authEndpoints } from "./authEps";
import { petEndpoints } from "./petEps";
import { applicationEndpoints } from "./applicationEps";
import { successStoryEndpoints } from "./successStoryEps";
import { accountEndpoints } from "./accountEps";
import { rescueEndpoints } from "./rescueEps";

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
  tagTypes: [
    "Account",
    "Token",
    "Application",
    "SuccessStory",
    "Rescue",
    "Pet",
  ],
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...accountEndpoints(builder),
    ...applicationEndpoints(builder),
    ...petEndpoints(builder),
    ...rescueEndpoints(builder),
    ...successStoryEndpoints(builder),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetTokenQuery,
  useDeleteSessionsMutation,
  useAddAccountMutation,
  useListAccountsQuery,
  useSingleAccountQuery,
  usePatchUpdateAccountMutation,
  usePatchPromoteAccountMutation,
  usePatchDemoteAccountMutation,
  usePatchLocalizeAccountMutation,
  useAddApplicationMutation,
  useListApplicationsQuery,
  useGetApplicationQuery,
  usePatchApplicationMutation,
  useDeleteApplicationMutation,
  useAddPetMutation,
  useListPetsQuery,
  useGetPetQuery,
  usePutPetMutation,
  useDeletePetMutation,
  useAddRescueMutation,
  useListRescuesQuery,
  useGetRescueQuery,
  usePutRescueMutation,
  useDeleteRescueMutation,
  useAddSuccessStoryMutation,
  useListSuccessStoryQuery,
  useGetSuccessStoryQuery,
  useListRescueStoriesQuery,
  useThreeRandomStoriesQuery,
} = apiSlice;
