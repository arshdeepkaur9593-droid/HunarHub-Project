
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Save,
  Check,
  Power,
} from "lucide-react";

export default function ManageAvailability() {
  const navigate = useNavigate();

  const defaultAvailability = {
    available: true,
    startTime: "09:00",
    endTime: "18:00",
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: false,
    },
  };

  const [availability, setAvailability] = useState(() => {
    const saved = localStorage.getItem("hunarhubAvailability");

    return saved ? JSON.parse(saved) : defaultAvailability;
  });

  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "hunarhubAvailability",
      JSON.stringify(availability),
    );
  }, [availability]);

  const handleDayChange = (day) => {
    setAvailability((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: !prev.days[day],
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAvailability((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityToggle = () => {
    setAvailability((prev) => ({
      ...prev,
      available: !prev.available,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "hunarhubAvailability",
      JSON.stringify(availability),
    );

    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  };

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary-light)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]";

  const activeDays = Object.entries(availability.days)
    .filter(([, value]) => value)
    .map(([day]) => day);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/entrepreneur/dashboard")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-[var(--color-body)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-sm">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-heading)] sm:text-3xl">
                Manage Availability
              </h1>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Set your working days and service availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= AVAILABILITY STATUS ================= */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] ${
                    availability.available
                      ? "bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                      : "bg-[var(--color-red)] text-[var(--color-error)]"
                  }`}
                >
                  <Power size={23} />
                </div>

                <div>
                  <h2 className="font-bold text-[var(--color-heading)]">
                    Service Availability
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Customers can request your services when you are available.
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                onClick={handleAvailabilityToggle}
                aria-label="Toggle service availability"
                className={`relative h-7 w-14 shrink-0 rounded-full transition ${
                  availability.available
                    ? "bg-[var(--color-green-dark)]"
                    : "bg-[var(--color-light-text)]"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    availability.available ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div
              className={`mt-5 rounded-[var(--radius-md)] border p-4 ${
                availability.available
                  ? "border-[var(--color-green-border)] bg-[var(--color-green-soft)]"
                  : "border-[var(--color-red-border)] bg-[var(--color-red)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    availability.available
                      ? "bg-[var(--color-success)]"
                      : "bg-[var(--color-error)]"
                  }`}
                />

                <p
                  className={`text-sm font-semibold ${
                    availability.available
                      ? "text-[var(--color-green-dark)]"
                      : "text-[var(--color-error)]"
                  }`}
                >
                  {availability.available
                    ? "You are currently available for service requests."
                    : "You are currently unavailable for service requests."}
                </p>
              </div>
            </div>
          </div>

          {/* ================= WORKING DAYS ================= */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-blue-light)] text-[var(--color-blue)]">
                <CalendarDays size={21} />
              </div>

              <div>
                <h2 className="font-bold text-[var(--color-heading)]">
                  Working Days
                </h2>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Select the days when you provide services.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.keys(availability.days).map((day) => (
                <label
                  key={day}
                  className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border p-4 transition ${
                    availability.days[day]
                      ? "border-[var(--color-green-border)] bg-[var(--color-green-soft)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:border-[var(--color-blue-border)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={availability.days[day]}
                    onChange={() => handleDayChange(day)}
                    className="h-4 w-4 accent-[var(--color-green-dark)]"
                  />

                  <span
                    className={`text-sm font-semibold ${
                      availability.days[day]
                        ? "text-[var(--color-green-dark)]"
                        : "text-[var(--color-body)]"
                    }`}
                  >
                    {day}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ================= WORKING HOURS ================= */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
                <Clock size={21} />
              </div>

              <div>
                <h2 className="font-bold text-[var(--color-heading)]">
                  Working Hours
                </h2>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Set your daily service hours.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={availability.startTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={availability.endTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue)] shadow-sm">
                <CalendarDays size={19} />
              </div>

              <div>
                <h3 className="font-bold text-[var(--color-heading)]">
                  Availability Summary
                </h3>

                <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                  This is what customers will see.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {/* Status */}
              <div className="rounded-[var(--radius-md)] border border-white bg-white p-4">
                <p className="text-xs font-medium text-[var(--color-muted)]">
                  Status
                </p>

                <p
                  className={`mt-1 text-sm font-bold ${
                    availability.available
                      ? "text-[var(--color-green-dark)]"
                      : "text-[var(--color-error)]"
                  }`}
                >
                  {availability.available ? "Available" : "Unavailable"}
                </p>
              </div>

              {/* Hours */}
              <div className="rounded-[var(--radius-md)] border border-white bg-white p-4">
                <p className="text-xs font-medium text-[var(--color-muted)]">
                  Working Hours
                </p>

                <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">
                  {availability.startTime} - {availability.endTime}
                </p>
              </div>

              {/* Days */}
              <div className="rounded-[var(--radius-md)] border border-white bg-white p-4">
                <p className="text-xs font-medium text-[var(--color-muted)]">
                  Working Days
                </p>

                <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">
                  {activeDays.length}{" "}
                  {activeDays.length === 1 ? "day" : "days"} selected
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[var(--radius-md)] border border-white bg-white p-4">
              <p className="text-xs font-medium text-[var(--color-muted)]">
                Selected Days
              </p>

              <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
                {activeDays.join(", ") || "No days selected"}
              </p>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Save size={17} />
              Save Availability
            </button>

            <button
              type="button"
              onClick={() => navigate("/entrepreneur/dashboard")}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-body)] transition hover:bg-[var(--color-surface-soft)]"
            >
              <ArrowLeft size={17} />
              Cancel
            </button>
          </div>

          {/* ================= SUCCESS MESSAGE ================= */}
          {savedMessage && (
            <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-4 text-sm font-semibold text-[var(--color-green-dark)] shadow-[var(--shadow-soft)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <Check size={18} />
              </div>

              <span>Availability saved successfully.</span>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
