import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import StoriesList from "./Story/StoriesList";
import ManageStaffPage from "./Manage/ManageStaffPage";
import AccountProfile from "./accounts/AccountProfile";
import { useState, useEffect } from "react";
import UpdatePet from "./pets/UpdatePet";
import ManagePetPage from "./Manage/ManagePetPage";
import ApplicationDetail from "./applications/ApplicationDetail";
import ManageStoryPage from "./Manage/ManageStoryPage";
import { Container } from "@mui/material";

function App() {

  return (
    <>
      <BrowserRouter>
        <Container className='pt-2 pb-0 mb-0'>
          <DrawerAppBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='/applications' element={<ApplicationList />} /> */}
            <Route path='/manage/applications' element={<ApplicationList />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/pets' element={<PetsList />} />
            <Route path='/pets/:petId' element={<UpdatePet />} />
            <Route path='/pets/create' element={<PetForm />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='applications/:applicationId/stories/new'
              element={<StoryForm />}
            />
            <Route path='/stories/:storyId' element={<StoryDetail />} />
            <Route path='/stories' element={<StoriesList />} />
            <Route path='/accounts/profile' element={<AccountProfile />} />
            <Route path='/manage/staff' element={<ManageStaffPage />} />
            <Route path='/manage/pets' element={<ManagePetPage />} />
            <Route path='/manage/stories' element={<ManageStoryPage />} />
            <Route
              path='/manage/applications/:applicationId'
              element={<ApplicationDetail />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
