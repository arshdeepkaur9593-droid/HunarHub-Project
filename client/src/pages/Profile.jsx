import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiBriefcase,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/users";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  age: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function Profile() {
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      age: user.age ?? "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (
      formData.age !== "" &&
      (!Number.isInteger(Number(formData.age)) ||
        Number(formData.age) < 1 ||
        Number(formData.age) > 120)
    ) {
      setError("Please enter a valid age between 1 and 120.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          age: formData.age === "" ? null : Number(formData.age),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update your profile.");
      }

      setFormData((previous) => ({
        ...previous,
        ...result.data.user,
        age: result.data.user.age ?? "",
      }));

      setSuccess("Your profile has been updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      age: user?.age ?? "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      pincode: user?.pincode || "",
    });

    setEditing(false);
    setError("");
    setSuccess("");
  };

  const roleLabel = {
    customer: "Customer",
    entrepreneur: "Entrepreneur",
    admin: "Admin",
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      icon: FiUser,
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: FiPhone,
      placeholder: "Enter your phone number",
      type: "tel",
    },
    {
      name: "age",
      label: "Age",
      icon: FiCalendar,
      placeholder: "Enter your age",
      type: "number",
    },
    {
      name: "address",
      label: "Street Address",
      icon: FiMapPin,
      placeholder: "House number, street or locality",
      full: true,
    },
    {
      name: "city",
      label: "City",
      icon: FiMapPin,
      placeholder: "Enter your city",
    },
    {
      name: "state",
      label: "State",
      icon: FiMapPin,
      placeholder: "Enter your state",
    },
    {
      name: "pincode",
      label: "PIN Code",
      icon: FiMapPin,
      placeholder: "Enter PIN code",
      type: "text",
    },
  ];

  if (authLoading) {
    return (
      <main
        className="flex min-h-[60vh] items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <p style={{ color: "var(--color-muted)" }}>Loading your profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        className="flex min-h-[60vh] items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center">
          <FiUser className="mx-auto mb-4 text-4xl" />
          <h1 className="text-2xl font-bold">Login Required</h1>
          <p className="mt-2 text-sm text-gray-500">
            Please login to view your profile.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:py-14"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p
            className="mb-2 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            HUNARHUB / MY ACCOUNT
          </p>
          <h1
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ color: "var(--color-heading)" }}
          >
            My Profile
          </h1>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "var(--color-muted)" }}
          >
            Manage your personal information and contact details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside
            className="h-fit rounded-3xl border bg-white p-6 text-center"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold"
              style={{
                backgroundColor: "var(--color-peach)",
                color: "var(--color-primary)",
              }}
            >
              {user.name?.trim()?.charAt(0)?.toUpperCase() || <FiUser />}
            </div>

            <h2
              className="mt-4 break-words text-xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              {user.name}
            </h2>

            <p
              className="mt-1 break-all text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              {user.email}
            </p>

            <span
              className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-green-dark)",
              }}
            >
              <FiBriefcase />
              {roleLabel[user.role] || user.role}
            </span>

            <div
              className="mt-6 border-t pt-5 text-left"
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                Account created
              </p>
              <p className="mt-1 text-sm font-semibold">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Not available"}
              </p>
            </div>
          </aside>

          <section
            className="rounded-3xl border bg-white p-5 sm:p-8"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Personal Information
                </h2>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Your account details
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    boxShadow: "var(--shadow-primary)",
                  }}
                >
                  <FiEdit2 />
                  Edit Profile
                </button>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <FiAlertCircle className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                <FiCheckCircle className="mt-0.5 shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div
                      key={field.name}
                      className={field.full ? "sm:col-span-2" : ""}
                    >
                      <label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold"
                        style={{ color: "var(--color-heading)" }}
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        <Icon
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                        />

                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          min={field.name === "age" ? 1 : undefined}
                          max={field.name === "age" ? 120 : undefined}
                          maxLength={field.name === "name" ? 60 : undefined}
                          required={field.required || false}
                          readOnly={!editing}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[var(--color-primary)] read-only:cursor-default"
                          style={{
                            borderColor: "var(--color-border-light)",
                            backgroundColor: editing
                              ? "var(--color-surface-soft)"
                              : "white",
                            color: "var(--color-heading)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full cursor-default rounded-xl border py-3 pl-10 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--color-border-light)",
                        backgroundColor: "#F8FAFC",
                        color: "var(--color-muted)",
                      }}
                    />
                  </div>
                  <p
                    className="mt-1.5 text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Email address cannot be changed here.
                  </p>
                </div>
              </div>

              {editing && (
                <div
                  className="mt-7 flex flex-wrap justify-end gap-3 border-t pt-5"
                  style={{ borderColor: "var(--color-border-light)" }}
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-gray-50 disabled:opacity-60"
                    style={{
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-heading)",
                    }}
                  >
                    <FiX />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ backgroundColor: "var(--color-green-dark)" }}
                  >
                    <FiSave />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
