import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  return sendSuccess(
    res,
    200,
    "Profile fetched successfully.",
    user
  );
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const allowedFields = [
    "name",
    "phone",
    "profileImage",
    "address",
    "city",
    "state",
    "pincode",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  if (!user.name || !user.name.trim()) {
    res.status(400);
    throw new Error("Name cannot be empty.");
  }

  user.name = user.name.trim();

  if (user.phone) {
    user.phone = user.phone.trim();
  }

  if (user.address) {
    user.address = user.address.trim();
  }

  if (user.city) {
    user.city = user.city.trim();
  }

  if (user.state) {
    user.state = user.state.trim();
  }

  if (user.pincode) {
    user.pincode = user.pincode.trim();
  }

  await user.save();

  const updatedUser = await User.findById(user._id).select(
    "-password"
  );

  return sendSuccess(
    res,
    200,
    "Profile updated successfully.",
    updatedUser
  );
});

export const getUserById = asyncHandler(async (req, res) => {
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== req.params.id
  ) {
    res.status(403);
    throw new Error(
      "You are not authorized to view this user's profile."
    );
  }

  const user = await User.findById(req.params.id).select(
    "-password"
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  return sendSuccess(
    res,
    200,
    "User fetched successfully.",
    user
  );
});