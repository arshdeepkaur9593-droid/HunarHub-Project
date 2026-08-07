import React from "react";

const colorClasses = {
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
};

function CategoryCard({
  title,
  description,
  services,
  icon: Icon,
  color,
}) {
  
  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Icon */}
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${classes.bg}`}
      >
        <Icon className={`h-7 w-7 ${classes.text}`} />
      </div>

      {/* Title */}
      <p className="mb-2 text-xl font-bold text-gray-900">
        {title}
      </p>

      {/* Description */}
      <p className="mb-4 min-h-10 text-sm leading-5 text-gray-700">
        {description}
      </p>

      {/* Services */}
      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
        {services}
      </span>
    </div>
  );
}

export default CategoryCard;