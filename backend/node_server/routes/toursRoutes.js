const express = require("express")
const Tour = require("../models/Tour"); // User model
const router = express.Router();



// GET all tours
router.get("/", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    const tours = await Tour.find({
      name: { $regex: new RegExp(`^${search}`, "i") },
    }); // 'i' for case-insensitive
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/category", async (req, res) => {
    try {    
      let search = req.query.search ?? "";
      let category = req.query.category ?? "Adventure";
        

      const tour = await Tour.find({
        name: { $regex: new RegExp(`^${search}`, "i") },
        category: category,
      });
  
      res.json(tour);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET a single destination by id
router.get("/:id", async (req, res) => {
  try {
    let tour = await Tour.findOne({ _id: req.params.id });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    tour = tour.toObject();
    // const crit = await isCritical(req.params.id);
    // destination.condition = crit;

    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST a new tour
router.post("/", async (req, res) => {
  const { name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture, category, latitude, longitude  } = req.body;

  const tour = new Tour({
    name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture, category, latitude, longitude
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
    const { name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture  } = req.body;

    const updateData = {
      updatedAt: Date.now(),
      name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture
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
    const result = await Tour.findByIdAndDelete(req.params.id);
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