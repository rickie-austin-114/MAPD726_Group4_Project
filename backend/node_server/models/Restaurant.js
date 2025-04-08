const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, default: "A Hotel" },
  price: { type: Number, required: true },
  ratings: { type: Number, default: 4.5 },
  image: {
    type: String,
    default:
      "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg",
  }, // Default image URL
  amenities: [{ type: String }],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      rating: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
