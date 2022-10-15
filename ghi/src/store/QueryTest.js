import { useEffect } from "react";
import Notification from "../Notification";
import PetCard from "../components/PetCard";
import {
  useGetTokenQuery,
  useListPetsQuery,
  useListAccountsQuery,
  useListRescuesQuery,
  useListSuccessStoryQuery,
  useListAccountApplicationsQuery,
  useListRescueApplicationsQuery,
  useGetApplicationQuery,
  useGetSuccessStoryQuery,
  useSingleAccountQuery,
  useGetRescueQuery,
  useAddApplicationMutation,
  usePatchApplicationMutation,
  useGetPetQuery,
} from "./api";
import { ReconnectingWebSocket } from "../ReconnectiongWebsocket";
import "../App.css";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";

const socketUrl = `${process.env.REACT_APP_WS_HOST}/ws`;
const socket = new ReconnectingWebSocket(socketUrl);

function QueryTest() {
  const [patchAdopt, { error: adoptError }] = usePatchApplicationMutation();
  const {
    data: accountApplicationsData,
    isError: accountApplicationsError,
    isLoading: accountApplicationsLoading,
    refetch: fetchAccountApplications,
  } = useListAccountApplicationsQuery();
  const {
    data: rescueApplicationData,
    isError: rescueApplicationError,
    isLoading: rescueApplicationLoading,
    refetch: fetchRescueApplications,
  } = useListRescueApplicationsQuery();
  const {
    data: appData,
    isError: appError,
    isLoading: appLoad,
    refetch: oneApp,
  } = useGetApplicationQuery();
  const {
    data: storiesData,
    isError: storiesError,
    isLoading: storiesLoading,
    refetch: fetchStories,
  } = useListSuccessStoryQuery();
  const {
    data: storyData,
    isError: storyError,
    isLoading: storyLoading,
    refetch: fetchStory,
  } = useGetSuccessStoryQuery();

  const {
    data: accountsData,
    isError: accountsError,
    isLoading: accountsLoading,
    refetch: fetchAccounts,
  } = useListAccountsQuery();
  const {
    data: accountD,
    isError: accountE,
    isLoading: accountL,
    refetch: accountR,
  } = useSingleAccountQuery();
  const {
    data: rescuesData,
    isError: rescuesError,
    isLoading: rescuesLoading,
    refetch: fetchRescues,
  } = useListRescuesQuery();
  const {
    data: rData,
    isError: rE,
    isLoading: rL,
    refetch: fR,
  } = useGetRescueQuery();
  const {
    data: petsData,
    isError: petsError,
    isLoading: petsLoading,
    refetch: petsRefetch,
  } = useGetPetQuery();
  const { data: petData, isError, isLoading, refetch } = useListPetsQuery();
  const { data: tokenData } = useGetTokenQuery();
  const isStaff =
    tokenData &&
    tokenData.account_id &&
    tokenData.account_id.roles.includes("staff");
  const accountId = tokenData && tokenData.account_id && tokenData.account_id;

  useEffect(() => {
    socket.addEventListener("message", ({ petData }) => {
      if (petData === "refetching") {
        refetch();
      }
    });
  }, [refetch]);

  return (
    <div className='container my-4'>
      {isLoading ? (
        <Notification>
          Hey Gary, this webpage knows what you ate for lunch!
        </Notification>
      ) : isError ? (
        <Notification type='danger'>
          Could not read pet list. Please try again later.
        </Notification>
      ) : (
        <div className='pet-grid'>
          {petData.pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isStaff={isStaff}
              accountId={accountId}
            />
          ))}
          Hey Gary, this webpage knows what you ate for lunch!
        </div>
      )}
      <LoginModal />
      <SignupModal />
    </div>
  );
}

export default QueryTest;
