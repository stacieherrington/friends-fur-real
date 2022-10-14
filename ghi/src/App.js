import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './DrawerAppBar';
import ApplicationList from './applications/ApplicationsList';
import HomePage from './Homepage';
import NavBar from './nav';

function App() {

  return (
    <>
      <BrowserRouter>
        <DrawerAppBar />
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/applications" element={<ApplicationList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
