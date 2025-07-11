require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OAuth2Client } = require('google-auth-library');


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const app = express();
const PORT = process.env.PORT || 5001;
const SECRET = process.env.SECRET || "093rhufbigeryq3498rweihougotyhpq39reouwh";

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



const usersRoutes = require('./routes/usersRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const toursRoutes = require('./routes/toursRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const foldersRoutes = require('./routes/foldersRoutes');
const attractionsRoutes = require('./routes/attractionsRoutes');
const hotelsRoutes = require('./routes/hotelsRoutes');
const restaurantsRoutes = require('./routes/restaurantsRoutes');
const ordersRotues = require('./routes/ordersRoutes');
const transportRoutes = require('./routes/transportsRoutes');
const mapPointsRoutes = require('./routes/mapPointsRoutes');



// just to test whether the api is hosted on cloud
app.get('/', async (req, res) => {
  return res.status(200).json({"message": "successfully deployed on google cloud"})
})


// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() =>  {


app.use("/api/users", usersRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tours", toursRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/restaurants", restaurantsRoutes)
app.use("/api/attractions", attractionsRoutes)
app.use("/api/hotels", hotelsRoutes)
app.use("/api/orders", ordersRotues)
app.use("/api/transports", transportRoutes)
app.use("/api/mappoints", mapPointsRoutes)
app.use("/folders", foldersRoutes)


// server.js



// Middleware
app.use(bodyParser.json());

// Initialize the Google OAuth2 client
const client = new OAuth2Client('1035933455480-76ir7u6sg1fja0n9prqpvg0sfq2qh47i.apps.googleusercontent.com'); // Replace with your web client ID

// Validate ID Token
app.post('/validate-id-token', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: '1035933455480-76ir7u6sg1fja0n9prqpvg0sfq2qh47i.apps.googleusercontent.com', // Replace with your client ID
    });

    const payload = ticket.getPayload();
    res.status(200).json({ valid: true, user: payload });
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ valid: false, error: 'Invalid ID token' });
  }
});

// Start the server


  })

.catch((err) => console.error("MongoDB connection error:", err));

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = { app, server };  // Add this line
