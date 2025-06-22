import React, { useState } from 'react';
import './Shop.css';

const medicinesData = [
  { id: 1, name: 'Paracetamol', price: 10 },
  { id: 2, name: 'Amoxicillin', price: 20 },
  { id: 3, name: 'Ibuprofen', price: 15 },
  { id: 4, name: 'Aspirin', price: 18 },
  { id: 5, name: 'Cetirizine', price: 12 },
  { id: 6, name: 'Azithromycin', price: 25 },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [prescription, setPrescription] = useState(null);

  // Filter medicines by search term
  const filteredMedicines = medicinesData.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (med) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === med.id);
      if (exists) {
        return prev.map((item) =>
          item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...med, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!prescription) {
      alert('Please upload a prescription to place order.');
      return;
    }
    alert(
      `Order placed successfully!\nName: ${form.name}\nTotal Amount: ₹${totalPrice}`
    );
    // Clear all
    setCart([]);
    setCheckout(false);
    setForm({ name: '', address: '', email: '' });
    setPrescription(null);
  };

  return (
    <div className="shop-container">
      {!checkout ? (
        <>
          <h2>Shop Medicines</h2>
          <input
            type="text"
            placeholder="Search medicines..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="medicines-list">
            {filteredMedicines.length === 0 && <p>No medicines found.</p>}
            {filteredMedicines.map((med) => (
              <div key={med.id} className="medicine-card">
                <h3>{med.name}</h3>
                <p>Price: ₹{med.price}</p>
                <button onClick={() => addToCart(med)}>Add to Cart</button>
              </div>
            ))}
          </div>

          <div className="cart-section">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                    <span>₹{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
                <h3>Total: ₹{totalPrice}</h3>
                <button onClick={() => setCheckout(true)}>Proceed to Checkout</button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="checkout-form-container">
          <h2>Checkout</h2>
          <form onSubmit={placeOrder} className="checkout-form">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleFormChange}
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={handleFormChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleFormChange}
              required
            />

            <label>
              Upload Prescription (Image or PDF):
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handlePrescriptionChange}
                required
              />
            </label>

            <div className="checkout-buttons">
              <button type="submit">Place Order</button>
              <button type="button" onClick={() => setCheckout(false)}>
                Back to Shop
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Shop;
