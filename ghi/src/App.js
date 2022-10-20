import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DrawerAppBar from "./DrawerAppBar";
import ApplicationList from "./applications/ApplicationsList";
import HomePage from "./Homepage";
// import NavBar from './nav';
import LoginForm from "./Login/Login";
import PetsList from "./pets/PetsList";
import Signup from "./Signup/Signup";
import PetForm from "./pets/PetForm";
import StoryForm from "./Story/StoryForm";
import StoryDetail from "./Story/StoryDetail";
import ApplicationForm from "./applications/ApplicationForm";
import ManageStaffPage from './Manage/ManageStaffPage';
import { useState, useEffect } from "react";

function App() {
  // globle roles state for now: 
  const [roles, setRoles] = useState([]);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const checkTokenUrl = `${process.env.REACT_APP_API_HOST}/token/`;
    const fetchConfig = {
      method: 'get',
      credentials: "include",
    }
    fetch(checkTokenUrl, fetchConfig)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setRoles(data.account.roles);
        }
      })
      .catch(e => console.error(e));
  }, [refresh])

  return (
    <>
      <BrowserRouter>
        <DrawerAppBar roles={roles} setRoles={setRoles} />
        {/* <NavBar /> */}
        <div className='container py-5'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/applications' element={<ApplicationList />} />
            <Route path='/applications/new' element={<ApplicationForm />} />
            <Route path='/login' element={<LoginForm setRefresh={setRefresh} />} />
            <Route path='/pets' element={<PetsList />} />
            <Route path='/pets/create' element={<PetForm />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='applications/:applicationId/stories/new' element={<StoryForm />} />
            <Route path='/stories/:storyId' element={<StoryDetail />} />
            <Route path="/manage/staff" element={<ManageStaffPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
