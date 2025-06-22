// server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');
const prescriptionRoutes = require('./routes/prescription');
const ocrRoute = require('./routes/ocr');
const medicineRoute = require('./routes/medicine');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/medicineDB';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', prescriptionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/ocr', ocrRoute);
app.use('/api/medicine', medicineRoute);


// DB Connection + Server start
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));


