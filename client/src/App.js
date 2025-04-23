// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Diagnose from './pages/Diagnose';
import About from './pages/About';
import Records from './pages/Records';

function Layout() {
  const location = useLocation();
  // hide nav on these paths:
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && (
        <nav className="navbar">
          <Link to="/">Breava</Link>
          <div className="nav-links">
            <Link to="/diagnose">Diagnose</Link>
            <Link to="/about">About</Link>
            <Link to="/records">Records</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      )}
      <Routes>
        {/* Public pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected pages */}
        <Route
          path="/"
          element={<ProtectedRoute element={Home} />}
        />
        <Route
          path="/diagnose"
          element={<ProtectedRoute element={Diagnose} />}
        />
        <Route
          path="/about"
          element={<ProtectedRoute element={About} />}
        />
        <Route
          path="/records"
          element={<ProtectedRoute element={Records} />}
        />
      </Routes>
    </>
  )
}

function ProtectedRoute({ element: Element }) {
  const { isLoggedIn, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return isLoggedIn ? <Element /> : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
