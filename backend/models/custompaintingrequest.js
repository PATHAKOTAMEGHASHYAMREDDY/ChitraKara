const mongoose = require("mongoose");

const customPaintingRequestSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String, // Added phone number field
  imageUrl: String,
  artist: String,
  status: { type: String, default: "pending" },
  customerEmail: String,
});

module.exports = mongoose.model("CustomPaintingRequest", customPaintingRequestSchema);