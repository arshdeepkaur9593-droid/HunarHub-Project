import React from "react";
import Container from "../Container/Container";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
function Hero() {
  return (
    <section className="bg-indigo-50 px-1.5 pb-4  overflow-hidden">
      <Container>
        {/* Hero Content */}
       <div className="grid lg:grid-cols-2 items-center gap-12 py-10">
          <HeroLeft />
          <HeroRight />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
