
import React from "react";
import {
  RiCustomerService2Line,
  RiQuestionLine,
  RiMailLine,
  RiPhoneLine,
  RiMessage2Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* ================= HEADER ================= */}
      <div
        className="border-b"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "var(--color-border-light)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

          <p
            className="text-sm font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--color-primary)" }}
          >
            HunarHub Support
          </p>

          <h1
            className="mt-2 text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-heading)" }}
          >
            Help & Support
          </h1>

          <p
            className="mt-2 max-w-2xl text-sm leading-6"
            style={{ color: "var(--color-muted)" }}
          >
            Need help? Find answers or get in touch with the HunarHub support
            team.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ================= SUPPORT OPTIONS ================= */}
        <div className="grid gap-5 md:grid-cols-3">

          {/* FAQ */}
          <div
            className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "#EEF9E9",
              borderColor: "#D9EED2",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#4D7A45",
              }}
            >
              <RiQuestionLine size={25} />
            </div>

            <h2
              className="mt-5 text-lg font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              Frequently Asked Questions
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--color-body)" }}
            >
              Find answers to common questions about accounts, orders,
              services and payments.
            </p>

            <button
              type="button"
              className="mt-5 text-sm font-semibold transition-colors duration-200 hover:text-[#3F6839]"
              style={{ color: "#4D7A45" }}
            >
              View FAQs →
            </button>
          </div>

          {/* Email */}
          <div
            className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "#EAF2FF",
              borderColor: "#D4E1F5",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#5B7DB1",
              }}
            >
              <RiMailLine size={25} />
            </div>

            <h2
              className="mt-5 text-lg font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              Email Support
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--color-body)" }}
            >
              Have a question or issue? Send us an email and our team will
              help you.
            </p>

            <a
              href="mailto:support@hunarhub.com"
              className="mt-5 inline-block text-sm font-semibold transition-colors duration-200 hover:text-[#4D6895]"
              style={{ color: "#5B7DB1" }}
            >
              support@hunarhub.com
            </a>
          </div>

          {/* Customer Support */}
          <div
            className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "#C6BEEE",
              borderColor: "#B5AADF",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#665A9E",
              }}
            >
              <RiCustomerService2Line size={25} />
            </div>

            <h2
              className="mt-5 text-lg font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              Customer Support
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--color-body)" }}
            >
              Our support team can assist you with orders, services and
              account-related issues.
            </p>

            <p
              className="mt-5 text-sm font-semibold"
              style={{ color: "#665A9E" }}
            >
              Support available during business hours
            </p>
          </div>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <section
          className="mt-8 rounded-3xl border p-6 sm:p-7"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-soft)",
          }}
        >

          <div className="flex items-start gap-4">

            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "var(--color-peach)",
                color: "var(--color-primary)",
              }}
            >
              <RiMessage2Line size={24} />
            </div>

            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--color-heading)" }}
              >
                How can we help?
              </h2>

              <p
                className="mt-1 text-sm leading-6"
                style={{ color: "var(--color-muted)" }}
              >
                Whether you are a customer or entrepreneur, HunarHub is here
                to help you resolve your issues.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {/* Customer Queries */}
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--color-peach)",
                borderColor: "var(--color-peach-light)",
              }}
            >
              <div className="flex items-center gap-3">

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-primary)",
                  }}
                >
                  <RiPhoneLine size={20} />
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Customer Queries
                  </p>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Orders, bookings, payments and account issues.
                  </p>
                </div>

              </div>
            </div>

            {/* Entrepreneur Support */}
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--color-green)",
                borderColor: "var(--color-green-border)",
              }}
            >
              <div className="flex items-center gap-3">

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#4D7A45",
                  }}
                >
                  <RiCustomerService2Line size={20} />
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Entrepreneur Support
                  </p>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Profile, products, services, orders and earnings.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= BACK ================= */}
        <div className="mt-8 text-center">

          <Link
            to="/"
            className="text-sm font-semibold transition-colors duration-200 hover:text-[#EF8354]"
            style={{ color: "#5B7DB1" }}
          >
            ← Back to HunarHub
          </Link>

        </div>

      </main>
    </div>
  );
};

export default HelpSupport;
