const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ Route 1: Place a new order (already present)
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Error saving order' });
  }
});

// ✅ Route 2: Fetch orders for a specific user (added without affecting the above)
router.post('/user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
});

module.exports = router;
