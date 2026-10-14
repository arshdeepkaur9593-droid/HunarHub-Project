import {
  RiCustomerService2Line,
  RiStore2Line,
  RiGlobalLine,
  RiDashboardLine,
} from "react-icons/ri";

import { Link } from "react-router-dom";
import Container from "../Container/Container";

const TopBar = () => {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "var(--color-heading)",
        color: "#FFFFFF",
      }}
    >
      <Container>
        <div className="flex min-h-9 items-center justify-between gap-4 py-2 text-[11px]">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
            />

            <p className="truncate font-medium tracking-wide">
              Empowering local skills. Building real opportunities.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link
              to="/entrepreneur/dashboard"
              className="group flex items-center gap-1.5 rounded-md px-2 py-1 font-semibold transition hover:opacity-80 sm:px-3"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#FFFFFF",
              }}
            >
              <RiDashboardLine size={14} />
              <span>Entrepreneur Dashboard</span>
            </Link>

            <div className="hidden items-center gap-5 md:flex">
              <Link
                to="/help"
                className="group flex items-center gap-1.5 transition"
              >
                <RiCustomerService2Line
                  size={14}
                  style={{
                    color: "var(--color-primary)",
                  }}
                />

                <span className="transition-opacity group-hover:opacity-70">
                  Help & Support
                </span>
              </Link>

              <span className="h-4 w-px bg-white/15" />

              <Link
                to="/products"
                className="group flex items-center gap-1.5 transition"
              >
                <RiStore2Line
                  size={14}
                  style={{
                    color: "var(--color-primary)",
                  }}
                />

                <span className="transition-opacity group-hover:opacity-70">
                  Browse Marketplace
                </span>
              </Link>

              <span className="h-4 w-px bg-white/15" />

              <a
                href="https://hunarhub.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HunarHub Website"
                className="flex items-center justify-center transition hover:opacity-70"
              >
                <RiGlobalLine
                  size={15}
                  style={{
                    color: "var(--color-primary)",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

