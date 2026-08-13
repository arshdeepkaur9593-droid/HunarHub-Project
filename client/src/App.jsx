import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function Home() {
  return (
    <main>
      <Hero />
      <PopularCategories />
      <FeaturedProducts />
    </main>
  );
}

function App() {
  return (
    <>
      {/* Navbar - har page par rahega */}
      <Header />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </>
  );
}

export default App;