const express = require("express");

const router = express.Router();

const protect = require("../Middleware/user_protect_middleware");
const {
  getAllTicket,
  createTickets,
  scanTicket,
} = require("../Controller/ticket_controller");

router.post("/create-tickets", protect, createTickets);
router.get("/get-my-tickets", protect, getAllTicket);
router.post("/scan", protect, scanTicket);

module.exports = router;
