// app.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const parkingSpotRoutes = require("./routes/parkingSpotRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const supportRoutes = require('./routes/supportRoutes');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const notifRoute = require("./routes/notificationRoutes");
const app = express();
dotenv.config();
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/notifications",notifRoute);
// Use the existing authentication routes
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);

// Use the new parking spot routes
app.use("/api", parkingSpotRoutes); // Assuming you want to use '/api' as the base URL for parking spot APIs
app.use("/feedback", feedbackRoutes);

// Use the support page
app.use('/support', supportRoutes);

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
