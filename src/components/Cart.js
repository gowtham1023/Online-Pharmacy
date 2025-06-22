import React from 'react';

const Cart = ({ cart, updateCart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} - ₹{item.price}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateCart(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
