import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderSuccess.css'; // Optional styling

const OrderSuccess = () => {
  const location = useLocation();
  const form = location.state?.form;

  if (!form) {
    return <p>Order not found. Please go back to home.</p>;
  }

  return (
    <div className="order-success-page">
      <h2>🎉 Order Placed Successfully!</h2>
      <p><strong>Name:</strong> {form.name}</p>
      <p><strong>Address:</strong> {form.address}</p>
      <p><strong>Email:</strong> {form.email}</p>
      <p>We’ve sent a confirmation to your email.</p>
    </div>
  );
};

export default OrderSuccess;
