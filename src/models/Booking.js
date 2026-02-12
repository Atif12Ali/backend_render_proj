// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     room: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Room",
//       required: true
//     },

//     checkInDate: {
//       type: Date,
//       required: true
//     },

//     checkOutDate: {
//       type: Date,
//       required: true
//     },

//     totalAmount: {
//       type: Number,
//       required: true
//     },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending"
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);



const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);

