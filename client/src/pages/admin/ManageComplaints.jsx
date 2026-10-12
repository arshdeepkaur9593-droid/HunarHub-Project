
import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  AlertCircle,
  User,
  ShoppingBag,
  Calendar,
  X,
  Download,
} from "lucide-react";

export default function ManageComplaints() {
  // =========================
  // DEFAULT COMPLAINTS
  // =========================

  const defaultComplaints = [
    {
      id: 1,
      customer: "Gurpreet Kaur",
      entrepreneur: "Harpreet Singh",
      orderId: "#HH1024",
      subject: "Product not received",
      description:
        "The customer says the order has not been received even though the expected delivery date has passed.",
      date: "20 Aug 2026",
      status: "Open",
    },
    {
      id: 2,
      customer: "Simran Kaur",
      entrepreneur: "Manpreet Kaur",
      orderId: "#HH1023",
      subject: "Service quality issue",
      description:
        "Customer is not satisfied with the quality of the completed stitching service.",
      date: "18 Aug 2026",
      status: "Under Review",
    },
    {
      id: 3,
      customer: "Aman Singh",
      entrepreneur: "Rajveer Singh",
      orderId: "#HH1022",
      subject: "Wrong product received",
      description:
        "Customer received a different product than the one shown in the order.",
      date: "15 Aug 2026",
      status: "Resolved",
    },
    {
      id: 4,
      customer: "Navjot Singh",
      entrepreneur: "Simran Kaur",
      orderId: "#HH1021",
      subject: "Refund request",
      description:
        "Customer requested a refund because the service was cancelled.",
      date: "12 Aug 2026",
      status: "Closed",
    },
  ];

  // =========================
  // STATES
  // =========================

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem(
      "hunarhubComplaints"
    );

    return saved
      ? JSON.parse(saved)
      : defaultComplaints;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  // =========================
  // SAVE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "hunarhubComplaints",
      JSON.stringify(complaints)
    );
  }, [complaints]);

  // =========================
  // STATUS UPDATE
  // =========================

  const updateStatus = (id, status) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              status,
            }
          : complaint
      )
    );

    if (selectedComplaint?.id === id) {
      setSelectedComplaint((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    setComplaints((prev) =>
      prev.filter(
        (complaint) => complaint.id !== id
      )
    );

    if (selectedComplaint?.id === id) {
      setSelectedComplaint(null);
    }
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredComplaints = complaints.filter(
    (complaint) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        complaint.customer
          .toLowerCase()
          .includes(searchText) ||
        complaint.entrepreneur
          .toLowerCase()
          .includes(searchText) ||
        complaint.subject
          .toLowerCase()
          .includes(searchText) ||
        complaint.orderId
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        complaint.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  // =========================
  // COUNTS
  // =========================

  const totalComplaints =
    complaints.length;

  const openComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Open"
    ).length;

  const underReviewComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status ===
        "Under Review"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Resolved"
    ).length;

  const closedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Closed"
    ).length;

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    const headers = [
      "Complaint ID",
      "Customer",
      "Entrepreneur",
      "Order ID",
      "Subject",
      "Description",
      "Date",
      "Status",
    ];

    const rows = complaints.map(
      (complaint) => [
        complaint.id,
        complaint.customer,
        complaint.entrepreneur,
        complaint.orderId,
        complaint.subject,
        complaint.description,
        complaint.date,
        complaint.status,
      ]
    );

    const csvRows = [
      headers,
      ...rows,
    ];

    const csvContent = csvRows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(
              cell ?? ""
            );

            return `"${value.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    // Excel Unicode support
    const BOM = "\uFEFF";

    const blob = new Blob(
      [BOM + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `hunarhub-complaints-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Open") {
      return {
        backgroundColor: "#FDEAEA",
        color: "#C85A5A",
        borderColor: "#F2CCCC",
      };
    }

    if (status === "Under Review") {
      return {
        backgroundColor: "#FFF4D8",
        color: "#9A6D1D",
        borderColor: "#F1DFAD",
      };
    }

    if (status === "Resolved") {
      return {
        backgroundColor:
          "var(--color-green)",
        color:
          "var(--color-green-dark)",
        borderColor:
          "var(--color-green-border)",
      };
    }

    return {
      backgroundColor: "#F1F0EE",
      color: "#66615C",
      borderColor: "#DED9D4",
    };
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor:
          "var(--color-background)",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        className="border-b bg-white"
        style={{
          borderColor:
            "var(--color-border-light)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <div>
            <span
              className="inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor:
                  "var(--color-peach)",
                color:
                  "var(--color-primary-dark)",
              }}
            >
              Admin Panel
            </span>

            <h1
              className="mt-3 text-2xl font-bold sm:text-3xl"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              Complaints & Disputes
            </h1>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Review and manage customer
              complaints and disputes.
            </p>
          </div>

          {/* EXPORT */}

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor:
                "var(--color-green-dark)",
              boxShadow:
                "0 7px 20px rgba(77, 122, 69, 0.16)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "#3F6839";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-green-dark)";
            }}
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= SUMMARY ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {/* Total */}

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{
                backgroundColor:
                  "var(--color-peach)",
                color:
                  "var(--color-primary)",
              }}
            >
              <AlertCircle size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Total Complaints
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              {totalComplaints}
            </p>
          </div>

          {/* Open */}

          <div
            className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "#FDEAEA",
              borderColor: "#F2CCCC",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "#A94444",
              }}
            >
              Open
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color: "#873838",
              }}
            >
              {openComplaints}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "#A94444",
              }}
            >
              Needs attention
            </p>
          </div>

          {/* Review */}

          <div
            className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "#FFF4D8",
              borderColor: "#F1DFAD",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "#9A6D1D",
              }}
            >
              Under Review
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color: "#725016",
              }}
            >
              {underReviewComplaints}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "#9A6D1D",
              }}
            >
              Being investigated
            </p>
          </div>

          {/* Resolved */}

          <div
            className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor:
                "var(--color-green)",
              borderColor:
                "var(--color-green-border)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color:
                  "var(--color-green-dark)",
              }}
            >
              Resolved
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-green-dark)",
              }}
            >
              {resolvedComplaints}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color:
                  "var(--color-green-dark)",
              }}
            >
              Successfully resolved
            </p>
          </div>

          {/* Closed */}

          <div
            className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "#F1F0EE",
              borderColor: "#DED9D4",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "#66615C",
              }}
            >
              Closed
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color: "#45413D",
              }}
            >
              {closedComplaints}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "#77716B",
              }}
            >
              Completed cases
            </p>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div
          className="mt-8 flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row"
          style={{
            borderColor:
              "var(--color-border-light)",
            boxShadow:
              "var(--shadow-soft)",
          }}
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{
                color:
                  "var(--color-muted)",
              }}
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customer, entrepreneur, order..."
              className="hunar-input pl-11"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="hunar-input sm:w-44"
          >
            <option>All Status</option>
            <option>Open</option>
            <option>Under Review</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          {(search ||
            statusFilter !==
              "All Status") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter(
                  "All Status"
                );
              }}
              className="rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor:
                  "var(--color-peach)",
                color:
                  "var(--color-primary-dark)",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* ================= RESULT COUNT ================= */}

        <div className="mt-6">
          <p
            className="text-sm font-medium"
            style={{
              color:
                "var(--color-muted)",
            }}
          >
            {filteredComplaints.length}{" "}
            {filteredComplaints.length === 1
              ? "complaint"
              : "complaints"}{" "}
            found
          </p>
        </div>

        {/* ================= COMPLAINT LIST ================= */}

        <div className="mt-4 space-y-5">
          {filteredComplaints.map(
            (complaint) => (
              <div
                key={complaint.id}
                className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
                style={{
                  borderColor:
                    "var(--color-border-light)",
                  boxShadow:
                    "var(--shadow-soft)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "var(--shadow-card)";
                  e.currentTarget.style.borderColor =
                    "var(--color-primary-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "var(--shadow-soft)";
                  e.currentTarget.style.borderColor =
                    "var(--color-border-light)";
                }}
              >
                {/* TOP */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          "#FDEAEA",
                        color: "#C85A5A",
                      }}
                    >
                      <AlertCircle
                        size={22}
                      />
                    </div>

                    <div>
                      <h2
                        className="font-bold"
                        style={{
                          color:
                            "var(--color-heading)",
                        }}
                      >
                        {complaint.subject}
                      </h2>

                      <p
                        className="mt-1 text-sm"
                        style={{
                          color:
                            "var(--color-muted)",
                        }}
                      >
                        Complaint ID: #
                        {complaint.id}
                      </p>

                      <p
                        className="mt-2 text-sm leading-6"
                        style={{
                          color:
                            "var(--color-body)",
                        }}
                      >
                        {complaint.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-fit rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={getStatusStyle(
                      complaint.status
                    )}
                  >
                    {complaint.status}
                  </span>
                </div>

                {/* DETAILS */}

                <div
                  className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-3"
                  style={{
                    borderColor:
                      "var(--color-border-light)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <User
                      size={18}
                      style={{
                        color: "#5B7DB1",
                      }}
                    />

                    <div>
                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-light-text)",
                        }}
                      >
                        Customer
                      </p>

                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            "var(--color-heading)",
                        }}
                      >
                        {complaint.customer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShoppingBag
                      size={18}
                      style={{
                        color:
                          "var(--color-green-dark)",
                      }}
                    />

                    <div>
                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-light-text)",
                        }}
                      >
                        Entrepreneur
                      </p>

                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            "var(--color-heading)",
                        }}
                      >
                        {complaint.entrepreneur}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar
                      size={18}
                      style={{
                        color:
                          "var(--color-primary)",
                      }}
                    />

                    <div>
                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-light-text)",
                        }}
                      >
                        Date / Order
                      </p>

                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            "var(--color-heading)",
                        }}
                      >
                        {complaint.date}
                      </p>

                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-muted)",
                        }}
                      >
                        {complaint.orderId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div
                  className="mt-5 flex flex-wrap gap-2 border-t pt-5"
                  style={{
                    borderColor:
                      "var(--color-border-light)",
                  }}
                >
                  {/* VIEW */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedComplaint(
                        complaint
                      )
                    }
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      backgroundColor:
                        "#EAF2FF",
                      color: "#5B7DB1",
                      border:
                        "1px solid #D4E1F5",
                    }}
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {/* REVIEW */}

                  {complaint.status ===
                    "Open" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          complaint.id,
                          "Under Review"
                        )
                      }
                      className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor:
                          "#FFF4D8",
                        color: "#9A6D1D",
                        border:
                          "1px solid #F1DFAD",
                      }}
                    >
                      Review
                    </button>
                  )}

                  {/* RESOLVE */}

                  {(complaint.status ===
                    "Open" ||
                    complaint.status ===
                      "Under Review") && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          complaint.id,
                          "Resolved"
                        )
                      }
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor:
                          "var(--color-green-dark)",
                      }}
                    >
                      <CheckCircle
                        size={16}
                      />
                      Resolve
                    </button>
                  )}

                  {/* CLOSE */}

                  {complaint.status ===
                    "Resolved" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          complaint.id,
                          "Closed"
                        )
                      }
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor:
                          "#F1F0EE",
                        color: "#66615C",
                        border:
                          "1px solid #DED9D4",
                      }}
                    >
                      <XCircle
                        size={16}
                      />
                      Close
                    </button>
                  )}

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        complaint.id
                      )
                    }
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      backgroundColor:
                        "#FDEAEA",
                      color: "#C85A5A",
                      border:
                        "1px solid #F2CCCC",
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* ================= EMPTY ================= */}

        {filteredComplaints.length ===
          0 && (
          <div
            className="mt-6 rounded-2xl border bg-white p-12 text-center"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  "var(--color-peach)",
              }}
            >
              <AlertCircle
                size={30}
                style={{
                  color:
                    "var(--color-primary)",
                }}
              />
            </div>

            <p
              className="mt-4 text-lg font-bold"
              style={{
                color:
                  "var(--color-heading)",
              }}
            >
              No complaints found
            </p>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Try changing your search or
              status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter(
                  "All Status"
                );
              }}
              className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{
                backgroundColor:
                  "var(--color-green-dark)",
              }}
            >
              View All Complaints
            </button>
          </div>
        )}
      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedComplaint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor:
              "rgba(37, 37, 37, 0.45)",
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedComplaint(null);
            }
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border bg-white"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-dark)",
            }}
          >
            {/* MODAL HEADER */}

            <div
              className="flex items-center justify-between border-b p-5"
              style={{
                borderColor:
                  "var(--color-border-light)",
              }}
            >
              <div>
                <span
                  className="inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor:
                      "var(--color-peach)",
                    color:
                      "var(--color-primary-dark)",
                  }}
                >
                  Complaint Details
                </span>

                <h2
                  className="mt-3 text-xl font-bold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  {selectedComplaint.subject}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedComplaint(
                    null
                  )
                }
                className="rounded-xl p-2 transition-colors hover:bg-[#FFEEE4]"
                style={{
                  color:
                    "var(--color-muted)",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="space-y-5 p-6">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        "var(--color-light-text)",
                    }}
                  >
                    Customer
                  </p>

                  <p
                    className="mt-1 font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    {selectedComplaint.customer}
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        "var(--color-light-text)",
                    }}
                  >
                    Entrepreneur
                  </p>

                  <p
                    className="mt-1 font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    {selectedComplaint.entrepreneur}
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        "var(--color-light-text)",
                    }}
                  >
                    Order ID
                  </p>

                  <p
                    className="mt-1 font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    {selectedComplaint.orderId}
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        "var(--color-light-text)",
                    }}
                  >
                    Date
                  </p>

                  <p
                    className="mt-1 font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    {selectedComplaint.date}
                  </p>
                </div>
              </div>

              <div>
                <p
                  className="text-xs"
                  style={{
                    color:
                      "var(--color-light-text)",
                  }}
                >
                  Description
                </p>

                <p
                  className="mt-2 rounded-2xl border p-4 text-sm leading-6"
                  style={{
                    backgroundColor:
                      "var(--color-surface-soft)",
                    borderColor:
                      "var(--color-border-light)",
                    color:
                      "var(--color-body)",
                  }}
                >
                  {selectedComplaint.description}
                </p>
              </div>

              <div>
                <p
                  className="text-xs"
                  style={{
                    color:
                      "var(--color-light-text)",
                  }}
                >
                  Current Status
                </p>

                <span
                  className="mt-2 inline-block rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={getStatusStyle(
                    selectedComplaint.status
                  )}
                >
                  {selectedComplaint.status}
                </span>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div
              className="flex flex-wrap justify-end gap-2 border-t p-5"
              style={{
                borderColor:
                  "var(--color-border-light)",
              }}
            >
              {selectedComplaint.status !==
                "Resolved" &&
                selectedComplaint.status !==
                  "Closed" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedComplaint.id,
                        "Resolved"
                      )
                    }
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      backgroundColor:
                        "var(--color-green-dark)",
                    }}
                  >
                    <CheckCircle
                      size={16}
                    />
                    Resolve Complaint
                  </button>
                )}

              <button
                type="button"
                onClick={() =>
                  setSelectedComplaint(
                    null
                  )
                }
                className="rounded-xl px-4 py-2.5 text-sm font-semibold"
                style={{
                  backgroundColor:
                    "#EAF2FF",
                  color: "#5B7DB1",
                  border:
                    "1px solid #D4E1F5",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
