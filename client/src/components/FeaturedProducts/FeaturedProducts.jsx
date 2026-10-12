
import ProductCard from "./ProductCard";
import { products } from "./productsData";
import React, { useState } from "react";

function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      {/* Heading */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p
            className="mb-2 text-sm font-bold uppercase tracking-[0.08em]"
            style={{
              color: "var(--color-primary)",
            }}
          >
            Handmade Collection
          </p>

          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--color-heading)",
            }}
          >
            Featured Products
          </h2>

          <p
            className="mt-3 text-sm sm:text-base"
            style={{
              color: "var(--color-body)",
            }}
          >
            Explore handmade products from talented local entrepreneurs.
          </p>
        </div>

        {/* View All */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="hidden shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:block"
          style={{
            borderColor: "#5B7DB1",
            color: "#4D6895",
            backgroundColor: "#EAF2FF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5B7DB1";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#EAF2FF";
            e.currentTarget.style.color = "#4D6895";
          }}
        >
          {showAll ? "Show Less ↑" : "View All Products →"}
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className={
              visibleProducts.length === 10 && index === 8
                ? "lg:col-start-2"
                : ""
            }
          >
            <ProductCard
              {...product}
              colorIndex={index}
            />
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          onClick={() => setShowAll(!showAll)}
          className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300"
          style={{
            borderColor: "#4D7A45",
            color: "#4D7A45",
            backgroundColor: "#EEF9E9",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4D7A45";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#EEF9E9";
            e.currentTarget.style.color = "#4D7A45";
          }}
        >
          {showAll ? "Show Less ↑" : "View All Products →"}
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
