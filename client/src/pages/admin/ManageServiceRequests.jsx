
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Trash2,
  BriefcaseBusiness,
  User,
  CalendarDays,
  IndianRupee,
  Clock,
  XCircle,
  MapPin,
  Download,
} from "lucide-react";

export default function ManageServiceRequests() {
  // =========================
  // DEFAULT REQUESTS
  // =========================

  const defaultRequests = [
    {
      id: 1,
      customerName: "Simran Kaur",
      entrepreneurName: "Harpreet Singh",
      serviceName: "Custom Stitching",
      category: "Tailoring",
      date: "25 Aug 2026",
      price: 800,
      location: "Chandigarh",
      status: "Pending",
      message:
        "I need a custom suit stitched for an upcoming family function.",
    },
    {
      id: 2,
      customerName: "Aman Singh",
      entrepreneurName: "Simran Kaur",
      serviceName: "Dress Alteration",
      category: "Tailoring",
      date: "27 Aug 2026",
      price: 400,
      location: "Mohali",
      status: "Accepted",
      message: "Please alter the fitting of my dress.",
    },
    {
      id: 3,
      customerName: "Manpreet Kaur",
      entrepreneurName: "Rajveer Singh",
      serviceName: "Embroidery Work",
      category: "Handmade Crafts",
      date: "29 Aug 2026",
      price: 1200,
      location: "Panchkula",
      status: "Pending",
      message:
        "I need embroidery work done on a traditional dupatta.",
    },
    {
      id: 4,
      customerName: "Gurpreet Kaur",
      entrepreneurName: "Harpreet Singh",
      serviceName: "Traditional Kurta Stitching",
      category: "Traditional Wear",
      date: "30 Aug 2026",
      price: 1000,
      location: "Chandigarh",
      status: "Rejected",
      message:
        "I would like a traditional kurta stitched according to my measurements.",
    },
  ];

  // =========================
  // STATE
  // =========================

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem(
      "hunarhubAdminServiceRequests"
    );

    return saved ? JSON.parse(saved) : defaultRequests;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "hunarhubAdminServiceRequests",
      JSON.stringify(requests)
    );
  }, [requests]);

  // =========================
  // ACCEPT
  // =========================

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: "Accepted" }
          : request
      )
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: "Accepted",
      }));
    }
  };

  // =========================
  // REJECT
  // =========================

  const handleReject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this service request?"
    );

    if (!confirmed) return;

    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: "Rejected" }
          : request
      )
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: "Rejected",
      }));
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this service request?"
    );

    if (!confirmed) return;

    setRequests((prev) =>
      prev.filter((request) => request.id !== id)
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
      setShowViewModal(false);
    }
  };

  // =========================
  // VIEW
  // =========================

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  // =========================
  // FILTER
  // =========================

  const filteredRequests = useMemo(() => {
    const text = search.toLowerCase().trim();

    return requests.filter((request) => {
      const matchesSearch =
        request.customerName.toLowerCase().includes(text) ||
        request.entrepreneurName.toLowerCase().includes(text) ||
        request.serviceName.toLowerCase().includes(text) ||
        request.category.toLowerCase().includes(text) ||
        request.location.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All Status" ||
        request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  // =========================
  // COUNTS
  // =========================

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "Accepted"
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-[var(--color-yellow)] text-[var(--color-warning)] border border-[var(--color-yellow-border)]";
    }

    if (status === "Accepted") {
      return "bg-[var(--color-green-soft)] text-[var(--color-green-dark)] border border-[var(--color-green-border)]";
    }

    return "bg-[var(--color-red)] text-[var(--color-error)] border border-[var(--color-red-border)]";
  };

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    if (filteredRequests.length === 0) {
      alert("No service requests available to export.");
      return;
    }

    const headers = [
      "Request ID",
      "Customer",
      "Entrepreneur",
      "Service",
      "Category",
      "Requested Date",
      "Price",
      "Location",
      "Status",
      "Customer Message",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredRequests.map((request) => [
      request.id,
      request.customerName,
      request.entrepreneurName,
      request.serviceName,
      request.category,
      request.date,
      request.price,
      request.location,
      request.status,
      request.message,
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const today = new Date().toISOString().split("T")[0];

    link.download = `hunarhub-service-requests-${today}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <div>
            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              Admin Panel
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              Manage Service Requests
            </h1>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Monitor and manage customer service requests.
            </p>
          </div>

          {/* EXPORT */}

          <button
            onClick={exportCSV}
            className="flex w-fit items-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-95"
          >
            <Download size={17} />
            Export CSV
          </button>

        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* SUMMARY */}
        {/* ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-blue)] shadow-sm">
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Total Requests
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {totalRequests}
                </p>
              </div>

            </div>

          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-warning)] shadow-sm">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-warning)]">
                  {pendingRequests}
                </p>
              </div>

            </div>

          </div>

          {/* ACCEPTED */}

          <div className="rounded-2xl border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-success)] shadow-sm">
                <Check size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Accepted
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-success)]">
                  {acceptedRequests}
                </p>
              </div>

            </div>

          </div>

          {/* REJECTED */}

          <div className="rounded-2xl border border-[var(--color-red-border)] bg-[var(--color-red)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-error)] shadow-sm">
                <XCircle size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Rejected
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-error)]">
                  {rejectedRequests}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* SEARCH + FILTER */}
        {/* ================================================= */}

        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)]">

          <div className="flex flex-col gap-4 sm:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, entrepreneur or service..."
                className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />

            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>

          </div>

          {/* RESULT COUNT */}

          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted)]">

            <span>
              Showing{" "}
              <strong className="text-[var(--color-heading)]">
                {filteredRequests.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[var(--color-heading)]">
                {totalRequests}
              </strong>{" "}
              requests
            </span>

            {(search || statusFilter !== "All Status") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All Status");
                }}
                className="font-semibold text-[var(--color-primary-dark)] hover:underline"
              >
                Clear filters
              </button>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* REQUEST LIST */}
        {/* ================================================= */}

        <div className="mt-6 space-y-5">

          {filteredRequests.map((request) => (

            <div
              key={request.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >

              {/* TOP */}

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                {/* SERVICE INFO */}

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-peach)] text-[var(--color-primary-dark)]">
                    <BriefcaseBusiness size={24} />
                  </div>

                  <div>

                    <h2 className="text-base font-bold text-[var(--color-heading)]">
                      {request.serviceName}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-[var(--color-primary-dark)]">
                      {request.category}
                    </p>

                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Customer:{" "}
                      <span className="font-semibold text-[var(--color-secondary)]">
                        {request.customerName}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      Entrepreneur:{" "}
                      <span className="font-semibold text-[var(--color-secondary)]">
                        {request.entrepreneurName}
                      </span>
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyle(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>

              </div>

              {/* ================================================= */}
              {/* DETAILS */}
              {/* ================================================= */}

              <div className="mt-5 grid gap-4 border-t border-[var(--color-border-light)] pt-5 sm:grid-cols-3">

                {/* DATE */}

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-[var(--color-blue-light)] p-2 text-[var(--color-blue)]">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Requested Date
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {request.date}
                    </p>
                  </div>

                </div>

                {/* PRICE */}

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-[var(--color-peach)] p-2 text-[var(--color-primary-dark)]">
                    <IndianRupee size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Service Price
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      ₹
                      {Number(request.price).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                </div>

                {/* LOCATION */}

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-[var(--color-green-soft)] p-2 text-[var(--color-green-dark)]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {request.location}
                    </p>
                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* ACTIONS */}
              {/* ================================================= */}

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border-light)] pt-5">

                {/* VIEW */}

                <button
                  onClick={() => handleView(request)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] px-4 py-2 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:-translate-y-0.5"
                >
                  <Eye size={16} />
                  View
                </button>

                {/* ACCEPT */}

                {request.status !== "Accepted" && (
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <Check size={16} />
                    Accept
                  </button>
                )}

                {/* REJECT */}

                {request.status !== "Rejected" && (
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:-translate-y-0.5"
                  >
                    <X size={16} />
                    Reject
                  </button>
                )}

                {/* DELETE */}

                <button
                  onClick={() => handleDelete(request.id)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-red-border)] hover:bg-[var(--color-red)] hover:text-[var(--color-error)]"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {filteredRequests.length === 0 && (

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-12 text-center shadow-[var(--shadow-soft)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-peach)] text-[var(--color-primary)]">
              <BriefcaseBusiness size={32} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
              No service requests found
            </h3>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Try changing your search or status filter.
            </p>

          </div>

        )}

      </main>

      {/* ================================================= */}
      {/* VIEW MODAL */}
      {/* ================================================= */}

      {showViewModal && selectedRequest && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(37,37,37,0.55)] px-4 py-6 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-dark)]">

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-peach-light)] p-6">

              <div>
                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                  Admin Panel
                </p>

                <h2 className="mt-1 text-xl font-bold text-[var(--color-heading)]">
                  Service Request Details
                </h2>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-xl p-2 text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-heading)]"
              >
                <X size={20} />
              </button>

            </div>

            {/* ================================================= */}
            {/* MODAL CONTENT */}
            {/* ================================================= */}

            <div className="p-6">

              {/* SERVICE */}

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-peach)] text-[var(--color-primary-dark)]">
                  <BriefcaseBusiness size={30} />
                </div>

                <div className="flex-1">

                  <h3 className="text-xl font-bold text-[var(--color-heading)]">
                    {selectedRequest.serviceName}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {selectedRequest.category}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      selectedRequest.status
                    )}`}
                  >
                    {selectedRequest.status}
                  </span>

                </div>

              </div>

              {/* ================================================= */}
              {/* PEOPLE */}
              {/* ================================================= */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* CUSTOMER */}

                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-blue-light)] p-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-white p-2 text-[var(--color-blue)]">
                      <User size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-muted)]">
                        Customer
                      </p>

                      <p className="font-semibold text-[var(--color-heading)]">
                        {selectedRequest.customerName}
                      </p>
                    </div>

                  </div>

                </div>

                {/* ENTREPRENEUR */}

                <div className="rounded-2xl border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-white p-2 text-[var(--color-green-dark)]">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-muted)]">
                        Entrepreneur
                      </p>

                      <p className="font-semibold text-[var(--color-heading)]">
                        {selectedRequest.entrepreneurName}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* DETAILS */}
              {/* ================================================= */}

              <div className="mt-4 grid gap-4 sm:grid-cols-3">

                {/* DATE */}

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">

                  <p className="text-xs text-[var(--color-light-text)]">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-heading)]">
                    {selectedRequest.date}
                  </p>

                </div>

                {/* PRICE */}

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-peach)] p-4">

                  <p className="text-xs text-[var(--color-muted)]">
                    Price
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-primary-dark)]">
                    ₹
                    {Number(
                      selectedRequest.price
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

                {/* LOCATION */}

                <div className="rounded-xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-4">

                  <p className="text-xs text-[var(--color-muted)]">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-blue-dark)]">
                    {selectedRequest.location}
                  </p>

                </div>

              </div>

              {/* ================================================= */}
              {/* CUSTOMER MESSAGE */}
              {/* ================================================= */}

              <div className="mt-5">

                <p className="text-sm font-semibold text-[var(--color-heading)]">
                  Customer Message
                </p>

                <p className="mt-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-sm leading-6 text-[var(--color-body)]">
                  {selectedRequest.message}
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* MODAL ACTIONS */}
            {/* ================================================= */}

            <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">

              {/* CLOSE */}

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-border-light)]"
              >
                Close
              </button>

              {/* ACCEPT */}

              {selectedRequest.status !== "Accepted" && (
                <button
                  onClick={() =>
                    handleAccept(selectedRequest.id)
                  }
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  <Check size={16} />
                  Accept
                </button>
              )}

              {/* REJECT */}

              {selectedRequest.status !== "Rejected" && (
                <button
                  onClick={() =>
                    handleReject(selectedRequest.id)
                  }
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:bg-[#f9dede]"
                >
                  <X size={16} />
                  Reject
                </button>
              )}

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDelete(selectedRequest.id)
                }
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-red-border)] hover:bg-[var(--color-red)] hover:text-[var(--color-error)]"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}