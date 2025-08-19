const express = require("express");
const {
  Registration,
  login,
  UserProfile,
  GetAllUser,
  updateUser,
  deleteUser,
} = require("../Controller/User_controller");

const protect = require("../Middleware/user_protect_middleware");
const adminProtect = require("../Middleware/admin_middleware");
const EventProtect = require("../Middleware/Event_protect_middleware");
const router = express.Router();

router.post("/registration", Registration);
router.post("/login", login);

router.get("/user", protect, UserProfile);
router.get("/get-all-user", protect, adminProtect, GetAllUser);
router.put("/update-user", protect, EventProtect, adminProtect, updateUser);
router.delete("/delete-user/:id", protect, adminProtect, deleteUser);

module.exports = router;
