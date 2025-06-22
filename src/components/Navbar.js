import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cart }) => {
  const location = useLocation();
  const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bottom-navbar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <span role="img" aria-label="home">🏠</span><br />Home
      </Link>
      <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
        <span role="img" aria-label="cart">🛒</span><br />Cart {itemCount > 0 ? `(${itemCount})` : ''}
      </Link>
      <Link to="/order-via-prescription" className={location.pathname === '/order-via-prescription' ? 'active' : ''}>
        <span role="img" aria-label="rx">📄</span><br />Prescription
      </Link>
      <Link to="/account" className={location.pathname === '/account' ? 'active' : ''}>
        <span role="img" aria-label="account">👤</span><br />Account
      </Link>
      <li>
  <Link to="/health-tips" className={location.pathname === '/health-tips' ? 'active' : ''}>
  <span role="img" aria-label="health">🩺</span><br />Health Tips
</Link>

</li>


  
    </nav>
  );
};

export default Navbar;
