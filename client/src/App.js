// src/App.js
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignIn   from './pages/SignIn';
import SignUp   from './pages/SignUp';
import Home     from './pages/Home';
import Diagnose from './pages/Diagnose';
import About    from './pages/About';
import Records  from './pages/Records';
import Result   from './pages/Result';

function Layout() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && (
        <nav className="navbar">
          <Link to="/">Breava</Link>
          <div className="nav-links">
            {isLoggedIn && <span>Welcome, {user.name}!</span>}
            <Link to="/diagnose">Diagnose</Link>
            <Link to="/about">About</Link>
            <Link to="/records">Records</Link>
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      )}
      <Routes>
        {/* Public */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected */}
        <Route path="/"        element={<ProtectedRoute element={Home} />} />
        <Route path="/diagnose"element={<ProtectedRoute element={Diagnose} />} />
        <Route path="/about"   element={<ProtectedRoute element={About} />} />
        <Route path="/records" element={<ProtectedRoute element={Records} />} />
        <Route path="/result"  element={<ProtectedRoute element={Result} />} />
      </Routes>
    </>
  );
}

function ProtectedRoute({ element: Element }) {
  const { isLoggedIn, loading } = useContext(AuthContext);
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
