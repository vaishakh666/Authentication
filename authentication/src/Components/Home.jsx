// src/Components/Home.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, restoreSession } from '../features/userSlice';
import Cookies from 'js-cookie';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);
  const username = currentUser?.username || 'Guest';

  useEffect(() => {
    if (!currentUser) {
      const userInCookie = Cookies.get('currentUser') ? JSON.parse(Cookies.get('currentUser')) : null; 
      if (userInCookie) {
        dispatch(restoreSession());
      } else {
        navigate('/');
      }
    }
    
  }, [currentUser, dispatch, navigate]);
  

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username}!</h1>
      <p>This is the home page.</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}
