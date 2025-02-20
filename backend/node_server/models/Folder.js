const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }]
});

module.exports = mongoose.model('Folder', folderSchema);