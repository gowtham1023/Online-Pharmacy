import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ProductList.css';

const predefinedMedicines = [
  { id: 1, name: 'Paracetamol', price: 10, image: '/t1.jpg' },
  { id: 2, name: 'Amoxicillin', price: 20, image: '/t2.jpeg' },
  { id: 3, name: 'Ibuprofen', price: 15, image: '/t3.jpg' },
  { id: 4, name: 'Aspirin', price: 18, image: '/t4.jpg' },
  { id: 5, name: 'Cetirizine', price: 12, image: '/t5.jpg' },
  { id: 6, name: 'Azithromycin', price: 25, image: '/t6.jpg' },
  { id: 7, name: 'Metformin', price: 30, image: '/t7.jpg' },
  { id: 8, name: 'Loratadine', price: 14, image: '/t8.jpg' },
  { id: 9, name: 'Ciprofloxacin', price: 22, image: '/t9.jpg' },
  { id: 10, name: 'Doxycycline', price: 28, image: '/t10.jpeg' },
  { id: 11, name: 'Omeprazole', price: 18, image: '/t11.jpg' },
  { id: 12, name: 'Ranitidine', price: 15, image: '/t12.jpg' },
  { id: 13, name: 'Prednisone', price: 35, image: '/t13.png' },
  { id: 14, name: 'Levothyroxine', price: 40, image: '/t14.jpg' },
  { id: 15, name: 'Hydrochlorothiazide', price: 25, image: '/t15.jpg' },
];
const carouselImages = [
  '/ph.jpg',
  '/ph2.jpg',
  '/ph3.jpg',
  '/ph4.jpg',
];



const ProductList = ({ addToCart, searchTerm, setSearchTerm }) => {
  const [results, setResults] = useState(predefinedMedicines);
  const [currentSlide, setCurrentSlide] = useState(0);
  const inputFileRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm.trim()) {
        setResults(predefinedMedicines);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/medicine/search?q=${searchTerm}`);
        const backendResults = res.data.map((item, index) => ({
          id: `dynamic-${index}`,
          name: item.name,
          price: item.price,
          image: item.image || `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`,
        }));

        setResults(backendResults);
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchData, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.start();
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setSearchTerm(spokenText);
    };
    recognition.onerror = () => {
      alert('Voice recognition error. Please try again.');
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Image "${file.name}" uploaded. Please enter medicine name in the search box.`);
      e.target.value = null;
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="product-list">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search medicines..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-icons">
          <button className="icon-btn" onClick={handleVoiceSearch} title="Voice Search">🎤</button>
          <button className="icon-btn" onClick={() => inputFileRef.current.click()} title="Upload Image">📷</button>
          <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        </div>
      </div>

      {/* Carousel - only show when not searching */}
      {!searchTerm.trim() && (
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={prevSlide}>❮</button>
          <img src={carouselImages[currentSlide]} alt={`slide-${currentSlide}`} className="carousel-img" />
          <button className="carousel-btn right" onClick={nextSlide}>❯</button>
        </div>
      )}

      {results.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <div className="product-grid">
          {results.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-img" />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;