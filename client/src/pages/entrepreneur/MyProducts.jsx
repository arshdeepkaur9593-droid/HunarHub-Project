
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  Eye,
  IndianRupee,
  Tag,
  Boxes,
} from "lucide-react";

import product1 from "../../assets/images/Products imgs/product1.webp";
import product2 from "../../assets/images/Products imgs/product2.webp";
import product3 from "../../assets/images/Products imgs/product3.webp";
import product4 from "../../assets/images/Products imgs/product4.webp";

export default function MyProducts() {
  const navigate = useNavigate();

  const defaultProducts = [
    {
      id: 1,
      name: "Handmade Craft",
      category: "Handmade Crafts",
      price: 1200,
      stock: 8,
      status: "Active",
      image: product1,
      description: "Beautiful handmade craft made by local artisans.",
    },
    {
      id: 2,
      name: "Handmade Pottery",
      category: "Pottery",
      price: 850,
      stock: 12,
      status: "Active",
      image: product2,
      description: "Traditional handmade pottery crafted with care.",
    },
    {
      id: 3,
      name: "Traditional Product",
      category: "Traditional Crafts",
      price: 1500,
      stock: 5,
      status: "Active",
      image: product3,
      description: "Traditional handcrafted product representing local art.",
    },
    {
      id: 4,
      name: "Handmade Decor",
      category: "Handmade Crafts",
      price: 1100,
      stock: 0,
      status: "Out of Stock",
      image: product4,
      description: "Beautiful handmade decorative item for your home.",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");

  // ================= LOAD PRODUCTS =================

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("hunarhubProducts")) || [];

    setProducts([...defaultProducts, ...savedProducts]);
  }, []);

  // ================= SUMMARY =================

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.status === "Out of Stock",
  ).length;

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter((product) => product.id !== id);

    setProducts(updatedProducts);

    const savedProducts = updatedProducts.filter((product) => product.id > 4);

    localStorage.setItem("hunarhubProducts", JSON.stringify(savedProducts));
  };

  // ================= VIEW =================

  const handleView = (product) => {
    navigate("/entrepreneur/product-view", {
      state: { product },
    });
  };

  // ================= EDIT =================

  const handleEdit = (product) => {
    navigate("/entrepreneur/edit-product", {
      state: { product },
    });
  };

  // ================= SEARCH + FILTER =================

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All Categories" || product.category === category;

    const matchesStatus =
      status === "All Status" || product.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}

      <div className="border-b border-[var(--color-border-light)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
              <Package size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                My Products
              </h1>

              <p className="mt-1 text-sm text-[var(--color-body)]">
                Manage the products you offer to customers.
              </p>
            </div>
          </div>

          {/* Add Product */}

          <button
            onClick={() => navigate("/entrepreneur/add-product")}
            className="flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition hover:bg-[#426A3C]"
          >
            <Plus size={18} />
            Add Product
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
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-blue-dark)]">
                  Total Products
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {totalProducts}
                </p>
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-success)] shadow-[var(--shadow-soft)]">
                <Boxes size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-green-dark)]">
                  Active Products
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {activeProducts}
                </p>
              </div>
            </div>
          </div>

          {/* Out of Stock */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-red-border)] bg-[var(--color-red)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-error)] shadow-[var(--shadow-soft)]">
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#C85A5A]">
                  Out of Stock
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {outOfStockProducts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

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
                placeholder="Search products..."
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-9 pr-8 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)] sm:w-[210px]"
              >
                <option>All Categories</option>
                <option>Handmade Crafts</option>
                <option>Clothing</option>
                <option>Pottery</option>
                <option>Traditional Crafts</option>
                <option>Home Decor</option>
              </select>
            </div>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)] sm:w-[180px]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* ================= RESULT HEADER ================= */}

        <div className="mt-7 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-heading)]">
              Your Products
            </h2>

            <p className="mt-0.5 text-sm text-[var(--color-muted)]">
              Showing {filteredProducts.length} of {totalProducts} products
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] sm:flex">
            <Package size={14} />
            {filteredProducts.length} Results
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
            >
              {/* ================= IMAGE ================= */}

              <div
                className={`relative h-56 overflow-hidden ${
                  index % 4 === 0
                    ? "bg-[var(--color-peach)]"
                    : index % 4 === 1
                      ? "bg-[var(--color-green-soft)]"
                      : index % 4 === 2
                        ? "bg-[#F1EEFA]"
                        : "bg-[var(--color-blue-light)]"
                }`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-[var(--color-light-text)]">
                    <Package size={34} />
                    <span className="mt-2 text-sm">No Image</span>
                  </div>
                )}

                {/* Status */}

                <span
                  className={`absolute right-3 top-3 rounded-full border px-3 py-1.5 text-xs font-bold shadow-[var(--shadow-soft)] ${
                    product.status === "Active"
                      ? "border-[var(--color-green-border)] bg-white text-[var(--color-green-dark)]"
                      : "border-[var(--color-red-border)] bg-white text-[#C85A5A]"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <Tag
                    size={13}
                    className="text-[var(--color-primary)]"
                  />

                  <p className="text-xs font-bold text-[var(--color-primary-dark)]">
                    {product.category}
                  </p>
                </div>

                <h2 className="mt-1.5 line-clamp-1 text-lg font-bold text-[var(--color-heading)]">
                  {product.name}
                </h2>

                {/* Price + Stock */}

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-lg font-bold text-[var(--color-primary-dark)]">
                    <IndianRupee size={16} />
                    {Number(product.price).toLocaleString("en-IN")}
                  </div>

                  <div
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      Number(product.stock) > 0
                        ? "bg-[var(--color-green-soft)] text-[var(--color-green-dark)]"
                        : "bg-[var(--color-red)] text-[#C85A5A]"
                    }`}
                  >
                    Stock: {product.stock}
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {/* View */}

                  <button
                    onClick={() => handleView(product)}
                    className="flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] py-2 text-xs font-bold text-[var(--color-blue-dark)] transition hover:bg-[#DCE9FC]"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  {/* Edit */}

                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] py-2 text-xs font-bold text-[var(--color-green-dark)] transition hover:bg-[#E2F4DC]"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() => handleDelete(product.id)}
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

        {/* ================= NO PRODUCTS ================= */}

        {filteredProducts.length === 0 && (
          <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-12 text-center shadow-[var(--shadow-soft)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
              <Package size={30} />
            </div>

            <p className="mt-4 text-lg font-bold text-[var(--color-heading)]">
              No products found
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
              <Package size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--color-blue-dark)]">
                Product Management
              </p>

              <p className="mt-1 text-sm leading-6 text-[#4D6895]">
                You can add new handmade products, update pricing and manage
                stock from this section.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
