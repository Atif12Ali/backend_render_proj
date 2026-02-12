const express = require("express");
const { submitContact, getContacts } = require("../controllers/contactController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, authorize("admin"), getContacts);

module.exports = router;
