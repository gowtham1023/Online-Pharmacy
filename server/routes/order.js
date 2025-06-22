router.post('/place', async (req, res) => {
  try {
    const { email, items, address, totalPrice } = req.body;

    const newOrder = new Order({
      email,
      items,
      address,
      totalPrice,
      placedAt: new Date()
    });

    await newOrder.save();

    res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

router.post('/user-orders', async (req, res) => {
  try {
    const { email } = req.body;
    const orders = await Order.find({ email }).sort({ placedAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});
