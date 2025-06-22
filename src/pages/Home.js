// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';
import './Home.css';

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/medicine/search?q=${searchTerm}`);
      const data = res.data.map((item, index) => ({
        id: item.rxcui || index,
        name: item.name,
        image: item.image,
        price: item.price,
      }));
      setProducts(data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🩺 Online Pharmacy</h1>
        <p>Search for any medicine and order instantly</p>
      </div>

      <ProductList
        products={products}
        addToCart={addToCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Home;
