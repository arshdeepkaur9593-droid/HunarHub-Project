import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBriefcase,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { register, verifyEmail, resendVerificationOtp } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const email = formData.email.trim().toLowerCase();

    try {
      setLoading(true);

      await register({
        name: formData.name.trim(),
        email,
        password: formData.password,
        role: formData.role,
      });

      setRegisteredEmail(email);
      setOtp("");
      setOtpStep(true);
      setSuccess(
        "We sent a verification code to your email. Please check your inbox and spam folder.",
      );
    } catch (err) {
      const message = err.message || "";

      if (/already exists|already registered|duplicate/i.test(message)) {
        setRegisteredEmail(email);
        setOtp("");
        setOtpStep(true);
        setSuccess(
          "This account already exists. Click Resend Verification Code to request a fresh OTP.",
        );
      } else {
        setError(message || "Unable to create your account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      await verifyEmail(registeredEmail, otp);

      setSuccess("Email verified successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(err.message || "Email verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const result = await resendVerificationOtp(registeredEmail);

      setSuccess(
        result.message ||
          "A new verification code has been sent. Please check your inbox.",
      );

      setOtp("");
    } catch (err) {
      setError(err.message || "Unable to resend verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <FiGrid className="text-2xl" />
          </div>

          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            {otpStep ? "Verify Your Email" : "Create Account"}
          </h1>

          <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
            {otpStep
              ? `Enter the 6-digit code sent to ${registeredEmail}`
              : "Join HunarHub and connect with your local community"}
          </p>
        </div>

        <div
          className="rounded-3xl border bg-white p-6 sm:p-8"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {otpStep ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Email Verification Code
                </label>

                <div className="relative">
                  <FiMail
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-primary)" }}
                  />

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter 6-digit code"
                    className="hunar-input !pl-11 text-center tracking-[0.4em]"
                  />
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  The code expires after 10 minutes.
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "var(--color-green-dark)" }}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full py-2 text-sm font-semibold disabled:opacity-60"
                style={{ color: "#5B7DB1" }}
              >
                {loading ? "Please wait..." : "Resend Verification Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpStep(false);
                  setOtp("");
                  setError("");
                  setSuccess("");
                }}
                className="w-full py-2 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Back to Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Full Name
                </label>

                <div
                  className="flex h-12 overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-surface-soft)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "#5B7DB1" }}
                  >
                    <FiUser className="text-lg" />
                  </div>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={60}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 pr-4 text-sm outline-none"
                    style={{ color: "var(--color-heading)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Email Address
                </label>

                <div
                  className="flex h-12 overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-surface-soft)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <FiMail className="text-lg" />
                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 pr-4 text-sm outline-none"
                    style={{ color: "var(--color-heading)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  I want to join as
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("customer")}
                    className="flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200"
                    style={{
                      borderColor:
                        formData.role === "customer"
                          ? "var(--color-primary)"
                          : "var(--color-border)",
                      backgroundColor:
                        formData.role === "customer"
                          ? "var(--color-green)"
                          : "var(--color-surface-soft)",
                    }}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor:
                          formData.role === "customer"
                            ? "white"
                            : "var(--color-peach)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <FiUser />
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        Customer
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Find local services
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange("entrepreneur")}
                    className="flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200"
                    style={{
                      borderColor:
                        formData.role === "entrepreneur"
                          ? "var(--color-primary)"
                          : "var(--color-border)",
                      backgroundColor:
                        formData.role === "entrepreneur"
                          ? "var(--color-green)"
                          : "var(--color-surface-soft)",
                    }}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor:
                          formData.role === "entrepreneur"
                            ? "white"
                            : "var(--color-peach)",
                        color: "var(--color-green-dark)",
                      }}
                    >
                      <FiBriefcase />
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        Entrepreneur
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Offer local services
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Password
                </label>

                <div
                  className="flex h-12 overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-surface-soft)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "var(--color-green-dark)" }}
                  >
                    <FiLock className="text-lg" />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm outline-none"
                    style={{ color: "var(--color-heading)" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "#5B7DB1" }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Confirm Password
                </label>

                <div
                  className="flex h-12 overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-surface-soft)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "#5B7DB1" }}
                  >
                    <FiLock className="text-lg" />
                  </div>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm outline-none"
                    style={{ color: "var(--color-heading)" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex w-12 shrink-0 items-center justify-center"
                    style={{ color: "#5B7DB1" }}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: "var(--color-green-dark)",
                  boxShadow: "0 8px 22px rgba(77, 122, 69, 0.18)",
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {otpStep ? "Already verified?" : "Already have an account?"}{" "}
            <Link
              to="/login"
              className="font-semibold transition-colors"
              style={{ color: "#5B7DB1" }}
            >
              Login
            </Link>
          </p>

          {!otpStep && (
            <div
              className="mt-5 rounded-2xl border p-3 text-center"
              style={{
                backgroundColor: "var(--color-green)",
                borderColor: "var(--color-green-border)",
              }}
            >
              <p
                className="text-xs leading-5"
                style={{ color: "var(--color-green-dark)" }}
              >
                Create your account and start connecting with trusted local
                entrepreneurs.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SignUp;
