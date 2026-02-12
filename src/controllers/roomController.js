const roomService = require("../services/roomService");

const createRoom = async (req, res, next) => {
  try {
    const roomData = { ...req.body };
    if (req.file) {
      roomData.image = req.file.path.split("public")[1].replace(/\\/g, "/");
    }
    const room = await roomService.createRoom(roomData);
    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json({
      success: true,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

const getRoomByRm = async (req, res, next) => {
  try {
    const room = await roomService.getRoomByRoomNumber(req.params.roomNumber);
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const roomData = { ...req.body };
    if (req.file) {
      roomData.image = req.file.path.split("public")[1].replace(/\\/g, "/");
    }
    const room = await roomService.updateRoom(req.params.id, roomData);
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.status(200).json({
      success: true,
      message: "Room deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomByRm
};
