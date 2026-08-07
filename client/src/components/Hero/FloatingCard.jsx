import React from "react";

function FloatingCard({ image, title, services }) {
  return (
    <div className="w-44 rounded-2xl bg-white p-3 shadow-lg transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="h-22 w-full rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden ">
        <img
          src={image}
          alt={title}
           loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="mt-1 text-sm font-semibold text-gray-900">{title}</p>

      <p className="mt-1 text-xs text-gray-700">{services}</p>
    </div>
  );
}

export default FloatingCard;
