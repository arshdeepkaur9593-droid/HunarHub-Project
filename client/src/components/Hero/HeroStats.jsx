import React from "react";
import {
  FiUser,
  FiBriefcase,
  FiHeart,
  FiGrid,
} from "react-icons/fi";

function HeroStats() {
  return (
   <div className="flex flex-wrap items-center gap-8">

      <div className="flex items-center gap-3">
        <FiUser className="text-lg text-indigo-600" />
        <div>
          <h3 className="text-lg font-bold text-indigo-600">500+</h3>
          <p className="text-xs text-gray-500">
            Skilled Entrepreneurs
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FiBriefcase className="text-lg text-indigo-600" />
        <div>
          <h3 className="text-lg font-bold text-indigo-600">2000+</h3>
         <p className="text-xs text-gray-500">
            Services Listed
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FiHeart className="text-lg text-indigo-600" />
        <div>
          <h3 className="text-lg font-bold text-indigo-600">1000+</h3>
          <p className="text-xs text-gray-500">
            Happy Customers
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FiGrid className="text-lg text-indigo-600" />
        <div>
          <h3 className="text-lg font-bold text-indigo-600">50+</h3>
          <p className="text-xs text-gray-500">
            Categories
          </p>
        </div>
      </div>

    </div>
  );
}

export default HeroStats;