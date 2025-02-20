const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
});

const Folder = mongoose.model('Folder', folderSchema);