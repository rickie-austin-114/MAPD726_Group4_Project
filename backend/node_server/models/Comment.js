const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, default: " " },
  author: { type: String, default: "Unnamed" },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);