import { useEffect } from "react";
import Notification from "./Notification";
import PetCard from "./PetCard";
import { useGetTokenQuery, useListPetsQuery } from "./api";
import { ReconnectingWebSocket } from "./ReconnectiongWebsocket";
import "./App.css";

const socketUrl = `${process.env.REACT_APP_WS_HOST}/ws`;
const socket = new ReconnectingWebSocket(socketUrl);

function App() {
  const { data: petData, isError, isLoading, refetch } = useListPetsQuery();
  const { data: tokenData } = useGetTokenQuery();
  const isStaff =
    tokenData && tokenData.account && tokenData.account.roles.includes("staff");
  const accountId = tokenData && tokenData.account && tokenData.account.id;
  console.log(accountId);

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
    </div>
  );
}

export default App;
