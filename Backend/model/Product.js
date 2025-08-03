 
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  imageURL: String,
  image1: String,
  image2: String,
  image3: String,
  discription1: String,
  discription2: String,
  price: Number,
  category: String,
});

module.exports = mongoose.model("Product", ProductSchema, "fasion");
