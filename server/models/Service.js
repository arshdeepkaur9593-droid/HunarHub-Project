import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [150, "Service name cannot exceed 150 characters"],
    },

    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Service starting price is required"],
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrepreneur",
      required: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String,
      default: "1-3 Days",
      trim: true,
    },

    icon: {
      type: String,
      default: "Sparkles",
      trim: true,
    },

    color: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.set("toJSON", {
  virtuals: true,
});

serviceSchema.set("toObject", {
  virtuals: true,
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;