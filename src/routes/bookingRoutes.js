// const express = require("express");
// const {
//   createBooking,
//   getMyBookings,
//   getAllBookings,
//   cancelBooking
// } = require("../controllers/bookingsController");
// const protect = require("../middlewares/authMiddleware");
// const authorize = require("../middlewares/roleMiddleware");

// const router = express.Router();

// // User routes
// router.post("/", protect, createBooking);
// router.get("/my", protect, getMyBookings);
// router.put("/:id/cancel", protect, cancelBooking);

// // Admin routes
// router.get("/", protect, authorize("admin"), getAllBookings);

// module.exports = router;


const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking
} = require("../controllers/bookingsController"); 

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const { validationResult } = require("express-validator");
const { createBookingValidation } = require("../validations/bookingValidation");

const router = express.Router();

// User routes
router.post(
  "/",
  protect,
  createBookingValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  createBooking
);
router.get("/my", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);

// Admin routes
router.get("/", protect, authorize("admin"), getAllBookings);

module.exports = router;
