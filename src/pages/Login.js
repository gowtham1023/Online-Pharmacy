// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSuccess, onFail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('userEmail', email);
        onSuccess();
      } else {
        alert('Login failed');
        onFail();
      }
    } catch (err) {
      alert('Error logging in');
      onFail();
    }
  };

  return (
    <div className="auth-form">
      <h2>🔐 Sign In</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;
