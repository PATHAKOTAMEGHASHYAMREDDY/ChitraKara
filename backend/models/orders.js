const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    artistName: { type: String, required: true },
    paintingTitle: { type: String, required: true },
    price: { type: Number, required: true },
    contact: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;