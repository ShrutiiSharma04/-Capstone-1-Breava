import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

export default function SignUp() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signup(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Breava branding */}
        <h1
          style={{
            fontFamily:'Lucida Sans',
            fontWeight: 800,
            fontSize: '3rem',
            color: '#d81b60',
            marginBottom: '0.2rem',
            textAlign: 'center'
          }}
        >
          Breava
        </h1>

        <h2 style={{ marginTop: 0, textAlign: 'center' }}>Sign Up</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>

        <div className="footer">
          Already have an account? <Link to="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
}