import React, { useState } from 'react';
import './Account.css';  // Optional CSS file for styling

const Account = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account details saved!\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`);
    // Here you can add more functionality like saving to a backend
  };

  return (
    <div className="account-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>My Account</h2>
      <form onSubmit={handleSubmit} className="account-form">
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Phone:
          <input 
            type="tel" 
            name="phone" 
            value={user.phone} 
            onChange={handleChange} 
            placeholder="Enter your phone number"
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Account;
