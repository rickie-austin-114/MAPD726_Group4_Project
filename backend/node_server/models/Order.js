const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  image: {
    type: String,
    default:
      "https://static-new.lhw.com/HotelImages/Final/LW2014/lw2014_157584350_720x450.jpg",
  }, // Default image URL
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
