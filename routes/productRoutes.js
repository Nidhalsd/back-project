// routes/productRoutes.js
const express = require('express');
const Product = require('../models/productSchema'); // Adjust the path based on your structure
const router = express.Router();

// Route for fetching products
router.get('/', async (req, res) => {
  const category = req.query.category;
  let products;

  try {
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching products', error: error.message });
  }
});

module.exports = router;
