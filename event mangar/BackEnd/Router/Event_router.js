const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../Controller/Event_controller");

const protect = require("../Middleware/user_protect_middleware");
const EventProtect = require("../Middleware/Event_protect_middleware");
const adminProtect = require("../Middleware/admin_middleware");

// 👇 Public route - remove all protection
router.get("/get-all-event", getEvents);

// 👇 Anyone can view an event
router.get("/event-detail/:id", getEventById);

// 👇 Organizer only
router.post("/create-event", protect, EventProtect, createEvent);
router.put("/update-event/:id", protect, EventProtect, updateEvent);

// 👇 Only Admin can delete event
router.delete("/delete-event/:id", protect, adminProtect, deleteEvent);

module.exports = router;
