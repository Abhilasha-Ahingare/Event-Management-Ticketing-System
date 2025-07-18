const User = require("../Models/User_model");

const adminProtect = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Not authorized" });
  }
};

module.exports = adminProtect;
