import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPlay, FiCheck } from "react-icons/fi";
import HeroStats from "./HeroStats";

function HeroLeft() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/products");
  };

  const handleHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative z-20 max-w-xl">
      {/* Heading */}
      <h1
        className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[54px]"
        style={{
          color: "var(--color-secondary)",
        }}
      >
        Local Skills
        <br />
        <span
          style={{
            color: "var(--color-accent)",
          }}
        >
          Real Opportunities
        </span>
      </h1>

      {/* Description */}
      <p
        className="mt-6 max-w-lg text-base leading-7 sm:text-lg"
        style={{
          color: "var(--color-body)",
        }}
      >
        Find trusted local professionals, handmade products and everyday
        services — all in one place. HunarHub helps local talent connect
        directly with customers.
      </p>

      {/* Quick Benefits */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--color-accent-soft)",
              color: "var(--color-accent)",
            }}
          >
            <FiCheck size={12} />
          </span>
          Local Professionals
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--color-accent-soft)",
              color: "var(--color-accent)",
            }}
          >
            <FiCheck size={12} />
          </span>
          Handmade Products
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {/* Explore */}
        <button
          onClick={handleExplore}
          className="group flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-secondary)",
            boxShadow: "var(--shadow-dark)",
          }}
        >
          Explore Services
          <FiArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        {/* How it works */}
        <button
          onClick={handleHowItWorks}
          className="flex h-12 items-center gap-2 rounded-xl border px-5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-secondary)",
          }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--color-accent-soft)",
              color: "var(--color-accent)",
            }}
          >
            <FiPlay size={12} className="ml-0.5" />
          </span>
          How It Works
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <HeroStats />
      </div>
    </div>
  );
}

export default HeroLeft;
