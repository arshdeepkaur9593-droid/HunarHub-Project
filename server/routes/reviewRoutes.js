import express from "express";

import {
  createReview,
  getProductReviews,
  getServiceReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  createReview
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyReviews
);

router.get(
  "/product/:productId",
  getProductReviews
);

router.get(
  "/service/:serviceId",
  getServiceReviews
);

router.put(
  "/:id",
  protect,
  authorize("customer"),
  updateReview
);

router.delete(
  "/:id",
  protect,
  authorize("customer"),
  deleteReview
);

export default router;