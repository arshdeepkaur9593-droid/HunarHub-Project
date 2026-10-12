import crypto from "node:crypto";

export const generateEmailOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const hashEmailOtp = (otp) => {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(otp)
    .digest("hex");
};

export const getOtpExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};