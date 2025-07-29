const express = require("express");
const {
  createCheckoutSession,
  webhook,
  verifyPayment,
} = require("../Controller/Payment_controller");
const protect = require("../Middleware/user_protect_middleware");

const router = express.Router();

router.post("/checkout", protect, createCheckoutSession);

router.post("/verify-payment", protect, verifyPayment);

module.exports = router;
