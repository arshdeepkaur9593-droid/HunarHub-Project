import Complaint from "../models/Complaint.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const createComplaint = asyncHandler(async (req, res) => {
  const {
    entrepreneur,
    orderId = "",
    subject,
    description,
  } = req.body;

  if (!entrepreneur) {
    res.status(400);
    throw new Error("Entrepreneur is required.");
  }

  if (!subject || !subject.trim()) {
    res.status(400);
    throw new Error("Complaint subject is required.");
  }

  if (!description || !description.trim()) {
    res.status(400);
    throw new Error("Complaint description is required.");
  }

  const selectedEntrepreneur = await Entrepreneur.findById(entrepreneur);

  if (!selectedEntrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur not found.");
  }

  const complaint = await Complaint.create({
    customer: req.user._id,
    customerName: req.user.name,
    entrepreneur: selectedEntrepreneur._id,
    entrepreneurName: selectedEntrepreneur.businessName,
    orderId: orderId.trim(),
    subject: subject.trim(),
    description: description.trim(),
    status: "Open",
  });

  return sendSuccess(
    res,
    201,
    "Complaint submitted successfully.",
    complaint
  );
});

export const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({
    customer: req.user._id,
  })
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Your complaints fetched successfully.",
    complaints
  );
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate("customer", "name email phone")
    .populate(
      "entrepreneur",
      "businessName ownerName profileImage location"
    );

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found.");
  }

  if (
    req.user.role === "customer" &&
    complaint.customer._id.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("You are not authorized to view this complaint.");
  }

  if (
    req.user.role === "entrepreneur" &&
    complaint.entrepreneur._id.toString() !==
      req.entrepreneur?._id?.toString()
  ) {
    res.status(403);
    throw new Error("You are not authorized to view this complaint.");
  }

  return sendSuccess(
    res,
    200,
    "Complaint fetched successfully.",
    complaint
  );
});

export const getAllComplaints = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    if (
      !["Open", "Under Review", "Resolved", "Closed"].includes(
        status
      )
    ) {
      res.status(400);
      throw new Error("Invalid complaint status.");
    }

    query.status = status;
  }

  if (search) {
    query.$or = [
      {
        subject: {
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
        customerName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        entrepreneurName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        orderId: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const complaints = await Complaint.find(query)
    .populate("customer", "name email phone")
    .populate(
      "entrepreneur",
      "businessName ownerName location status"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "All complaints fetched successfully.",
    complaints
  );
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const validStatuses = [
    "Open",
    "Under Review",
    "Resolved",
    "Closed",
  ];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(
      "Invalid complaint status. Use Open, Under Review, Resolved, or Closed."
    );
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found.");
  }

  complaint.status = status;

  await complaint.save();

  return sendSuccess(
    res,
    200,
    `Complaint status changed to ${status}.`,
    complaint
  );
});