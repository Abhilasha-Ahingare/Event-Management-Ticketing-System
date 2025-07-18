const User = require("../Models/User_model");
const jwt = require("jsonwebtoken");

//registration
const Registration = async (req, res) => {
  try {
    const { Username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newUser = await User.create({
      Username,
      email,
      password,
      role,
    });

    if (!newUser) {
      return res.status(400).json({ message: "failed to create user" });
    }

    const payload = { user: { id: newUser._id, role: newUser.role } };

    jwt.sign(
      payload,
      process.env.JWT_PIN_CODE,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          success: true,
          user: {
            _id: newUser._id,
            name: newUser.Username,
            email: newUser.email,
            role: newUser.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("registration error:", error);
    res.status(500).json({
      message: error.message || "internal server error during resgistration",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const comparePassword = await userExists.matchPassword(password);
    if (!comparePassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const payload = { user: { id: userExists._id, role: userExists.role } };

    jwt.sign(
      payload,
      process.env.JWT_PIN_CODE,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          success: true,
          user: {
            _id: userExists._id,
            name: userExists.Username,
            email: userExists.email,
            role: userExists.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "internal server error during login" });
  }
};

const UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

module.exports = { Registration, login, UserProfile };
