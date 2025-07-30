const express = require("express");
const Cart = require("../model/Cart");
const router = express.Router();

// POST /api/cart

router.post("/", async (req, res) => {
  console.log("POST /api/cart called", req.body);

  const { userId, productId, imageURL, price } = req.body;

  const existingItem = await Cart.findOne({ userId, productId });
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else {
    await Cart.create({ userId, productId, quantity: 1, imageURL, price });
  }

  res.status(200).json({ message: "Added to cart" });
});

router.get("/", async (req, res) => {
  const { userId } = req.query;

  const cartItems = await Cart.find({ userId }).populate("productId"); // Populate if you store full ref
  res.json(cartItems);
});

router.delete("/", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await Cart.deleteOne({ userId, productId });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// PUT /api/cart
router.put("/", async (req, res) => {
  const { userId, productId, delta } = req.body;

  try {
    const item = await Cart.findOne({ userId, productId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += delta;
    if (item.quantity <= 0) {
      await item.deleteOne();
    } else {
      await item.save();
    }

    res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
});


module.exports = router;
