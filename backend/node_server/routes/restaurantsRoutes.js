const express = require("express")
const Restaurant = require("../models/Restaurant"); // User model
const router = express.Router();



// GET all tours
router.get("/", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    const restaurants = await Restaurant.find({
      name: { $regex: new RegExp(`^${search}`, "i") },
    }); // 'i' for case-insensitive
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a single destination by id
router.get("/:location", async (req, res) => {
  try {
    let tour = await Restaurant.find({ location: req.params.location });
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST a new tour
router.post("/", async (req, res) => {
  const { name, ratings, location, description, price , image,  } = req.body;

  const tour = new Restaurant({
    name, ratings, location, description, price , image, 
  });

  try {
    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tour with this name already exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

// PUT update a tour by name
router.put("/:id", async (req, res) => {
  try {
    const { name, ratings, location, description, price , image  } = req.body;

    const updateData = {
        name, ratings, location, description, price , image 
    };

    const updatedTour = await Tour.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTour)
      return res.status(404).json({ message: "Tour not found" });
    res.json(updatedTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a tours
router.delete("/:id", async (req, res) => {
  try {
    const result = await Restaurant.findByIdAndDelete(req.params.id);
    if (result) {
      return res
        .status(200)
        .json({ message: `Successfully deleted tour with id` });
    } else {
      return res.status(400).json({ error: "tour not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: "error" });
  }
  return res.status(400).json({ error: "tour not found" });
});


module.exports = router;