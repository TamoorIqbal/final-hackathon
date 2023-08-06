import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  role: {
    type: String,
    default: "user", 
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    // match: [
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "At least 8 characters long Contains at least one letter & one digit",
    // ],
  },
  profileImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//for password bcryptjs
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
//comparePassword
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
