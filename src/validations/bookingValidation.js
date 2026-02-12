const { body } = require("express-validator");

exports.createBookingValidation = [
  body("roomId").notEmpty().withMessage("Room ID is required"),
  body("checkInDate").isISO8601().withMessage("Invalid check-in date"),
  body("checkOutDate").isISO8601().withMessage("Invalid check-out date")
];
