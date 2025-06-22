// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);

      if (res.data.success) {
        navigate('/login');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" name="fullName"
          value={form.fullName} onChange={handleChange} required />
        <input type="text" placeholder="Phone" name="phone"
          value={form.phone} onChange={handleChange} required />
        <input type="email" placeholder="Email" name="email"
          value={form.email} onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password"
          value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
