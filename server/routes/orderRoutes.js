import express from "express";

import {
  createOrder,
  getMyOrders,
  getEntrepreneurOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("customer"), createOrder);

router.get("/my", protect, authorize("customer"), getMyOrders);

router.get(
  "/entrepreneur",
  protect,
  authorize("entrepreneur"),
  getEntrepreneurOrders
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAllOrders
);

router.get("/:id", protect, getOrderById);

router.patch(
  "/:id/status",
  protect,
  authorize("entrepreneur", "admin"),
  updateOrderStatus
);

export default router;