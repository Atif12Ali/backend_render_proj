const mongoose = require('mongoose');
const Room = require('../src/models/Room');
require('dotenv').config({ path: __dirname + '/../.env' });

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const rooms = await Room.find().lean();
    console.log('Rooms:', rooms);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();