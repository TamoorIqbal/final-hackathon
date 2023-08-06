import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/OrderController.js";
import passport from "passport";

const router = express.Router();

// Create a new order
router.post(
  "/createOrder",
  passport.authenticate("jwt", { session: false }),
  createOrder
);

// Get all orders
router.get("/getAllOrders", getAllOrders);

// Get a single order by ID
router.get("/getOrderById/:id", getOrderById);

// Update the status of an order
router.put("status/:id/status", updateOrderStatus);

export default router;
