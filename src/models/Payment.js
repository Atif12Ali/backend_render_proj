const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    method: {
      type: String,
      enum: ["card", "cash", "jazzcash", "easypaisa", "bank_transfer"],
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "awaiting_approval", "completed", "failed"],
      default: "pending"
    },

    receiptImage: {
      type: String
    },

    transactionId: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
