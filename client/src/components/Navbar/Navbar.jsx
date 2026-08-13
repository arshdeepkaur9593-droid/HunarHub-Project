import React from "react";
import {
  FiSearch,
  FiGrid,
  FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../Container/Container";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-slate-100 bg-white py-4 shadow-sm">
      <Container>

        <div className="flex items-center justify-between gap-4">

          {/* ================= Logo ================= */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex items-center justify-center rounded-lg bg-indigo-700 p-2 text-white">
              <FiGrid className="text-xl" />
            </div>

            <span className="whitespace-nowrap text-xl font-bold tracking-tight text-indigo-700">
              HunarHub
            </span>
          </Link>


          {/* ================= Navigation Links ================= */}
          <ul className="hidden items-center gap-8 text-sm font-semibold lg:flex">

            {/* Home */}
            <li>
              <Link
                to="/"
                className="pb-1 text-slate-700 transition-all duration-300 hover:border-b-2 hover:border-indigo-700 hover:text-indigo-700"
              >
                Home
              </Link>
            </li>


            {/* Categories */}
            <li>
              <a
                href="#categories"
                className="pb-1 text-slate-700 transition-all duration-300 hover:border-b-2 hover:border-indigo-700 hover:text-indigo-700"
              >
                Categories
              </a>
            </li>


            {/* Services */}
            <li>
              <a
                href="#services"
                className="pb-1 text-slate-700 transition-all duration-300 hover:border-b-2 hover:border-indigo-700 hover:text-indigo-700"
              >
                Services
              </a>
            </li>


            {/* How It Works */}
            <li>
              <a
                href="#how-it-works"
                className="pb-1 text-slate-700 transition-all duration-300 hover:border-b-2 hover:border-indigo-700 hover:text-indigo-700"
              >
                How It Works
              </a>
            </li>


            {/* About Us */}
            <li>
              <a
                href="#about"
                className="pb-1 text-slate-700 transition-all duration-300 hover:border-b-2 hover:border-indigo-700 hover:text-indigo-700"
              >
                About Us
              </a>
            </li>

          </ul>


          {/* ================= Right Side ================= */}
          <div className="flex min-w-0 items-center gap-5 pr-4">


            {/* ================= Search ================= */}
            <div className="relative hidden min-w-50 max-w-xs flex-1 md:block">

              <input
                type="text"
                aria-label="Search for skills and services"
                placeholder="Search for skills, services..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-9 text-xs text-slate-700 placeholder:text-slate-700 transition-all focus:border-indigo-700 focus:bg-white focus:outline-none"
              />

              <FiSearch
                aria-hidden="true"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-slate-700"
              />

            </div>


            {/* ================= Cart ================= */}
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >

              <FiShoppingCart className="text-xl" />


              {/* Cart Count */}
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-700 px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}

            </Link>


            {/* ================= Login & Sign Up ================= */}
            <div className="flex shrink-0 items-center gap-3">

              {/* Login */}
              <button
                type="button"
                className="h-9 w-20 whitespace-nowrap rounded-md border border-gray-300 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </button>


              {/* Sign Up */}
              <button
                type="button"
                className="h-9 w-20 whitespace-nowrap rounded-md bg-indigo-700 text-sm font-medium text-white transition hover:bg-indigo-900"
              >
                Sign Up
              </button>

            </div>

          </div>

        </div>

      </Container>
    </nav>
  );
};

export default Navbar;