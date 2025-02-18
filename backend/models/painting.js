const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  contact: { type: String, required: true },
  artist: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Painting = mongoose.model("Painting", paintingSchema);
module.exports = Painting;
