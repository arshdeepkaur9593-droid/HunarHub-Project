import ProductCard from "./ProductCard";
import { products } from "./productsData";
import React, { useState } from "react";
function FeaturedProducts() {

    // State
    const [showAll, setShowAll] = useState(false);
  
    // First 4 or All Categories
    const visibleProducts = showAll
  ? products
  : products.slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-6 py-5 ">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-700">
            Explore handmade products from talented local entrepreneurs.
          </p>
        </div>

        <button
         onClick={() => setShowAll(!showAll)}
        className="rounded-xl border border-indigo-600 px-5 py-3 font-semibold text-indigo-600 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-indigo-600 hover:text-white hover:shadow-lg">
         {showAll ? "Show Less ↑" : "View All Products  →"}
         
        </button>
      </div>

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
      <ProductCard {...product} />
    </div>
  ))}
</div>
    </section>
  );
}

export default FeaturedProducts;