
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "./categoriesData";

function PopularCategories() {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 4);

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
            Explore Skills
          </p>

          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--color-heading)",
            }}
          >
            Popular Categories
          </h2>

          <p
            className="mt-3 text-sm sm:text-base"
            style={{
              color: "var(--color-body)",
            }}
          >
            Discover skilled local entrepreneurs near you.
          </p>
        </div>

        {/* View All Button */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="hidden shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 sm:block"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-primary)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "transparent";
            e.currentTarget.style.color =
              "var(--color-primary)";
          }}
        >
          {showAll ? "Show Less ↑" : "View All Categories →"}
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
          />
        ))}
      </div>

      {/* Mobile View All */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          onClick={() => setShowAll(!showAll)}
          className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition duration-200"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-primary)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "transparent";
            e.currentTarget.style.color =
              "var(--color-primary)";
          }}
        >
          {showAll ? "Show Less ↑" : "View All Categories →"}
        </button>
      </div>
    </section>
  );
}

export default PopularCategories;
