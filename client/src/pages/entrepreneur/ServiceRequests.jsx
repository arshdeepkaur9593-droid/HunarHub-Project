
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  User,
  BriefcaseBusiness,
  IndianRupee,
} from "lucide-react";

export default function ServiceRequests() {
  const navigate = useNavigate();

  const defaultRequests = [
    {
      id: 1,
      customerName: "Simran Kaur",
      serviceName: "Custom Stitching",
      date: "25 Aug 2026",
      price: 800,
      status: "Pending",
      message:
        "I need a custom suit stitched for an upcoming family function.",
    },
    {
      id: 2,
      customerName: "Harpreet Singh",
      serviceName: "Dress Alteration",
      date: "27 Aug 2026",
      price: 400,
      status: "Pending",
      message: "Please alter the fitting of my dress.",
    },
    {
      id: 3,
      customerName: "Manpreet Kaur",
      serviceName: "Traditional Kurta Stitching",
      date: "29 Aug 2026",
      price: 1000,
      status: "Accepted",
      message:
        "I would like a traditional kurta stitched according to my measurements.",
    },
    {
      id: 4,
      customerName: "Rajveer Singh",
      serviceName: "Embroidery Work",
      date: "30 Aug 2026",
      price: 1200,
      status: "Rejected",
      message:
        "I need embroidery work done on a traditional dupatta.",
    },
  ];

  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem(
      "hunarhubServiceRequests",
    );

    return savedRequests
      ? JSON.parse(savedRequests)
      : defaultRequests;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    localStorage.setItem(
      "hunarhubServiceRequests",
      JSON.stringify(requests),
    );
  }, [requests]);

  // Accept request
  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "Accepted",
            }
          : request,
      ),
    );
  };

  // Reject request
  const handleReject = (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this service request?",
    );

    if (!confirmReject) return;

    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "Rejected",
            }
          : request,
      ),
    );
  };

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      request.customerName.toLowerCase().includes(searchText) ||
      request.serviceName.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" ||
      request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending",
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "Accepted",
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "Rejected",
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "border-[var(--color-yellow-border)] bg-[var(--color-yellow)] text-[var(--color-warning)]";

      case "Accepted":
        return "border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]";

      case "Rejected":
        return "border-[var(--color-red-border)] bg-[var(--color-red)] text-[var(--color-error)]";

      default:
        return "border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-muted)]";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
            Entrepreneur Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
            Service Requests
          </h1>

          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Manage customer requests for your services.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="rounded-[var(--radius-md)] bg-white p-3 text-[var(--color-blue-dark)]">
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Total Requests
                </p>

                <p className="text-2xl font-bold text-[var(--color-heading)]">
                  {totalRequests}
                </p>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="rounded-[var(--radius-md)] bg-white p-3 text-[var(--color-warning)]">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Pending
                </p>

                <p className="text-2xl font-bold text-[var(--color-warning)]">
                  {pendingRequests}
                </p>
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="rounded-[var(--radius-md)] bg-white p-3 text-[var(--color-green-dark)]">
                <Check size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Accepted
                </p>

                <p className="text-2xl font-bold text-[var(--color-green-dark)]">
                  {acceptedRequests}
                </p>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-red-border)] bg-[var(--color-red)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="rounded-[var(--radius-md)] bg-white p-3 text-[var(--color-error)]">
                <X size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Rejected
                </p>

                <p className="text-2xl font-bold text-[var(--color-error)]">
                  {rejectedRequests}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or service..."
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Result Header */}
        <div className="mt-7 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-heading)]">
              Customer Requests
            </h2>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {filteredRequests.length} request
              {filteredRequests.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Requests */}
        <div className="mt-5 space-y-5">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                {/* Customer + Service */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]">
                    <User size={23} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-[var(--color-heading)]">
                      {request.customerName}
                    </h2>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]">
                      <BriefcaseBusiness size={15} />
                      {request.serviceName}
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                      {request.message}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(
                    request.status,
                  )}`}
                >
                  {request.status}
                </span>
              </div>

              {/* Details */}
              <div className="mt-5 grid gap-4 border-t border-[var(--color-border-light)] pt-5 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-3">
                  <div className="rounded-[var(--radius-md)] bg-white p-2 text-[var(--color-blue-dark)]">
                    <Clock size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-muted)]">
                      Requested Date
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {request.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-peach)] p-3">
                  <div className="rounded-[var(--radius-md)] bg-white p-2 text-[var(--color-primary-dark)]">
                    <IndianRupee size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-muted)]">
                      Service Price
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                      ₹{Number(request.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-green-soft)] p-3">
                  <div className="rounded-[var(--radius-md)] bg-white p-2 text-[var(--color-green-dark)]">
                    <User size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-muted)]">
                      Customer
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {request.customerName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border-light)] pt-5">
                <button
                  onClick={() =>
                    navigate(
                      `/entrepreneur/service-requests/${request.id}`,
                      {
                        state: { request },
                      },
                    )
                  }
                  className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-blue-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Eye size={16} />
                  View
                </button>

                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <Check size={16} />
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:opacity-80"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center shadow-[var(--shadow-soft)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
              <BriefcaseBusiness size={29} />
            </div>

            <p className="mt-4 text-lg font-semibold text-[var(--color-heading)]">
              No service requests found
            </p>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
