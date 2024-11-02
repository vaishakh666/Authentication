// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Components/Login';
import Dataset from './Components/Dataset';
import Home from './Components/Home';


function App() {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Login />} />
        <Route 
          path="/dataset" 
          element={<Dataset /> } 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
