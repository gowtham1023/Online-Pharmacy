// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);

      if (res.data.success) {
        localStorage.setItem('userEmail', form.email);
        localStorage.setItem('isLoggedIn', 'true');
        onSuccess();
      } else {
        alert('Signup failed');
      }
    } catch (err) {
      alert('Error signing up');
    }
  };

  return (
    <div className="auth-form">
      <h2>📝 Sign Up</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
