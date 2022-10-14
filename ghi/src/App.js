import { useEffect } from "react";
import Notification from "./Notification";
import PetCard from "./components/PetCard";
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DrawerAppBar from "./DrawerAppBar";
import HomePage from "./Homepage";
import NavBar from "./Nav";
const socketUrl = `${process.env.REACT_APP_WS_HOST}/ws`;
const socket = new ReconnectingWebSocket(socketUrl);

function App() {
  const {
    data: aAddD,
    isError: aAddE,
    isLoading: aAddL,
    refetch: fAdd,
  } = usePatchAdoptionApplicationMutation("634990ee48e8840550d91a57");
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
  } = useGetAdoptionApplicationQuery("634990ee48e8840550d91a57");
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
  } = useGetSuccessStoryQuery("6349914148e8840550d91a58");

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
  } = useSingleAccountQuery("63488738f58d4c732b27d36e");
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
  } = useGetRescueQuery("634991b548e8840550d91a59");
  const {
    data: petsData,
    isError: petsError,
    isLoading: petsLoading,
    refetch: petsRefetch,
  } = useGetPetQuery("6348d66848e8840550d91a55");
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

  // return (
  //   <div className='container my-4'>
  //     {isLoading ? (
  //       <Notification>
  //         Hey Gary, this webpage knows what you ate for lunch!
  //       </Notification>
  //     ) : isError ? (
  //       <Notification type='danger'>
  //         Could not read pet list. Please try again later.
  //       </Notification>
  //     ) : (
  //       <div className='pet-grid'>
  //         {petData.pets.map((pet) => (
  //           <PetCard
  //             key={pet.id}
  //             pet={pet}
  //             isStaff={isStaff}
  //             accountId={accountId}
  //           />

  //         ))}Hey Gary, this webpage knows what you ate for lunch!
  //       </div>
  //     )}
  //     <LoginModal />
  //     <SignupModal />
  //   </div>
  //   )
  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
