const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true
  },
  client_id: {
    type: Number,
    required: true
  },
  delivery_date: {
    type: Date,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;