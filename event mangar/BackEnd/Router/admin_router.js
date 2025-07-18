const express = require("express");
const router = express.Router();
const protect = require("../Middleware/user_protect_middleware");
const { getAdminStats } = require("../Controller/admin_controller");
const adminProtect = require("../Middleware/admin_middleware");

router.get("/get_admin", protect, adminProtect, getAdminStats);

module.exports = router;
