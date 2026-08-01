import React from "react";
import { FiSearch, FiGrid } from "react-icons/fi";
import Container from "../Container/Container";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-100 py-4 shadow-none mb-0">
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-indigo-700 text-white p-2 rounded-lg flex items-center justify-center">
              <FiGrid className="text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap text-indigo-700">
              HunarHub
            </span>
          </a>

          {/* Center: Links */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <li>
              <a
                href="#home"
                className="text-slate-700 hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 pb-1 transition-all duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#categories"
                className="text-slate-700 hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 pb-1 transition-all duration-300"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-slate-700   hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 pb-1 transition-all duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-slate-700  hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 pb-1 transition-all duration-300"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-slate-700  hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 pb-1 transition-all duration-300"
              >
                About Us
              </a>
            </li>
          </ul>

          {/* Right Side: Search & Buttons */}
          <div className="flex items-center gap-6 min-w-0 pr-4">
            <div className="relative hidden md:block flex-1 min-w-50 max-w-xs">
              <input
                type="text"
                placeholder="Search for skills, services..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-full py-2.5 pl-4 pr-9 focus:outline-none focus:border-indigo-700 focus:bg-white text-slate-700 placeholder:text-slate-400 transition-all"
              />
              <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 shrink-0">
              <button className="h-9 w-20 rounded-md border border-gray-300 text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-gray-50">
                Login
              </button>

              <button className="h-9 w-20 rounded-md bg-indigo-700 text-white text-sm font-medium whitespace-nowrap hover:bg-indigo-900">
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