import { timingSafeEqual } from "node:crypto";
import User from "../models/User.js";
import Entrepreneur from "../models/Entrepreneur.js";
import InvalidatedToken from "../models/InvalidatedToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { sendTokenResponse } from "../utils/generateToken.js";
import {
  generateEmailOtp,
  hashEmailOtp,
  getOtpExpiry,
} from "../utils/emailVerification.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/sendEmail.js";

export const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role = "customer",
    phone = "",
  } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    res.status(400);
    throw new Error("Please provide name, email, and password.");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    res.status(400);
    throw new Error("An account with this email address already exists.");
  }

  const assignedRole = ["customer", "entrepreneur"].includes(role)
    ? role
    : "customer";

  const otp = generateEmailOtp();

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: assignedRole,
    phone: typeof phone === "string" ? phone.trim() : "",
    isEmailVerified: false,
    emailVerificationRequired: true,
    emailVerificationOtpHash: hashEmailOtp(otp),
    emailVerificationOtpExpires: getOtpExpiry(),
    emailVerificationOtpAttempts: 0,
  });

  try {
    await sendVerificationEmail(normalizedEmail, otp);
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }

  if (assignedRole === "entrepreneur") {
    try {
      await Entrepreneur.create({
        user: user._id,
        businessName: `${name.trim()}'s Business`,
        ownerName: name.trim(),
        phone: typeof phone === "string" ? phone.trim() : "",
        email: normalizedEmail,
        status: "Pending",
      });
    } catch (error) {
      await User.findByIdAndDelete(user._id);
      throw error;
    }
  }

  return sendSuccess(
    res,
    201,
    "Account created. Please check your email for the verification code.",
    { email: normalizedEmail }
  );
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof otp !== "string" ||
    !/^\d{6}$/.test(otp)
  ) {
    res.status(400);
    throw new Error("Please provide a valid email and 6-digit OTP.");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or verification code.");
  }

  if (user.isEmailVerified) {
    return sendSuccess(res, 200, "Email is already verified.");
  }

  if (!user.emailVerificationRequired) {
    res.status(400);
    throw new Error("Email verification is not required for this account.");
  }

  if (user.emailVerificationOtpAttempts >= 5) {
    res.status(429);
    throw new Error(
      "Too many incorrect attempts. Please request a new code."
    );
  }

  if (
    !user.emailVerificationOtpHash ||
    !user.emailVerificationOtpExpires ||
    user.emailVerificationOtpExpires.getTime() <= Date.now()
  ) {
    res.status(400);
    throw new Error(
      "Verification code has expired. Please request a new one."
    );
  }

  const expectedHash = Buffer.from(
    user.emailVerificationOtpHash,
    "hex"
  );
  const actualHash = Buffer.from(hashEmailOtp(otp), "hex");

  const isValidOtp =
    expectedHash.length === actualHash.length &&
    timingSafeEqual(expectedHash, actualHash);

  if (!isValidOtp) {
    user.emailVerificationOtpAttempts += 1;
    await user.save();

    res.status(400);
    throw new Error("Incorrect verification code.");
  }

  user.isEmailVerified = true;
  user.emailVerificationRequired = false;
  user.emailVerificationOtpHash = undefined;
  user.emailVerificationOtpExpires = undefined;
  user.emailVerificationOtpAttempts = 0;

  await user.save();

  return sendSuccess(
    res,
    200,
    "Email verified successfully. You can now log in."
  );
});

