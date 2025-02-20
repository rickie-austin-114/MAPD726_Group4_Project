// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "unknown" },
  phone: { type: String, default: "(437) 343 - 3242" },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: "12345678" },
});

module.exports = mongoose.model('User', userSchema);