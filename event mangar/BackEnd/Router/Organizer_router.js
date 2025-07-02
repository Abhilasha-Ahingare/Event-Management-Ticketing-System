const express = require("express");
const router = express.Router();
const protect = require("../Middleware/user_protect_middleware");
const { GetOrganizerStats } = require("../Controller/Organizer_controller");

router.get("/dashboard", protect, GetOrganizerStats);

module.exports = router;
