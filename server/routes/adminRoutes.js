import express from "express";

import {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  getPendingEntrepreneurs,
  updateEntrepreneurStatus,
  getProducts,
  updateProductStatus,
  getOrders,
  updateOrderStatus,
  getBookings,
  updateBookingStatus,
  getComplaints,
  updateComplaintStatus,
  getServices,
  updateServiceStatus,
} from "../controllers/adminController.js";

import {
  protect,
  authorize,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

router.patch(
  "/users/:id/status",
  protect,
  authorize("admin"),
  updateUserStatus
);

router.get(
  "/entrepreneurs/pending",
  protect,
  authorize("admin"),
  getPendingEntrepreneurs
);

router.patch(
  "/entrepreneurs/:id/status",
  protect,
  authorize("admin"),
  updateEntrepreneurStatus
);

router.get(
  "/products",
  protect,
  authorize("admin"),
  getProducts
);

router.patch(
  "/products/:id/status",
  protect,
  authorize("admin"),
  updateProductStatus
);

router.get(
  "/orders",
  protect,
  authorize("admin"),
  getOrders
);

router.patch(
  "/orders/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatus
);

router.get(
  "/bookings",
  protect,
  authorize("admin"),
  getBookings
);

router.patch(
  "/bookings/:id/status",
  protect,
  authorize("admin"),
  updateBookingStatus
);

router.get(
  "/complaints",
  protect,
  authorize("admin"),
  getComplaints
);

router.patch(
  "/complaints/:id/status",
  protect,
  authorize("admin"),
  updateComplaintStatus
);

router.get(
  "/services",
  protect,
  authorize("admin"),
  getServices
);

router.patch(
  "/services/:id/status",
  protect,
  authorize("admin"),
  updateServiceStatus
);

export default router;