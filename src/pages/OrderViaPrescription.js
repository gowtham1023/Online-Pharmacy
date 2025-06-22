import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderViaPrescription.css';

const OrderViaPrescription = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert('Please upload a prescription image');

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/ocr', formData);
      const { medicines } = res.data;

      if (medicines && medicines.length > 0) {
        const encoded = encodeURIComponent(JSON.stringify(medicines));
        navigate(`/cart?step=1&prescription=${encoded}`);
      } else {
        alert('No medicines detected in the prescription.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to process prescription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-container">
      <div className="prescription-card">
        <h2 className="prescription-title">Upload Your Prescription</h2>

        <label className="custom-file-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          Choose Prescription Image
        </label>

        {preview && (
          <div className="prescription-preview">
            <img src={preview} alt="Prescription Preview" />
          </div>
        )}

        <div className="submit-button-wrapper">
          <button
            onClick={handleSubmit}
            className="prescription-submit-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Prescription'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderViaPrescription;
