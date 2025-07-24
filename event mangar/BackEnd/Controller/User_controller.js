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
      { expiresIn: "1h" },
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
      { expiresIn: "1h" },
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

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { Username, email, role } = req.body;
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { Username, email, role },
      { new: true, runValidators: true } 
    ).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  Registration,
  login,
  UserProfile,
  GetAllUser,
  updateUser,
  deleteUser,
};
