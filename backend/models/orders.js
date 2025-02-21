const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  paintingTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true, // Added
  },
  customerPhone: {
    type: String,
    required: true, // Added
    match: /^[0-9]{10}$/, // Ensures 10-digit phone number
  },
});

module.exports = mongoose.model("Order", orderSchema);