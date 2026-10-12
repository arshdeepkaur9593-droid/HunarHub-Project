import Product from "../models/Product.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { search, category, entrepreneur } = req.query;

  const query = {
    status: { $in: ["Approved", "Active"] },
  };

  if (category && category !== "All Categories") {
    query.category = category;
  }

  if (entrepreneur) {
    query.entrepreneur = entrepreneur;
  }

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const products = await Product.find(query)
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Products fetched successfully.",
    products
  );
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    status: { $in: ["Approved", "Active"] },
  }).populate(
    "entrepreneur",
    "businessName ownerName profileImage location"
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  return sendSuccess(
    res,
    200,
    "Product fetched successfully.",
    product
  );
});

export const createProduct = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  if (entrepreneur.status !== "Approved") {
    res.status(403);
    throw new Error(
      "Your entrepreneur account must be approved before creating products."
    );
  }

  const {
    name,
    description = "",
    price,
    category,
    image = "",
    stock = 0,
  } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Product name is required.");
  }

  if (!category || !category.trim()) {
    res.status(400);
    throw new Error("Product category is required.");
  }

  if (price === undefined || price === null || price === "") {
    res.status(400);
    throw new Error("Product price is required.");
  }

  const parsedPrice = Number(price);
  const parsedStock = Number(stock);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    res.status(400);
    throw new Error(
      "Product price must be a valid non-negative number."
    );
  }

  if (!Number.isInteger(parsedStock) || parsedStock < 0) {
    res.status(400);
    throw new Error(
      "Product stock must be a valid non-negative number."
    );
  }

  const product = await Product.create({
    name: name.trim(),
    description: description.trim(),
    price: parsedPrice,
    category: category.trim(),
    image: image.trim(),
    stock: parsedStock,
    entrepreneur: entrepreneur._id,
    status: "Pending",
  });

  return sendSuccess(
    res,
    201,
    "Product created successfully and is pending approval.",
    product
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  if (
    product.entrepreneur.toString() !==
    entrepreneur._id.toString()
  ) {
    res.status(403);
    throw new Error(
      "You are not authorized to update this product."
    );
  }

  const allowedFields = [
    "name",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  if (!product.name || !product.name.trim()) {
    res.status(400);
    throw new Error("Product name is required.");
  }

  if (!product.category || !product.category.trim()) {
    res.status(400);
    throw new Error("Product category is required.");
  }

  const parsedPrice = Number(product.price);
  const parsedStock = Number(product.stock);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    res.status(400);
    throw new Error(
      "Product price must be a valid non-negative number."
    );
  }

  if (!Number.isInteger(parsedStock) || parsedStock < 0) {
    res.status(400);
    throw new Error(
      "Product stock must be a valid non-negative number."
    );
  }

  product.name = product.name.trim();
  product.category = product.category.trim();
  product.description = product.description?.trim() || "";
  product.image = product.image?.trim() || "";
  product.price = parsedPrice;
  product.stock = parsedStock;

  if (product.stock === 0) {
    product.status = "Out of Stock";
  }

  const updatedProduct = await product.save();

  return sendSuccess(
    res,
    200,
    "Product updated successfully.",
    updatedProduct
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  if (
    product.entrepreneur.toString() !==
    entrepreneur._id.toString()
  ) {
    res.status(403);
    throw new Error(
      "You are not authorized to delete this product."
    );
  }

  await product.deleteOne();

  return sendSuccess(
    res,
    200,
    "Product deleted successfully."
  );
});