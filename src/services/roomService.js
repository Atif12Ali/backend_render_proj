const Room = require("../models/Room");

const createRoom = async (roomData) => {
  const roomExists = await Room.findOne({ roomNumber: roomData.roomNumber });
  if (roomExists) {
    throw new Error("Room already exists");
  }

  return await Room.create(roomData);
};

const getAllRooms = async () => {
  return await Room.find();
};

const getRoomById = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};

const getRoomByRoomNumber = async (roomNumber) => {
  const room = await Room.findOne({ roomNumber: Number(roomNumber) });
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};


const updateRoom = async (id, roomData) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new Error("Room not found");
  }

  return await Room.findByIdAndUpdate(id, roomData, {
    new: true,
    runValidators: true
  });
};

const deleteRoom = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new Error("Room not found");
  }

  await room.deleteOne();
  return true;
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomByRoomNumber
};
