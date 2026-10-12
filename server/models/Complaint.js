import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      default: "",
    },
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrepreneur",
      required: true,
    },
    entrepreneurName: {
      type: String,
      default: "",
    },
    orderId: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      required: [true, "Complaint subject is required"],
    },
    description: {
      type: String,
      required: [true, "Complaint description is required"],
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    },
    status: {
      type: String,
      enum: ["Open", "Under Review", "Resolved", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

complaintSchema.set("toJSON", { virtuals: true });
complaintSchema.set("toObject", { virtuals: true });

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
