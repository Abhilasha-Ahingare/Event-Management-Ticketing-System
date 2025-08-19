const express = require("express");

const router = express.Router();

const protect = require("../Middleware/user_protect_middleware");
const {
  getAllTicket,
  createTickets,
  scanTicket,
} = require("../Controller/ticket_controller");
const EventProtect = require("../Middleware/Event_protect_middleware");
const adminProtect = require("../Middleware/admin_middleware");

router.post("/create-tickets", protect, createTickets);
router.get("/get-my-tickets", protect, getAllTicket);
router.post("/scan", protect, EventProtect, scanTicket);

module.exports = router;
