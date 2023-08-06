import express from "express";
import passport from "passport";
import { addToCart, deleteProduct, getCart } from "../controllers/CartController.js";

const router = express.Router();

router.post(
  "/add-to-cart",
  passport.authenticate("jwt", { session: false }),
  addToCart
);
router.get(
  "/get-cart",
  passport.authenticate("jwt", { session: false }),
  getCart
);
router.delete(
  "/cart/:productId",
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

export default router;
