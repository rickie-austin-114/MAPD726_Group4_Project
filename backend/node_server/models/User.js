// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "unknown" },
  phone: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  age: { type: Number, default: null},
  gender: { type: String, default: null},
  profilePicture: { type: String, default: null },
  minimumBudget: { type: Number, default: 0},
  maximumBudget: { type: Number, default: 100000},
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);