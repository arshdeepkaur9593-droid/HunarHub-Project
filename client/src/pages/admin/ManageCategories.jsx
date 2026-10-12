
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  FolderKanban,
  BriefcaseBusiness,
  Download,
} from "lucide-react";

export default function ManageCategories() {
  // =========================
  // DEFAULT CATEGORIES
  // =========================

  const defaultCategories = [
    {
      id: 1,
      name: "Tailoring",
      description:
        "Custom stitching, alterations and traditional clothing.",
      serviceCount: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Pottery",
      description:
        "Traditional pottery and handmade ceramic products.",
      serviceCount: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Cobbler",
      description:
        "Footwear repair, custom shoes and leather work.",
      serviceCount: 6,
      status: "Active",
    },
    {
      id: 4,
      name: "Handmade Crafts",
      description:
        "Traditional handmade decorative and artistic products.",
      serviceCount: 15,
      status: "Active",
    },
    {
      id: 5,
      name: "Beauty & Wellness",
      description:
        "Beauty, makeup, wellness and personal care services.",
      serviceCount: 10,
      status: "Active",
    },
    {
      id: 6,
      name: "Home Services",
      description:
        "Cleaning, plumbing, electrical and home maintenance.",
      serviceCount: 9,
      status: "Inactive",
    },
  ];

  // =========================
  // STATES
  // =========================

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("hunarhubCategories");

    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    serviceCount: 0,
    status: "Active",
  });

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "hunarhubCategories",
      JSON.stringify(categories)
    );
  }, [categories]);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD CATEGORY
  // =========================

  const handleAdd = () => {
    setEditingCategory(null);

    setForm({
      name: "",
      description: "",
      serviceCount: 0,
      status: "Active",
    });

    setShowModal(true);
  };

  // =========================
  // EDIT CATEGORY
  // =========================

  const handleEdit = (category) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      description: category.description,
      serviceCount: category.serviceCount,
      status: category.status,
    });

    setShowModal(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter category name.");
      return;
    }

    if (editingCategory) {
      // UPDATE

      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: form.name.trim(),
                description:
                  form.description.trim(),
                serviceCount: Number(
                  form.serviceCount
                ),
                status: form.status,
              }
            : category
        )
      );
    } else {
      // ADD

      const newCategory = {
        id: Date.now(),
        name: form.name.trim(),
        description: form.description.trim(),
        serviceCount: Number(
          form.serviceCount
        ),
        status: form.status,
      };

      setCategories((prev) => [
        ...prev,
        newCategory,
      ]);
    }

    closeModal();
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    const category = categories.find(
      (item) => item.id === id
    );

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${category?.name}"?`
    );

    if (!confirmDelete) return;

    setCategories((prev) =>
      prev.filter(
        (category) => category.id !== id
      )
    );
  };

  // =========================
  // TOGGLE STATUS
  // =========================

  const handleToggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status:
                category.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : category
      )
    );
  };

  // =========================
  // FILTER
  // =========================

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        category.name
          .toLowerCase()
          .includes(searchText) ||
        category.description
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        category.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [categories, search, statusFilter]);

  // =========================
  // COUNTS
  // =========================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) =>
      category.status === "Active"
  ).length;

  const inactiveCategories = categories.filter(
    (category) =>
      category.status === "Inactive"
  ).length;

  const totalServices = categories.reduce(
    (total, category) =>
      total +
      Number(category.serviceCount || 0),
    0
  );

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    // CSV HEADERS
    const headers = [
      "Category ID",
      "Category Name",
      "Description",
      "Service Count",
      "Status",
    ];

    // CATEGORY DATA
    const rows = categories.map(
      (category) => [
        category.id,
        category.name,
        category.description,
        category.serviceCount,
        category.status,
      ]
    );

    // Combine headers + rows
    const csvRows = [
      headers,
      ...rows,
    ];

    // Convert data into CSV format
    const csvContent = csvRows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(
              cell ?? ""
            );

            // Escape double quotes
            return `"${value.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    // BOM helps Excel correctly read
    // Unicode characters
    const BOM = "\uFEFF";

    const blob = new Blob(
      [BOM + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    // Create temporary download URL
    const url =
      URL.createObjectURL(blob);

    // Create download link
    const link =
      document.createElement("a");

    link.href = url;

    link.download = `hunarhub-categories-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    // Start download
    link.click();

    // Cleanup
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // UI
  // =========================

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
              Manage Categories
            </h1>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Manage skills and service
              categories available on
              HunarHub.
            </p>
          </div>

          {/* EXPORT BUTTON */}

          <button
            type="button"
            onClick={exportCSV}
            className="flex w-fit items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

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
            <div className="flex items-center gap-4">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    "#EAF2FF",
                  color: "#5B7DB1",
                }}
              >
                <FolderKanban size={22} />
              </div>

              <div>
                <p
                  className="text-sm"
                  style={{
                    color:
                      "var(--color-muted)",
                  }}
                >
                  Total Categories
                </p>

                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  {totalCategories}
                </p>
              </div>
            </div>
          </div>

          {/* Active */}

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
              Active Categories
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color:
                  "var(--color-green-dark)",
              }}
            >
              {activeCategories}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color:
                  "var(--color-green-dark)",
              }}
            >
              Currently available
            </p>
          </div>

          {/* Inactive */}

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
              Inactive Categories
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color: "#725016",
              }}
            >
              {inactiveCategories}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "#9A6D1D",
              }}
            >
              Currently disabled
            </p>
          </div>

          {/* Services */}

          <div
            className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "#C6BEEE",
              borderColor: "#B5AADF",
              boxShadow:
                "var(--shadow-soft)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "#665A9E",
              }}
            >
              Total Services
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{
                color: "#554B87",
              }}
            >
              {totalServices}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "#665A9E",
              }}
            >
              Across all categories
            </p>
          </div>
        </div>

        {/* ================= SEARCH + ADD + EXPORT ================= */}

        <div
          className="mt-8 flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row"
          style={{
            borderColor:
              "var(--color-border-light)",
            boxShadow:
              "var(--shadow-soft)",
          }}
        >
          {/* Search */}

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
              placeholder="Search categories..."
              className="hunar-input pl-11"
            />
          </div>

          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="hunar-input sm:w-40"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* Add */}

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* ================= RESULT COUNT ================= */}

        <div className="mt-6 flex items-center justify-between">
          <p
            className="text-sm font-medium"
            style={{
              color:
                "var(--color-muted)",
            }}
          >
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1
              ? "category"
              : "categories"}{" "}
            found
          </p>

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
              className="text-sm font-semibold hover:underline"
              style={{
                color:
                  "var(--color-primary-dark)",
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ================= CATEGORY LIST ================= */}

        <div className="mt-4 space-y-4">
          {filteredCategories.map(
            (category, index) => (
              <div
                key={category.id}
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
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* CATEGORY INFO */}

                  <div className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "var(--color-peach)"
                            : "var(--color-green)",
                        color:
                          index % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-green-dark)",
                      }}
                    >
                      <BriefcaseBusiness
                        size={22}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2
                          className="font-bold"
                          style={{
                            color:
                              "var(--color-heading)",
                          }}
                        >
                          {category.name}
                        </h2>

                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor:
                              category.status ===
                              "Active"
                                ? "var(--color-green)"
                                : "#FFF4D8",

                            color:
                              category.status ===
                              "Active"
                                ? "var(--color-green-dark)"
                                : "#9A6D1D",
                          }}
                        >
                          {category.status}
                        </span>
                      </div>

                      <p
                        className="mt-2 max-w-2xl text-sm leading-6"
                        style={{
                          color:
                            "var(--color-body)",
                        }}
                      >
                        {category.description}
                      </p>

                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{
                          color: "#5B7DB1",
                        }}
                      >
                        {category.serviceCount}{" "}
                        Services
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-2">

                    {/* TOGGLE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleStatus(
                          category.id
                        )
                      }
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor:
                          category.status ===
                          "Active"
                            ? "#FFF4D8"
                            : "var(--color-green)",

                        color:
                          category.status ===
                          "Active"
                            ? "#9A6D1D"
                            : "var(--color-green-dark)",

                        border:
                          category.status ===
                          "Active"
                            ? "1px solid #F1DFAD"
                            : "1px solid var(--color-green-border)",
                      }}
                    >
                      {category.status ===
                      "Active" ? (
                        <>
                          <X size={16} />
                          Disable
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Enable
                        </>
                      )}
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(category)
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
                      <Pencil size={16} />
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          category.id
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
              </div>
            )
          )}
        </div>

        {/* ================= EMPTY ================= */}

        {filteredCategories.length ===
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
              <FolderKanban
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
              No categories found
            </p>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--color-muted)",
              }}
            >
              Try changing your search or
              filter.
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
              View All Categories
            </button>
          </div>
        )}
      </main>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor:
              "rgba(37, 37, 37, 0.45)",
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border bg-white p-6"
            style={{
              borderColor:
                "var(--color-border-light)",
              boxShadow:
                "var(--shadow-dark)",
            }}
          >
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between">
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
                  Category
                </span>

                <h2
                  className="mt-3 text-xl font-bold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color:
                      "var(--color-muted)",
                  }}
                >
                  {editingCategory
                    ? "Update category information."
                    : "Create a new HunarHub category."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 transition-colors hover:bg-[#FFEEE4]"
                style={{
                  color:
                    "var(--color-muted)",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* NAME */}

              <div>
                <label
                  className="text-sm font-semibold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Tailoring"
                  required
                  className="hunar-input mt-2"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  className="text-sm font-semibold"
                  style={{
                    color:
                      "var(--color-heading)",
                  }}
                >
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe this category..."
                  required
                  className="hunar-input mt-2 resize-none"
                />
              </div>

              {/* SERVICES + STATUS */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label
                    className="text-sm font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    Service Count
                  </label>

                  <input
                    type="number"
                    name="serviceCount"
                    value={
                      form.serviceCount
                    }
                    onChange={handleChange}
                    min="0"
                    className="hunar-input mt-2"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-semibold"
                    style={{
                      color:
                        "var(--color-heading)",
                    }}
                  >
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="hunar-input mt-2"
                  >
                    <option>
                      Active
                    </option>
                    <option>
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}

              <div
                className="flex justify-end gap-3 border-t pt-5"
                style={{
                  borderColor:
                    "var(--color-border-light)",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor:
                      "var(--color-surface)",
                    color:
                      "var(--color-body)",
                    border:
                      "1px solid var(--color-border)",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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
                  <Check size={17} />

                  {editingCategory
                    ? "Save Changes"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
