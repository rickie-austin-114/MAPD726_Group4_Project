// models/Patient.js
const mongoose = require('mongoose');
// Patient schema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ratings: { type: Number, default: null },
  price: { type: Number, default: null },
  duration: { type: String, default: null },
  description: { type: String, default: null },
  itinerary: { type: String, default: null },
  inclusions: { type: String, default: null },
  exclusions: { type: String, default: null },
  profilePicture: { type: String, default: null },
  category: { type: String, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', tourSchema);