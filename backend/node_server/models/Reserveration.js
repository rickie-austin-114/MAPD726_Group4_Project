const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://static-new.lhw.com/HotelImages/Final/LW2014/lw2014_157584350_720x450.jpg",
  }, // Default image URL
  reservationDate: { type: Date, default: Date.now },
  checkInDate: { type: Date, default: Date.now },
  checkOutDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
