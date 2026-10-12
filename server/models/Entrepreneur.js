import mongoose from "mongoose";

const entrepreneurSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [100, "Business name cannot exceed 100 characters"],
    },

    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      maxlength: [60, "Owner name cannot exceed 60 characters"],
    },

    category: {
      type: String,
      default: "Handmade Crafts",
      trim: true,
    },

    skill: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
      trim: true,
    },

    priceRange: {
      type: String,
      default: "",
      trim: true,
    },

    services: {
      type: [String],
      default: [],
    },

    workingHours: {
      type: String,
      default: "",
      trim: true,
    },

    availability: {
      available: {
        type: Boolean,
        default: true,
      },

      startTime: {
        type: String,
        default: "09:00",
      },

      endTime: {
        type: String,
        default: "18:00",
      },

      days: {
        Monday: {
          type: Boolean,
          default: true,
        },

        Tuesday: {
          type: Boolean,
          default: true,
        },

        Wednesday: {
          type: Boolean,
          default: true,
        },

        Thursday: {
          type: Boolean,
          default: true,
        },

        Friday: {
          type: Boolean,
          default: true,
        },

        Saturday: {
          type: Boolean,
          default: true,
        },

        Sunday: {
          type: Boolean,
          default: false,
        },
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Entrepreneur = mongoose.model(
  "Entrepreneur",
  entrepreneurSchema
);

export default Entrepreneur;