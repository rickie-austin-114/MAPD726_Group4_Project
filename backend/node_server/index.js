require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Stripe = require('stripe');

const cors = require("cors");

const User = require("./models/User"); // Assuming you'll create a User model
const Destination = require("./models/Destination"); // Assuming you'll create a User model

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

async function isCritical(id) {
  return false;
}
// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
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

// GET all patients
app.get("/api/tours", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    /*
    if (!search) {
      search = ""
    }
*/
    const destinations = await Destination.find({
      name: { $regex: new RegExp(`^${search}`, "i") },
    }); // 'i' for case-insensitive

    res.json(destinations);
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
    let destination = await Destination.findOne({ _id: req.params.id });
    if (!destination) return res.status(404).json({ message: "Patient not found" });
    destination = destination.toObject();
    // const crit = await isCritical(req.params.id);
    // destination.condition = crit;

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all patients with condition "Critical"
app.get("/api/critical", async (req, res) => {
  try {
    let search = req.query.search ?? "";

    const destinations = await Destination.find({
      condition: "Critical",
      name: { $regex: new RegExp(`^${search}`, "i") },
    });

    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
app.post("/api/tours", async (req, res) => {
  const { name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture  } = req.body;

  const destination = new Destination({
    name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture
  });

  try {
    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tour with this name already exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

// PUT update a patient by name
app.put("/api/tours/:id", async (req, res) => {
  try {


    const { name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture  } = req.body;

    const updateData = {
      updatedAt: Date.now(),
      name, ratings, price, duration, description, itinerary, inclusions, exclusions, profilePicture
    };

    const updatedDestination = await Destination.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedDestination)
      return res.status(404).json({ message: "Patient not found" });
    res.json(updatedDestination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
app.delete("/api/tours/:id", async (req, res) => {
  try {
    const result = await Destination.findByIdAndDelete(req.params.id);
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
