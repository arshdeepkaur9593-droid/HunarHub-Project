import express from "express";

import {
  getMyProfile,
  updateMyProfile,
  getUserById,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/profile/me",
  protect,
  getMyProfile
);

router.put(
  "/profile/me",
  protect,
  updateMyProfile
);

router.get(
  "/:id",
  protect,
  getUserById
);

export default router;