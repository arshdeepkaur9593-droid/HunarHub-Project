
import {
  Search,
  UserRound,
  ShoppingCart,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore",
    description:
      "Discover products and services from talented local entrepreneurs.",
  },
  {
    number: "02",
    icon: UserRound,
    title: "Choose",
    description:
      "Find a trusted seller or service provider that matches your needs.",
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "Order",
    description:
      "Add your favorite products to cart and complete your order easily.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Enjoy",
    description:
      "Receive your product or enjoy the service while supporting local talent.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-4 py-16 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#EEF9E9",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p
            className="mb-2 text-sm font-bold uppercase tracking-[0.08em]"
            style={{
              color: "#4D7A45",
            }}
          >
            Simple & Easy
          </p>

          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--color-heading)",
            }}
          >
            How HunarHub Works
          </h2>

          <p
            className="mt-3 text-sm leading-6 sm:text-base"
            style={{
              color: "var(--color-body)",
            }}
          >
            From discovering local talent to receiving your order, HunarHub
            makes everything simple.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">

          {/* Connecting Line */}
          <div
            className="absolute left-[13%] right-[13%] top-12 hidden h-0.5 md:block"
            style={{
              backgroundColor: "#CFE4C8",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative z-10 text-center"
              >

                {/* Icon Circle */}
                <div
                  className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-8 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#EEF9E9",
                  }}
                >
                  <Icon
                    size={32}
                    strokeWidth={1.8}
                    style={{
                      color:
                        index % 2 === 0
                          ? "#5B7DB1"
                          : "#4D7A45",
                    }}
                  />

                  {/* Number */}
                  <span
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? "#5B7DB1"
                          : "#4D7A45",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <h3
                  className="text-lg font-bold"
                  style={{
                    color: "var(--color-heading)",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="mx-auto mt-2 max-w-xs text-sm leading-6"
                  style={{
                    color: "var(--color-body)",
                  }}
                >
                  {step.description}
                </p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute -right-4 top-12 hidden -translate-y-1/2 items-center justify-center px-1 md:flex"
                    style={{
                      backgroundColor: "#EEF9E9",
                    }}
                  >
                    <ArrowRight
                      size={20}
                      strokeWidth={1.8}
                      style={{
                        color: "#EF8354",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
