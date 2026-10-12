import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod = "cod",
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Order must contain at least one item.");
  }

  if (
    !shippingAddress?.address ||
    !shippingAddress?.city ||
    !shippingAddress?.pincode
  ) {
    res.status(400);
    throw new Error("Complete shipping address is required.");
  }

  if (!["cod", "online"].includes(paymentMethod)) {
    res.status(400);
    throw new Error("Invalid payment method.");
  }

  const quantityMap = new Map();

  for (const item of items) {
    const productId = item.product || item._id || item.id;

    if (!productId) {
      res.status(400);
      throw new Error("Product ID is required for each item.");
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      res.status(400);
      throw new Error("Product quantity must be at least 1.");
    }

    const currentQuantity = quantityMap.get(productId) || 0;
    quantityMap.set(productId, currentQuantity + quantity);
  }

  const validatedItems = [];
  let subtotal = 0;

  for (const [productId, quantity] of quantityMap.entries()) {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${productId}`);
    }

    if (!["Approved", "Active"].includes(product.status)) {
      res.status(400);
      throw new Error(`Product "${product.name}" is not available.`);
    }

    if (!product.entrepreneur) {
      res.status(400);
      throw new Error(
        `Product "${product.name}" has no entrepreneur assigned.`
      );
    }

    if (!Number.isFinite(product.price) || product.price < 0) {
      res.status(400);
      throw new Error(
        `Product "${product.name}" has an invalid price.`
      );
    }

    if (product.stock < quantity) {
      res.status(400);
      throw new Error(
        `Insufficient stock for "${product.name}". Available: ${product.stock}`
      );
    }

    const itemTotal = product.price * quantity;

    subtotal += itemTotal;

    validatedItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image || product.images?.[0] || "",
      seller: product.seller || "",
      entrepreneur: product.entrepreneur,
    });
  }

  const deliveryCharge = subtotal >= 500 ? 0 : 50;
  const totalAmount = subtotal + deliveryCharge;

  const order = await Order.create({
    orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    customer: req.user._id,
    customerName: req.user.name,
    items: validatedItems,

    shippingAddress: {
      fullName: shippingAddress.fullName || req.user.name,
      phone: shippingAddress.phone || req.user.phone || "",
      address: shippingAddress.address.trim(),
      city: shippingAddress.city.trim(),
      state: shippingAddress.state?.trim() || "",
      pincode: shippingAddress.pincode.trim(),
    },

    paymentMethod,
    paymentStatus: "Pending",
    subtotal,
    deliveryCharge,
    totalAmount,
    orderStatus: "Pending",
  });

  for (const item of validatedItems) {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: item.product,
        stock: { $gte: item.quantity },
      },
      {
        $inc: {
          stock: -item.quantity,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      await Order.findByIdAndDelete(order._id);

      res.status(409);
      throw new Error(
        `Stock changed while placing the order for "${item.name}". Please try again.`
      );
    }

    if (updatedProduct.stock === 0) {
      updatedProduct.status = "Out of Stock";
      await updatedProduct.save();
    }
  }

  const populatedOrder = await Order.findById(order._id)
    .populate("customer", "name email phone")
    .populate(
      "items.product",
      "name image images price"
    )
    .populate(
      "items.entrepreneur",
      "businessName ownerName"
    );

  return sendSuccess(
    res,
    201,
    "Order placed successfully.",
    populatedOrder
  );
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    customer: req.user._id,
  })
    .populate(
      "items.product",
      "name image images price"
    )
    .populate(
      "items.entrepreneur",
      "businessName ownerName"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Your orders fetched successfully.",
    orders
  );
});

export const getEntrepreneurOrders = asyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findOne({
    user: req.user._id,
  });

  if (!entrepreneur) {
    res.status(404);
    throw new Error("Entrepreneur profile not found.");
  }

  const orders = await Order.find({
    "items.entrepreneur": entrepreneur._id,
  })
    .populate("customer", "name email phone")
    .populate(
      "items.product",
      "name image images price"
    )
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Entrepreneur orders fetched successfully.",
    orders
  );
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "All Status") {
    query.orderStatus = status;
  }

  if (search) {
    query.$or = [
      {
        orderId: {
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
    ];
  }

  const orders = await Order.find(query)
    .populate("customer", "name email phone")
    .populate(
      "items.product",
      "name image images price"
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

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("customer", "name email phone")
    .populate(
      "items.product",
      "name image images price"
    )
    .populate(
      "items.entrepreneur",
      "businessName ownerName"
    );

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  if (req.user.role === "customer") {
    if (
      order.customer._id.toString() !==
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

    if (!entrepreneur) {
      res.status(404);
      throw new Error("Entrepreneur profile not found.");
    }

    const hasProduct = order.items.some(
      (item) =>
        item.entrepreneur &&
        item.entrepreneur._id.toString() ===
          entrepreneur._id.toString()
    );

    if (!hasProduct) {
      res.status(403);
      throw new Error(
        "You are not authorized to view this order."
      );
    }
  }

  return sendSuccess(
    res,
    200,
    "Order fetched successfully.",
    order
  );
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
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
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`
    );
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  if (req.user.role === "entrepreneur") {
    const entrepreneur = await Entrepreneur.findOne({
      user: req.user._id,
    });

    if (!entrepreneur) {
      res.status(404);
      throw new Error("Entrepreneur profile not found.");
    }

    const hasProduct = order.items.some(
      (item) =>
        item.entrepreneur &&
        item.entrepreneur.toString() ===
          entrepreneur._id.toString()
    );

    if (!hasProduct) {
      res.status(403);
      throw new Error(
        "You are not authorized to update this order."
      );
    }
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
});