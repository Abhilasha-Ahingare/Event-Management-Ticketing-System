const express = require("express");
const router = express.Router();
const protect = require("../Middleware/user_protect_middleware");
const { GetOrganizerStats } = require("../Controller/Organizer_controller");
const EventProtect = require("../Middleware/Event_protect_middleware");
const adminProtect = require("../Middleware/admin_middleware");

router.get("/dashboard", protect, EventProtect, GetOrganizerStats);

module.exports = router;
