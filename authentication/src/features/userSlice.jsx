// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  users: Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [],
  isAuthenticated: Cookies.get('isAuthenticated') === 'true',
  currentUser: Cookies.get('currentUser') ? JSON.parse(Cookies.get('currentUser')) : null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      Cookies.set('users', JSON.stringify(state.users), { expires: 7 }); // Store users in cookies for 7 days
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
      Cookies.set('users', JSON.stringify(state.users), { expires: 7 });
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.username !== action.payload);
      Cookies.set('users', JSON.stringify(state.users), { expires: 7 });
    },
    loginUser: (state, action) => {
      const user = state.users.find(
        user => user.username === action.payload.username && user.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
        Cookies.set('isAuthenticated', 'true', { expires: 7 });
        Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      Cookies.remove('isAuthenticated');
      Cookies.remove('currentUser');
    },
    restoreSession: (state) => {
      const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
      const currentUser = Cookies.get('currentUser') ? JSON.parse(Cookies.get('currentUser')) : null;
      const users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
      state.isAuthenticated = isAuthenticated;
      state.currentUser = currentUser;
      state.users = users;
    },
  },
});

export const { setUsers, addUser, removeUser, loginUser, logoutUser, restoreSession } = userSlice.actions;
export default userSlice.reducer;
