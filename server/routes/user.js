// GET /api/user/orders — fetch orders for a specific email
app.post('/api/user/orders', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});
