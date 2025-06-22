// ✅ Updated AuthPage.js (Frontend SignUp Form)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import axios from 'axios';

const AuthPage = ({ setIsLoggedIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',  // ✅ changed from name to fullName
    phone: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setIsSignIn((prev) => !prev);
    setFormData({ fullName: '', phone: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const res = await axios.post('http://localhost:5000/api/auth/signin', {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          navigate('/');
        } else {
          alert(res.data.message || 'Login failed');
        }
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          alert('Signup successful! Please log in.');
          setIsSignIn(true);
        } else {
          alert(res.data.message || 'Signup failed');
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Server Error');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

        {!isSignIn && (
          <>
            <input
              type="text"
              name="fullName"  // ✅ use fullName
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>

        <p className="switch-text">
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={toggleMode}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
