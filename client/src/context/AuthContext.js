// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE = 'http://localhost:5000';
// Ensure all axios calls point to the backend
axios.defaults.baseURL = API_BASE;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Whenever token changes, set or remove the auth header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  // Sign in: store JWT
  const login = async ({ email, password }) => {
    const res = await axios.post('/api/auth/signin', { email, password });
    const { token: newToken } = res.data;
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Sign up: store JWT
  const signup = async ({ name, email, password }) => {
    const res = await axios.post('/api/auth/signup', { name, email, password });
    const { token: newToken } = res.data;
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Logout: clear JWT
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn: !!token, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
