const express = require('express');
const Product = require('../model/Product'); 

const router = express.Router();


// ✅ This route gets ALL products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Get all products
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET product by ID   products/id/:id

router.get('/products/id/:id', async (req, res) => {
    const id = req.params.id;
    console.log("Requested is : " , id);
  try {
    const product = await Product.findById(id);
    
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID or server error' });
  }
});



module.exports = router;













