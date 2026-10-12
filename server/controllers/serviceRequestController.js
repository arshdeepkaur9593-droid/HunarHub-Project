import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const createServiceRequest = asyncHandler(async (req, res) => {
  const {
    service,
    date,
    time,
    address,
    phone = "",
    notes = "",
  } = req.body;

  if (!service || !date || !time || !address) {
    res.status(400);
    throw new Error(
      "Service, date, time, and address are required."
    );
  }

  const bookingDate = new Date(date);

  if (Number.isNaN(bookingDate.getTime())) {
    res.status(400);
    throw new Error("Please provide a valid service date.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    res.status(400);
    throw new Error("Service date cannot be in the past.");
  }

  const selectedService = await Service.findOne({
    _id: service,
    status: "Active",
  }).populate(
    "entrepreneur",
    "businessName ownerName"
  );

  if (!selectedService) {
    res.status(404);
    throw new Error("Active service not found.");
  }

  if (!selectedService.entrepreneur) {
    res.status(400);
    throw new Error(
      "This service has no entrepreneur assigned."
    );
  }

  const entrepreneur = await Entrepreneur.findById(
    selectedService.entrepreneur._id
  );

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  if (entrepreneur.status !== "Approved") {
    res.status(400);
    throw new Error(
      "This entrepreneur is not currently approved."
    );
  }

  const bookingId = `HH-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;

  const booking = await Booking.create({
    bookingId,
    customer: req.user._id,
    customerName: req.user.name,
    phone: phone.trim() || req.user.phone || "",
    service: selectedService._id,
    serviceName: selectedService.name,
    category: selectedService.category,
    entrepreneur: entrepreneur._id,
    entrepreneurName: entrepreneur.businessName,
    date,
    time,
    address: address.trim(),
    notes: notes.trim(),
    price: selectedService.price,
    status: "Pending",
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate("service", "name price category")
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .populate("customer", "name email phone");

  return sendSuccess(
    res,
    201,
    "Service booking created successfully.",
    populatedBooking
  );
});

export const getMyServiceRequests = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    customer: req.user._id,
  })
    .populate(
      "service",
      "name price category"
    )
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Your service requests fetched successfully.",
    bookings
  );
});

export const getEntrepreneurServiceRequests = asyncHandler(
  async (req, res) => {
    const entrepreneur = await Entrepreneur.findOne({
      user: req.user._id,
    });

    if (!entrepreneur) {
      res.status(404);
      throw new Error("Entrepreneur profile not found.");
    }

    const bookings = await Booking.find({
      entrepreneur: entrepreneur._id,
    })
      .populate(
        "service",
        "name price category"
      )
      .populate(
        "customer",
        "name email phone"
      )
      .sort({ createdAt: -1 });

    return sendSuccess(
      res,
      200,
      "Entrepreneur service requests fetched successfully.",
      bookings
    );
  }
);

export const getServiceRequestById = asyncHandler(
  async (req, res) => {
    const booking = await Booking.findById(req.params.id)
      .populate(
        "service",
        "name price category"
      )
      .populate(
        "entrepreneur",
        "businessName ownerName profileImage location"
      )
      .populate(
        "customer",
        "name email phone"
      );

    if (!booking) {
      res.status(404);
      throw new Error("Service request not found.");
    }

    const isCustomer =
      booking.customer._id.toString() ===
      req.user._id.toString();

    let isEntrepreneur = false;

    if (req.user.role === "entrepreneur") {
      const entrepreneur = await Entrepreneur.findOne({
        user: req.user._id,
      });

      if (entrepreneur) {
        isEntrepreneur =
          booking.entrepreneur._id.toString() ===
          entrepreneur._id.toString();
      }
    }

    if (
      !isCustomer &&
      !isEntrepreneur &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error(
        "You are not authorized to view this service request."
      );
    }

    return sendSuccess(
      res,
      200,
      "Service request fetched successfully.",
      booking
    );
  }
);

export const updateServiceRequestStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    const allowedStatuses = [
      "Accepted",
      "Rejected",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error(
        "Invalid status. Use Accepted, Rejected, or Completed."
      );
    }

    const entrepreneur = await Entrepreneur.findOne({
      user: req.user._id,
    });

    if (!entrepreneur) {
      res.status(404);
      throw new Error(
        "Entrepreneur profile not found."
      );
    }

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      res.status(404);
      throw new Error(
        "Service request not found."
      );
    }

    if (
      booking.entrepreneur.toString() !==
      entrepreneur._id.toString()
    ) {
      res.status(403);
      throw new Error(
        "You are not authorized to update this request."
      );
    }

    if (
      ["Cancelled", "Rejected", "Completed"].includes(
        booking.status
      )
    ) {
      res.status(400);
      throw new Error(
        `A ${booking.status.toLowerCase()} booking cannot be updated.`
      );
    }

    if (
      status === "Completed" &&
      booking.status !== "Accepted"
    ) {
      res.status(400);
      throw new Error(
        "Only an accepted booking can be marked as completed."
      );
    }

    if (
      status === "Accepted" &&
      booking.status !== "Pending"
    ) {
      res.status(400);
      throw new Error(
        "Only a pending booking can be accepted."
      );
    }

    if (
      status === "Rejected" &&
      booking.status !== "Pending"
    ) {
      res.status(400);
      throw new Error(
        "Only a pending booking can be rejected."
      );
    }

    booking.status = status;

    await booking.save();

    return sendSuccess(
      res,
      200,
      `Service request ${status.toLowerCase()} successfully.`,
      booking
    );
  }
);

export const cancelServiceRequest = asyncHandler(
  async (req, res) => {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      res.status(404);
      throw new Error(
        "Service request not found."
      );
    }

    if (
      booking.customer.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error(
        "You are not authorized to cancel this booking."
      );
    }

    if (
      ["Completed", "Rejected", "Cancelled"].includes(
        booking.status
      )
    ) {
      res.status(400);
      throw new Error(
        `A ${booking.status.toLowerCase()} booking cannot be cancelled.`
      );
    }

    booking.status = "Cancelled";

    await booking.save();

    return sendSuccess(
      res,
      200,
      "Service booking cancelled successfully.",
      booking
    );
  }
);