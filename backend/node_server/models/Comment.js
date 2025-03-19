const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: " " },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tours: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);