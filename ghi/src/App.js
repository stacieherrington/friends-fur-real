import { useEffect } from "react";
import {
  useGetTokenQuery,
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
} from "./components/app/slices/authEndpoints";
import "./App.css";

function App() {
  // const {data, isError, isLoading, refetch } use
  const { data: tokenData } = useGetTokenQuery();
  const isStaff =
    tokenData && tokenData.account && tokenData.account.roles.includes("staff");
  const accountId = tokenData && tokenData.account && tokenData.account.id;
  return (
    <div>
      <h1>hello world!!!!!!</h1>
    </div>
  );
}

export default App;
