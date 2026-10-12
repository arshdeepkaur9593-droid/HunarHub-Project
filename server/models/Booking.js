import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrepreneur",
      required: true,
    },

    entrepreneurName: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: String,
      required: [true, "Service date is required"],
      trim: true,
    },

    time: {
      type: String,
      required: [true, "Service time is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Service address is required"],
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.set("toJSON", {
  virtuals: true,
});

bookingSchema.set("toObject", {
  virtuals: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;