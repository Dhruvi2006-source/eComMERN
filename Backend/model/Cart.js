const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  imageURL: { type: String },
  price: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