export const resendVerificationOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    res.status(400);
    throw new Error("Please provide a valid email address.");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404);
    throw new Error("No account found with this email address.");
  }

  if (user.isEmailVerified || !user.emailVerificationRequired) {
    return sendSuccess(res, 200, "Your email is already verified.");
  }

  const now = Date.now();
  const lastSentAt = user.emailVerificationOtpSentAt
    ? new Date(user.emailVerificationOtpSentAt).getTime()
    : 0;

  if (lastSentAt && now - lastSentAt < 60 * 1000) {
    res.status(429);
    throw new Error("Please wait 60 seconds before requesting another code.");
  }

  const otp = generateEmailOtp();

  await sendVerificationEmail(normalizedEmail, otp);

  user.emailVerificationOtpHash = hashEmailOtp(otp);
  user.emailVerificationOtpExpires = getOtpExpiry();
  user.emailVerificationOtpAttempts = 0;
  user.emailVerificationOtpSentAt = new Date();

  await user.save();

  return sendSuccess(
    res,
    200,
    "A new verification code has been sent to your email."
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    res.status(400);
    throw new Error("Please provide an email and password.");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error(
      "Your account has been deactivated. Please contact support."
    );
  }

  if (user.emailVerificationRequired && !user.isEmailVerified) {
    res.status(403);
    throw new Error("Please verify your email before logging in.");
  }

  return sendTokenResponse(
    user,
    200,
    res,
    "Logged in successfully."
  );
});

export const logout = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;

  const token =
    authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token;

  if (token && token !== "none") {
    const decoded = await import("jsonwebtoken").then(({ default: jwt }) =>
      jwt.decode(token)
    );

    if (decoded?.exp) {
      await InvalidatedToken.updateOne(
        { token },
        {
          $setOnInsert: {
            token,
            expiresAt: new Date(decoded.exp * 1000),
          },
        },
        { upsert: true }
      );
    }
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return sendSuccess(res, 200, "Successfully logged out.");
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  let entrepreneurProfile = null;

  if (user.role === "entrepreneur") {
    entrepreneurProfile = await Entrepreneur.findOne({
      user: user._id,
    });
  }

  return sendSuccess(
    res,
    200,
    "Current user fetched successfully.",
    {
      user,
      entrepreneur: entrepreneurProfile,
    }
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, age, address, city, state, pincode } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      res.status(400);
      throw new Error("Name cannot be empty.");
    }

    user.name = name.trim();
  }

  if (phone !== undefined) {
    if (typeof phone !== "string") {
      res.status(400);
      throw new Error("Please enter a valid phone number.");
    }

    user.phone = phone.trim();
  }

  if (age !== undefined) {
    if (age === "" || age === null) {
      user.age = null;
    } else {
      const parsedAge = Number(age);

      if (
        !Number.isInteger(parsedAge) ||
        parsedAge < 1 ||
        parsedAge > 120
      ) {
        res.status(400);
        throw new Error("Please enter a valid age between 1 and 120.");
      }

      user.age = parsedAge;
    }
  }

  if (address !== undefined) {
    if (typeof address !== "string") {
      res.status(400);
      throw new Error("Please enter a valid address.");
    }

    user.address = address.trim();
  }

  if (city !== undefined) {
    if (typeof city !== "string") {
      res.status(400);
      throw new Error("Please enter a valid city.");
    }

    user.city = city.trim();
  }

  if (state !== undefined) {
    if (typeof state !== "string") {
      res.status(400);
      throw new Error("Please enter a valid state.");
    }

    user.state = state.trim();
  }

  if (pincode !== undefined) {
    if (typeof pincode !== "string") {
      res.status(400);
      throw new Error("Please enter a valid pincode.");
    }

    user.pincode = pincode.trim();
  }

  await user.save();

  return sendSuccess(res, 200, "Profile updated successfully.", {
    user,
  });
});

