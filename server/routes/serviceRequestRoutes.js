import express from "express";

import {
  createServiceRequest,
  getMyServiceRequests,
  getEntrepreneurServiceRequests,
  getServiceRequestById,
  updateServiceRequestStatus,
  cancelServiceRequest,
} from "../controllers/serviceRequestController.js";

import {
  protect,
  authorize,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  createServiceRequest
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyServiceRequests
);

router.get(
  "/entrepreneur",
  protect,
  authorize("entrepreneur"),
  getEntrepreneurServiceRequests
);

router.get(
  "/:id",
  protect,
  getServiceRequestById
);

router.patch(
  "/:id/status",
  protect,
  authorize("entrepreneur"),
  updateServiceRequestStatus
);

router.patch(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelServiceRequest
);

export default router;