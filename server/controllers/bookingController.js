import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const createBooking = asyncHandler(async (req, res) => {
  const {
    serviceId,
    name,
    phone,
    date,
    time,
    address,
    notes = "",
  } = req.body;

  if (!serviceId || !date || !time || !address) {
    res.status(400);
    throw new Error(
      "Service ID, date, time, and address are required."
    );
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  if (service.status !== "Active") {
    res.status(400);
    throw new Error("This service is not currently available.");
  }

  if (!service.entrepreneur) {
    res.status(400);
    throw new Error("This service has no entrepreneur assigned.");
  }

  const entrepreneur = await Entrepreneur.findById(
    service.entrepreneur
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

  const booking = await Booking.create({
    bookingId: `BKG-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    customer: req.user._id,
    customerName: name || req.user.name,
    phone: phone || req.user.phone || "",
    service: service._id,
    serviceName: service.name,
    category: service.category,
    entrepreneur: entrepreneur._id,
    entrepreneurName:
      entrepreneur.businessName || entrepreneur.ownerName,
    date,
    time,
    address,
    notes,
    price: service.price,
    status: "Pending",
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate("service", "name category price")
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .populate("customer", "name email phone");

  return sendSuccess(
    res,
    201,
    "Booking created successfully.",
    populatedBooking
  );
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    customer: req.user._id,
  })
    .populate("service", "name category price")
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Your bookings fetched successfully.",
    bookings
  );
});

export const getEntrepreneurBookings = asyncHandler(
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
      .populate("customer", "name email phone")
      .populate("service", "name category price")
      .sort({ createdAt: -1 });

    return sendSuccess(
      res,
      200,
      "Entrepreneur bookings fetched successfully.",
      bookings
    );
  }
);

export const getAllBookings = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      {
        bookingId: {
          $regex: search,
          $options: "i",
        },
      },
      {
        customerName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        serviceName: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const bookings = await Booking.find(query)
    .populate("customer", "name email phone")
    .populate("service", "name category price")
    .populate(
      "entrepreneur",
      "businessName ownerName phone email"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "All bookings fetched successfully.",
    bookings
  );
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("customer", "name email phone")
    .populate("service", "name category price")
    .populate(
      "entrepreneur",
      "businessName ownerName phone email"
    );

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found.");
  }

  if (req.user.role === "customer") {
    if (
      booking.customer._id.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error("Access denied.");
    }
  }

  if (req.user.role === "entrepreneur") {
    const entrepreneur = await Entrepreneur.findOne({
      user: req.user._id,
    });

    if (
      !entrepreneur ||
      booking.entrepreneur._id.toString() !==
        entrepreneur._id.toString()
    ) {
      res.status(403);
      throw new Error("Access denied.");
    }
  }

  return sendSuccess(
    res,
    200,
    "Booking fetched successfully.",
    booking
  );
});

export const updateBookingStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Accepted",
      "Rejected",
      "Completed",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      );
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found.");
    }

    if (req.user.role === "entrepreneur") {
      const entrepreneur = await Entrepreneur.findOne({
        user: req.user._id,
      });

      if (
        !entrepreneur ||
        booking.entrepreneur.toString() !==
          entrepreneur._id.toString()
      ) {
        res.status(403);
        throw new Error(
          "You can only update your own bookings."
        );
      }
    }

    if (
      booking.status === "Cancelled" ||
      booking.status === "Rejected"
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

    booking.status = status;

    await booking.save();

    return sendSuccess(
      res,
      200,
      "Booking status updated successfully.",
      booking
    );
  }
);