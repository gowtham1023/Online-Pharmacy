import React from 'react';

const OrderConfirmation = () => {
  const order = JSON.parse(localStorage.getItem('orderDetails'));

  return (
    <div className="order-confirmation">
      <h2>✅ Order Confirmed!</h2>
      <p>Thanks for shopping with us, {order?.user.name}!</p>
      <h4>Shipping To:</h4>
      <p>{order?.user.address}</p>
      <h4>Your Items:</h4>
      <ul>
        {order?.items.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
