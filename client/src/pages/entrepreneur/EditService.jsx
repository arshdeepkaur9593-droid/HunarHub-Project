
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Layers3,
  FileText,
} from "lucide-react";

export default function EditService() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Get services from localStorage
  const savedServices = JSON.parse(
    localStorage.getItem("hunarhubServices") || "[]"
  );

  // Get service from navigation state
  // If page is refreshed, find it using URL id
  const service =
    location.state?.service ||
    savedServices.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState(
    service || {
      name: "",
      category: "Tailoring",
      price: "",
      duration: "",
      status: "Active",
      description: "",
    }
  );

  // Service not found
  if (!service) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div
          className="w-full max-w-md rounded-3xl border bg-white p-8 text-center"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary)",
            }}
          >
            <BriefcaseBusiness size={26} />
          </div>

          <h1
            className="mt-5 text-xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Service not found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            The service you are trying to edit could not be found.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/services")}
            className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{
              backgroundColor: "var(--color-green-dark)",
              boxShadow: "0 8px 20px rgba(77, 122, 69, 0.18)",
            }}
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const services = JSON.parse(
      localStorage.getItem("hunarhubServices") || "[]"
    );

    const updatedServices = services.map((item) =>
      String(item.id) === String(service.id)
        ? {
            ...item,
            ...form,
            id: item.id,
            price: Number(form.price),
          }
        : item
    );

    localStorage.setItem(
      "hunarhubServices",
      JSON.stringify(updatedServices)
    );

    navigate("/entrepreneur/services");
  };

  const inputStyle = {
    borderColor: "var(--color-border)",
    color: "var(--color-heading)",
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = "var(--color-primary)";
    e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(239, 131, 84, 0.12)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--color-peach-light)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate("/entrepreneur/services")}
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white transition hover:bg-[#FFF7F2]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-body)",
              }}
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary-dark)" }}
              >
                Entrepreneur Panel
              </p>

              <h1
                className="mt-1 text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--color-heading)" }}
              >
                Edit Service
              </h1>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Update your service information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border bg-white"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Form Header */}
          <div
            className="border-b px-6 py-5 sm:px-8"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-green-soft)",
                  color: "var(--color-green-dark)",
                }}
              >
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <h2
                  className="font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Service Information
                </h2>

                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Update the details of your service below.
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Service Name */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Service Name
                </label>

                <div className="relative">
                  <BriefcaseBusiness
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-muted)" }}
                  />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Category
                </label>

                <div className="relative">
                  <Layers3
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-green-dark)" }}
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option>Tailoring</option>
                    <option>Traditional Wear</option>
                    <option>Handmade Crafts</option>
                    <option>Home Services</option>
                    <option>Beauty & Wellness</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Starting Price
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-primary)" }}
                  />

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Duration
                </label>

                <div className="relative">
                  <Clock3
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-blue)" }}
                  />

                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3-5 Days"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border bg-[#FFFDFC] px-4 text-sm outline-none transition"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4"
                    style={{ color: "var(--color-muted)" }}
                  />

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                    required
                    placeholder="Describe your service..."
                    className="w-full resize-none rounded-xl border bg-[#FFFDFC] py-3 pl-11 pr-4 text-sm outline-none transition"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--color-light-text)" }}
                >
                  Keep the description clear so customers understand what the
                  service includes.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div
            className="flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:justify-end sm:px-8"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/entrepreneur/services")}
              className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#FFF7F2]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-body)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{
                backgroundColor: "var(--color-green-dark)",
                boxShadow: "0 8px 20px rgba(77, 122, 69, 0.18)",
              }}
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
