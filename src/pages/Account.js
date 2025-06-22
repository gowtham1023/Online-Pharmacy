import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser?.email) return navigate('/auth');

      const res = await axios.post('http://localhost:5000/api/user/info', {
        email: storedUser.email
      });

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      alert('Failed to fetch user info');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/orders/user', {
        email: user.email
      });

      if (res.data.success) {
        setOrders(res.data.orders);
        setShowOrders(true);
      } else {
        alert('No orders found');
      }
    } catch (err) {
      alert('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/user/update', user);
      if (res.data.success) {
        alert('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify(user));
        setIsEditing(false);
      }
    } catch (err) {
      alert('Failed to update user info');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <div className="account-page">
      <h2>My Account</h2>

      <button className="info-toggle" onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'Hide Info' : 'My Info'}
      </button>

      {showInfo && (
        <div className="account-form">
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <input type="email" name="email" value={user.email} readOnly />
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Change</button>
          ) : (
            <button onClick={handleSave}>Save</button>
          )}
        </div>
      )}

     <button
  className="orders-btn"
  onClick={() => {
    if (!showOrders) {
      fetchOrders();
    } else {
      setShowOrders(false);
    }
  }}
>
  {showOrders ? 'Hide Orders' : 'My Orders'}
</button>


      {showOrders && (
        <div className="orders-section">
          <h3>Past Orders</h3>
          {orders.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="order-card">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} - ₹{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Address:</strong> {order.fulladdress}</p>
                <div>Name: {order.address?.fullName}</div>
                <div>Address: {order.address?.fullAddress}</div>
                <div>Phone: {order.address?.phone}</div>
                <div>Alt Phone: {order.address?.altPhone}</div>
              </div>
            ))
          )}
        </div>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Account;
