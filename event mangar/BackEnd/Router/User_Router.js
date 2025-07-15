const express = require("express");
const {
  Registration,
  login,
  UserProfile,
} = require("../Controller/User_controller");

const protect = require("../Middleware/user_protect_middleware");
const router = express.Router();

router.post("/registration", Registration);
router.post("/login", login);

router.get("/user", protect, UserProfile);
// router.put("")
// router.delete("")

module.exports = router;
