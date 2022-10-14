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
} from "./store/api";
import { ReconnectingWebSocket } from "./ReconnectiongWebsocket";
import "./App.css";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const socketUrl = `${process.env.REACT_APP_WS_HOST}/ws`;
const socket = new ReconnectingWebSocket(socketUrl);

function App() {
  const {
    data: applicationsData,
    isError: applicationsError,
    isLoading: applicationsLoading,
    refetch: fetchApplications,
  } = useListAdoptionApplicationsQuery();
  const {
    data: storiesData,
    isError: storiesError,
    isLoading: storiesLoading,
    refetch: fetchStory,
  } = useListSuccessStoryQuery();

  const {
    data: accountsData,
    isError: accountsError,
    isLoading: accountsLoading,
    refetch: fetchAccounts,
  } = useListAccountsQuery();
  const {
    data: rescuesData,
    isError: rescuesError,
    isLoading: rescuesLoading,
    refetch: fetchRescues,
  } = useListRescuesQuery();
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
        </div>
      )}
      <LoginModal />
      <SignupModal />
    </div>
  );
}

export default App;
