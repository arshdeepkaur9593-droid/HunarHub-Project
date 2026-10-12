
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { services } from "../services/servicesData";

const colorClasses = {
  pink: {
    bg: "bg-[#FFEEE4]",
    text: "text-[#EF8354]",
  },
  blue: {
    bg: "bg-[#EAF2FF]",
    text: "text-[#5B7DB1]",
  },
  purple: {
    bg: "bg-[#C6BEEE]",
    text: "text-[#665A9E]",
  },
  orange: {
    bg: "bg-[#FFE8D4]",
    text: "text-[#EF8354]",
  },
  green: {
    bg: "bg-[#EEF9E9]",
    text: "text-[#4D7A45]",
  },
  yellow: {
    bg: "bg-[#FFF4D8]",
    text: "text-[#C58A25]",
  },
  red: {
    bg: "bg-[#FDEAEA]",
    text: "text-[#C85A5A]",
  },
};

function Services() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary-dark)",
            }}
          >
            <Sparkles size={13} />
            Local Services
          </span>

          <h1
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--color-heading)",
            }}
          >
            Explore Services
          </h1>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm leading-6 sm:text-base"
            style={{
              color: "var(--color-body)",
            }}
          >
            Find skilled local professionals for your everyday
            needs, all in one place.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for services..."
              className="hunar-input pr-12"
            />

            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{
                color: "var(--color-muted)",
              }}
            />
          </div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className="rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary)"
                    : "var(--color-surface)",
                  color: isActive
                    ? "#FFFFFF"
                    : "var(--color-heading)",
                  borderColor: isActive
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  boxShadow: isActive
                    ? "var(--shadow-primary)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-peach)";
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-light)";
                    e.currentTarget.style.color =
                      "var(--color-primary-dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-surface)";
                    e.currentTarget.style.borderColor =
                      "var(--color-border)";
                    e.currentTarget.style.color =
                      "var(--color-heading)";
                  }
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ================= RESULT INFO ================= */}
        <div className="mt-10 flex items-center justify-between">
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--color-muted)",
            }}
          >
            {filteredServices.length}{" "}
            {filteredServices.length === 1
              ? "service"
              : "services"}{" "}
            found
          </p>

          {selectedCategory !== "All" && (
            <button
              type="button"
              onClick={() =>
                setSelectedCategory("All")
              }
              className="text-sm font-semibold transition-colors hover:underline"
              style={{
                color: "var(--color-primary-dark)",
              }}
            >
              Clear filter
            </button>
          )}
        </div>

        {/* ================= SERVICES GRID ================= */}
        {filteredServices.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;

              const classes =
                colorClasses[service.color] ||
                colorClasses.blue;

              return (
                <div
                  key={service.id}
                  className="group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor:
                      "var(--color-border-light)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "var(--shadow-hover)";
                    e.currentTarget.style.borderColor =
                      "var(--color-primary-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "var(--shadow-soft)";
                    e.currentTarget.style.borderColor =
                      "var(--color-border-light)";
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${classes.bg}`}
                  >
                    <Icon
                      size={27}
                      className={classes.text}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Name */}
                  <h2
                    className="mt-5 text-lg font-bold"
                    style={{
                      color: "var(--color-heading)",
                    }}
                  >
                    {service.name}
                  </h2>

                  {/* Category */}
                  <span
                    className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "#C6BEEE",
                      color: "#665A9E",
                    }}
                  >
                    {service.category}
                  </span>

                  {/* Description */}
                  <p
                    className="mt-3 line-clamp-3 text-sm leading-6"
                    style={{
                      color: "var(--color-body)",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Location */}
                  <div
                    className="mt-4 flex items-center gap-2 text-sm"
                    style={{
                      color: "var(--color-muted)",
                    }}
                  >
                    <MapPin
                      size={16}
                      style={{
                        color:
                          "var(--color-green-dark)",
                      }}
                    />

                    <span>{service.location}</span>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-5 h-px w-full"
                    style={{
                      backgroundColor:
                        "var(--color-border-light)",
                    }}
                  />

                  {/* Bottom */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-xs"
                        style={{
                          color:
                            "var(--color-muted)",
                        }}
                      >
                        Starting from
                      </p>

                      <p
                        className="mt-0.5 text-lg font-bold"
                        style={{
                          color:
                            "var(--color-primary-dark)",
                        }}
                      >
                        ₹{service.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/services/${service.id}`
                        )
                      }
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "#EAF2FF",
                        color: "#5B7DB1",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "#5B7DB1";
                        e.currentTarget.style.color =
                          "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "#EAF2FF";
                        e.currentTarget.style.color =
                          "#5B7DB1";
                      }}
                    >
                      View
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="py-20 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--color-peach)",
              }}
            >
              <Search
                size={27}
                style={{
                  color: "var(--color-primary)",
                }}
              />
            </div>

            <h2
              className="mt-5 text-xl font-bold"
              style={{
                color: "var(--color-heading)",
              }}
            >
              No services found
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-6"
              style={{
                color: "var(--color-muted)",
              }}
            >
              We couldn't find any services matching your
              search. Try another keyword or explore all
              categories.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor:
                  "var(--color-green-dark)",
                boxShadow:
                  "0 7px 20px rgba(77, 122, 69, 0.16)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "#3F6839";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-green-dark)";
              }}
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Services;
