
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../services/servicesData";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Details:", {
      service,
      ...formData,
    });

    navigate("/booking-success", {
      state: {
        booking: {
          serviceName: service.name,
          date: formData.date,
          time: formData.time,
          price: service.price,
        },
      },
    });
  };

  /* Service Not Found */
  if (!service) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">

          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--color-peach)" }}
          >
            <MapPin
              size={28}
              style={{ color: "var(--color-primary)" }}
            />
          </div>

          <h1
            className="mt-5 text-2xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Service Not Found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            The service you are trying to book does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/services")}
            className="mt-6 rounded-xl px-5 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#4D7A45",
              boxShadow: "0 6px 18px rgba(77, 122, 69, 0.18)",
            }}
          >
            Back to Services
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(`/services/${service.id}`)}
          className="mb-7 flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-[#EF8354]"
          style={{ color: "#5B7DB1" }}
        >
          <ArrowLeft size={18} />
          Back to Service
        </button>

        <div className="grid gap-7 lg:grid-cols-3">

          {/* ================= BOOKING FORM ================= */}
          <div
            className="rounded-3xl border bg-white p-6 sm:p-8 lg:col-span-2"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.08em]"
                style={{ color: "var(--color-primary)" }}
              >
                Service Booking
              </p>

              <h1
                className="mt-2 text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--color-heading)" }}
              >
                Book This Service
              </h1>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: "var(--color-muted)" }}
              >
                Fill in your details and choose a convenient date and time.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="hunar-input"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="hunar-input"
                />
              </div>

              {/* Date + Time */}
              <div className="grid gap-5 sm:grid-cols-2">

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Service Date
                  </label>

                  <div className="relative">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="hunar-input pr-12"
                    />

                    <CalendarDays
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Preferred Time
                  </label>

                  <div className="relative">
                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="hunar-input pr-12"
                    />

                    <Clock
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "#5B7DB1" }}
                    />
                  </div>
                </div>

              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  required
                  className="hunar-input resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Additional Notes
                  <span
                    className="ml-1 font-normal"
                    style={{ color: "var(--color-muted)" }}
                  >
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  className="hunar-input resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#4D7A45",
                  boxShadow: "0 7px 20px rgba(77, 122, 69, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3F6839";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#4D7A45";
                }}
              >
                Confirm Booking
              </button>

            </form>
          </div>

          {/* ================= SERVICE SUMMARY ================= */}
          <div
            className="h-fit rounded-3xl border bg-white p-6"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.08em]"
              style={{ color: "#4D7A45" }}
            >
              Your Selection
            </p>

            <h2
              className="mt-2 text-lg font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              Booking Summary
            </h2>

            <div
              className="mt-5 rounded-2xl border p-5"
              style={{
                backgroundColor: "var(--color-peach)",
                borderColor: "var(--color-peach-light)",
              }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--color-heading)" }}
              >
                {service.name}
              </h3>

              {/* Category */}
              <span
                className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "#C6BEEE",
                  color: "#665A9E",
                }}
              >
                {service.category}
              </span>

              {/* Location */}
              <div
                className="mt-5 flex items-center gap-2 text-sm"
                style={{ color: "var(--color-body)" }}
              >
                <MapPin
                  size={17}
                  style={{ color: "#4D7A45" }}
                />

                {service.location}
              </div>

              {/* Price */}
              <div
                className="mt-5 border-t pt-5"
                style={{ borderColor: "rgba(239, 131, 84, 0.18)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Service Price
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: "var(--color-primary-dark)" }}
                >
                  ₹{service.price}
                </p>
              </div>
            </div>

            {/* Info */}
            <div
              className="mt-5 rounded-xl border p-4"
              style={{
                backgroundColor: "var(--color-green)",
                borderColor: "var(--color-green-border)",
              }}
            >
              <p
                className="text-xs leading-5"
                style={{ color: "var(--color-green-dark)" }}
              >
                Your booking request will be sent to the service provider
                for confirmation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Booking;
