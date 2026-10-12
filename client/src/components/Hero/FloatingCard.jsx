import React from "react";

function FloatingCard({ image, title, services, delay = "0s" }) {
  return (
    <div
      className="group w-44 cursor-pointer rounded-2xl border p-3
      animate-floating transition-all duration-300
      hover:-translate-y-2"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
        animationDelay: delay,
      }}
    >
      {/* Image */}
      <div
        className="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl"
        style={{
          backgroundColor: "var(--color-surface-soft)",
        }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="pt-3">
        <p
          className="text-sm font-bold"
          style={{
            color: "var(--color-secondary)",
          }}
        >
          {title}
        </p>

        <div className="mt-1 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-accent-light)",
            }}
          />

          <p
            className="text-xs font-medium"
            style={{
              color: "var(--color-muted)",
            }}
          >
            {services}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FloatingCard;