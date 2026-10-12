import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Entrepreneur from "../models/Entrepreneur.js";
import InvalidatedToken from "../models/InvalidatedToken.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route. Please log in.");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed or expired.");
  }

  const invalidatedToken = await InvalidatedToken.findOne({ token });

  if (invalidatedToken) {
    res.status(401);
    throw new Error("Session has expired. Please log in again.");
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User no longer exists.");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error("User account has been deactivated.");
  }

  req.user = user;

  if (user.role === "entrepreneur") {
    const entrepreneur = await Entrepreneur.findOne({
      user: user._id,
    });

    req.entrepreneur = entrepreneur;
  }

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `User role '${req.user?.role || "guest"}' is not authorized to access this route`
      );
    }

    next();
  };
};