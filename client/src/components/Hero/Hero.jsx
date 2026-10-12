
import React from "react";
import Container from "../Container/Container";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFE8D4",
      }}
    >
      <Container>
        <div className="relative grid min-h-[calc(100vh-112px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-10">
          <HeroLeft />
          <HeroRight />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
