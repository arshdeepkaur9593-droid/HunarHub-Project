import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  authorize("entrepreneur"),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize("entrepreneur"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("entrepreneur"),
  deleteProduct
);

export default router;