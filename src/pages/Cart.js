import React, { useState, useEffect, useRef } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import './Shop.css';
const medicinePrices = {
  Paracetamol: 40,
  Amoxicillin: 60,
  Cetirizine: 30,
  Ibuprofen: 35,
};


const Cart = ({ cart, setCart }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0); // 0 = Cart, 1 = Address, 2 = Summary, 3 = Payment

  const hasAddedPrescription = useRef(false);


  useEffect(() => {
  if (hasAddedPrescription.current) return;

  const redirectedStep = searchParams.get('step');
  if (redirectedStep && !isNaN(redirectedStep)) {
    setStep(parseInt(redirectedStep));
  }

  const params = new URLSearchParams(location.search);
  const prescription = params.get('prescription');

  if (prescription) {
    let medicineNames = prescription
      .split(',')
      .map(med => med.trim().replace(/[\[\]"]+/g, ''))
      .filter(name => name && name !== 'Prescription:');

    // Remove duplicates already in cart
    medicineNames = medicineNames.filter(
      name => !cart.some(item => item.name === name)
    );

    const medicinesFromPrescription = medicineNames.map(name => ({
      name,
      price: medicinePrices[name] || 50,
      quantity: 1,
    }));

    if (medicinesFromPrescription.length > 0) {
      setCart(prev => [...prev, ...medicinesFromPrescription]);
    }

    hasAddedPrescription.current = true; // 🔐 Prevent duplicate runs
  }
}, [location.search, setCart]);

  const [form, setForm] = useState({
    fullName: '',
    fullAddress: '',
    phone: '',
    altPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('COD');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const email = localStorage.getItem('email');

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  

const handlePlaceOrder = async () => {
  if (!selectedPayment || (selectedPayment === 'UPI' && !selectedUpiApp)) {
    alert('Please select a payment method' + (selectedPayment === 'UPI' ? ' and UPI app' : ''));
    return;
  }
const storedUser = JSON.parse(localStorage.getItem('user'));
const userEmail = storedUser?.email || null;


  const orderDetails = {
    email: userEmail,
    address: form,
    items: cart,
    total: payable
  };

  try {
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    });

    if (res.ok) {
      setOrderPlaced(true);
      setCart([]);
    } else {
      alert('Failed to place order');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong!');
  }
};





  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = 20;
  const payable = totalAmount + deliveryCharge;

  const handleQuantityChange = (i, delta) => {
    const updated = [...cart];
    updated[i].quantity = Math.max(1, updated[i].quantity + delta);
    setCart(updated);
  };
  

  const handleRemove = (i) => {
    const updated = [...cart];
    updated.splice(i, 1);
    setCart(updated);
  };

  const handleOrderPlace = () => {
    if (!selectedPayment || (selectedPayment === 'UPI' && !selectedUpiApp)) {
      alert('Please select a payment method' + (selectedPayment === 'UPI' ? ' and UPI app' : ''));
      return;
    }
    setOrderPlaced(true);
    setCart([]);
  };

  const StepIndicator = () => (
    <div className="step-indicator">
      <span className={step >= 1 ? 'active' : ''}>📍 Address</span> →
      <span className={step >= 2 ? 'active' : ''}>📦 Summary</span> →
      <span className={step === 3 ? 'active' : ''}>💳 Payment</span>
    </div>
  );

  if (orderPlaced) {
    return (
      <div className="shop-container">
        <div className="order-animation active">🎉</div>
        <h2>✅ Thank you! Your order is placed.</h2>
        <p>Your ID: #{Math.floor(Math.random() * 900000 + 100000)}</p>
      </div>
    );
  }

  // 0) Cart View
  if (step === 0) {
    return (
      <div className="shop-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> : (
          <>
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <span>{item.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(i, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(i, 1)}>+</button>
                </div>
                <span>₹{item.price * item.quantity}</span>
                <button onClick={() => handleRemove(i)}>Remove</button>
              </div>
            ))}
            <div className="cart-total-row">
              <div className="cart-total"><strong>Total:</strong> ₹{totalAmount}</div>
              <button
                className="buy-now-btn"
                onClick={() => {
                  if (totalAmount < 100) return alert('₹100 minimum');
                  setStep(1);
                }}
              >Buy Now</button>
            </div>
          </>
        )}
      </div>
    );
  }

  // 1) Address Form
  if (step === 1) {
    return (
      <div className="shop-container">
        <h2>Delivery Address</h2>
        <StepIndicator />
        <form
          className="checkout-form"
          onSubmit={e => {
            e.preventDefault();
            const newErrors = {};
            if (!form.fullName.trim()) newErrors.fullName = 'Required';
            if (!form.fullAddress.trim()) newErrors.fullAddress = 'Required';
            if (!form.phone.trim()) newErrors.phone = 'Required';
            return Object.keys(newErrors).length
              ? setErrors(newErrors)
              : setStep(2);
          }}
        >
          <input name="fullName" placeholder="Full Name" value={form.fullName}
            onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '' }); }}
            className={errors.fullName ? 'input-error' : ''}
          />
          <textarea name="fullAddress" placeholder="Full Address" value={form.fullAddress}
            onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '' }); }}
            className={errors.fullAddress ? 'input-error' : ''}
          />
          <input name="phone" placeholder="Phone Number" value={form.phone}
            onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '' }); }}
            className={errors.phone ? 'input-error' : ''}
          />
          <input name="altPhone" placeholder="Alt Phone (optional)" value={form.altPhone}
            onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <div className="checkout-buttons">
            <button type="button" className="back-btn" onClick={() => setStep(0)}>Back to Cart</button>
            <button type="submit" className="continue-btn">Continue</button>
          </div>
        </form>
      </div>
    );
  }

  // 2) Order Summary
  if (step === 2) {
    return (
      <div className="shop-container">
        <h2>Order Summary</h2>
        <StepIndicator />
        <div className="summary-address">
          <strong>Deliver To:</strong>
          <p>{form.fullName}</p>
          <p>{form.fullAddress}</p>
          <p>{form.phone}</p>
        </div>
        <div className="order-items">
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="cart-item"><strong>Total:</strong> ₹{totalAmount}</div>
        </div>
        <div className="checkout-buttons">
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={() => setStep(3)}>Continue to Payment</button>
        </div>
      </div>
    );
  }

