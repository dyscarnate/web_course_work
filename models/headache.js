// models/headache.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const headacheSchema = new Schema({
  level: { type: Number, required: true, min: 1, max: 10 },
  comment: { type: String, required: false },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

const Headache = mongoose.model("Headache", headacheSchema);

module.exports = Headache;
