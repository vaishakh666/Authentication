// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.username !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        user => user.username === action.payload.username && user.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.setItem('isAuthenticated', JSON.stringify(false));
      localStorage.removeItem('currentUser');
    },
  },
});

export const { addUser, removeUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
