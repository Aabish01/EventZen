const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Vendor", vendorSchema);
