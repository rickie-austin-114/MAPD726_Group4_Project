const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "A Hotel" },
  price: { type: Number, required: true },
  ratings: { type: Number, default: 4.5 },
  category:  { type: String, default: "Plane" },
  speed: { type: Number, default: 900 }, // Speed in km/h
  image: {
    type: String,
    default:
      "https://rickie-austin-114.github.io/assets/air_canada.png",
  }, // Default image URL
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      rating: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Transport", transportSchema);
