require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/User"); // Assuming you'll create a User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET = process.env.SECRET || "093rhufbigeryq3498rweihougotyhpq39reouwh";

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/register", async (req, res) => {
  const { name, introduction, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    introduction,
    email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "User registered!" });
});

// User login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});