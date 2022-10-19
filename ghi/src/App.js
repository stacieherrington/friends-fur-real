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
import StoriesList from "./Story/StoriesList";

function App() {
  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        {/* <NavBar /> */}
        <div className='container py-5'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/applications' element={<ApplicationList />} />
            <Route path='/applications/new' element={<ApplicationForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/pets' element={<PetsList />} />
            <Route path='/pets/create' element={<PetForm />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='applications/:applicationId/stories/new' element={<StoryForm />} />
            <Route path='/stories/:storyId' element={<StoryDetail />} />
            <Route path='/stories' element={<StoriesList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