export const updateEntrepreneurProfile = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      phone,
      age,
      address,
      city,
      state,
      pincode,
      businessName,
      location,
      skill,
      experience,
      bio,
      description,
      services,
      priceRange,
      workingHours,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    if (user.role !== "entrepreneur") {
      res.status(403);
      throw new Error("Only entrepreneurs can update this profile.");
    }

    const entrepreneur = await Entrepreneur.findOne({
      user: user._id,
    });

    if (!entrepreneur) {
      res.status(404);
      throw new Error("Entrepreneur profile not found.");
    }

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        res.status(400);
        throw new Error("Name cannot be empty.");
      }

      user.name = name.trim();
      entrepreneur.ownerName = name.trim();
    }

    if (email !== undefined) {
      if (typeof email !== "string" || !email.trim()) {
        res.status(400);
        throw new Error("Email cannot be empty.");
      }

      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        res.status(400);
        throw new Error("This email is already in use.");
      }

      if (normalizedEmail !== user.email) {
        user.email = normalizedEmail;
        entrepreneur.email = normalizedEmail;
        user.isEmailVerified = false;
        user.emailVerificationRequired = true;
        user.emailVerificationOtpHash = undefined;
        user.emailVerificationOtpExpires = undefined;
        user.emailVerificationOtpAttempts = 0;
      }
    }

    if (phone !== undefined) {
      if (typeof phone !== "string") {
        res.status(400);
        throw new Error("Please enter a valid phone number.");
      }

      user.phone = phone.trim();
      entrepreneur.phone = phone.trim();
    }

    if (age !== undefined) {
      if (age === "" || age === null) {
        user.age = null;
      } else {
        const parsedAge = Number(age);

        if (
          !Number.isInteger(parsedAge) ||
          parsedAge < 1 ||
          parsedAge > 120
        ) {
          res.status(400);
          throw new Error("Age must be between 1 and 120.");
        }

        user.age = parsedAge;
      }
    }

    if (address !== undefined) {
      if (typeof address !== "string") {
        res.status(400);
        throw new Error("Please enter a valid address.");
      }

      user.address = address.trim();
      entrepreneur.address = address.trim();
    }

    if (city !== undefined) {
      if (typeof city !== "string") {
        res.status(400);
        throw new Error("Please enter a valid city.");
      }

      user.city = city.trim();
      entrepreneur.city = city.trim();
    }

    if (state !== undefined) {
      if (typeof state !== "string") {
        res.status(400);
        throw new Error("Please enter a valid state.");
      }

      user.state = state.trim();
      entrepreneur.state = state.trim();
    }

    if (pincode !== undefined) {
      if (typeof pincode !== "string") {
        res.status(400);
        throw new Error("Please enter a valid pincode.");
      }

      user.pincode = pincode.trim();
    }

    if (businessName !== undefined) {
      if (typeof businessName !== "string" || !businessName.trim()) {
        res.status(400);
        throw new Error("Business name cannot be empty.");
      }

      entrepreneur.businessName = businessName.trim();
    }

    if (location !== undefined) {
      if (typeof location !== "string") {
        res.status(400);
        throw new Error("Please enter a valid location.");
      }

      entrepreneur.location = location.trim();
    }

    if (skill !== undefined) {
      if (typeof skill !== "string") {
        res.status(400);
        throw new Error("Please enter a valid skill.");
      }

      entrepreneur.skill = skill.trim();
    }

    if (experience !== undefined) {
      if (typeof experience !== "string") {
        res.status(400);
        throw new Error("Please enter valid experience details.");
      }

      entrepreneur.experience = experience.trim();
    }

    if (bio !== undefined) {
      if (typeof bio !== "string") {
        res.status(400);
        throw new Error("Please enter a valid bio.");
      }

      entrepreneur.bio = bio.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        res.status(400);
        throw new Error("Please enter a valid description.");
      }

      entrepreneur.description = description.trim();
    }

    if (services !== undefined) {
      if (!Array.isArray(services)) {
        res.status(400);
        throw new Error("Services must be provided as a list.");
      }

      entrepreneur.services = services
        .filter((service) => typeof service === "string")
        .map((service) => service.trim())
        .filter(Boolean);
    }

    if (priceRange !== undefined) {
      if (typeof priceRange !== "string") {
        res.status(400);
        throw new Error("Please enter a valid price range.");
      }

      entrepreneur.priceRange = priceRange.trim();
    }

    if (workingHours !== undefined) {
      if (typeof workingHours !== "string") {
        res.status(400);
        throw new Error("Please enter valid working hours.");
      }

      entrepreneur.workingHours = workingHours.trim();
    }

    await user.save();
    await entrepreneur.save();

    return sendSuccess(
      res,
      200,
      "Entrepreneur profile updated successfully.",
      {
        user,
        entrepreneur,
      }
    );
  }
);
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    res.status(400);
    throw new Error("Please provide a valid email address.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  const successMessage =
    "If an account exists with this email, a password reset OTP will be sent.";

  if (!user) {
    return sendSuccess(res, 200, successMessage);
  }

  const now = Date.now();
  const lastSentAt = user.passwordResetOtpSentAt
    ? new Date(user.passwordResetOtpSentAt).getTime()
    : 0;

  if (lastSentAt && now - lastSentAt < 60 * 1000) {
    res.status(429);
    throw new Error("Please wait 60 seconds before requesting another OTP.");
  }

  const otp = generateEmailOtp();

  user.passwordResetOtpHash = hashEmailOtp(otp);
  user.passwordResetOtpExpires = getOtpExpiry();
  user.passwordResetOtpAttempts = 0;
  user.passwordResetOtpSentAt = new Date(now);

  await user.save();

  try {
    await sendPasswordResetEmail(user.email, otp);
  } catch (error) {
    user.passwordResetOtpHash = undefined;
    user.passwordResetOtpExpires = undefined;
    user.passwordResetOtpAttempts = 0;
    user.passwordResetOtpSentAt = undefined;
    await user.save();

    throw error;
  }

  return sendSuccess(res, 200, successMessage);
});
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof otp !== "string" ||
    !/^\d{6}$/.test(otp) ||
    typeof newPassword !== "string" ||
    newPassword.length < 8
  ) {
    res.status(400);
    throw new Error(
      "Provide a valid email, 6-digit OTP, and password with at least 8 characters."
    );
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password reset code.");
  }

  if (user.passwordResetOtpAttempts >= 5) {
    res.status(429);
    throw new Error("Too many incorrect attempts. Request a new OTP.");
  }

  if (
    !user.passwordResetOtpHash ||
    !user.passwordResetOtpExpires ||
    user.passwordResetOtpExpires.getTime() <= Date.now()
  ) {
    res.status(400);
    throw new Error("Password reset code has expired. Request a new OTP.");
  }

  const expectedHash = Buffer.from(user.passwordResetOtpHash, "hex");
  const actualHash = Buffer.from(hashEmailOtp(otp), "hex");

  const isValidOtp =
    expectedHash.length === actualHash.length &&
    timingSafeEqual(expectedHash, actualHash);

  if (!isValidOtp) {
    user.passwordResetOtpAttempts += 1;
    await user.save();

    res.status(400);
    throw new Error("Incorrect password reset code.");
  }

  user.password = newPassword;
  user.passwordResetOtpHash = undefined;
  user.passwordResetOtpExpires = undefined;
  user.passwordResetOtpAttempts = 0;
  user.passwordResetOtpSentAt = undefined;

  await user.save();

  return sendSuccess(
    res,
    200,
    "Password reset successfully. Please log in with your new password."
  );
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (
    typeof currentPassword !== "string" ||
    !currentPassword ||
    typeof newPassword !== "string" ||
    newPassword.length < 8
  ) {
    res.status(400);
    throw new Error(
      "Provide your current password and a new password with at least 8 characters."
    );
  }

  if (currentPassword === newPassword) {
    res.status(400);
    throw new Error("New password must be different from the current password.");
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const isPasswordValid = await user.matchPassword(currentPassword);

  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Current password is incorrect.");
  }

  user.password = newPassword;
  await user.save();

  return sendSuccess(
    res,
    200,
    "Password changed successfully. Please log in again if required."
  );
});