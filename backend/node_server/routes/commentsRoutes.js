const express = require("express");
const Comment = require("../models/Comment"); // User model
const Tour = require("../models/Tour"); // User model

const router = express.Router();

// CRUD Endpoints

// Create a comment
router.post("/", async (req, res) => {
  try {
    const {  content, author, tour } = req.body;

    console.log(req.body)
    const comment = new Comment({
      content,
      author,
      tour,
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a comment
router.get("/", async (req, res) => {
  // Read tours in a folder
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a comment
router.get("/:tourId", async (req, res) => {
  // Read tours in a folder
  console.log("received id")
  const { tourId } = req.params;
  try {
    const comments = await Comment.find({ tour: tourId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
