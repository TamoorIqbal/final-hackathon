import express from "express";
import passport from "passport";
const router = express.Router();

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  forgotPassword,
  updateProfileImage,
  updatePassword,
} from "../controllers/UserController.js";
import { upload } from "../middleware/multer.js";

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  getUser
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutUser
);
router.post("/forgot-password", forgotPassword);
router.put("/resest-password/:token", resetPassword);
router.put(
  "/profile-image/:userId",
  upload.single("profileImage"),
  updateProfileImage
);
router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

export default router;
