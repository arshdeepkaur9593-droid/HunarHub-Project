import React from "react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import HeroStats from "./HeroStats";

function HeroLeft() {
  return (
    <div className="space-y-1  -translate-y-8">
      {/* Heading */}
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
        Discover Local Skills
        <br />
        <span className="text-indigo-600">
          Empower Real Lives
        </span>
      </h1>

      {/* Description */}
      <p className="max-w-md text-base lg:text-lg text-gray-600 leading-8">
        HunarHub connects you with talented individuals offering quality
        services in your community.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-2">
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-indigo-700">
          Explore Services
          <FiArrowRight />
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-800 shadow-sm transition hover:bg-gray-50">
          <FiPlay className="fill-indigo-600 text-indigo-600" />
          How it Works
        </button>
      </div>

      {/* Stats */}
      <div className="pt-4">
        <HeroStats />
      </div>
    </div>
  );
}

export default HeroLeft;