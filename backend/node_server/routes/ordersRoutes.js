const express = require("express")
const Order = require("../models/Order"); // User model
const router = express.Router();

// GET all tours
router.get("/", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    const restaurants = await Order.find({
      name: { $regex: new RegExp(`^${search}`, "i") },
    }); // 'i' for case-insensitive
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// POST a new tour
router.post("/", async (req, res) => {
  const { name, price , description, image  } = req.body;

  const tour = new Order({
    name, price , description, image,
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
    const { name, price , description, image, orderDate  } = req.body;

    const updateData = {
      name, price , description, image, orderDate 
    };

    const updatedTour = await Order.findOneAndUpdate(
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
    const result = await Order.findByIdAndDelete(req.params.id);
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