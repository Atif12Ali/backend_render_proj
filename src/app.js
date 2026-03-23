const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();


app.use(express.json());
app.use(cors({
  origin: "https://frontend-versal-proj.vercel.app", // Your Vercel URL
  credentials: true
}));
app.use(express.static("public"));


app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);


// Middlewares

// Routes (will be added later)
app.get("/", (req, res) => {
  res.send("Guest House API is running...");
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
