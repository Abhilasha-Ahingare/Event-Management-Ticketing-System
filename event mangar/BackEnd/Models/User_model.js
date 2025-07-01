const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    Username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

//password has middleware

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
