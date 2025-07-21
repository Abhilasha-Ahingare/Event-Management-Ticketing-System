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
const upload = require("../Middleware/Upload_Image_middlewere");

// 👇 Public route - remove all protection
router.get("/get-all-event", getEvents);

// 👇 Anyone can view an event
router.get("/event-detail/:id", getEventById);

// 👇 Organizer only
router.post(
  "/create-Event",
  protect,
  EventProtect,
  upload.single("image"),
  createEvent
);
router.put(
  "/update-event/:id",
  protect,
  EventProtect,
  upload.single("image"),
  updateEvent
);

// 👇 Only Admin can delete event
router.delete("/delete-event/:id", protect, adminProtect, deleteEvent);

module.exports = router;
