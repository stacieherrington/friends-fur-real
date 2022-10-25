import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccountEndpoints } from "./endpoints/accountEps";
import { PetEndpoints } from "./endpoints/petEps";
import { ApplicationEndpoints } from "./endpoints/applicationEps";
import { SuccessStoryEndpoints } from "./endpoints/successStoryEps";
// import { AccountEndpoints } from "./endpoints/unusedEps";
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
    ...AccountEndpoints(builder),
    ...ApplicationEndpoints(builder),
    ...PetEndpoints(builder),
    ...RescueEndpoints(builder),
    ...SuccessStoryEndpoints(builder),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetTokenQuery,
  useDeleteSessionsMutation,
  useListAccountsQuery,
  useSingleAccountQuery,
  usePatchUpdateAccountMutation,
  usePatchFavoritePetMutation,
  usePatchPromoteAccountMutation,
  usePatchDemoteAccountMutation,
  usePatchLocalizeAccountMutation,
  useAddApplicationMutation,
  useListAccountApplicationsQuery,
  useListRescueApplicationsQuery,
  useListAllApplicationsQuery,
  useGetApplicationQuery,
  usePatchApplicationMutation,
  useApproveApplicationMutation,
  useRejectApplicationMutation,
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
