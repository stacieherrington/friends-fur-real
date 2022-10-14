import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authEndpoints } from "./endpoints/authEndpoints";
import { petEndpoints } from "./endpoints/petEndpoints";
import { adoptionApplicationEndpoints } from "./endpoints/adoptionApplicationEndpoints";
import { successStoryEndpoints } from "./endpoints/successStorySliceEndpoints";
import { extraAccountEndpoints } from "./endpoints/extraAccountEndpoints";
import { rescueEndpoints } from "./endpoints/rescueEndpoints";

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
    "AdoptionApplication",
    "SuccessStory",
    "Rescue",
    "Pet",
  ],
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...extraAccountEndpoints(builder),
    ...adoptionApplicationEndpoints(builder),
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
  useAddAdoptionApplicationMutation,
  useListAdoptionApplicationsQuery,
  useGetAdoptionApplicationQuery,
  usePatchAdoptionApplicationMutation,
  useDeleteAdoptionApplicationMutation,
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
