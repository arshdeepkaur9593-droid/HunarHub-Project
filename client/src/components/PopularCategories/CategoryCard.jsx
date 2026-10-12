
import React from "react";

const colorClasses = {
  pink: {
    bg: "bg-[#FFEEE4]",
    iconBg: "bg-white/70",
    text: "text-[#EF8354]",
    border: "border-[#F7D8C7]",
  },

  blue: {
    bg: "bg-[#EAF2FF]",
    iconBg: "bg-white/70",
    text: "text-[#5B7DB1]",
    border: "border-[#D4E1F5]",
  },

  purple: {
    bg: "bg-[#C6BEEE]",
    iconBg: "bg-white/60",
    text: "text-[#665A9E]",
    border: "border-[#B5AADF]",
  },

  orange: {
    bg: "bg-[#FFE8D4]",
    iconBg: "bg-white/70",
    text: "text-[#EF8354]",
    border: "border-[#F3D0B5]",
  },

  green: {
    bg: "bg-[#EEF9E9]",
    iconBg: "bg-white/70",
    text: "text-[#4D7A45]",
    border: "border-[#D9EED2]",
  },

  yellow: {
    bg: "bg-[#FFF4D8]",
    iconBg: "bg-white/70",
    text: "text-[#C58A25]",
    border: "border-[#F1DFAD]",
  },

  red: {
    bg: "bg-[#FDEAEA]",
    iconBg: "bg-white/70",
    text: "text-[#C85A5A]",
    border: "border-[#F2CCCC]",
  },
};

function CategoryCard({
  title,
  description,
  services,
  icon: Icon,
  color,
}) {
  const classes = colorClasses[color] || colorClasses.orange;

  return (
    <div
      className={`
        group rounded-2xl border p-6
        ${classes.bg}
        ${classes.border}
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-lg
      `}
    >
      {/* Icon */}
      <div
        className={`
          mb-5 flex h-14 w-14 items-center justify-center
          rounded-xl
          ${classes.iconBg}
        `}
      >
        <Icon
          className={`h-7 w-7 ${classes.text} transition-transform duration-300 group-hover:scale-110`}
        />
      </div>

      {/* Title */}
      <p
        className="mb-2 text-xl font-bold"
        style={{
          color: "var(--color-heading)",
        }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        className="mb-4 min-h-10 text-sm leading-5"
        style={{
          color: "var(--color-body)",
        }}
      >
        {description}
      </p>

      {/* Services */}
      <span
        className="inline-flex rounded-full px-3 py-1 text-sm font-medium"
        style={{
          backgroundColor: "rgba(255,255,255,0.65)",
          color: "var(--color-body)",
        }}
      >
        {services}
      </span>
    </div>
  );
}

export default CategoryCard;
