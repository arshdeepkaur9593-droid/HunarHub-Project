import Service from "../models/Service.js";
import Entrepreneur from "../models/Entrepreneur.js";
import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getServices = asyncHandler(async (req, res) => {
  const { search, category, location, entrepreneur } = req.query;

  const query = {
    status: "Active",
  };

  if (category && category !== "All Categories") {
    query.category = category;
  }

  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
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
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const services = await Service.find(query)
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location status"
    )
    .populate(
      "categoryRef",
      "name description icon color"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Services fetched successfully.",
    services
  );
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    _id: req.params.id,
    status: "Active",
  })
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location status"
    )
    .populate(
      "categoryRef",
      "name description icon color"
    );

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  return sendSuccess(
    res,
    200,
    "Service fetched successfully.",
    service
  );
});

export const createService = asyncHandler(async (req, res) => {
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
      "Your entrepreneur account must be approved before creating services."
    );
  }

  const {
    name,
    description,
    price,
    category,
    categoryRef,
    location,
    duration,
    icon,
    color,
  } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Service name is required.");
  }

  if (!description || !description.trim()) {
    res.status(400);
    throw new Error("Service description is required.");
  }

  if (price === undefined || price === null || price === "") {
    res.status(400);
    throw new Error("Service price is required.");
  }

  const parsedPrice = Number(price);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    res.status(400);
    throw new Error(
      "Service price must be a valid non-negative number."
    );
  }

  if (!category || !category.trim()) {
    res.status(400);
    throw new Error("Service category is required.");
  }

  if (categoryRef) {
    const selectedCategory = await Category.findById(
      categoryRef
    );

    if (!selectedCategory) {
      res.status(404);
      throw new Error("Category not found.");
    }

    if (selectedCategory.status !== "Active") {
      res.status(400);
      throw new Error("Selected category is inactive.");
    }
  }

  const service = await Service.create({
    name: name.trim(),
    description: description.trim(),
    price: parsedPrice,
    category: category.trim(),
    categoryRef: categoryRef || null,
    entrepreneur: entrepreneur._id,
    location:
      location?.trim() || entrepreneur.location || "",
    duration: duration?.trim() || "1-3 Days",
    icon: icon?.trim() || "Sparkles",
    color: color?.trim() || "",
    status: "Inactive",
  });

  const populatedService = await Service.findById(
    service._id
  )
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location status"
    )
    .populate(
      "categoryRef",
      "name description icon color"
    );

  return sendSuccess(
    res,
    201,
    "Service created successfully and is currently inactive.",
    populatedService
  );
});

export const updateService = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  if (
    service.entrepreneur.toString() !==
    entrepreneur._id.toString()
  ) {
    res.status(403);
    throw new Error(
      "You are not authorized to update this service."
    );
  }

  const allowedFields = [
    "name",
    "description",
    "price",
    "category",
    "categoryRef",
    "location",
    "duration",
    "icon",
    "color",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      service[field] = req.body[field];
    }
  });

  if (!service.name || !service.name.trim()) {
    res.status(400);
    throw new Error("Service name is required.");
  }

  if (
    !service.description ||
    !service.description.trim()
  ) {
    res.status(400);
    throw new Error(
      "Service description is required."
    );
  }

  if (!service.category || !service.category.trim()) {
    res.status(400);
    throw new Error("Service category is required.");
  }

  service.name = service.name.trim();
  service.description = service.description.trim();
  service.category = service.category.trim();
  service.location =
    service.location?.trim() || "";
  service.duration =
    service.duration?.trim() || "1-3 Days";
  service.icon =
    service.icon?.trim() || "Sparkles";
  service.color =
    service.color?.trim() || "";

  const parsedPrice = Number(service.price);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    res.status(400);
    throw new Error(
      "Service price must be a valid non-negative number."
    );
  }

  service.price = parsedPrice;

  if (service.categoryRef) {
    const category = await Category.findById(
      service.categoryRef
    );

    if (!category) {
      res.status(404);
      throw new Error("Category not found.");
    }

    if (category.status !== "Active") {
      res.status(400);
      throw new Error(
        "Selected category is inactive."
      );
    }
  }

  const updatedService = await service.save();

  return sendSuccess(
    res,
    200,
    "Service updated successfully.",
    updatedService
  );
});

export const deleteService = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  if (
    service.entrepreneur.toString() !==
    entrepreneur._id.toString()
  ) {
    res.status(403);
    throw new Error(
      "You are not authorized to delete this service."
    );
  }

  await service.deleteOne();

  return sendSuccess(
    res,
    200,
    "Service deleted successfully."
  );
});