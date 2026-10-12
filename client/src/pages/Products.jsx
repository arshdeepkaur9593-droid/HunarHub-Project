
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/FeaturedProducts/ProductCard";
import { products } from "../components/FeaturedProducts/productsData";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Navbar se search query lena
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.seller.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary-dark)",
            }}
          >
            HunarHub Marketplace
          </span>

          <h1
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-heading)" }}
          >
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Explore Products"}
          </h1>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm leading-6 sm:text-base"
            style={{ color: "var(--color-body)" }}
          >
            {searchQuery
              ? `Showing products matching "${searchQuery}".`
              : "Discover unique products made with skill, care and creativity by talented local entrepreneurs."}
          </p>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary)"
                    : "var(--color-surface)",
                  color: isActive
                    ? "#FFFFFF"
                    : "var(--color-heading)",
                  borderColor: isActive
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  boxShadow: isActive
                    ? "var(--shadow-primary)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-peach)";
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-light)";
                    e.currentTarget.style.color =
                      "var(--color-primary-dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-surface)";
                    e.currentTarget.style.borderColor =
                      "var(--color-border)";
                    e.currentTarget.style.color =
                      "var(--color-heading)";
                  }
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ================= RESULT COUNT ================= */}
        <div className="mt-10 flex items-center justify-between">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-muted)" }}
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>

          {selectedCategory !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Clear filter
            </button>
          )}
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        {filteredProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="py-20 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--color-peach)",
              }}
            >
              <span
                className="text-2xl"
                style={{ color: "var(--color-primary)" }}
              >
                🔎
              </span>
            </div>

            <h2
              className="mt-5 text-xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              No products found
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-6"
              style={{ color: "var(--color-muted)" }}
            >
              We couldn't find any products matching your search.
              Try another keyword or explore all categories.
            </p>

            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-green-dark)",
                boxShadow:
                  "0 7px 20px rgba(77, 122, 69, 0.16)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3F6839";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-green-dark)";
              }}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Products;
