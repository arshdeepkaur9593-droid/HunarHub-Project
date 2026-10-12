
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Trash2,
  MapPin,
  BriefcaseBusiness,
  User,
  Clock,
  Download,
} from "lucide-react";

export default function ManageEntrepreneurs() {
  const defaultEntrepreneurs = [
    {
      id: 1,
      name: "Simran Kaur",
      skill: "Tailor",
      location: "Chandigarh",
      experience: "5 Years",
      phone: "9876543210",
      email: "simran@example.com",
      status: "Pending",
      description: "Custom stitching and traditional Punjabi suits.",
    },
    {
      id: 2,
      name: "Harpreet Singh",
      skill: "Potter",
      location: "Mohali",
      experience: "8 Years",
      phone: "9876543211",
      email: "harpreet@example.com",
      status: "Approved",
      description:
        "Traditional pottery and handmade ceramic products.",
    },
    {
      id: 3,
      name: "Manpreet Kaur",
      skill: "Handmade Crafts",
      location: "Panchkula",
      experience: "4 Years",
      phone: "9876543212",
      email: "manpreet@example.com",
      status: "Pending",
      description:
        "Handmade decorative items and traditional crafts.",
    },
    {
      id: 4,
      name: "Rajveer Singh",
      skill: "Cobbler",
      location: "Chandigarh",
      experience: "7 Years",
      phone: "9876543213",
      email: "rajveer@example.com",
      status: "Approved",
      description:
        "Traditional footwear repair and custom leather work.",
    },
    {
      id: 5,
      name: "Gurpreet Kaur",
      skill: "Beauty & Wellness",
      location: "Mohali",
      experience: "6 Years",
      phone: "9876543214",
      email: "gurpreet@example.com",
      status: "Rejected",
      description: "Beauty, makeup and wellness services.",
    },
  ];

  const [entrepreneurs, setEntrepreneurs] = useState(() => {
    const saved = localStorage.getItem("hunarhubEntrepreneurs");

    return saved ? JSON.parse(saved) : defaultEntrepreneurs;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "hunarhubEntrepreneurs",
      JSON.stringify(entrepreneurs)
    );
  }, [entrepreneurs]);

  // ================= APPROVE =================

  const handleApprove = (id) => {
    setEntrepreneurs((prev) =>
      prev.map((entrepreneur) =>
        entrepreneur.id === id
          ? {
              ...entrepreneur,
              status: "Approved",
            }
          : entrepreneur
      )
    );

    if (selectedEntrepreneur?.id === id) {
      setSelectedEntrepreneur((prev) => ({
        ...prev,
        status: "Approved",
      }));
    }
  };

  // ================= REJECT =================

  const handleReject = (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this entrepreneur?"
    );

    if (!confirmReject) return;

    setEntrepreneurs((prev) =>
      prev.map((entrepreneur) =>
        entrepreneur.id === id
          ? {
              ...entrepreneur,
              status: "Rejected",
            }
          : entrepreneur
      )
    );

    if (selectedEntrepreneur?.id === id) {
      setSelectedEntrepreneur((prev) => ({
        ...prev,
        status: "Rejected",
      }));
    }
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entrepreneur?"
    );

    if (!confirmDelete) return;

    setEntrepreneurs((prev) =>
      prev.filter((entrepreneur) => entrepreneur.id !== id)
    );

    if (selectedEntrepreneur?.id === id) {
      setSelectedEntrepreneur(null);
    }
  };

  // ================= FILTER =================

  const filteredEntrepreneurs = useMemo(() => {
    return entrepreneurs.filter((entrepreneur) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        entrepreneur.name.toLowerCase().includes(searchText) ||
        entrepreneur.skill.toLowerCase().includes(searchText) ||
        entrepreneur.location.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        entrepreneur.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [entrepreneurs, search, statusFilter]);

  // ================= COUNTS =================

  const total = entrepreneurs.length;

  const pending = entrepreneurs.filter(
    (item) => item.status === "Pending"
  ).length;

  const approved = entrepreneurs.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejected = entrepreneurs.filter(
    (item) => item.status === "Rejected"
  ).length;

  // ================= EXPORT CSV =================

  const exportCSV = () => {
    if (filteredEntrepreneurs.length === 0) {
      alert("No entrepreneurs available to export.");
      return;
    }

    const headers = [
      "Entrepreneur ID",
      "Name",
      "Skill",
      "Location",
      "Experience",
      "Phone",
      "Email",
      "Status",
      "Description",
    ];

    const rows = filteredEntrepreneurs.map((entrepreneur) => [
      entrepreneur.id,
      entrepreneur.name,
      entrepreneur.skill,
      entrepreneur.location,
      entrepreneur.experience,
      entrepreneur.phone,
      entrepreneur.email,
      entrepreneur.status,
      entrepreneur.description,
    ]);

    const csvRows = [headers, ...rows];

    const csvContent = csvRows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.download = `hunarhub-entrepreneurs-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ================= HEADER ================= */}

      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Admin Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                Manage Entrepreneurs
              </h1>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Approve, reject and manage entrepreneur registrations.
              </p>
            </div>

            {/* EXPORT */}

            <button
              onClick={exportCSV}
              className="flex w-fit items-center justify-center gap-2 rounded-xl border border-[var(--color-green-border)] bg-[var(--color-green)] px-4 py-2.5 text-sm font-semibold text-[var(--color-green-dark)] transition hover:bg-[#E3F5DC]"
            >
              <Download size={18} />
              Export CSV
            </button>

          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= SUMMARY ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-medium text-[var(--color-blue)]">
              Total Entrepreneurs
            </p>

            <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              {total}
            </p>
          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] p-5">
            <p className="text-sm font-medium text-[var(--color-warning)]">
              Pending Approval
            </p>

            <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              {pending}
            </p>
          </div>

          {/* APPROVED */}

          <div className="rounded-2xl border border-[var(--color-green-border)] bg-[var(--color-green)] p-5">
            <p className="text-sm font-medium text-[var(--color-green-dark)]">
              Approved
            </p>

            <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              {approved}
            </p>
          </div>

          {/* REJECTED */}

          <div className="rounded-2xl border border-[var(--color-red-border)] bg-[var(--color-red)] p-5">
            <p className="text-sm font-medium text-[var(--color-error)]">
              Rejected
            </p>

            <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
              {rejected}
            </p>
          </div>

        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)] sm:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entrepreneur, skill or location..."
              className="hunar-input w-full pl-10"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

        </div>

        {/* ================= ENTREPRENEUR LIST ================= */}

        <div className="mt-6 space-y-5">

          {filteredEntrepreneurs.map((entrepreneur) => (

            <div
              key={entrepreneur.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-light)] text-[var(--color-blue)]">
                    <User size={23} />
                  </div>

                  <div>

                    <h2 className="font-bold text-[var(--color-heading)]">
                      {entrepreneur.name}
                    </h2>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]">
                      <BriefcaseBusiness size={15} />
                      {entrepreneur.skill}
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                      <MapPin size={15} />
                      {entrepreneur.location}
                    </p>

                  </div>
                </div>

                {/* STATUS */}

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
                    entrepreneur.status === "Approved"
                      ? "bg-[var(--color-green)] text-[var(--color-green-dark)]"
                      : entrepreneur.status === "Pending"
                        ? "bg-[var(--color-yellow)] text-[var(--color-warning)]"
                        : "bg-[var(--color-red)] text-[var(--color-error)]"
                  }`}
                >
                  {entrepreneur.status}
                </span>

              </div>

              {/* DETAILS */}

              <div className="mt-5 grid gap-4 border-t border-[var(--color-border-light)] pt-5 sm:grid-cols-3">

                <div>
                  <p className="text-xs text-[var(--color-light-text)]">
                    Experience
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-body)]">
                    {entrepreneur.experience}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--color-light-text)]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[var(--color-body)]">
                    {entrepreneur.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--color-light-text)]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-body)]">
                    {entrepreneur.phone}
                  </p>
                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border-light)] pt-5">

                {/* VIEW */}

                <button
                  onClick={() =>
                    setSelectedEntrepreneur(entrepreneur)
                  }
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-body)] transition hover:border-[var(--color-blue)] hover:bg-[var(--color-blue-light)] hover:text-[var(--color-blue)]"
                >
                  <Eye size={16} />
                  View
                </button>

                {/* APPROVE */}

                {entrepreneur.status !== "Approved" && (
                  <button
                    onClick={() => handleApprove(entrepreneur.id)}
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-success)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                {/* REJECT */}

                {entrepreneur.status !== "Rejected" && (
                  <button
                    onClick={() => handleReject(entrepreneur.id)}
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:bg-[var(--color-red)]"
                  >
                    <X size={16} />
                    Reject
                  </button>
                )}

                {/* DELETE */}

                <button
                  onClick={() => handleDelete(entrepreneur.id)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-red-border)] hover:bg-[var(--color-red)] hover:text-[var(--color-error)]"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* ================= EMPTY STATE ================= */}

        {filteredEntrepreneurs.length === 0 && (
          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-12 text-center shadow-[var(--shadow-soft)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
              <BriefcaseBusiness size={30} />
            </div>

            <p className="mt-4 text-lg font-semibold text-[var(--color-heading)]">
              No entrepreneurs found
            </p>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Try changing your search or status filter.
            </p>

          </div>
        )}

      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedEntrepreneur && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-dark)]">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                  Entrepreneur Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-[var(--color-heading)]">
                  {selectedEntrepreneur.name}
                </h2>

              </div>

              <button
                onClick={() => setSelectedEntrepreneur(null)}
                className="rounded-xl p-2 text-[var(--color-muted)] transition hover:bg-[var(--color-peach)] hover:text-[var(--color-primary-dark)]"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL DETAILS */}

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-[var(--color-blue-light)] p-4">
                <p className="text-xs text-[var(--color-blue)]">
                  Skill
                </p>

                <p className="mt-1 font-semibold text-[var(--color-heading)]">
                  {selectedEntrepreneur.skill}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-light-text)]">
                  Location
                </p>

                <p className="mt-1 font-semibold text-[var(--color-body)]">
                  {selectedEntrepreneur.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-light-text)]">
                  Experience
                </p>

                <p className="mt-1 font-semibold text-[var(--color-body)]">
                  {selectedEntrepreneur.experience}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-light-text)]">
                  Email
                </p>

                <p className="mt-1 break-all font-semibold text-[var(--color-body)]">
                  {selectedEntrepreneur.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-light-text)]">
                  Phone
                </p>

                <p className="mt-1 font-semibold text-[var(--color-body)]">
                  {selectedEntrepreneur.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-light-text)]">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
                  {selectedEntrepreneur.description}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-[var(--color-green)] p-4">

                <Clock
                  size={16}
                  className="text-[var(--color-green-dark)]"
                />

                <span className="text-sm font-semibold text-[var(--color-heading)]">
                  Status: {selectedEntrepreneur.status}
                </span>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() => setSelectedEntrepreneur(null)}
                className="rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-body)] transition hover:bg-[var(--color-surface-soft)]"
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
