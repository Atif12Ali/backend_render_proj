const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true
    },

    type: {
      type: String,
      enum: ["single", "double", "deluxe"],
      required: true
    },

    pricePerNight: {
      type: Number,
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    description: {
      type: String
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
