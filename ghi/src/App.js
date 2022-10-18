import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './DrawerAppBar';
import ApplicationList from './applications/ApplicationsList';
import HomePage from './Homepage';
// import NavBar from './nav';
import LoginForm from './Login/Login';
import PetsList from './pets/PetsList';
import Signup from './Signup/Signup';
import StoryForm from './components/StoryForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        {/* <NavBar /> */}
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/applications" element={<ApplicationList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/pets" element={<PetsList />} />
            <Route path="/signup" element = {<Signup />} />
            <Route path="/login" element = {<LoginForm />} />
            <Route path="/stories/new" element={<StoryForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
