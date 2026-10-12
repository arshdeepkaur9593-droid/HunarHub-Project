
import React from "react";
import {
  FiUser,
  FiBriefcase,
  FiHeart,
  FiGrid,
} from "react-icons/fi";

function HeroStats() {
  const stats = [
    {
      icon: FiUser,
      value: "500+",
      label: "Skilled Entrepreneurs",
    },
    {
      icon: FiBriefcase,
      value: "2000+",
      label: "Services Listed",
    },
    {
      icon: FiHeart,
      value: "1000+",
      label: "Happy Customers",
    },
    {
      icon: FiGrid,
      value: "50+",
      label: "Categories",
    },
  ];

  return (
    <div className="flex items-center gap-x-7 whitespace-nowrap">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-2.5"
          >
            {/* Icon */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
              }}
            >
              <Icon size={17} />
            </div>

            {/* Text */}
            <div>
              <p
                className="text-base font-bold leading-none"
                style={{
                  color: "var(--color-secondary)",
                }}
              >
                {stat.value}
              </p>

              <p
                className="mt-1 whitespace-nowrap text-[11px] font-medium leading-tight"
                style={{
                  color: "var(--color-muted)",
                }}
              >
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HeroStats;
