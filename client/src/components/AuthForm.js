import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await axios.post('http://localhost:5000' + url, formData);
      alert(`Success! Welcome ${res.data.user.name}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '2rem', border: '1px solid #ccc' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: '1rem' }}>
        {isLogin ? 'New here? Sign up' : 'Already have an account? Log in'}
      </p>
    </div>
  );
};

export default AuthForm;
