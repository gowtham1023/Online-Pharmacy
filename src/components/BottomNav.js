import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = ({ cart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <button className={isActive('/') ? 'active' : ''} onClick={() => navigate('/')}>🏠<br />Home</button>
      <button className={isActive('/cart') ? 'active' : ''} onClick={() => navigate('/cart')}>🛒<br />Cart ({cart.length})</button>
      <button className={isActive('/order-via-prescription') ? 'active' : ''} onClick={() => navigate('/order-via-prescription')}>📋<br />Order</button>
      <button className={isActive('/account') ? 'active' : ''} onClick={() => navigate('/account')}>👤<br />Account</button>
    </nav>
  );
};

export default BottomNav;
