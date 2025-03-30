const express = require('express');
const User = require("../models/User"); // User model

const router = express.Router();

// CRUD Endpoints

// Create a user from google
router.post("/", async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;

    const existingUser = await User.findOne({ email: email });

    console.log(existingUser);
    
    if (!existingUser) {
      const user = new User({
        name,
        email,
        profilePicture,
      });
      await user.save();
      return res.status(201).json(user);
    }  else {
      return res.status(201).json(existingUser);
    }


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all users
router.get("/:id", async (req, res) => {
  try {
    const users = await User.find();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;