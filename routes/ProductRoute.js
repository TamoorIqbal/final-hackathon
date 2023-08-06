import express from "express";
import passport from "passport";
const router = express.Router();

import { upload } from "../middleware/multer.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/ProductController.js";

router.post(
  "/createProduct",
  passport.authenticate("jwt", { session: false }),
  upload.single("images"),
  createProduct
);
router.get("/getAllProducts", getAllProducts);

export default router;
