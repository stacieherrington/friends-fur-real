import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Homepage';
import NavBar from './nav';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container m-auto justify-content-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
