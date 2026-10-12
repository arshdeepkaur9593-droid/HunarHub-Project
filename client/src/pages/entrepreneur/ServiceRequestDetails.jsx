
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  User,
  CalendarDays,
  IndianRupee,
  Check,
  X,
} from "lucide-react";

export default function ServiceRequestDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const request = location.state?.request;

  if (!request) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
            <BriefcaseBusiness size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[var(--color-heading)]">
            Request not found
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            The service request details could not be loaded.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/service-requests")}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={17} />
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  const statusStyle =
    request.status === "Pending"
      ? "border-[var(--color-yellow-border)] bg-[var(--color-yellow)] text-[var(--color-warning)]"
      : request.status === "Accepted"
        ? "border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
        : "border-[var(--color-red-border)] bg-[var(--color-red)] text-[var(--color-error)]";

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/entrepreneur/service-requests")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-body)] transition hover:text-[var(--color-primary-dark)]"
          >
            <ArrowLeft size={18} />
            Back to Requests
          </button>

          <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
            Entrepreneur Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
            Service Request Details
          </h1>

          <p className="mt-1 text-sm text-[var(--color-muted)]">
            View complete information about this customer request.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
          {/* Customer Header */}
          <div className="flex flex-col gap-5 border-b border-[var(--color-border-light)] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]">
                <User size={27} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Customer
                </p>

                <h2 className="text-xl font-bold text-[var(--color-heading)]">
                  {request.customerName}
                </h2>
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle}`}
            >
              {request.status}
            </span>
          </div>

          {/* Service */}
          <div className="mt-7 rounded-[var(--radius-lg)] bg-[var(--color-peach)] p-5">
            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              Service
            </p>

            <h2 className="mt-1 flex items-center gap-2 text-2xl font-bold text-[var(--color-heading)]">
              <BriefcaseBusiness
                size={24}
                className="text-[var(--color-primary-dark)]"
              />
              {request.serviceName}
            </h2>

            <p className="mt-2 text-sm text-[var(--color-body)]">
              {request.category}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* Date */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue-dark)]">
                <CalendarDays size={21} />
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-blue-dark)]">
                Requested Date
              </p>

              <p className="mt-1 font-semibold text-[var(--color-heading)]">
                {request.date}
              </p>
            </div>

            {/* Price */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-peach)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary-dark)]">
                <IndianRupee size={21} />
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">
                Service Price
              </p>

              <p className="mt-1 text-lg font-bold text-[var(--color-primary-dark)]">
                ₹{Number(request.price).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Customer */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-green-dark)]">
                <User size={21} />
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-green-dark)]">
                Customer
              </p>

              <p className="mt-1 font-semibold text-[var(--color-heading)]">
                {request.customerName}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mt-6">
            <h3 className="font-bold text-[var(--color-heading)]">
              Customer Message
            </h3>

            <div className="mt-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">
              <p className="leading-7 text-[var(--color-body)]">
                {request.message}
              </p>
            </div>
          </div>

          {/* Request Information */}
          <div className="mt-6 grid gap-4 border-t border-[var(--color-border-light)] pt-6 sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                Request ID
              </p>

              <p className="mt-1 font-semibold text-[var(--color-heading)]">
                #{request.id}
              </p>
            </div>

            <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                Category
              </p>

              <p className="mt-1 font-semibold text-[var(--color-heading)]">
                {request.category}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-border-light)] pt-6">
            {request.status === "Pending" && (
              <>
                {/* Accept */}
                <button
                  onClick={() => {
                    const savedRequests = JSON.parse(
                      localStorage.getItem("hunarhubServiceRequests") || "[]",
                    );

                    const updatedRequests = savedRequests.map((item) =>
                      item.id === request.id
                        ? {
                            ...item,
                            status: "Accepted",
                          }
                        : item,
                    );

                    localStorage.setItem(
                      "hunarhubServiceRequests",
                      JSON.stringify(updatedRequests),
                    );

                    navigate("/entrepreneur/service-requests");
                  }}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Check size={17} />
                  Accept Request
                </button>

                {/* Reject */}
                <button
                  onClick={() => {
                    const confirmReject = window.confirm(
                      "Are you sure you want to reject this request?",
                    );

                    if (!confirmReject) return;

                    const savedRequests = JSON.parse(
                      localStorage.getItem("hunarhubServiceRequests") || "[]",
                    );

                    const updatedRequests = savedRequests.map((item) =>
                      item.id === request.id
                        ? {
                            ...item,
                            status: "Rejected",
                          }
                        : item,
                    );

                    localStorage.setItem(
                      "hunarhubServiceRequests",
                      JSON.stringify(updatedRequests),
                    );

                    navigate("/entrepreneur/service-requests");
                  }}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-red-border)] bg-[var(--color-red)] px-5 py-2.5 text-sm font-semibold text-[var(--color-error)] transition hover:opacity-80"
                >
                  <X size={17} />
                  Reject Request
                </button>
              </>
            )}

            {/* Back */}
            <button
              onClick={() => navigate("/entrepreneur/service-requests")}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-body)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              <ArrowLeft size={17} />
              Back to Requests
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
