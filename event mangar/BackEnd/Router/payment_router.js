const express = require("express");
const {
  createCheckoutSession,
  webhook,
} = require("../Controller/Payment_controller");
const protect = require("../Middleware/user_protect_middleware");

const router = express.Router();

router.post("/checkout", protect, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;