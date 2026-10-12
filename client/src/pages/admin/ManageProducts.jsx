
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Trash2,
  Package,
  IndianRupee,
  MapPin,
  User,
  Tag,
  Clock,
  XCircle,
  Download,
} from "lucide-react";

export default function ManageProducts() {
  // =========================
  // DEFAULT PRODUCTS
  // =========================

  const defaultProducts = [
    {
      id: 1,
      name: "Handmade Pottery Set",
      entrepreneur: "Harpreet Singh",
      category: "Pottery",
      price: 1200,
      stock: 12,
      location: "Mohali",
      status: "Approved",
      description:
        "Beautiful handmade pottery set created by a local artisan.",
    },
    {
      id: 2,
      name: "Traditional Punjabi Kurta",
      entrepreneur: "Simran Kaur",
      category: "Traditional Wear",
      price: 1800,
      stock: 8,
      location: "Chandigarh",
      status: "Pending",
      description:
        "Traditional Punjabi kurta made with high-quality fabric and detailed stitching.",
    },
    {
      id: 3,
      name: "Handmade Embroidered Dupatta",
      entrepreneur: "Manpreet Kaur",
      category: "Handmade Crafts",
      price: 950,
      stock: 15,
      location: "Panchkula",
      status: "Approved",
      description:
        "Hand embroidered dupatta with traditional Punjabi design.",
    },
    {
      id: 4,
      name: "Leather Handmade Shoes",
      entrepreneur: "Rajveer Singh",
      category: "Footwear",
      price: 2200,
      stock: 5,
      location: "Chandigarh",
      status: "Pending",
      description:
        "Comfortable handmade leather shoes crafted by a local cobbler.",
    },
    {
      id: 5,
      name: "Handcrafted Wooden Decor",
      entrepreneur: "Aman Sharma",
      category: "Home Decor",
      price: 1500,
      stock: 0,
      location: "Mohali",
      status: "Rejected",
      description:
        "Handcrafted wooden decoration item for homes and offices.",
    },
  ];

  // =========================
  // STATE
  // =========================

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("hunarhubAdminProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : defaultProducts;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "hunarhubAdminProducts",
      JSON.stringify(products)
    );
  }, [products]);

  // =========================
  // APPROVE PRODUCT
  // =========================

  const handleApprove = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              status: "Approved",
            }
          : product
      )
    );

    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) => ({
        ...prev,
        status: "Approved",
      }));
    }
  };

  // =========================
  // REJECT PRODUCT
  // =========================

  const handleReject = (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this product?"
    );

    if (!confirmReject) return;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              status: "Rejected",
            }
          : product
      )
    );

    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) => ({
        ...prev,
        status: "Rejected",
      }));
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setShowViewModal(false);
    }
  };

  // =========================
  // VIEW PRODUCT
  // =========================

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.entrepreneur.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.location.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        product.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [products, search, statusFilter, categoryFilter]);

  // =========================
  // COUNTS
  // =========================

  const totalProducts = products.length;

  const pendingProducts = products.filter(
    (product) => product.status === "Pending"
  ).length;

  const approvedProducts = products.filter(
    (product) => product.status === "Approved"
  ).length;

  const rejectedProducts = products.filter(
    (product) => product.status === "Rejected"
  ).length;

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-[var(--color-green-soft)] text-[var(--color-green-dark)] border border-[var(--color-green-border)]";
    }

    if (status === "Pending") {
      return "bg-[var(--color-yellow)] text-[var(--color-warning)] border border-[var(--color-yellow-border)]";
    }

    return "bg-[var(--color-red)] text-[var(--color-error)] border border-[var(--color-red-border)]";
  };

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    if (filteredProducts.length === 0) {
      alert("No products available to export.");
      return;
    }

    const headers = [
      "Product ID",
      "Product Name",
      "Entrepreneur",
      "Category",
      "Price",
      "Stock",
      "Location",
      "Status",
      "Description",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredProducts.map((product) => [
      product.id,
      product.name,
      product.entrepreneur,
      product.category,
      product.price,
      product.stock,
      product.location,
      product.status,
      product.description,
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

    link.download = `hunarhub-products-${today}.csv`;

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
              Manage Products
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted)]">
              Review, approve and manage products listed by entrepreneurs.
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
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-blue)] shadow-sm">
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Total Products
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {totalProducts}
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
                  {pendingProducts}
                </p>
              </div>

            </div>

          </div>

          {/* APPROVED */}

          <div className="rounded-2xl border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white p-3 text-[var(--color-success)] shadow-sm">
                <Check size={22} />
              </div>

              <div>
                <p className="text-sm text-[var(--color-muted)]">
                  Approved
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-success)]">
                  {approvedProducts}
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
                  {rejectedProducts}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* SEARCH + FILTERS */}
        {/* ================================================= */}

        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)]">

          <div className="flex flex-col gap-4 lg:flex-row">

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
                placeholder="Search product, entrepreneur, category..."
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
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 text-sm text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white"
            >
              <option>All Categories</option>

              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>

          </div>

          {/* FILTER RESULT */}

          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted)]">

            <span>
              Showing{" "}
              <strong className="text-[var(--color-heading)]">
                {filteredProducts.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[var(--color-heading)]">
                {totalProducts}
              </strong>{" "}
              products
            </span>

            {(search ||
              statusFilter !== "All Status" ||
              categoryFilter !== "All Categories") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All Status");
                  setCategoryFilter("All Categories");
                }}
                className="font-semibold text-[var(--color-primary-dark)] hover:underline"
              >
                Clear filters
              </button>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* PRODUCT LIST */}
        {/* ================================================= */}

        <div className="mt-6 space-y-5">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >

              {/* TOP */}

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                {/* PRODUCT INFO */}

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-peach)] text-[var(--color-primary-dark)]">
                    <Package size={25} />
                  </div>

                  <div>

                    <h2 className="text-base font-bold text-[var(--color-heading)]">
                      {product.name}
                    </h2>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                      <User size={14} />
                      {product.entrepreneur}
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                      <Tag size={14} />
                      {product.category}
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <span
                  className={`w-fit rounded-full px-3.5 py-1.5 text-xs font-semibold ${getStatusStyle(
                    product.status
                  )}`}
                >
                  {product.status}
                </span>

              </div>

              {/* ================================================= */}
              {/* PRODUCT DETAILS */}
              {/* ================================================= */}

              <div className="mt-5 grid gap-4 border-t border-[var(--color-border-light)] pt-5 sm:grid-cols-3">

                {/* PRICE */}

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-[var(--color-peach)] p-2 text-[var(--color-primary-dark)]">
                    <IndianRupee size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Price
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                </div>

                {/* STOCK */}

                <div className="flex items-center gap-3">

                  <div
                    className={`rounded-lg p-2 ${
                      product.stock === 0
                        ? "bg-[var(--color-red)] text-[var(--color-error)]"
                        : "bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                    }`}
                  >
                    <Package size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Stock
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-[var(--color-error)]"
                          : "text-[var(--color-heading)]"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : `${product.stock} available`}
                    </p>
                  </div>

                </div>

                {/* LOCATION */}

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-[var(--color-blue-light)] p-2 text-[var(--color-blue)]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-heading)]">
                      {product.location}
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
                  onClick={() => handleView(product)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] px-4 py-2 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:-translate-y-0.5"
                >
                  <Eye size={16} />
                  View
                </button>

                {/* APPROVE */}

                {product.status !== "Approved" && (
                  <button
                    onClick={() =>
                      handleApprove(product.id)
                    }
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                {/* REJECT */}

                {product.status !== "Rejected" && (
                  <button
                    onClick={() =>
                      handleReject(product.id)
                    }
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:-translate-y-0.5"
                  >
                    <X size={16} />
                    Reject
                  </button>
                )}

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
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

        {filteredProducts.length === 0 && (

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-12 text-center shadow-[var(--shadow-soft)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-peach)] text-[var(--color-primary)]">
              <Package size={32} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </main>

      {/* ================================================= */}
      {/* VIEW PRODUCT MODAL */}
      {/* ================================================= */}

      {showViewModal && selectedProduct && (

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
                  Product Details
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
                className="rounded-xl p-2 text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-heading)]"
              >
                <X size={20} />
              </button>

            </div>

            {/* ================================================= */}
            {/* MODAL CONTENT */}
            {/* ================================================= */}

            <div className="p-6">

              {/* PRODUCT TITLE */}

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-peach)] text-[var(--color-primary-dark)]">
                  <Package size={30} />
                </div>

                <div className="flex-1">

                  <h3 className="text-xl font-bold text-[var(--color-heading)]">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Listed by {selectedProduct.entrepreneur}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      selectedProduct.status
                    )}`}
                  >
                    {selectedProduct.status}
                  </span>

                </div>

              </div>

              {/* ================================================= */}
              {/* PRODUCT INFORMATION */}
              {/* ================================================= */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* CATEGORY */}

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">

                  <p className="text-xs text-[var(--color-light-text)]">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-heading)]">
                    {selectedProduct.category}
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
                      selectedProduct.price
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

                {/* STOCK */}

                <div
                  className={`rounded-xl border p-4 ${
                    selectedProduct.stock === 0
                      ? "border-[var(--color-red-border)] bg-[var(--color-red)]"
                      : "border-[var(--color-green-border)] bg-[var(--color-green-soft)]"
                  }`}
                >

                  <p className="text-xs text-[var(--color-muted)]">
                    Stock
                  </p>

                  <p
                    className={`mt-1 font-semibold ${
                      selectedProduct.stock === 0
                        ? "text-[var(--color-error)]"
                        : "text-[var(--color-green-dark)]"
                    }`}
                  >
                    {selectedProduct.stock === 0
                      ? "Out of Stock"
                      : `${selectedProduct.stock} available`}
                  </p>

                </div>

                {/* LOCATION */}

                <div className="rounded-xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-4">

                  <p className="text-xs text-[var(--color-muted)]">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-blue-dark)]">
                    {selectedProduct.location}
                  </p>

                </div>

              </div>

              {/* ================================================= */}
              {/* ENTREPRENEUR */}
              {/* ================================================= */}

              <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-white p-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-[var(--color-green-soft)] p-2 text-[var(--color-green-dark)]">
                    <User size={20} />
                  </div>

                  <div>

                    <p className="text-xs text-[var(--color-light-text)]">
                      Entrepreneur
                    </p>

                    <p className="font-semibold text-[var(--color-heading)]">
                      {selectedProduct.entrepreneur}
                    </p>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* DESCRIPTION */}
              {/* ================================================= */}

              <div className="mt-5">

                <p className="text-sm font-semibold text-[var(--color-heading)]">
                  Description
                </p>

                <p className="mt-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-sm leading-6 text-[var(--color-body)]">
                  {selectedProduct.description}
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* MODAL ACTIONS */}
            {/* ================================================= */}

            <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">

              {/* CLOSE */}

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-border-light)]"
              >
                Close
              </button>

              {/* APPROVE */}

              {selectedProduct.status !== "Approved" && (

                <button
                  onClick={() =>
                    handleApprove(
                      selectedProduct.id
                    )
                  }
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-green-dark)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  <Check size={16} />
                  Approve
                </button>

              )}

              {/* REJECT */}

              {selectedProduct.status !== "Rejected" && (

                <button
                  onClick={() =>
                    handleReject(
                      selectedProduct.id
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-[var(--color-red)] px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:bg-[#f9dede]"
                >
                  <X size={16} />
                  Reject
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
