const express = require("express")
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../models/User"); // User model

// registration endpoint for the 
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, age, gender, profilePicture } = req.body;

    const existingUser = await User.findOne({ email: email });

    
    if (!!existingUser) {

      console.log("User with this email already exists.");
      return res.status(400).json({ error: "User with this email already exists." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      age, gender, profilePicture,
    });


    await user.save();
    return res.status(201).json({ message: "User registered!" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
});

// User login
router.post("/login", async (req, res) => {
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

// Forget Password
router.put("/forgetPassword", async (req, res) => {
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


module.exports = router;