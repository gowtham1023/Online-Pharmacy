import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Account from './pages/Account';
import OrderViaPrescription from './pages/OrderViaPrescription';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import HealthTips from './pages/HealthTips'; 
import './App.css';


function AppWrapper() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(checkLogin);
  }, []);

  return (
    <>
    <div style={{ backgroundColor: '#0d47a1', color: '#fff', padding: '10px 20px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
  MedStore
</div>

      <Routes>
        <Route
          path="/auth"
          element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home cart={cart} setCart={setCart} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/order-via-prescription"
          element={isLoggedIn ? <OrderViaPrescription cart={cart} setCart={setCart} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/auth" />}
        />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/auth'} />} />
        <Route path="/health-tips" element={<HealthTips />} />
      </Routes>
       {/* ✅ Bottom NavBar only when logged in */}
      {isLoggedIn && <Navbar cart={cart} />}
    </>
    
  );
}

function App() {
  return (
    <Router>
      <div className="main-container">
        <AppWrapper />
      </div>
    </Router>
  );
}

export default App;
