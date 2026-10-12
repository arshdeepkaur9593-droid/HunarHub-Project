import express from "express";

import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  createComplaint
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyComplaints
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAllComplaints
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateComplaintStatus
);

router.get(
  "/:id",
  protect,
  getComplaintById
);

export default router;