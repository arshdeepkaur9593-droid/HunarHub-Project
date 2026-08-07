import React from "react";
import FloatingCard from "./FloatingCard";
import RatingCard from "./RatingCard";

// Images
import person from "../../assets/images/hero-entrepreneur.webp";
import tailoring from "../../assets/images/tailoring.webp";
import pottery from "../../assets/images/pottery.webp";
import home from "../../assets/images/home-services.webp";
import crafts from "../../assets/images/handmade-crafts.webp";

function HeroRight() {
  return (
    <div className="relative w-full h-88 l -translate-y-8">
      {/* Background Circle */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-200"></div>

      {/* Hero Image */}
      <img
        src={person}
        alt="Hero Entrepreneur"
        className="absolute left-1/2 top-0 -translate-x-1/2 w-72 object-contain z-20"
      />

      {/* Top Left Card */}
      <div className="absolute left-4 top-8 z-30 animate-float-slow">
        <FloatingCard
          image={tailoring}
          title="Tailoring"
          services="120+ Services"
        />
      </div>

      {/* Top Right Card */}
      <div className="absolute right-4 top-8 z-30 animate-float-medium">
        <FloatingCard
          image={pottery}
          title="Pottery"
          services="80+ Products"
        />
      </div>

      {/* Bottom Left Card */}
      <div className="absolute left-0 top-56 z-30 animate-float-fast">
        <FloatingCard
          image={home}
          title="Home Services"
          services="150+ Services"
        />
      </div>

      {/* Bottom Right Card */}
      <div className="absolute right-0 top-56 z-30 animate-float-medium">

        <FloatingCard
          image={crafts}
          title="Handmade Crafts"
          services="200+ Products"
        />
      </div>

      {/* Rating Card */}
      <div className="absolute top-100 w-55  left-1/2 -translate-x-1/2 z-30">
        <RatingCard />
      </div>
    </div>
  );
}

export default HeroRight;