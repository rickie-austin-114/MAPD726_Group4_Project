require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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


const usersRoutes = require('./routes/usersRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const toursRoutes = require('./routes/toursRoutes');
const foldersRoutes = require('./routes/foldersRoutes');

// just to test whether the api is hosted on cloud
app.get('/', async (req, res) => {
  return res.status(200).json({"message": "successfully deployed on google cloud"})
})


// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users", usersRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tours", toursRoutes)
app.use("/folders", foldersRoutes)




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
