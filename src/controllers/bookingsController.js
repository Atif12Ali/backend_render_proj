// const bookingService = require("../services/bookingService");

// const createBooking = async (req, res, next) => {
//   try {
//     const booking = await bookingService.createBooking(
//       req.user.id,
//       req.body
//     );

//     res.status(201).json({
//       success: true,
//       data: booking
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getMyBookings = async (req, res, next) => {
//   try {
//     const bookings = await bookingService.getUserBookings(req.user.id);
//     res.status(200).json({
//       success: true,
//       data: bookings
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAllBookings = async (req, res, next) => {
//   try {
//     const bookings = await bookingService.getAllBookings();
//     res.status(200).json({
//       success: true,
//       data: bookings
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const cancelBooking = async (req, res, next) => {
//   try {
//     const booking = await bookingService.cancelBooking(
//       req.params.id,
//       req.user.id
//     );

//     res.status(200).json({
//       success: true,
//       data: booking
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createBooking,
//   getMyBookings,
//   getAllBookings,
//   cancelBooking
// };


const bookingService = require("../services/bookingService");

const createBooking = async (req, res, next) => {
  try {
    console.log("req.user:", req.user); // Debug log
    
    const booking = await bookingService.createBooking(
      req.user._id, // ← Changed from req.user.id
      req.body
    );

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user._id); // ← Changed
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(
      req.params.id,
      req.user._id 
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking
};