const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type:String, required: true },
    description: { type: String, default: "A Hotel" },
price: { type: Number, required: true },
  ratings: { type: Number, default: 4.5 },
  image: { type: String, default: "https://static-new.lhw.com/HotelImages/Final/LW2014/lw2014_157584350_720x450.jpg" }, // Default image URL
  amenities: [{ type: String }],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String },
      rating: { type: Number },
    },
  ],
});

module.exports = mongoose.model('Hotel', hotelSchema);