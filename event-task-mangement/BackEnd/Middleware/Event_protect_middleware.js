const User = require("../Models/User_model");

const EventProtect = async (req, res, next) => {
  if (req.user?.role !== "organizer") {
    return res.status(403).json({ message: "Access denied: Organizer only" });
  }
  next();
};

module.exports = EventProtect;
