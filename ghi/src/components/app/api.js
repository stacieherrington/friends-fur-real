import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authEndpoints } from "./slices/authEndpoints";
import { petEndpoints } from "./slices/petEndpoints";
import { adoptionApplicationEndpoints } from "./slices/adoptionApplicationEndpoints";
import { successStoryEndpoints } from "./slices/successStorySliceEndpoints";
import { extraAccountEndpoints } from "./slices/extraAccountEndpoints";
import { rescueEndpoints } from './slices/rescueEndpoints'

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

