import User from "../models/User.js";
import Entrepreneur from "../models/Entrepreneur.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import Booking from "../models/Booking.js";
import Complaint from "../models/Complaint.js";
import Service from "../models/Service.js";

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalEntrepreneurs,
    pendingEntrepreneurs,
    totalProducts,
    pendingProducts,
    totalCategories,
    totalOrders,
    pendingOrders,
    totalBookings,
    pendingBookings,
    totalComplaints,
    openComplaints,
  ] = await Promise.all([
    User.countDocuments(),
    Entrepreneur.countDocuments(),
    Entrepreneur.countDocuments({ status: "Pending" }),
    Product.countDocuments(),
    Product.countDocuments({ status: "Pending" }),
    Category.countDocuments(),
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: "Pending" }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "Pending" }),
    Complaint.countDocuments(),
    Complaint.countDocuments({
      status: { $in: ["Open", "Under Review"] },
    }),
  ]);

  const deliveredOrders = await Order.find({
    orderStatus: "Delivered",
  }).select("totalAmount");

  const totalRevenue = deliveredOrders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  return sendSuccess(
    res,
    200,
    "Dashboard statistics fetched successfully.",
    {
      totalUsers,
      totalEntrepreneurs,
      pendingEntrepreneurs,
      totalProducts,
      pendingProducts,
      totalCategories,
      totalOrders,
      pendingOrders,
      totalBookings,
      pendingBookings,
      totalComplaints,
      openComplaints,
      totalRevenue,
    }
  );
});

export const getUsers = asyncHandler(async (req, res) => {
  const { role, search } = req.query;

  const query = {};

  if (role && role !== "All Roles") {
    query.role = role;
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
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Users fetched successfully.",
    users
  );
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    res.status(400);
    throw new Error("isActive must be true or false.");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (user.role === "admin") {
    res.status(400);
    throw new Error(
      "Admin account status cannot be changed here."
    );
  }

  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error(
      "You cannot deactivate your own admin account."
    );
  }

  user.isActive = isActive;

  await user.save();

  return sendSuccess(
    res,
    200,
    `User ${isActive ? "activated" : "deactivated"
    } successfully.`,
    user
  );
});

export const getPendingEntrepreneurs = asyncHandler(
  async (req, res) => {
    const entrepreneurs = await Entrepreneur.find({
      status: "Pending",
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    return sendSuccess(
      res,
      200,
      "Pending entrepreneurs fetched successfully.",
      entrepreneurs
    );
  }
);

export const updateEntrepreneurStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    if (
      !["Pending", "Approved", "Rejected"].includes(status)
    ) {
      res.status(400);
      throw new Error(
        "Invalid status. Use Pending, Approved, or Rejected."
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
      `Entrepreneur ${status.toLowerCase()} successfully.`,
      entrepreneur
    );
  }
);

export const getProducts = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    const validStatuses = [
      "Active",
      "Pending",
      "Approved",
      "Rejected",
      "Out of Stock",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid product status.");
    }

    query.status = status;
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
      "businessName ownerName location status"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Products fetched successfully.",
    products
  );
});

export const updateProductStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    const validStatuses = [
      "Active",
      "Pending",
      "Approved",
      "Rejected",
      "Out of Stock",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid product status.");
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    if (
      status === "Approved" &&
      product.stock === 0
    ) {
      res.status(400);
      throw new Error(
        "A product with zero stock cannot be approved."
      );
    }

    if (
      status === "Active" &&
      product.stock === 0
    ) {
      res.status(400);
      throw new Error(
        "A product with zero stock cannot be activated."
      );
    }

    product.status = status;

    await product.save();

    return sendSuccess(
      res,
      200,
      `Product status changed to ${status}.`,
      product
    );
  }
);

export const getOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    query.orderStatus = status;
  }

  const orders = await Order.find(query)
    .populate("customer", "name email phone")
    .populate(
      "items.product",
      "name price image"
    )
    .populate(
      "items.entrepreneur",
      "businessName ownerName"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "All orders fetched successfully.",
    orders
  );
});

export const updateOrderStatus = asyncHandler(
  async (req, res) => {
    const { orderStatus } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      res.status(400);
      throw new Error("Invalid order status.");
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found.");
    }

    if (order.orderStatus === "Cancelled") {
      res.status(400);
      throw new Error(
        "Cancelled orders cannot be updated."
      );
    }

    if (
      order.orderStatus === "Delivered" &&
      orderStatus !== "Delivered"
    ) {
      res.status(400);
      throw new Error(
        "Delivered orders cannot move to another status."
      );
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "Delivered") {
      order.paymentStatus = "Completed";
    }

    await order.save();

    return sendSuccess(
      res,
      200,
      "Order status updated successfully.",
      order
    );
  }
);

export const getBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    const validStatuses = [
      "Pending",
      "Accepted",
      "Rejected",
      "Completed",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid booking status.");
    }

    query.status = status;
  }

  const bookings = await Booking.find(query)
    .populate(
      "customer",
      "name email phone"
    )
    .populate(
      "entrepreneur",
      "businessName ownerName"
    )
    .populate(
      "service",
      "name price category"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "All service bookings fetched successfully.",
    bookings
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
      throw new Error("Invalid booking status.");
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found.");
    }

    if (
      ["Completed", "Cancelled"].includes(
        booking.status
      )
    ) {
      res.status(400);
      throw new Error(
        `A ${booking.status.toLowerCase()} booking cannot be updated.`
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

export const getComplaints = asyncHandler(
  async (req, res) => {
    const { status, search } = req.query;

    const query = {};

    if (status && status !== "All Status") {
      const validStatuses = [
        "Open",
        "Under Review",
        "Resolved",
        "Closed",
      ];

      if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error(
          "Invalid complaint status."
        );
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
      .populate(
        "customer",
        "name email phone"
      )
      .populate(
        "entrepreneur",
        "businessName ownerName"
      )
      .sort({ createdAt: -1 });

    return sendSuccess(
      res,
      200,
      "Complaints fetched successfully.",
      complaints
    );
  }
);

export const updateComplaintStatus = asyncHandler(
  async (req, res) => {
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
        "Invalid complaint status."
      );
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

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
  }
);

export const getServices = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    const validStatuses = ["Active", "Inactive"];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid service status.");
    }

    query.status = status;
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
        category: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const services = await Service.find(query)
    .populate(
      "entrepreneur",
      "businessName ownerName location status"
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

export const updateServiceStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    const validStatuses = ["Active", "Inactive"];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error(
        "Invalid service status. Use Active or Inactive."
      );
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404);
      throw new Error("Service not found.");
    }

    service.status = status;

    await service.save();

    return sendSuccess(
      res,
      200,
      `Service status changed to ${status}.`,
      service
    );
  }
);