const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Mock payment gateway (success/failure)
const processPayment = async (bookingId, userId, paymentData) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  // Security check: Ensure the booking belongs to the current user
  if (booking.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized: You can only pay for your own bookings");
  }

  if (booking.status === "confirmed") {
    throw new Error("Booking already paid");
  }

  // Create payment record
  const payment = await Payment.create({
    booking: bookingId,
    user: userId,
    amount: booking.totalAmount,
    method: paymentData.method,
    status: "pending"
  });

  // 🔥 Simulate payment success
  const paymentSuccess = true; // later replaced by real gateway

  if (paymentSuccess) {
    payment.status = "completed";
    payment.transactionId = `TXN-${Date.now()}`;
    await payment.save();

    booking.status = "confirmed";
    await booking.save();
  } else {
    payment.status = "failed";
    await payment.save();
  }

  return payment;
};

// Process Manual Payment (with receipt file)
const processManualPayment = async (bookingId, userId, method, receiptFile) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  // Security check: Ensure the booking belongs to the current user
  if (booking.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized: You can only pay for your own bookings");
  }

  if (booking.status === "confirmed") {
    throw new Error("Booking already paid/confirmed");
  }

  // Create payment record awaiting approval
  const payment = await Payment.create({
    booking: bookingId,
    user: userId,
    amount: booking.totalAmount,
    method: method,
    status: "pending",
    receiptImage: receiptFile.path.split("public")[1].replace(/\\/g, "/") // Relative path for web access
  });

  return payment;
};

// Admin: Approve a manual payment
const approvePayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error("Payment record not found");

  if (payment.status === "completed") {
    throw new Error("Payment already approved");
  }

  // Update payment
  payment.status = "completed";
  payment.transactionId = `APPROVE-${Date.now()}`;
  await payment.save();

  // Update associated booking
  await Booking.findByIdAndUpdate(payment.booking, { status: "confirmed" });

  return payment;
};

const getPaymentsByUser = async (userId) => {
  return await Payment.find({ user: userId })
    .populate({
      path: "booking",
      populate: { path: "room" }
    })
    .sort({ createdAt: -1 });
};

const getAllPayments = async () => {
  return await Payment.find()
    .populate("user", "name email")
    .populate({
      path: "booking",
      populate: { path: "room" }
    })
    .sort({ createdAt: -1 });
};

module.exports = {
  processPayment,
  processManualPayment,
  approvePayment,
  getPaymentsByUser,
  getAllPayments
};
