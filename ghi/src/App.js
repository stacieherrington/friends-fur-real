import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ApplicationList from './applications/ApplicationsList';
import HomePage from './Homepage';
import NavBar from './nav';

function App() {

  return (
    <>
      <BrowserRouter>
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
