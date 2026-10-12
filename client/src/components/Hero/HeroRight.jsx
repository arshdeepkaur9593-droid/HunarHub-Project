
import React from "react";
import FloatingCard from "./FloatingCard";
import RatingCard from "./RatingCard";

import person from "../../assets/images/hero-entrepreneur.webp";
import tailoring from "../../assets/images/tailoring.webp";
import pottery from "../../assets/images/pottery.webp";
import home from "../../assets/images/home-services.webp";
import crafts from "../../assets/images/handmade-crafts.webp";

function HeroRight() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[560px] lg:h-[560px]">

      {/* Main Background Shape */}
      <div
        className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: "var(--color-accent-soft)",
        }}
      />

      {/* Secondary Shape */}
      <div
        className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          borderColor: "var(--color-accent-light)",
          opacity: 0.35,
        }}
      />

      {/* Main Person */}
      <img
        src={person}
        alt="Local entrepreneur"
        className="absolute left-1/2 top-1/2 z-20 h-[430px] w-auto -translate-x-1/2 -translate-y-[58%] object-contain"
      />

      {/* Tailoring */}
      <div className="absolute left-0 top-12 z-30">
        <FloatingCard
          image={tailoring}
          title="Tailoring"
          services="120+ Services"
        />
      </div>

      {/* Pottery */}
      <div className="absolute right-0 top-12 z-30">
        <FloatingCard
          image={pottery}
          title="Pottery"
          services="80+ Products"
        />
      </div>

      {/* Home Services */}
      <div className="absolute bottom-16 left-0 z-30">
        <FloatingCard
          image={home}
          title="Home Services"
          services="150+ Services"
        />
      </div>

      {/* Handmade Crafts */}
      <div className="absolute bottom-16 right-0 z-30">
        <FloatingCard
          image={crafts}
          title="Handmade Crafts"
          services="200+ Products"
        />
      </div>

      {/* Rating */}
      <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2">
        <RatingCard />
      </div>
    </div>
  );
}

export default HeroRight;
