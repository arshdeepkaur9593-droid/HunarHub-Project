import React from "react";
import { Header } from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <PopularCategories />
        <FeaturedProducts />
      </main>
    </>
  );
}

export default App;