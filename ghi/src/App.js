import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import DrawerAppBar from "./DrawerAppBar";
import AccountProfile from "./accounts/AccountProfile";
import ApplicationList from "./applications/ApplicationsList";
import ApplicationDetail from "./applications/ApplicationDetail";
import HomePage from "./Homepage";
import LoginForm from "./Login/Login";
import ManageStaffPage from "./Manage/ManageStaffPage";
import ManagePetPage from "./Manage/ManagePetPage";
import ManageStoryPage from "./Manage/ManageStoryPage";
import PetForm from "./pets/PetForm";
import PetsList from "./pets/PetsList";
import SignUpForm from "./Signup/Signup";
import StoryDetail from "./Story/StoryDetail";
import StoryForm from "./Story/StoryForm";
import StoriesList from "./Story/StoriesList";
import UpdatePet from "./pets/UpdatePet";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container className='pt-2 pb-0 mb-0'>
          <DrawerAppBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/manage/applications' element={<ApplicationList />} />
            <Route path='/pets' element={<PetsList />} />
            <Route path='/pets/:petId' element={<UpdatePet />} />
            <Route path='/pets/create' element={<PetForm />} />
            <Route
              path='/applications/:applicationId/stories/new'
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
          <SignUpForm />
          <LoginForm />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
