require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Stripe = require('stripe');

const cors = require("cors");

const User = require("./models/User"); // User model
const Tour = require("./models/Tour"); // Tour model
const Folder = require('./models/Folder'); // The Folder model we just created


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET = process.env.SECRET || "093rhufbigeryq3498rweihougotyhpq39reouwh";

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const stripe = new Stripe('sk_test_51QuLVCPlUnLIZAQCClpe9GrFfw1Ui8wJwxtRXx9RaLR0SrVpTKaygWEMIpXAsfTjROJDIO9xP8dn1BpQdaaTXGg700G1iaVNNx'); // Replace with your secret key

// Endpoint to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  const payment_amount = amount * 100; // as stripe use amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payment_amount, 
      currency: 'cad',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// registration endpoint for the 
app.post("/api/register", async (req, res) => {
  try {

    const { name, phone, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    console.log(existingUser);
    
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
});


// User login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

});


// CRUD Endpoints

// Create a user from google
app.post("/api/users", async (req, res) => {
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

// Read a user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
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
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

// });

// Forget Password
app.put("/api/forgetPassword", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Find the user by email and update the age
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User age updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating age", error });
  }
});

// GET all tours
app.get("/api/tours", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    /*
    if (!search) {
      search = ""
    }
*/
    const tours = await Tour.find({
      name: { $regex: new RegExp(`^${search}`, "i") },
    }); // 'i' for case-insensitive

    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // GET a single patient by id
// app.get("/api/tours/:id", async (req, res) => {
//   try {
//     let destinations = await Destination.findOne({ _id: req.params.id });
//     if (!destinations) return res.status(404).json({ message: "Patient not found" });
//     destinations = destinations.toObject();
//     // const crit = await isCritical(req.params.id);
//     // destinations.condition = crit;

//     res.json(destinations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// GET a single destination by id
app.get("/api/tours/:id", async (req, res) => {
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

// // GET all patients with condition "Critical"
// app.get("/api/critical", async (req, res) => {
//   try {
//     let search = req.query.search ?? "";

//     const destinations = await Destination.find({
//       condition: "Critical",
//       name: { $regex: new RegExp(`^${search}`, "i") },
//     });

//     res.json(destinations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// POST a new tour
app.post("/api/tours", async (req, res) => {
  const { name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture  } = req.body;

  const tour = new Tour({
    name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture
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
app.put("/api/tours/:id", async (req, res) => {
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
app.delete("/api/tours/:id", async (req, res) => {
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




// Create a folder
app.post('/folders', async (req, res) => {
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
app.get('/folders', async (req, res) => {
  try {
    const folders = await Folder.find().populate('owner').populate('tours');
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read folders by user ID
app.get('/folders/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const folders = await Folder.find({ owner: userId }).populate('tours');
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read tours in a folder
app.get('/folders/:folderId/tours', async (req, res) => {
  const { folderId } = req.params;

  try {
    const folder = await Folder.findById(folderId).populate('tours');
    res.json(folder.tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a folder by adding a tour
app.put('/folders/:folderId/tours/:tourId', async (req, res) => {
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
app.delete('/folders/:folderId/tours/:tourId', async (req, res) => {
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
app.delete('/folders/:folderId', async (req, res) => {
  const { folderId } = req.params;

  try {
    await Folder.findByIdAndDelete(folderId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});







// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
