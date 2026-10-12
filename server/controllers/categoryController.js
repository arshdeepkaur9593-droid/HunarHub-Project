import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = {};

  if (status) {
    if (!["Active", "Inactive"].includes(status)) {
      res.status(400);
      throw new Error("Invalid category status.");
    }

    filter.status = status;
  }

  const categories = await Category.find(filter).sort({
    name: 1,
  });

  return sendSuccess(
    res,
    200,
    "Categories fetched successfully.",
    categories
  );
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  return sendSuccess(
    res,
    200,
    "Category fetched successfully.",
    category
  );
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const {
    name,
    description = "",
    icon = "Package",
    color = "",
    serviceCount = 0,
    services = "",
    status = "Active",
  } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Category name is required.");
  }

  if (!["Active", "Inactive"].includes(status)) {
    res.status(400);
    throw new Error(
      "Invalid status. Must be Active or Inactive."
    );
  }

  const parsedServiceCount = Number(serviceCount);

  if (
    Number.isNaN(parsedServiceCount) ||
    parsedServiceCount < 0
  ) {
    res.status(400);
    throw new Error(
      "Service count must be a valid non-negative number."
    );
  }

  const existingCategory = await Category.findOne({
    name: {
      $regex: `^${name.trim()}$`,
      $options: "i",
    },
  });

  if (existingCategory) {
    res.status(400);
    throw new Error(
      "Category with this name already exists."
    );
  }

  const category = await Category.create({
    name: name.trim(),
    description: description.trim(),
    icon: icon.trim(),
    color: color.trim(),
    serviceCount: parsedServiceCount,
    services:
      services.trim() ||
      `${parsedServiceCount}+ Services`,
    status,
  });

  return sendSuccess(
    res,
    201,
    "Category created successfully.",
    category
  );
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  const allowedFields = [
    "name",
    "description",
    "icon",
    "color",
    "serviceCount",
    "services",
    "status",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      category[field] = req.body[field];
    }
  });

  if (category.name) {
    category.name = category.name.trim();
  }

  if (
    category.status &&
    !["Active", "Inactive"].includes(category.status)
  ) {
    res.status(400);
    throw new Error(
      "Invalid status. Must be Active or Inactive."
    );
  }

  if (category.serviceCount < 0) {
    res.status(400);
    throw new Error("Service count cannot be negative.");
  }

  const duplicateCategory = await Category.findOne({
    _id: { $ne: category._id },
    name: {
      $regex: `^${category.name}$`,
      $options: "i",
    },
  });

  if (duplicateCategory) {
    res.status(400);
    throw new Error(
      "Another category with this name already exists."
    );
  }

  const updatedCategory = await category.save();

  return sendSuccess(
    res,
    200,
    "Category updated successfully.",
    updatedCategory
  );
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  await category.deleteOne();

  return sendSuccess(
    res,
    200,
    "Category deleted successfully."
  );
});