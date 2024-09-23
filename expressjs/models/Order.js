// models/Order.js (Example with Mongoose for MongoDB)
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  transactionId: String,
  customerId: String,
  amount: Number,
  currency: String,
  status: String,
  items: Array,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
 