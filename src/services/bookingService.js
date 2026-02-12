const Booking = require("../models/Booking");
const Room = require("../models/Room");


const createBooking = async (userId, bookingData) => {
  const { roomId, checkInDate, checkOutDate, guests } = bookingData;

  // 1️⃣ Validate input
  if (!roomId || !checkInDate || !checkOutDate) {
    throw new Error("Missing required booking fields");
  }

  // 2️⃣ Find room
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error("Room not found");
  }

  // 3️⃣ Parse dates and validate
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    throw new Error("Invalid check-in or check-out date");
  }

  if (checkIn >= checkOut) {
    throw new Error("Check-out date must be after check-in date");
  }

  // 4️⃣ Check overlapping bookings
  const overlappingBooking = await Booking.findOne({
    room: roomId,
    status: { $ne: "cancelled" },
    checkInDate: { $lt: checkOut },
    checkOutDate: { $gt: checkIn }
  });

  if (overlappingBooking) {
    throw new Error("Room is already booked for selected dates");
  }

  // 5️⃣ Calculate number of days (ceil to avoid partial day issues)
  const msPerDay = 1000 * 60 * 60 * 24;
  const rawDays = (checkOut - checkIn) / msPerDay;
  const days = Math.ceil(rawDays);

  if (!isFinite(days) || days <= 0) {
    throw new Error("Invalid booking dates");
  }

  // 6️⃣ Calculate total amount using room.pricePerNight (fallback to room.price if present)
  const pricePerNight = Number(
    (typeof room.pricePerNight !== "undefined" ? room.pricePerNight : room.price)
  );

  if (!isFinite(pricePerNight) || pricePerNight <= 0) {
    throw new Error("Room has invalid price");
  }

  const totalAmount = days * pricePerNight;

  if (!isFinite(totalAmount)) {
    console.error('Failed booking calc', {
      roomId,
      pricePerNight,
      days,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
    });
    throw new Error("Failed to calculate total amount");
  }

  // 7️⃣ Create booking
  const booking = await Booking.create({
    user: userId,
    room: roomId,
    checkInDate,
    checkOutDate,
    guests,
    totalAmount,
  });

  return booking;
};

// ✅ KEEP YOUR OTHER FUNCTIONS (example)
const getUserBookings = async (userId) => {
  return Booking.find({ user: userId }).populate("room");
};

const getAllBookings = async () => {
  return Booking.find().populate("room user");
};

const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to cancel this booking");
  }

  booking.status = "cancelled";
  await booking.save();

  return booking;
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
};
