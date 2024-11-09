// src/Components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, restoreSession } from '../features/userSlice';
import Cookies from 'js-cookie';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const handleLogin = () => {
    // Dispatch login action with username and password
    dispatch(loginUser({ username, password }));
    
    // If not in state, check if user data exists in cookies and restore session
    if (!isAuthenticated && Cookies.get('currentUser')) {
      dispatch(restoreSession());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  );
}
