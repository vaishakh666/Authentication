// src/Components/Home.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);
  const username = currentUser?.username || 'Guest';

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username}!</h1>
      <p>This is the home page.</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}
