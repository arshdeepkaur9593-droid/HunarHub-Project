import React, { useCallback, useEffect, useState } from "react";
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

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/users"
)
  .replace(/\/api\/users\/?$/, "")
  .replace(/\/$/, "");

const getItems = (data) => {
  if (Array.isArray(data)) return data;

  const possibleLists = [
    data?.data,
    data?.requests,
    data?.serviceRequests,
    data?.results,
    data?.data?.requests,
    data?.data?.serviceRequests,
  ];

  return possibleLists.find(Array.isArray) || [];
};

const getRequestId = (request) => request._id || request.id;

const getRequestStatus = (request) => {
  const status = request.status || request.requestStatus || "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const getCustomerName = (request) =>
  request.customer?.name ||
  request.user?.name ||
  request.customerName ||
  "Customer";

const getServiceName = (request) =>
  request.service?.title ||
  request.service?.name ||
  request.serviceName ||
  "Service";

const getPrice = (request) =>
  request.price ?? request.service?.price ?? request.servicePrice ?? 0;

const getDate = (request) => {
  const value =
    request.requestedDate ||
    request.bookingDate ||
    request.createdAt ||
    request.date;

  if (!value) return "Not specified";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

export default function ServiceRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/service-requests/entrepreneur`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || `Could not load requests (${response.status})`,
        );
      }

      setRequests(
        getItems(data).map((request) => ({
          ...request,
          id: getRequestId(request),
          customerName: getCustomerName(request),
          serviceName: getServiceName(request),
          price: getPrice(request),
          date: getDate(request),
          status: getRequestStatus(request),
          message:
            request.message ||
            request.description ||
            request.notes ||
            "No additional message provided.",
        })),
      );
    } catch (err) {
      setError(
        `${err.message}. Please check the backend service-requests API.`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateRequestStatus = async (request, status) => {
    const id = getRequestId(request);

    if (!id) {
      setError("This request has no database ID.");
      return;
    }

    if (status === "Rejected") {
      const confirmed = window.confirm(
        "Are you sure you want to reject this service request?",
      );

      if (!confirmed) return;
    }

    setUpdatingId(id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/service-requests/${id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Could not update request (${response.status}). Check the backend route.`,
        );
      }

      const updatedRequest =
        data?.data?.serviceRequest ||
        data?.data?.request ||
        data?.serviceRequest ||
        data?.request ||
        data?.data;

      setRequests((previous) =>
        previous.map((item) => {
          if (String(getRequestId(item)) !== String(id)) return item;

          return {
            ...item,
            ...(updatedRequest && typeof updatedRequest === "object"
              ? updatedRequest
              : {}),
            status,
          };
        }),
      );

      setNotice(`Request ${status.toLowerCase()} successfully.`);
      await fetchRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      request.customerName.toLowerCase().includes(searchText) ||
      request.serviceName.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-[var(--color-red-border)] bg-[var(--color-red)] p-4 text-sm text-[var(--color-error)]"
          >
            {error}
            <button
              onClick={fetchRequests}
              className="ml-2 font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-4 text-sm text-[var(--color-green-dark)]"
          >
            {notice}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Requests",
              value: requests.length,
              icon: <BriefcaseBusiness size={22} />,
              style:
                "border-[var(--color-blue-border)] bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]",
            },
            {
              title: "Pending",
              value: pendingRequests,
              icon: <Clock size={22} />,
              style:
                "border-[var(--color-yellow-border)] bg-[var(--color-yellow)] text-[var(--color-warning)]",
            },
            {
              title: "Accepted",
              value: acceptedRequests,
              icon: <Check size={22} />,
              style:
                "border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]",
            },
            {
              title: "Rejected",
              value: rejectedRequests,
              icon: <X size={22} />,
              style:
                "border-[var(--color-red-border)] bg-[var(--color-red)] text-[var(--color-error)]",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-soft)] ${item.style}`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-[var(--radius-md)] bg-white p-3">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted)]">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-heading)]">
                    {loading ? "…" : item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customer or service..."
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
        </div>

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
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)]">
            Loading service requests...
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {filteredRequests.map((request) => {
              const id = getRequestId(request);
              const isUpdating = String(updatingId) === String(id);

              return (
                <div
                  key={id}
                  className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]">
                        <User size={23} />
                      </div>
                      <div className="min-w-0">
                        <button
                          onClick={() =>
                            navigate(`/entrepreneur/service-requests/${id}`, {
                              state: { request },
                            })
                          }
                          className="text-left font-bold text-[var(--color-heading)] underline-offset-4 hover:underline"
                        >
                          {request.customerName}
                        </button>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]">
                          <BriefcaseBusiness size={15} />
                          {request.serviceName}
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                          {request.message}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(request.status)}`}
                    >
                      {request.status}
                    </span>
                  </div>

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
                          ₹{Number(request.price || 0).toLocaleString("en-IN")}
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

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border-light)] pt-5">
                    <button
                      onClick={() =>
                        navigate(`/entrepreneur/service-requests/${id}`, {
                          state: { request },
                        })
                      }
                      className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-blue-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    {request.status === "Pending" && (
                      <>
                        <button
                          onClick={() => {
                            console.log("ACCEPT CLICKED", request, "Accepted");
                            alert("Accept button clicked!");
                            updateRequestStatus(request, "Accepted");
                          }}
                          className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Check size={16} />
                          {isUpdating ? "Updating..." : "Accept"}
                        </button>

                        <button
                          onClick={() =>
                            updateRequestStatus(request, "Rejected")
                          }
                          disabled={isUpdating}
                          className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X size={16} />
                          {isUpdating ? "Updating..." : "Reject"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
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
