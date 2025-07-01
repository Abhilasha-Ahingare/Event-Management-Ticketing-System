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

// public router
router.get("/get-all-event", getEvents);
router.get("/:id", getEventById);

//protected for organizers
router.post("/create-event", protect, EventProtect, createEvent);
router.put("/update-event/:id", protect, EventProtect, updateEvent);
router.delete("/delete-event/:id", protect, EventProtect, deleteEvent);

module.exports = router;
