import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Breava text centered and enlarged */}
        <h1
          style={{
            fontFamily: 'Lucida Sans',
            fontWeight: 800,
            fontSize: '3rem',
            color: '#d81b60',
            marginBottom: '0.2rem',
            textAlign: 'center'
          }}
        >
          Breava
        </h1>

        <h2 style={{ marginTop: 0, textAlign: 'center' }}>Login</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="footer">
          Not a member? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}