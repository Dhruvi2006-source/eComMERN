// routes/orders.js
const express = require('express');
const router = express.Router();

const orders = []; // replace with database call in production

router.get('/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.params.userId);
  res.json(userOrders);
});

router.post('/', (req, res) => {
  const { userId, products, total } = req.body;
  const newOrder = {
    _id: Date.now().toString(),
    userId,
    products,
    total,
    createdAt: new Date(),
  };
  orders.push(newOrder);
  res.json({ message: 'Order placed!', order: newOrder });
});

module.exports = router;