// 3) Payment
if (step === 3) {
  const handleUpiPayment = (selectedApp, amount) => {
  const upiIds = {
    googlepay: 'test@okaxis',
    phonepe: 'test@ybl',
    paytm: 'test@paytm',
  };

  const upiId = upiIds[selectedApp?.toLowerCase()]; // ensure lowercase + safe access

  if (!upiId) {
    alert('Please select a valid UPI app to continue.');
    return;
  }

  const upiUrl = `upi://pay?pa=${upiId}&pn=Your Store&am=${amount}&cu=INR`;
  window.location.href = upiUrl;
};



  return (
    <div className="shop-container">
      <h2>Payment</h2>
      <StepIndicator />
      <div className="payment-box">
        <h4>Select Payment Method</h4>
        <div className="payment-methods">
          {[
            { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
            { id: 'UPI', label: 'UPI', icon: '📱' },
            { id: 'Card', label: 'Credit/Debit Card', icon: '💳' },
            { id: 'NetBanking', label: 'Net Banking', icon: '🏦' }
          ].map(opt => (
            <label
              key={opt.id}
              className={`payment-option ${selectedPayment === opt.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedPayment(opt.id);
                setSelectedUpiApp('');
                setSelectedBank('');
              }}
            >
              <input
                type="radio"
                className="payment-radio"
                readOnly
                checked={selectedPayment === opt.id}
              />
              <span className="payment-icon">{opt.icon}</span>
              <span className="payment-label">{opt.label}</span>
            </label>
          ))}
        </div>

        {selectedPayment === 'UPI' && (
          <div className="upi-apps-section">
            <h5 className="section-title">Select UPI App</h5>
            <div className="upi-apps-list">
              {['Google Pay', 'PhonePe', 'Paytm'].map((label) => {
                const id = label.toLowerCase().replace(/\s/g, '');
                return (
                  <div key={id} className="upi-app-wrapper">
                    <label
                      className={`upi-app-item ${selectedUpiApp === id ? 'selected' : ''}`}
                      onClick={() => setSelectedUpiApp(id)}
                    >
                      <input
                        type="radio"
                        name="upiApp"
                        value={id}
                        checked={selectedUpiApp === id}
                        readOnly
                        hidden
                      />
                      <span>{label}</span>
                    </label>
                    {selectedUpiApp === id && (
                      <div className="upi-action-box">
                        <div className="total-section">
                          <strong>Total Price: </strong>₹{cartTotal + 20}
                          <span className="delivery-note">(including ₹20 delivery)</span>
                        </div>
                        <button className="pay-now-btn" onClick={handleUpiPayment}>
                          Pay Now via {label}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedPayment === 'Card' && (
          <div className="card-payment-section">
            <h5 className="section-title">Enter Card Details</h5>
            <div className="card-inputs">
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Name on Card" />
              <div className="card-details-row">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
              </div>
              <div className="total-section">
                <strong>Total Price: </strong>₹{cartTotal + 20}
              </div>
              <button
                  className="pay-now-btn"
                  onClick={() => handleUpiPayment(selectedUpiApp, cartTotal + 20)}>
                  Pay Now
                </button>


            </div>
          </div>
        )}

        {selectedPayment === 'NetBanking' && (
          <div className="netbanking-section">
            <h5 className="section-title">Select Bank</h5>
            <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
              <option value="">-- Choose Bank --</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="AXIS">Axis Bank</option>
              <option value="KOTAK">Kotak Mahindra</option>
            </select>
            {selectedBank && (
              <div className="netbanking-action">
                <div className="total-section">
                  <strong>Total Price: </strong>₹{cartTotal + 20}
                </div>
                <button className="pay-now-btn" onClick={handlePlaceOrder}>
                  Pay via {selectedBank}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="order-summary-panel">
        <p><strong>Items:</strong> ₹{totalAmount}</p>
        <p><strong>Delivery:</strong> ₹{deliveryCharge}</p>
        <hr />
        <p><strong>Payable: ₹{payable}</strong></p>
      </div>

      <div className="checkout-buttons">
        <button className="back-btn" onClick={() => setStep(2)}>Back</button>
        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}

  return null;
};

export default Cart;
