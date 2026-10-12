
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Tag,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function MyServices() {
  const navigate = useNavigate();

  const defaultServices = [
    {
      id: 1,
      name: "Custom Stitching",
      category: "Tailoring",
      price: 800,
      duration: "3-5 Days",
      status: "Active",
      description:
        "Custom stitching services for suits, dresses and traditional wear.",
    },
    {
      id: 2,
      name: "Dress Alteration",
      category: "Tailoring",
      price: 400,
      duration: "1-2 Days",
      status: "Active",
      description: "Professional alteration service for dresses and clothing.",
    },
    {
      id: 3,
      name: "Traditional Kurta Stitching",
      category: "Traditional Wear",
      price: 1000,
      duration: "3 Days",
      status: "Active",
      description: "Traditional kurta stitching with custom measurements.",
    },
    {
      id: 4,
      name: "Embroidery Work",
      category: "Handmade Crafts",
      price: 1200,
      duration: "5-7 Days",
      status: "Inactive",
      description:
        "Hand embroidery work for dupattas, suits and decorative items.",
    },
  ];

  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem("hunarhubServices");

    return savedServices ? JSON.parse(savedServices) : defaultServices;
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ================= SAVE SERVICES =================

  useEffect(() => {
    localStorage.setItem("hunarhubServices", JSON.stringify(services));
  }, [services]);

  // ================= DELETE SERVICE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id),
    );
  };

  // ================= FILTER SERVICES =================

  const filteredServices = services.filter((service) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      service.name.toLowerCase().includes(searchText) ||
      service.category.toLowerCase().includes(searchText);

    const matchesCategory =
      categoryFilter === "All Categories" ||
      service.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All Status" || service.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ================= SUMMARY =================

  const totalServices = services.length;

  const activeServices = services.filter(
    (service) => service.status === "Active",
  ).length;

  const inactiveServices = services.filter(
    (service) => service.status === "Inactive",
  ).length;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}

      <div className="border-b border-[var(--color-border-light)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
              <BriefcaseBusiness size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                My Services
              </h1>

              <p className="mt-1 text-sm text-[var(--color-body)]">
                Manage the services you offer to customers.
              </p>
            </div>
          </div>

          {/* Add Service */}

          <button
            onClick={() => navigate("/entrepreneur/add-service")}
            className="flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition hover:bg-[#426A3C]"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ================= SUMMARY ================= */}

        <div className="grid gap-5 sm:grid-cols-3">
          {/* Total */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue)] shadow-[var(--shadow-soft)]">
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-blue-dark)]">
                  Total Services
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {totalServices}
                </p>
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-success)] shadow-[var(--shadow-soft)]">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-green-dark)]">
                  Active Services
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {activeServices}
                </p>
              </div>
            </div>
          </div>

          {/* Inactive */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-red-border)] bg-[var(--color-red)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-error)] shadow-[var(--shadow-soft)]">
                <XCircle size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#C85A5A]">
                  Inactive Services
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {inactiveServices}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH + FILTERS ================= */}

        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />
            </div>

            {/* Category */}

            <div className="relative">
              <Tag
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-9 pr-8 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)] sm:w-[215px]"
              >
                <option>All Categories</option>
                <option>Tailoring</option>
                <option>Traditional Wear</option>
                <option>Handmade Crafts</option>
                <option>Home Services</option>
                <option>Beauty & Wellness</option>
              </select>
            </div>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)] sm:w-[180px]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* ================= RESULT HEADER ================= */}

        <div className="mt-7 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-heading)]">
              Your Services
            </h2>

            <p className="mt-0.5 text-sm text-[var(--color-muted)]">
              Showing {filteredServices.length} of {totalServices} services
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] sm:flex">
            <BriefcaseBusiness size={14} />
            {filteredServices.length} Results
          </div>
        </div>

        {/* ================= SERVICES ================= */}

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
            >
              {/* ================= TOP ================= */}

              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${
                    index % 3 === 0
                      ? "bg-[var(--color-peach)] text-[var(--color-primary)]"
                      : index % 3 === 1
                        ? "bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                        : "bg-[var(--color-blue-light)] text-[var(--color-blue)]"
                  }`}
                >
                  <BriefcaseBusiness size={23} />
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
                    service.status === "Active"
                      ? "border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                      : "border-[var(--color-red-border)] bg-[var(--color-red)] text-[#C85A5A]"
                  }`}
                >
                  {service.status === "Active" ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <XCircle size={13} />
                  )}

                  {service.status}
                </span>
              </div>

              {/* ================= CONTENT ================= */}

              <div className="mt-5">
                <div className="flex items-center gap-1.5">
                  <Tag
                    size={13}
                    className="text-[var(--color-primary)]"
                  />

                  <p className="text-xs font-bold text-[var(--color-primary-dark)]">
                    {service.category}
                  </p>
                </div>

                <h2 className="mt-1.5 line-clamp-1 text-lg font-bold text-[var(--color-heading)]">
                  {service.name}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-[var(--color-muted)]">
                  {service.description}
                </p>

                {/* ================= PRICE + DURATION ================= */}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-[var(--radius-md)] bg-[var(--color-peach)] p-3">
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary-dark)]">
                      <IndianRupee size={13} />
                      Starting Price
                    </div>

                    <p className="mt-1 text-lg font-bold text-[var(--color-heading)]">
                      ₹{Number(service.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-3">
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-blue-dark)]">
                      <Clock3 size={13} />
                      Duration
                    </div>

                    <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">
                      {service.duration}
                    </p>
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {/* View */}

                  <button
                    onClick={() =>
                      navigate(`/entrepreneur/services/${service.id}`, {
                        state: { service },
                      })
                    }
                    className="flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] py-2 text-xs font-bold text-[var(--color-blue-dark)] transition hover:bg-[#DCE9FC]"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  {/* Edit */}

                  <button
                    onClick={() =>
                      navigate(`/entrepreneur/services/${service.id}/edit`, {
                        state: { service },
                      })
                    }
                    className="flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] py-2 text-xs font-bold text-[var(--color-green-dark)] transition hover:bg-[#E2F4DC]"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2 text-xs font-bold text-[var(--color-muted)] transition hover:border-[var(--color-red-border)] hover:bg-[var(--color-red)] hover:text-[var(--color-error)]"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= EMPTY ================= */}

        {filteredServices.length === 0 && (
          <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-12 text-center shadow-[var(--shadow-soft)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
              <BriefcaseBusiness size={30} />
            </div>

            <p className="mt-4 text-lg font-bold text-[var(--color-heading)]">
              No services found
            </p>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* ================= NOTE ================= */}

        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--color-blue)]">
              <BriefcaseBusiness size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--color-blue-dark)]">
                Service Management
              </p>

              <p className="mt-1 text-sm leading-6 text-[#4D6895]">
                Add new services, update pricing, manage availability and
                respond to customer requests from your entrepreneur panel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
