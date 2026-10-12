
import { Store, Users, HandHeart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Local Talent",
    description:
      "We bring talented local entrepreneurs and customers together in one place.",
    bg: "#EEF9E9",
    border: "#D9EED2",
    iconBg: "#FFFFFF",
    iconColor: "#4D7A45",
  },
  {
    icon: Store,
    title: "Unique Products",
    description:
      "Discover handmade products, local services, and skills you may not find elsewhere.",
    bg: "#C6BEEE",
    border: "#B5AADF",
    iconBg: "#FFFFFF",
    iconColor: "#665A9E",
  },
  {
    icon: HandHeart,
    title: "Support Local",
    description:
      "Every purchase helps local entrepreneurs grow their skills and businesses.",
    bg: "#FFE8D4",
    border: "#F3D0B5",
    iconBg: "#FFFFFF",
    iconColor: "#EF8354",
  },
  {
    icon: ShieldCheck,
    title: "Easy & Trusted",
    description:
      "Enjoy a simple shopping experience with clear product and service information.",
    bg: "#FFEEE4",
    border: "#F7D8C7",
    iconBg: "#FFFFFF",
    iconColor: "#5B7DB1",
  },
];

function AboutUs() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p
            className="mb-2 text-sm font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--color-primary)" }}
          >
            Who We Are
          </p>

          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-heading)" }}
          >
            About HunarHub
          </h2>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm leading-6 sm:text-base"
            style={{ color: "var(--color-body)" }}
          >
            Connecting local talent with people who value their skills,
            products, and services.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left Content */}
          <div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]"
              style={{
                backgroundColor: "var(--color-peach)",
                color: "var(--color-primary-dark)",
              }}
            >
              Our Story
            </span>

            <h3
              className="mt-4 text-2xl font-bold leading-tight sm:text-3xl"
              style={{ color: "var(--color-heading)" }}
            >
              Empowering local talent, one connection at a time.
            </h3>

            <p
              className="mt-5 text-sm leading-7 sm:text-base"
              style={{ color: "var(--color-body)" }}
            >
              HunarHub is a digital marketplace created to connect talented
              local entrepreneurs with customers looking for quality products
              and services.
            </p>

            <p
              className="mt-4 text-sm leading-7 sm:text-base"
              style={{ color: "var(--color-body)" }}
            >
              From handmade crafts and tailoring to beauty, education,
              technology, and home services, HunarHub makes it easier to
              discover local skills and support the people behind them.
            </p>

            {/* Stats */}
            <div
              className="mt-7 grid grid-cols-3 gap-3 border-t pt-6 sm:mt-8 sm:gap-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div>
                <p
                  className="text-xl font-bold sm:text-2xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  10+
                </p>

                <p
                  className="mt-1 text-xs sm:text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Categories
                </p>
              </div>

              <div>
                <p
                  className="text-xl font-bold sm:text-2xl"
                  style={{ color: "var(--color-green-dark)" }}
                >
                  100+
                </p>

                <p
                  className="mt-1 text-xs sm:text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Local Sellers
                </p>
              </div>

              <div>
                <p
                  className="text-xl font-bold sm:text-2xl"
                  style={{ color: "#5B7DB1" }}
                >
                  24/7
                </p>

                <p
                  className="mt-1 text-xs sm:text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Marketplace
                </p>
              </div>
            </div>
          </div>

          {/* Right Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-6"
                  style={{
                    backgroundColor: feature.bg,
                    borderColor: feature.border,
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: feature.iconBg,
                    }}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                      style={{ color: feature.iconColor }}
                    />
                  </div>

                  {/* Title */}
                  <h4
                    className="text-base font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: "var(--color-body)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
