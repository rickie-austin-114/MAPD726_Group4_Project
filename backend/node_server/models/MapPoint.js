const mongoose = require('mongoose');

const mapPointSchema = new mongoose.Schema({
  name: { type: String, default: " " },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  description: { type: String, default: "A Beautiful Attraction" },
  location: { type: String, required: true },
});


module.exports = mongoose.model('MapPoint', mapPointSchema);
