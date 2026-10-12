import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Entrepreneur from "../models/Entrepreneur.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

const updateAverageRating = async (model, id) => {
  const reviews = await Review.find({
    [model === Product ? "product" : "service"]: id,
  }).select("rating");

  const reviewCount = reviews.length;

  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : 0;

  await model.findByIdAndUpdate(id, {
    rating: Number(averageRating.toFixed(1)),
    reviewCount,
  });

  return {
    rating: Number(averageRating.toFixed(1)),
    reviewCount,
  };
};

const updateEntrepreneurRating = async (entrepreneurId) => {
  const reviews = await Review.find({
    entrepreneur: entrepreneurId,
  }).select("rating");

  const reviewCount = reviews.length;

  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : 0;

  await Entrepreneur.findByIdAndUpdate(entrepreneurId, {
    rating: Number(averageRating.toFixed(1)),
    reviewCount,
  });
};

export const createReview = asyncHandler(async (req, res) => {
  const { product, service, rating, comment } = req.body;

  if (!product && !service) {
    res.status(400);
    throw new Error("Product or service is required.");
  }

  if (product && service) {
    res.status(400);
    throw new Error(
      "Review can be for a product or a service, not both."
    );
  }

  const parsedRating = Number(rating);

  if (
    !Number.isInteger(parsedRating) ||
    parsedRating < 1 ||
    parsedRating > 5
  ) {
    res.status(400);
    throw new Error("Rating must be a whole number between 1 and 5.");
  }

  if (!comment || !comment.trim()) {
    res.status(400);
    throw new Error("Review comment is required.");
  }

  let entrepreneurId;
  let selectedProduct = null;
  let selectedService = null;

  if (product) {
    selectedProduct = await Product.findById(product);

    if (!selectedProduct) {
      res.status(404);
      throw new Error("Product not found.");
    }

    entrepreneurId = selectedProduct.entrepreneur;
  }

  if (service) {
    selectedService = await Service.findById(service);

    if (!selectedService) {
      res.status(404);
      throw new Error("Service not found.");
    }

    entrepreneurId = selectedService.entrepreneur;
  }

  if (!entrepreneurId) {
    res.status(400);
    throw new Error("Entrepreneur information is required.");
  }

  const existingReviewQuery = {
    customer: req.user._id,
  };

  if (product) {
    existingReviewQuery.product = product;
  }

  if (service) {
    existingReviewQuery.service = service;
  }

  const existingReview = await Review.findOne(existingReviewQuery);

  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this item.");
  }

  const review = await Review.create({
    customer: req.user._id,
    customerName: req.user.name,
    product: product || null,
    service: service || null,
    entrepreneur: entrepreneurId,
    rating: parsedRating,
    comment: comment.trim(),
  });

  if (selectedProduct) {
    await updateAverageRating(Product, selectedProduct._id);
  }

  if (selectedService) {
    await updateAverageRating(Service, selectedService._id);
  }

  await updateEntrepreneurRating(entrepreneurId);

  const populatedReview = await Review.findById(review._id)
    .populate("customer", "name email")
    .populate("product", "name image images")
    .populate("service", "name price")
    .populate("entrepreneur", "businessName ownerName");

  return sendSuccess(
    res,
    201,
    "Review submitted successfully.",
    populatedReview
  );
});

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
  })
    .populate("customer", "name")
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Product reviews fetched successfully.",
    reviews
  );
});

export const getServiceReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    service: req.params.serviceId,
  })
    .populate("customer", "name")
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Service reviews fetched successfully.",
    reviews
  );
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    customer: req.user._id,
  })
    .populate("product", "name image images")
    .populate("service", "name price")
    .populate("entrepreneur", "businessName ownerName")
    .sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    "Your reviews fetched successfully.",
    reviews
  );
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }

  if (review.customer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error(
      "You are not authorized to update this review."
    );
  }

  if (req.body.rating !== undefined) {
    const rating = Number(req.body.rating);

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      res.status(400);
      throw new Error(
        "Rating must be a whole number between 1 and 5."
      );
    }

    review.rating = rating;
  }

  if (req.body.comment !== undefined) {
    if (!req.body.comment.trim()) {
      res.status(400);
      throw new Error("Review comment cannot be empty.");
    }

    review.comment = req.body.comment.trim();
  }

  await review.save();

  if (review.product) {
    await updateAverageRating(Product, review.product);
  }

  if (review.service) {
    await updateAverageRating(Service, review.service);
  }

  await updateEntrepreneurRating(review.entrepreneur);

  return sendSuccess(
    res,
    200,
    "Review updated successfully.",
    review
  );
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }

  if (review.customer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error(
      "You are not authorized to delete this review."
    );
  }

  const productId = review.product;
  const serviceId = review.service;
  const entrepreneurId = review.entrepreneur;

  await review.deleteOne();

  if (productId) {
    await updateAverageRating(Product, productId);
  }

  if (serviceId) {
    await updateAverageRating(Service, serviceId);
  }

  await updateEntrepreneurRating(entrepreneurId);

  return sendSuccess(
    res,
    200,
    "Review deleted successfully."
  );
});