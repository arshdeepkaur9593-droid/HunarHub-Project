
import { ArrowLeft, MapPin, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
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

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-4"
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--color-peach)",
            }}
          >
            <MapPin
              className="h-7 w-7"
              style={{
                color: "var(--color-primary)",
              }}
            />
          </div>

          <h1
            className="mt-5 text-2xl font-bold"
            style={{
              color: "var(--color-heading)",
            }}
          >
            Service Not Found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{
              color: "var(--color-muted)",
            }}
          >
            The service you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/services")}
            className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--color-green-dark)",
              boxShadow:
                "0 7px 20px rgba(77, 122, 69, 0.16)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3F6839";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-green-dark)";
            }}
          >
            Back to Services
          </button>
        </div>
      </main>
    );
  }

  const Icon = service.icon;

  const classes =
    colorClasses[service.color] || colorClasses.blue;

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="mx-auto max-w-5xl">

        {/* ================= BACK BUTTON ================= */}
        <button
          type="button"
          onClick={() => navigate("/services")}
          className="mb-7 flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{
            color: "#5B7DB1",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              "var(--color-primary-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#5B7DB1";
          }}
        >
          <ArrowLeft size={18} />
          Back to Services
        </button>

        {/* ================= SERVICE CARD ================= */}
        <div
          className="overflow-hidden rounded-3xl border bg-white"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="grid md:grid-cols-2">

            {/* ================= LEFT ================= */}
            <div
              className="flex min-h-[350px] items-center justify-center p-10 sm:p-12"
              style={{
                backgroundColor: "#FFF7F2",
              }}
            >
              <div
                className={`flex h-36 w-36 items-center justify-center rounded-[32px] ${classes.bg} shadow-sm`}
              >
                <Icon
                  size={72}
                  className={classes.text}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="p-7 sm:p-10">

              {/* Category */}
              <span
                className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: "#C6BEEE",
                  color: "#665A9E",
                }}
              >
                {service.category}
              </span>

              {/* Name */}
              <h1
                className="mt-4 text-3xl font-bold leading-tight sm:text-4xl"
                style={{
                  color: "var(--color-heading)",
                }}
              >
                {service.name}
              </h1>

              {/* Description */}
              <p
                className="mt-4 text-sm leading-7 sm:text-base"
                style={{
                  color: "var(--color-body)",
                }}
              >
                {service.description}
              </p>

              {/* Location */}
              <div
                className="mt-6 flex items-center gap-2 text-sm"
                style={{
                  color: "var(--color-body)",
                }}
              >
                <MapPin
                  size={19}
                  style={{
                    color: "var(--color-green-dark)",
                  }}
                />

                <span>{service.location}</span>
              </div>

              {/* Divider */}
              <div
                className="my-6 h-px w-full"
                style={{
                  backgroundColor:
                    "var(--color-border-light)",
                }}
              />

              {/* Price */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{
                    color: "var(--color-muted)",
                  }}
                >
                  Starting Price
                </p>

                <p
                  className="mt-1 text-3xl font-bold"
                  style={{
                    color: "var(--color-primary-dark)",
                  }}
                >
                  ₹{service.price}
                </p>
              </div>

              {/* Features */}
              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        "var(--color-green)",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{
                        color:
                          "var(--color-green-dark)",
                      }}
                    />
                  </div>

                  <span
                    className="text-sm"
                    style={{
                      color: "var(--color-body)",
                    }}
                  >
                    Verified Local Professional
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#EAF2FF",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{
                        color: "#5B7DB1",
                      }}
                    />
                  </div>

                  <span
                    className="text-sm"
                    style={{
                      color: "var(--color-body)",
                    }}
                  >
                    Quality Service
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--color-peach)",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{
                        color:
                          "var(--color-primary)",
                      }}
                    />
                  </div>

                  <span
                    className="text-sm"
                    style={{
                      color: "var(--color-body)",
                    }}
                  >
                    Local Service Provider
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/book-service/${service.id}`)
                }
                className="mt-8 w-full rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor:
                    "var(--color-green-dark)",
                  boxShadow:
                    "0 8px 22px rgba(77, 122, 69, 0.18)",
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
                Book This Service
              </button>

              {/* Small Info */}
              <div
                className="mt-4 rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    "var(--color-peach)",
                  borderColor:
                    "var(--color-peach-light)",
                }}
              >
                <p
                  className="text-xs leading-5"
                  style={{
                    color: "var(--color-body)",
                  }}
                >
                  Connect with trusted local professionals
                  and support skilled entrepreneurs in your
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ServiceDetails;
