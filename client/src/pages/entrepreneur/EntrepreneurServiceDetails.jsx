
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  IndianRupee,
  Clock,
  Tag,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function EntrepreneurServiceDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Get services from localStorage
  const savedServices = JSON.parse(
    localStorage.getItem("hunarhubServices") || "[]",
  );

  // First try navigation state
  // If page is refreshed, find service using URL id
  const service =
    location.state?.service ||
    savedServices.find((item) => String(item.id) === String(id));

  // Service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
            <BriefcaseBusiness size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[var(--color-heading)]">
            Service not found
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            The service details could not be loaded.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/services")}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft size={17} />
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/entrepreneur/services")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-[var(--color-body)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft size={18} />
            Back to Services
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-heading)] sm:text-3xl">
                Service Details
              </h1>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                View complete information about this service.
              </p>
            </div>

            {/* Status */}
            {service.status === "Active" ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-green-dark)]">
                <CheckCircle2 size={16} />
                Active
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)]">
                <XCircle size={16} />
                {service.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
          {/* ================= SERVICE HEADER ================= */}
          <div className="border-b border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
                <BriefcaseBusiness size={30} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[var(--color-primary)]">
                  {service.category}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {service.name}
                </h2>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Service offered through HunarHub
                </p>
              </div>
            </div>
          </div>

          {/* ================= SERVICE INFORMATION ================= */}
          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Price */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-light)] bg-[var(--color-accent-soft)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-sm">
                  <IndianRupee size={20} />
                </div>

                <p className="mt-4 text-xs font-medium text-[var(--color-muted)]">
                  Starting Price
                </p>

                <p className="mt-1 text-xl font-bold text-[var(--color-primary-dark)]">
                  ₹{Number(service.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Duration */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue)] shadow-sm">
                  <Clock size={20} />
                </div>

                <p className="mt-4 text-xs font-medium text-[var(--color-muted)]">
                  Duration
                </p>

                <p className="mt-1 text-lg font-bold text-[var(--color-heading)]">
                  {service.duration}
                </p>
              </div>

              {/* Category */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-green-dark)] shadow-sm">
                  <Tag size={20} />
                </div>

                <p className="mt-4 text-xs font-medium text-[var(--color-muted)]">
                  Category
                </p>

                <p className="mt-1 text-lg font-bold text-[var(--color-heading)]">
                  {service.category}
                </p>
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-[var(--color-primary)]" />

                <h3 className="font-bold text-[var(--color-heading)]">
                  Description
                </h3>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-5">
                <p className="text-sm leading-7 text-[var(--color-body)]">
                  {service.description}
                </p>
              </div>
            </div>

            {/* ================= SERVICE SUMMARY ================= */}
            <div className="mt-7 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                    Service Status
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    {service.status === "Active" ? (
                      <>
                        <CheckCircle2
                          size={18}
                          className="text-[var(--color-success)]"
                        />
                        <span className="text-sm font-semibold text-[var(--color-green-dark)]">
                          Customers can request this service
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={18}
                          className="text-[var(--color-error)]"
                        />
                        <span className="text-sm font-semibold text-[var(--color-error)]">
                          This service is currently unavailable
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] px-4 py-3">
                  <p className="text-xs text-[var(--color-muted)]">
                    Service ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                    #{service.id}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-border-light)] pt-6">
              {/* Edit */}
              <button
                onClick={() =>
                  navigate(`/entrepreneur/services/${service.id}/edit`, {
                    state: { service },
                  })
                }
                className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-blue-dark)] hover:shadow-md"
              >
                <Pencil size={17} />
                Edit Service
              </button>

              {/* Back */}
              <button
                onClick={() => navigate("/entrepreneur/services")}
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-body)] transition hover:bg-[var(--color-surface-soft)]"
              >
                <ArrowLeft size={17} />
                Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
