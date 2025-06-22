import React, { useState } from 'react';
import './CheckOut.css';

const Checkout = ({ placeOrder }) => {
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [prescription, setPrescription] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prescription) {
      alert('Please upload a prescription.');
      return;
    }

    console.log('Prescription:', prescription);
    placeOrder();
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <label>Upload Prescription (Image/PDF)</label>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} required />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;
