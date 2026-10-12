
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Layers3,
  FileText,
} from "lucide-react";

export default function AddService() {
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    category: "Tailoring",
    price: "",
    duration: "",
    status: "Active",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedServices = JSON.parse(
      localStorage.getItem("hunarhubServices") || "[]"
    );

    const newService = {
      ...service,
      id: Date.now(),
      price: Number(service.price),
    };

    localStorage.setItem(
      "hunarhubServices",
      JSON.stringify([...savedServices, newService])
    );

    navigate("/entrepreneur/services");
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/entrepreneur/services")}
            className="mb-5 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-semibold transition hover:bg-[#FFF7F2]"
            style={{
              color: "var(--color-body)",
              borderColor: "var(--color-border)",
            }}
          >
            <ArrowLeft size={17} />
            Back to Services
          </button>

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#FFFFFF",
              }}
            >
              <BriefcaseBusiness size={24} />
            </div>

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
                Add Service
              </h1>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Add a new service for your customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-green-soft)",
                  color: "var(--color-green-dark)",
                }}
              >
                <BriefcaseBusiness size={20} />
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
                  Provide details about the service you offer.
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-6 sm:p-8">
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
                  value={service.name}
                  onChange={handleChange}
                  placeholder="e.g. Custom Stitching"
                  required
                  className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-heading)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-primary)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(239, 131, 84, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Category + Price */}
            <div className="grid gap-6 md:grid-cols-2">
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
                    value={service.category}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-heading)",
                    }}
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
                    value={service.price}
                    onChange={handleChange}
                    placeholder="800"
                    min="0"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-heading)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--color-primary)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(239, 131, 84, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--color-border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Duration + Status */}
            <div className="grid gap-6 md:grid-cols-2">
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
                    value={service.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3-5 Days"
                    required
                    className="h-12 w-full rounded-xl border bg-[#FFFDFC] pl-11 pr-4 text-sm outline-none transition"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-heading)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--color-blue)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(91, 125, 177, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--color-border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
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
                  value={service.status}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border bg-[#FFFDFC] px-4 text-sm outline-none transition"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-heading)",
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
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
                  value={service.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your service..."
                  required
                  className="w-full resize-none rounded-xl border bg-[#FFFDFC] py-3 pl-11 pr-4 text-sm outline-none transition"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-heading)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-primary)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(239, 131, 84, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <p
                className="mt-2 text-xs"
                style={{ color: "var(--color-light-text)" }}
              >
                Give customers a clear idea of what your service includes.
              </p>
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
              Save Service
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
