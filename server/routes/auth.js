const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (err) {
    console.warn('Signup Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error('Signin Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
