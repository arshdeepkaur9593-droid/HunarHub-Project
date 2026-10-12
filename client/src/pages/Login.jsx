import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, forgotPassword, resetPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [resetData, setResetData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;

    setResetData({
      ...resetData,
      [name]: name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/", { replace: true }), 800);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    const email = formData.email.trim();

    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      const result = await forgotPassword(email);
      setShowResetForm(true);
      setSuccess(
        result.message ||
          "If an account exists with this email, a password reset OTP will be sent.",
      );
    } catch (err) {
      setError(err.message || "Unable to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(resetData.otp)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (resetData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(
        formData.email.trim(),
        resetData.otp,
        resetData.newPassword,
      );

      setResetData({
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });

      setFormData((previous) => ({
        ...previous,
        password: "",
      }));

      setShowResetForm(false);
      setSuccess(
        result.message ||
          "Password reset successfully. Please log in with your new password.",
      );
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowResetForm(false);
    setResetData({
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <main
      className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6"
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
            {showResetForm ? "Reset Password" : "Welcome Back"}
          </h1>

          <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
            {showResetForm
              ? "Enter the OTP sent to your email and choose a new password."
              : "Login to continue to HunarHub"}
          </p>
        </div>

        <div
          className="rounded-3xl border bg-white p-6 sm:p-8"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {showResetForm ? (
            <form onSubmit={handleResetSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="resetEmail"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "#5B7DB1" }}
                  />

                  <input
                    id="resetEmail"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="hunar-input !pl-11"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  6-Digit OTP
                </label>

                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={resetData.otp}
                  onChange={handleResetChange}
                  placeholder="Enter OTP from your email"
                  className="hunar-input text-center tracking-[0.35em]"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  New Password
                </label>

                <div className="relative">
                  <FiLock
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "var(--color-green-dark)" }}
                  />

                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={resetData.newPassword}
                    onChange={handleResetChange}
                    placeholder="Enter new password"
                    className="hunar-input !pl-11 !pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "var(--color-muted)" }}
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <FiLock
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "var(--color-green-dark)" }}
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={resetData.confirmPassword}
                    onChange={handleResetChange}
                    placeholder="Confirm new password"
                    className="hunar-input !pl-11 !pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "var(--color-muted)" }}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                  role="status"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: "#4D7A45",
                  boxShadow: "0 7px 20px rgba(77, 122, 69, 0.18)",
                }}
              >
                {loading ? "Please wait..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold"
                style={{ color: "#5B7DB1" }}
              >
                <FiArrowLeft />
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "#5B7DB1" }}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="hunar-input !pl-11"
                  />
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

                <div className="relative">
                  <FiLock
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"
                    style={{ color: "var(--color-green-dark)" }}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="hunar-input !pl-11 !pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 transition-colors duration-200"
                    style={{ color: "var(--color-muted)" }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-sm font-semibold transition-colors duration-200 hover:text-[#4D6895] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ color: "#5B7DB1" }}
                >
                  {loading ? "Please wait..." : "Forgot Password?"}
                </button>
              </div>

              {error && (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                  role="status"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: "#4D7A45",
                  boxShadow: "0 7px 20px rgba(77, 122, 69, 0.18)",
                }}
              >
                {loading ? "Please wait..." : "Login"}
              </button>
            </form>
          )}

          {!showResetForm && (
            <p
              className="mt-6 text-center text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold transition-colors duration-200 hover:text-[#4D6895]"
                style={{ color: "#5B7DB1" }}
              >
                Sign Up
              </Link>
            </p>
          )}
        </div>

        <div className="mt-5 text-center">
          <span
            className="inline-flex rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-green)",
              color: "var(--color-green-dark)",
            }}
          >
            Simple & secure access to HunarHub
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;
