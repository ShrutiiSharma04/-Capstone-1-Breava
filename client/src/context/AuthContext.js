// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep axios header in sync
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      // fetch user profile
      axios.get(`${API_BASE}/api/auth/me`)
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // Helper to handle signup/signin flows
  const handleAuth = async (path, payload) => {
    const res = await axios.post(`${API_BASE}/api/auth/${path}`, payload);
    const newToken = res.data.token;
    setToken(newToken);
    localStorage.setItem('token', newToken);
    // fetch user
    const userRes = await axios.get(`${API_BASE}/api/auth/me`);
    setUser(userRes.data);
  };

  const login  = creds => handleAuth('signin', creds);
  const signup = data  => handleAuth('signup', data);
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn: !!user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
