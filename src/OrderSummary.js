import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Shop.css';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount } = location.state || {};
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [prescription, setPrescription] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    console.log('Order Placed:', {
      user: form,
      cart,
      totalAmount,
      prescription,
    });

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="shop-container">
        <h2>Thank you! Your order has been placed.</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h2>Order Summary</h2>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Full Address"
          rows={4}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>
          Upload Prescription (if any):
          <input
            type="file"
            onChange={(e) => setPrescription(e.target.files[0])}
          />
        </label>

        <h3>Items:</h3>
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <span>{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <h4>Total: ₹{totalAmount}</h4>

        <button type="submit">Confirm & Pay</button>
      </form>
    </div>
  );
};

export default OrderSummary;
