// src/Components/Dataset.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, setUsers } from '../features/userSlice';
import './Dataset.css';

export default function Dataset() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRegisteringAdmin, setIsRegisteringAdmin] = useState(false);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize users from cookies if available on first load
    dispatch(setUsers(users));
  }, [dispatch, users]);

  const handleRegister = () => {
    if (!username || !password) {
      alert('Username and Password are required!');
      return;
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Username already exists!');
      return;
    }

    dispatch(addUser({ username, password, isAdmin }));
    setUsername('');
    setPassword('');
    setIsAdmin(false);
    setShowModal(false);
  };

  const handleRemoveUser = (usernameToRemove) => {
    dispatch(removeUser(usernameToRemove));
    alert(`${usernameToRemove} has been removed.`);
  };

  const handleSetAdminClick = () => {
    setIsRegisteringAdmin(true);
    setIsAdmin(true);
    setShowModal(true);
  };

  const handleSetUserClick = () => {
    setIsRegisteringAdmin(false);
    setShowModal(true);
  };

  return (
    <div className="dataset-container">
      <h2>Dataset Actions</h2>
      <nav className="dataset-nav">
        <button onClick={handleSetAdminClick} className="dataset-button">Set Admin</button>
        <button onClick={handleSetUserClick} className="dataset-button">Set User</button>
      </nav>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h3>{isRegisteringAdmin ? 'Register Admin' : 'Register User'}</h3>
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
            {isRegisteringAdmin && (
              <label>
                <input type="checkbox" checked={isAdmin} readOnly />
                Is Admin
              </label>
            )}
            <button onClick={handleRegister} className="register-button">Register</button>
          </div>
        </div>
      )}

      <h3>Registered Users</h3>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  <button onClick={() => handleRemoveUser(user.username)} className="remove-button">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users registered yet.</p>
      )}
    </div>
  );
}
