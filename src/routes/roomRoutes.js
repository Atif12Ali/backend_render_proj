const express = require("express");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomByRm
} = require("../controllers/roomController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Public / User routes
router.get("/", getRooms);
router.get("/:id", getRoom);
router.get("/number/:roomNumber", getRoomByRm);

// Admin routes
router.post("/", protect, authorize("admin"), upload.single("image"), createRoom);
router.put("/:id", protect, authorize("admin"), upload.single("image"), updateRoom);
router.delete("/:id", protect, authorize("admin"), deleteRoom);

module.exports = router;
