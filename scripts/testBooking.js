const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const User = require('../src/models/User');
const Room = require('../src/models/Room');
const Booking = require('../src/models/Booking');
const bookingService = require('../src/services/bookingService');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Find or create test user
    let user = await User.findOne({ email: 'bookingtest@example.com' }).select('+password');
    if (!user) {
      user = await User.create({ name: 'Booking Test', email: 'bookingtest@example.com', password: 'password123' });
      console.log('Created user', user._id.toString());
    } else {
      console.log('Found user', user._id.toString());
    }

    const room = await Room.findOne();
    if (!room) throw new Error('No room found for testing');
    console.log('Using room', room._id.toString(), 'pricePerNight=', room.pricePerNight);

    // Valid booking dates
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24*60*60*1000);

    const bookingData = {
      roomId: room._id.toString(),
      checkInDate: today.toISOString().split('T')[0],
      checkOutDate: tomorrow.toISOString().split('T')[0],
      guests: 1
    };

    console.log('Booking data', bookingData);

    const booking = await bookingService.createBooking(user._id.toString(), bookingData);
    console.log('Booking created:', booking);

    await mongoose.disconnect();
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();