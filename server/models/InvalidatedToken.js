import mongoose from "mongoose";

const invalidatedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

invalidatedTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const InvalidatedToken = mongoose.model(
  "InvalidatedToken",
  invalidatedTokenSchema
);

export default InvalidatedToken;