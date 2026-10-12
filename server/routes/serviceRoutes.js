import express from "express";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);

router.get("/:id", getServiceById);

router.post(
  "/",
  protect,
  authorize("entrepreneur"),
  createService
);

router.put(
  "/:id",
  protect,
  authorize("entrepreneur"),
  updateService
);

router.delete(
  "/:id",
  protect,
  authorize("entrepreneur"),
  deleteService
);

export default router;