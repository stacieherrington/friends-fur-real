import { useEffect } from "react";
import Notification from "./Notification";
import PetCard from "./PetCard";
import {
  useGetTokenQuery,
  useListPetsQuery,
  useListAccountsQuery,
  useListRescuesQuery,
  useListSuccessStoryQuery,
  useListAdoptionApplicationsQuery,
  useGetAdoptionApplicationQuery,
  useGetSuccessStoryQuery,
  useSingleAccountQuery,
  useGetRescueQuery,
  useAddAdoptionApplicationMutation,
  usePatchAdoptionApplicationMutation,
  useGetPetQuery,
} from "./store/api";
import { ReconnectingWebSocket } from "./ReconnectiongWebsocket";
import "./App.css";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const socketUrl = `${process.env.REACT_APP_WS_HOST}/ws`;
const socket = new ReconnectingWebSocket(socketUrl);

function App() {
  const {
    data: aAddD,
    isError: aAddE,
    isLoading: aAddL,
    refetch: fAdd,
  } = usePatchAdoptionApplicationMutation("6349e0080f7972d806667b2d");
  const {
    data: applicationsData,
    isError: applicationsError,
    isLoading: applicationsLoading,
    refetch: fetchApplications,
  } = useListAdoptionApplicationsQuery();
  const {
    data: appData,
    isError: appError,
    isLoading: appLoad,
    refetch: oneApp,
  } = useGetAdoptionApplicationQuery("6349e0080f7972d806667b2d");
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
  } = useGetSuccessStoryQuery("6349e05a0f7972d806667b30");

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
    refetch: fAccount,
  } = useSingleAccountQuery("6349e02d0f7972d806667b2e");
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
  } = useGetRescueQuery("6349dfe50f7972d806667b2c");
  const {
    data: petsData,
    isError: petsError,
    isLoading: petsLoading,
    refetch: petsRefetch,
  } = useGetPetQuery("6349dfba0f7972d806667b2b");
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

export default App;
