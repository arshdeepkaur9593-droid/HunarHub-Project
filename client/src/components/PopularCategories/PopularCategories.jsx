import CategoryCard from "./CategoryCard";
import { categories } from "./categoriesData";
import React, { useState } from "react";

function PopularCategories() {
  // State
  const [showAll, setShowAll] = useState(false);

  // First 4 or All Categories
  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 4);

  return (
   

    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* Heading */}

      <div className="mb-10 flex items-center justify-between">
        <div>

          <h2 className="mt-1 text-4xl font-bold text-gray-900">
            Popular Categories
          </h2>

          <p className="mt-3 text-gray-700">
            Discover skilled local entrepreneurs near you.
          </p>
        </div>

        <button 
          onClick={() => setShowAll(!showAll)}
        className="rounded-xl border border-blue-600 px-2 py-1 font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white">
            {showAll ? "Show Less ↑" : "View All Categories →"}
         
        </button>
      </div>

      {/* Cards */}

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularCategories;