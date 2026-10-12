import Entrepreneur from "../models/Entrepreneur.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Order from "../models/Order.js";
import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getEntrepreneurs = asyncHandler(async (req, res) => {
  const { search, category, location, skill, status } = req.query;

  const query = {};
  const andConditions = [];

  if (status && status !== "All Status") {
    query.status = status;
  } else if (!req.user || req.user.role !== "admin") {
    query.status = "Approved";
  }

  if (category && category !== "All Categories") {
    query.category = category;
  }

  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (skill) {
    andConditions.push({
      $or: [
        {
          skill: {
            $regex: skill,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [new RegExp(skill, "i")],
          },
        },
      ],
    });
  }

  if (search) {
    const searchRegex = {
      $regex: search,
      $options: "i",
    };

    andConditions.push({
      $or: [
        { businessName: searchRegex },
        { ownerName: searchRegex },
        { skill: searchRegex },
        { location: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ],
    });
  }

  if (andConditions.length > 0) {
    query.$and = andConditions;
  }

  const entrepreneurs = await Entrepreneur.find(query)
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Entrepreneurs fetched successfully.",
    entrepreneurs
  );
});

export const getEntrepreneurById = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    _id: req.params.id,
    status: "Approved",
  }).populate("user", "name profileImage");

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Approved entrepreneur profile not found.");
  }

  return sendSuccess(
    res,
    200,
    "Entrepreneur profile fetched successfully.",
    entrepreneur
  );
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  return sendSuccess(
    res,
    200,
    "Entrepreneur profile fetched successfully.",
    entrepreneur
  );
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const allowedFields = [
    "businessName",
    "ownerName",
    "category",
    "skill",
    "skills",
    "description",
    "bio",
    "phone",
    "location",
    "address",
    "city",
    "state",
    "experience",
    "profileImage",
    "priceRange",
    "services",
    "workingHours",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      entrepreneur[field] = req.body[field];
    }
  });

  const updatedEntrepreneur = await entrepreneur.save();

  return sendSuccess(
    res,
    200,
    "Entrepreneur profile updated successfully.",
    updatedEntrepreneur
  );
});

export const getMyAvailability = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  return sendSuccess(
    res,
    200,
    "Availability fetched successfully.",
    entrepreneur.availability
  );
});

export const updateMyAvailability = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  if (req.body.availability) {
    entrepreneur.availability = {
      ...entrepreneur.availability,
      ...req.body.availability,
    };
  } else {
    entrepreneur.availability = {
      ...entrepreneur.availability,
      ...req.body,
    };
  }

  await entrepreneur.save();

  return sendSuccess(
    res,
    200,
    "Availability updated successfully.",
    entrepreneur.availability
  );
});

export const getMyEarningsAndStats = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const totalProducts = await Product.countDocuments({
    entrepreneur: entrepreneur._id,
  });

  const totalServices = await Service.countDocuments({
    entrepreneur: entrepreneur._id,
  });

  const pendingRequests = await Booking.countDocuments({
    entrepreneur: entrepreneur._id,
    status: "Pending",
  });

  const completedBookings = await Booking.find({
    entrepreneur: entrepreneur._id,
    status: "Completed",
  });

  const relevantOrders = await Order.find({
    "items.entrepreneur": entrepreneur._id,
  }).sort({ createdAt: -1 });

  const completedOrders = relevantOrders.filter(
    (order) => order.orderStatus === "Delivered"
  );

  let totalEarnings = 0;

  completedOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (
        item.entrepreneur &&
        item.entrepreneur.toString() ===
          entrepreneur._id.toString()
      ) {
        totalEarnings +=
          (item.price || 0) * (item.quantity || 0);
      }
    });
  });

  completedBookings.forEach((booking) => {
    totalEarnings += booking.price || 0;
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisMonthOrders = completedOrders.filter(
    (order) => order.createdAt >= startOfMonth
  );

  const thisMonthBookings = completedBookings.filter(
    (booking) => booking.createdAt >= startOfMonth
  );

  let thisMonthEarnings = 0;

  thisMonthOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (
        item.entrepreneur &&
        item.entrepreneur.toString() ===
          entrepreneur._id.toString()
      ) {
        thisMonthEarnings +=
          (item.price || 0) * (item.quantity || 0);
      }
    });
  });

  thisMonthBookings.forEach((booking) => {
    thisMonthEarnings += booking.price || 0;
  });

  const recentServiceRequests = await Booking.find({
    entrepreneur: entrepreneur._id,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  const recentOrders = relevantOrders.slice(0, 5);

  return sendSuccess(
    res,
    200,
    "Earnings and stats fetched successfully.",
    {
      totalProducts,
      totalServices,
      pendingRequests,
      totalEarnings,
      thisMonthEarnings,
      completedOrdersCount:
        completedOrders.length +
        completedBookings.length,
      recentServiceRequests,
      recentOrders,
    }
  );
});

export const updateEntrepreneurStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    if (
      !["Pending", "Approved", "Rejected"].includes(status)
    ) {
      res.status(400);
      throw new Error(
        "Invalid status. Must be Pending, Approved, or Rejected."
      );
    }

    const entrepreneur = await Entrepreneur.findById(
      req.params.id
    );

    if (!entrepreneur) {
      res.status(404);
      throw new Error("Entrepreneur not found.");
    }

    entrepreneur.status = status;

    await entrepreneur.save();

    return sendSuccess(
      res,
      200,
      `Entrepreneur application ${status.toLowerCase()} successfully.`,
      entrepreneur
    );
  }
);