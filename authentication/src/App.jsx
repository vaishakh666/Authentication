// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from './features/userSlice';
import Dataset from './Components/Dataset';
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore session from cookies if available
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
