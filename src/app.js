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

// 1. DYNAMIC CORS OPTIONS - IMPROVED VERSION
const corsOptions = {
  origin: function (origin, callback) {
    // Log incoming origin for debugging
    console.log("Incoming request origin:", origin);
    
    // Allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    // Allowed origins patterns
    const allowedOrigins = [
      /\.vercel\.app$/,           // Any Vercel preview/deployment
      /localhost:\d+$/,           // Localhost with any port
      /127\.0\.0\.1:\d+$/,        // Local IP with any port
      /frontend-.*\.vercel\.app$/, // Specific Vercel patterns
      /\.railway\.app$/           // Railway deployments
    ];
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(pattern => pattern.test(origin));
    
    if (isAllowed) {
      console.log("✅ CORS allowed for:", origin);
      callback(null, true);
    } else {
      console.log("❌ CORS blocked for:", origin);
      callback(new Error(`CORS policy: ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With", 
    "Accept",
    "Origin"
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  optionsSuccessStatus: 200
};

// 2. APPLY CORS & PREFLIGHT HANDLING
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight for all routes

// 3. MIDDLEWARE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static("public"));

// 4. REQUEST LOGGING MIDDLEWARE (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

// 5. ROUTES - BOTH PATTERNS INCLUDED FOR COMPATIBILITY
// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Guest House API is running...",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "GET /",
      auth: "/api/auth",
      rooms: "/api/rooms",
      bookings: "/api/bookings",
      payments: "/api/payments",
      contact: "/api/contact"
    }
  });
});

// API Routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);

// ALSO support routes without /api prefix (for backward compatibility)
// This redirects requests from /rooms to /api/rooms
app.use("/rooms", (req, res, next) => {
  console.log(`Redirecting ${req.method} /rooms to /api/rooms`);
  req.url = `/api/rooms${req.url === '/' ? '' : req.url}`;
  next();
});
app.use("/auth", (req, res, next) => {
  req.url = `/api/auth${req.url === '/' ? '' : req.url}`;
  next();
});
app.use("/bookings", (req, res, next) => {
  req.url = `/api/bookings${req.url === '/' ? '' : req.url}`;
  next();
});
app.use("/payments", (req, res, next) => {
  req.url = `/api/payments${req.url === '/' ? '' : req.url}`;
  next();
});
app.use("/contact", (req, res, next) => {
  req.url = `/api/contact${req.url === '/' ? '' : req.url}`;
  next();
});

// 6. 404 HANDLER FOR UNDEFINED ROUTES
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    status: "error",
    message: `Route ${req.url} not found`,
    availableEndpoints: [
      "GET /",
      "GET /api/rooms",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/bookings",
      "POST /api/payments",
      "POST /api/contact"
    ]
  });
});

// 7. ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// 8. GLOBAL ERROR HANDLER FOR UNCAUGHT ERRORS
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
