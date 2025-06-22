const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: {
    type: Number,
    required: true
  },
  address: {
    fullName: String,
    fullAddress: String,
    phone: String,
    altPhone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
