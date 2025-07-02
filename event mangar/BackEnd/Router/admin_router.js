const express = require("express");
const router = express.Router();
const protect = require("../Middleware/user_protect_middleware");
const { getAdminStats } = require("../Controller/admin_controller");

router.get("/get_admin", protect, getAdminStats);

module.exports = router;
