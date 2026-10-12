import express from "express";

import {
  getEntrepreneurs,
  getEntrepreneurById,
  getMyProfile,
  updateMyProfile,
  getMyAvailability,
  updateMyAvailability,
  getMyEarningsAndStats,
  updateEntrepreneurStatus,
} from "../controllers/entrepreneurController.js";

import {
  protect,
  authorize,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getEntrepreneurs);

router.get(
  "/profile/me",
  protect,
  authorize("entrepreneur"),
  getMyProfile
);

router.put(
  "/profile/me",
  protect,
  authorize("entrepreneur"),
  updateMyProfile
);

router.get(
  "/availability/me",
  protect,
  authorize("entrepreneur"),
  getMyAvailability
);

router.put(
  "/availability/me",
  protect,
  authorize("entrepreneur"),
  updateMyAvailability
);

router.get(
  "/earnings/me",
  protect,
  authorize("entrepreneur"),
  getMyEarningsAndStats
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateEntrepreneurStatus
);

router.get(
  "/:id",
  getEntrepreneurById
);

export default router;