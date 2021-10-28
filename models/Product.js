const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  establishment_id: {
    type: Number,
    required: true
  },
  product_type: {
    type: String,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  order_id: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  elaboration_date: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema);

export default Product;