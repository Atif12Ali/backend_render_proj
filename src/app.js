// const express = require("express");
// const cors = require("cors");
// const errorHandler = require("./middlewares/errorMiddleware");
// const authRoutes = require("./routes/authRoutes");
// const roomRoutes = require("./routes/roomRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const paymentRoutes = require("./routes/paymentsRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();


// app.use(express.json());
// // app.use(cors({
// //   origin: "https://frontend-versal-proj.vercel.app", // Your Vercel URL
// //   credentials: true
// // }));

// // app.use(cors({
// //   origin: [
// //     "https://frontend-versal-proj.vercel.app",
// //     "https://frontend-versal-proj-oqrm.vercel.app" // Add this new one!
// //   ],
// //   credentials: true
// // }));

// app.use(cors({
//   origin: [
//     "https://frontend-versal-proj.vercel.app", 
//     "https://frontend-versal-proj-oqrm.vercel.app",
//     "https://frontend-versal-proj-br47-jw7gg8bkz-atif12alis-projects.vercel.app" // Add this one from your screenshot!
//   ],
//   credentials: true
// }));
// app.use(express.static("public"));


// app.use("/api/auth", authRoutes);
// app.use("/api/rooms", roomRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/contact", contactRoutes);


// // Middlewares

// // Routes (will be added later)
// app.get("/", (req, res) => {
//   res.send("Guest House API is running...");
// });

// // Global Error Handler
// app.use(errorHandler);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// 1. DEFINE CORS OPTIONS - FIXED VERSION
const allowedOrigins = [
  'https://frontend-versal-proj-br47.vercel.app',
  'http://localhost:3000',  // For local development
  'http://localhost:5173'   // If using Vite
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

// 2. APPLY CORS
app.use(cors(corsOptions));

// 3. MIDDLEWARE
app.use(express.json());
app.use(express.static("public"));

// 4. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Guest House API is running...");
});

// 5. ERROR HANDLING
app.use(errorHandler);

module.exports = app;
