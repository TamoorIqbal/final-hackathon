import User from "../models/UserModel.js";
import sendToken from "../utils/jwtToken.js";
import fs from "fs";
import sendEmail from "../middleware/SendEmail.js";
import crypto from "crypto";

const registerUser = async (req, res, next) => {
  try {
    const { userName, email, password, profileImage } = req.body;
    const userEmail = await User.findOne({ email });
    // console.log(userEmail);
    // console.log("req.body", req.file?.path);
    if (userEmail) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const user = new User({
      userName,
      email,
      password,
      profileImage: req.file?.path,
    });

    await user.save();

    // const token = await sendToken({ _id: user?._id });

    res.status(201).json({
      success: true,
      message: "Signup successfully!",
      // token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    user.password = undefined;
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found with this email",
      });
    }
    console.log("user", user);
    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Save the reset token and expiration date to the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    // Save the updated user document
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FORNTEND_URL}/resest-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on this link to reset your password: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    // Handle any errors that occur during password reset
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // Find user by reset password token
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid Token" });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Password does not password" });
    }
    // Set the new password

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send a token to the client
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    // Clear the JWT token from the client-side by setting the Authorization header to an empty value
    res.setHeader("Authorization", "");

    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send(req?.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Delete the old profile image if it exists
    // if (user.profileImage) {
    //   // Construct the file path based on the image URL or file name
    //   const filePath = path.join(
    //     __dirname,
    //     "..",
    //     "path_to_images",
    //     user.profileImage
    //   );

    //   // Check if the file exists
    //   if (fs.existsSync(filePath)) {
    //     // Delete the file
    //     fs.unlinkSync(filePath);
    //   }
    // }

    // Update the profile image
    user.profileImage = req.file?.path; // Multer will attach the uploaded file to the request object
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return res.status(404).json({ message: "Old password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    user.password = req.body.newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in updatePassword:", error);
    res.status(500).json({ message: "Failed to update password" });
  }
};

export {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  forgotPassword,
  updateProfileImage,
  updatePassword,
};
