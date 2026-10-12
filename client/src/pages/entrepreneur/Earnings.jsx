
import React from "react";
import {
  IndianRupee,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

export default function Earnings() {
  const earningsData = {
    total: 28400,
    thisMonth: 8400,
    completedOrders: 18,
    pendingPayments: 2200,
  };

  const recentEarnings = [
    {
      id: 1,
      service: "Custom Stitching",
      customer: "Simran Kaur",
      amount: 800,
      date: "20 Aug 2026",
      status: "Completed",
    },
    {
      id: 2,
      service: "Dress Alteration",
      customer: "Harpreet Singh",
      amount: 400,
      date: "18 Aug 2026",
      status: "Completed",
    },
    {
      id: 3,
      service: "Traditional Kurta Stitching",
      customer: "Manpreet Kaur",
      amount: 1000,
      date: "15 Aug 2026",
      status: "Completed",
    },
    {
      id: 4,
      service: "Embroidery Work",
      customer: "Rajveer Singh",
      amount: 1200,
      date: "12 Aug 2026",
      status: "Pending",
    },
    {
      id: 5,
      service: "Custom Stitching",
      customer: "Gurpreet Kaur",
      amount: 900,
      date: "10 Aug 2026",
      status: "Completed",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--color-peach-light)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#FFFFFF",
              }}
            >
              <Wallet size={24} />
            </div>

            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary-dark)" }}
              >
                Entrepreneur Panel
              </p>

              <h1
                className="mt-1 text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--color-heading)" }}
              >
                Earnings Overview
              </h1>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Track your earnings, completed orders and pending payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Earnings */}
          <div
            className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--color-blue-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-blue-light)",
                  color: "var(--color-blue)",
                }}
              >
                <IndianRupee size={22} />
              </div>

              <div
                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--color-green-soft)",
                  color: "var(--color-success)",
                }}
              >
                <ArrowUpRight size={14} />
                12.5%
              </div>
            </div>

            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Total Earnings
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              ₹{earningsData.total.toLocaleString("en-IN")}
            </p>

            <p
              className="mt-2 text-xs font-medium"
              style={{ color: "var(--color-success)" }}
            >
              From last month
            </p>
          </div>

          {/* This Month */}
          <div
            className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--color-green-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "var(--color-green-soft)",
                color: "var(--color-green-dark)",
              }}
            >
              <TrendingUp size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              This Month
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              ₹{earningsData.thisMonth.toLocaleString("en-IN")}
            </p>

            <p
              className="mt-2 text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              August 2026
            </p>
          </div>

          {/* Completed Orders */}
          <div
            className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "#B5AADF",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#F0EDFF",
                color: "#665A9E",
              }}
            >
              <ShoppingBag size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Completed Orders
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              {earningsData.completedOrders}
            </p>

            <p
              className="mt-2 text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              Successfully completed
            </p>
          </div>

          {/* Pending Payments */}
          <div
            className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--color-yellow-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "var(--color-yellow)",
                color: "var(--color-warning)",
              }}
            >
              <Clock size={22} />
            </div>

            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Pending Payments
            </p>

            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              ₹{earningsData.pendingPayments.toLocaleString("en-IN")}
            </p>

            <p
              className="mt-2 text-xs font-medium"
              style={{ color: "var(--color-warning)" }}
            >
              Awaiting payment
            </p>
          </div>
        </div>

        {/* Monthly Earnings */}
        <section
          className="mt-8 rounded-2xl border bg-white p-6"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--color-peach)",
                    color: "var(--color-primary)",
                  }}
                >
                  <TrendingUp size={20} />
                </div>

                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Monthly Earnings
                </h2>
              </div>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Your earnings progress for August 2026.
              </p>
            </div>

            <p
              className="text-2xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              ₹8,400
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs">
              <span style={{ color: "var(--color-muted)" }}>
                Monthly Target
              </span>

              <span
                className="font-semibold"
                style={{ color: "var(--color-secondary)" }}
              >
                ₹10,000
              </span>
            </div>

            <div
              className="h-3 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-border-light)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "84%",
                  backgroundColor: "var(--color-primary)",
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p
                className="text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                You have achieved 84% of your monthly target.
              </p>

              <span
                className="hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex"
                style={{
                  backgroundColor: "var(--color-peach)",
                  color: "var(--color-primary-dark)",
                }}
              >
                84%
              </span>
            </div>
          </div>
        </section>

        {/* Recent Earnings */}
        <section
          className="mt-8 overflow-hidden rounded-2xl border bg-white"
          style={{
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="border-b p-6"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-green-soft)",
                  color: "var(--color-green-dark)",
                }}
              >
                <IndianRupee size={20} />
              </div>

              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Recent Earnings
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Your latest service earnings and payment status.
                </p>
              </div>
            </div>
          </div>

          <div>
            {recentEarnings.map((earning, index) => (
              <div
                key={earning.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-[#FFFDFC] sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderBottom:
                    index !== recentEarnings.length - 1
                      ? "1px solid var(--color-border-light)"
                      : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        earning.status === "Completed"
                          ? "var(--color-green-soft)"
                          : "var(--color-yellow)",
                      color:
                        earning.status === "Completed"
                          ? "var(--color-green-dark)"
                          : "var(--color-warning)",
                    }}
                  >
                    <IndianRupee size={20} />
                  </div>

                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {earning.service}
                    </h3>

                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {earning.customer}
                    </p>

                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-light-text)" }}
                    >
                      {earning.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="text-right">
                    <p
                      className="text-lg font-bold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      ₹{earning.amount.toLocaleString("en-IN")}
                    </p>

                    <span
                      className="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          earning.status === "Completed"
                            ? "var(--color-green-soft)"
                            : "var(--color-yellow)",
                        color:
                          earning.status === "Completed"
                            ? "var(--color-success)"
                            : "var(--color-warning)",
                      }}
                    >
                      {earning.status === "Completed" && (
                        <CheckCircle size={13} />
                      )}

                      {earning.status === "Pending" && (
                        <Clock size={13} />
                      )}

                      {earning.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Information */}
        <section
          className="mt-8 rounded-2xl border p-5"
          style={{
            backgroundColor: "var(--color-blue-light)",
            borderColor: "var(--color-blue-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                color: "var(--color-blue)",
              }}
            >
              <CheckCircle size={19} />
            </div>

            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--color-blue-dark)" }}
              >
                Earnings Information
              </h3>

              <p
                className="mt-1 text-sm leading-6"
                style={{ color: "var(--color-blue-dark)" }}
              >
                Your earnings overview helps you track completed services,
                pending payments and your monthly income. Actual earnings will
                be calculated automatically once the backend and payment/order
                system are connected.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
