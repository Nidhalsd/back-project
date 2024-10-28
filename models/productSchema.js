
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  poster: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Brands', 'Skincare', 'Makeup', 'Fragrance'],
  }
});

module.exports = mongoose.model('Product', productSchema);
