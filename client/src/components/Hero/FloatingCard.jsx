import React from "react";

function FloatingCard({ image, title, services }) {
  return (
    <div className="w-40 rounded-2xl bg-white p-2  shadow-x">
      <div className="h-22 w-full rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden ">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="mt-1 text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {services}
      </p>
    </div>
  );
}

export default FloatingCard;