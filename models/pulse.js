// models/pulse.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pulseSchema = new Schema({
  pulse: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

const Pulse = mongoose.model("Pulse", pulseSchema);

module.exports = Pulse;
