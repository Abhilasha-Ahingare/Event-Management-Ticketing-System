const jwt = require("jsonwebtoken");
const User = require("../Models/User_model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_PIN_CODE);

      // fetch complete user excluding password
      const user = await User.findById(decoded.user.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found or deleted" });
      }

      req.user = user; // now req.user has _id, name, email, role etc
      next();
    } catch (error) {
      console.error("Token verification failed", error);
      res.status(401).json({
        message: "Not authorized, token verification failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = protect;
