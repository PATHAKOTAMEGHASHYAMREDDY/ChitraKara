const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "CustomPaintingRequest", required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);