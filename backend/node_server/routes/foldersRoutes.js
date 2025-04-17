const express = require("express")
const router = express.Router();
const Folder = require("../models/Folder"); // User model
const User = require("../models/User"); // User model
const Tour = require("../models/Tour"); // User model


// Create a folder
router.post('/', async (req, res) => {
    const { userId, name } = req.body;

    try {
      const folder = new Folder({ name, owner: userId, tours: [] });
      await folder.save();
      res.status(201).json(folder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Read all folders
  router.get('/', async (req, res) => {
    try {
      const folders = await Folder.find().populate('owner').populate('tours');
      res.json(folders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Read folders by user ID
  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const folders = await Folder.find({ owner: userId }).populate('tours');
      res.json(folders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// GET API endpoint to fetch folders and check for a specific tour
router.get('/user/:userId/tours/:tourId', async (req, res) => {
  const { userId, tourId } = req.params;

  try {
    // Fetch all folders owned by the user
    const folders = await Folder.find({ owner: userId }).populate('tours');

    // Map through folders to check if they contain the specified tour
    const result = folders.map(folder => ({
      id: folder._id,
      folderId: folder._id,
      name: folder.name,
      containsTour: folder.tours.some(tour => tour._id.toString() === tourId)
    }));

    // Send the response
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching folders.' });
  }
});

  
  // Read tours in a folder
  router.get('/:folderId/tours', async (req, res) => {
    const { folderId } = req.params;
  
    try {
      const folder = await Folder.findById(folderId).populate('tours');
      res.json(folder.tours);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update a folder by adding or removing a tour
router.post('/:folderId/tours/:tourId', async (req, res) => {
  const { folderId, tourId } = req.params;

  try {
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    if (folder.tours.includes(tourId)) {
      // Remove the tour from the folder
      folder.tours = folder.tours.filter(id => id.toString() !== tourId);
    } else {
      // Add the tour to the folder
      folder.tours.push(tourId);
    }

    await folder.save();
    const updatedFolder = await folder.populate('tours');
    res.json(updatedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
  
  // Update a folder by adding a tour
  router.put('/:folderId/tours/:tourId', async (req, res) => {
    const { folderId, tourId } = req.params;
  
    try {
      const folder = await Folder.findByIdAndUpdate(
        folderId,
        { $addToSet: { tours: tourId } },
        { new: true }
      ).populate('tours');
      res.json(folder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a tour from a folder
  router.delete('/:folderId/tours/:tourId', async (req, res) => {
    const { folderId, tourId } = req.params;
  
    try {
      const folder = await Folder.findByIdAndUpdate(
        folderId,
        { $pull: { tours: tourId } },
        { new: true }
      ).populate('tours');
      res.json(folder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a folder
  router.delete('/:folderId', async (req, res) => {
    const { folderId } = req.params;
  
    try {
      await Folder.findByIdAndDelete(folderId);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  

  module.exports = router;