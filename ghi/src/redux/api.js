import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthEndpoints } from "./endpoints/authEps";
import { PetEndpoints } from "./endpoints/petEps";
import { ApplicationEndpoints } from "./endpoints/applicationEps";
import { SuccessStoryEndpoints } from "./endpoints/successStoryEps";
import { AccountEndpoints } from "./endpoints/accountEps";
import { RescueEndpoints } from "./endpoints/rescueEps";

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
    "Pet",
    "Application",
    "SuccessStory",
    "Rescue",
  ],
  endpoints: (builder) => ({
    ...AuthEndpoints(builder),
    ...AccountEndpoints(builder),
    ...ApplicationEndpoints(builder),
    ...PetEndpoints(builder),
    ...RescueEndpoints(builder),
    ...SuccessStoryEndpoints(builder),
  }),
});

export const {
  useAddAccountMutation,
  useAddApplicationMutation,
  useAddPetMutation,
  useAddRescueMutation,
  useAddSuccessStoryMutation,
  useApproveApplicationMutation,
  useDeleteApplicationMutation,
  useDeletePetMutation,
  useDeleteRescueMutation,
  useDeleteSessionsMutation,
  useGetApplicationQuery,
  useGetCurrentAccountQuery,
  useGetPetQuery,
  useGetRescueQuery,
  useGetSuccessStoryQuery,
  useGetThreePetsQuery,
  useGetTokenQuery,
  useListAccountApplicationsQuery,
  useListAccountsQuery,
  useListAllApplicationsQuery,
  useListPetsQuery,
  useListRescueApplicationsQuery,
  useListRescuesQuery,
  useListRescueStoriesQuery,
  useListSuccessStoryQuery,
  useLoginMutation,
  useLogoutMutation,
  usePatchApplicationMutation,
  usePatchDemoteAccountMutation,
  usePatchLocalizeAccountMutation,
  usePatchPromoteAccountMutation,
  usePatchUpdateAccountMutation,
  usePutPetMutation,
  usePutRescueMutation,
  useRejectApplicationMutation,
  useSignupMutation,
  useSingleAccountQuery,
  useThreeRandomStoriesQuery,
} = apiSlice;
