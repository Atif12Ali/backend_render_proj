const express = require("express");
const {
  makePayment,
  submitManualPayment,
  adminApprovePayment,
  getMyPayments,
  getAllPayments
} = require("../controllers/paymentController");
const uploadReceipt = require("../middlewares/uploadMiddleware");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

// User routes
router.post("/:bookingId", protect, makePayment);
router.post("/manual/:bookingId", protect, uploadReceipt.single("receipt"), submitManualPayment);
router.get("/my", protect, getMyPayments);

// Admin routes
router.get("/", protect, authorize("admin"), getAllPayments);
router.post("/approve/:paymentId", protect, authorize("admin"), adminApprovePayment);

module.exports = router;
