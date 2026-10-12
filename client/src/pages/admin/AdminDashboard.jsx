import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BriefcaseBusiness,
  ShoppingBag,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = {
    entrepreneurs: 128,
    activeUsers: 846,
    orders: 324,
    revenue: 184500,
    pendingRequests: 18,
    complaints: 5,
  };

  const recentEntrepreneurs = [
    {
      id: 1,
      name: "Simran Kaur",
      skill: "Tailor",
      location: "Chandigarh",
      status: "Pending",
    },
    {
      id: 2,
      name: "Harpreet Singh",
      skill: "Potter",
      location: "Mohali",
      status: "Approved",
    },
    {
      id: 3,
      name: "Manpreet Kaur",
      skill: "Handmade Crafts",
      location: "Panchkula",
      status: "Pending",
    },
    {
      id: 4,
      name: "Rajveer Singh",
      skill: "Cobbler",
      location: "Chandigarh",
      status: "Approved",
    },
  ];

  const recentOrders = [
    {
      id: "#HH1024",
      customer: "Gurpreet Kaur",
      product: "Handmade Pottery Set",
      amount: 1200,
      status: "Completed",
    },
    {
      id: "#HH1023",
      customer: "Aman Singh",
      product: "Traditional Kurta",
      amount: 1800,
      status: "Processing",
    },
    {
      id: "#HH1022",
      customer: "Simran Kaur",
      product: "Handmade Dupatta",
      amount: 950,
      status: "Completed",
    },
    {
      id: "#HH1021",
      customer: "Navjot Singh",
      product: "Leather Shoes",
      amount: 2200,
      status: "Pending",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="border-b bg-white"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <span
            className="inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-peach)",
              color: "var(--color-primary-dark)",
            }}
          >
            Admin Panel
          </span>

          <h1
            className="mt-3 text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-heading)" }}
          >
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
            Monitor entrepreneurs, users, orders and platform activity.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: "#EAF2FF", color: "#5B7DB1" }}
              >
                <Users size={22} />
              </div>
              <ArrowUpRight
                size={20}
                style={{ color: "var(--color-success)" }}
              />
            </div>

            <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
              Entrepreneurs
            </p>
            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              {stats.entrepreneurs}
            </p>
            <p
              className="mt-2 text-xs font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              +8.4% this month
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-green-dark)",
              }}
            >
              <Users size={22} />
            </div>

            <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
              Active Users
            </p>
            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              {stats.activeUsers}
            </p>
            <p className="mt-2 text-xs" style={{ color: "var(--color-muted)" }}>
              Registered customers
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{ backgroundColor: "#C6BEEE", color: "#665A9E" }}
            >
              <ShoppingBag size={22} />
            </div>

            <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
              Total Orders
            </p>
            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              {stats.orders}
            </p>
            <p className="mt-2 text-xs" style={{ color: "var(--color-muted)" }}>
              All platform orders
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="w-fit rounded-xl p-3"
              style={{
                backgroundColor: "var(--color-peach)",
                color: "var(--color-primary)",
              }}
            >
              <IndianRupee size={22} />
            </div>

            <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
              Platform Revenue
            </p>
            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              ₹{stats.revenue.toLocaleString("en-IN")}
            </p>
            <p
              className="mt-2 text-xs font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              +12.5% from last month
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FFF4D8", borderColor: "#F1DFAD" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: "#FFE9B5", color: "#C58A25" }}
              >
                <Clock size={23} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#8F681D" }}
                >
                  Pending Service Requests
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: "#725016" }}
                >
                  {stats.pendingRequests}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6" style={{ color: "#8F681D" }}>
              Service requests are waiting for entrepreneur action.
            </p>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FDEAEA", borderColor: "#F2CCCC" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: "#F9D8D8", color: "#C85A5A" }}
              >
                <AlertCircle size={23} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#A94444" }}
                >
                  Open Complaints
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: "#873838" }}
                >
                  {stats.complaints}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6" style={{ color: "#A94444" }}>
              Customer complaints require admin attention.
            </p>
          </div>
        </div>

        <section
          className="mt-8 overflow-hidden rounded-2xl border bg-white"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-heading)" }}
              >
                Recent Entrepreneurs
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Recently registered entrepreneurs on HunarHub.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/entrepreneurs")}
              className="w-fit text-sm font-semibold transition-colors"
              style={{ color: "#5B7DB1" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#5B7DB1";
              }}
            >
              View All
            </button>
          </div>

          <div>
            {recentEntrepreneurs.map((entrepreneur, index) => (
              <div
                key={entrepreneur.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderBottom:
                    index !== recentEntrepreneurs.length - 1
                      ? "1px solid var(--color-border-light)"
                      : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#EAF2FF", color: "#5B7DB1" }}
                  >
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {entrepreneur.name}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {entrepreneur.skill} • {entrepreneur.location}
                    </p>
                  </div>
                </div>

                <span
                  className="w-fit rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor:
                      entrepreneur.status === "Approved"
                        ? "var(--color-green)"
                        : "#FFF4D8",
                    color:
                      entrepreneur.status === "Approved"
                        ? "var(--color-green-dark)"
                        : "#9A6D1D",
                  }}
                >
                  {entrepreneur.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-8 overflow-hidden rounded-2xl border bg-white"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-heading)" }}
              >
                Recent Orders
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Latest orders placed on the marketplace.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              className="w-fit text-sm font-semibold transition-colors"
              style={{ color: "#5B7DB1" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#5B7DB1";
              }}
            >
              View All
            </button>
          </div>

          <div>
            {recentOrders.map((order, index) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderBottom:
                    index !== recentOrders.length - 1
                      ? "1px solid var(--color-border-light)"
                      : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#C6BEEE", color: "#665A9E" }}
                  >
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {order.product}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {order.customer} • {order.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <p
                    className="font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    ₹{order.amount.toLocaleString("en-IN")}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        order.status === "Completed"
                          ? "var(--color-green)"
                          : order.status === "Processing"
                            ? "#EAF2FF"
                            : "#FFF4D8",
                      color:
                        order.status === "Completed"
                          ? "var(--color-green-dark)"
                          : order.status === "Processing"
                            ? "#5B7DB1"
                            : "#9A6D1D",
                    }}
                  >
                    {order.status === "Completed" && <CheckCircle size={13} />}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-8 rounded-2xl border p-6"
          style={{ backgroundColor: "#EAF2FF", borderColor: "#D4E1F5" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="rounded-xl p-3"
              style={{ backgroundColor: "#D9E7FA", color: "#5B7DB1" }}
            >
              <TrendingUp size={23} />
            </div>
            <div>
              <h3 className="font-bold" style={{ color: "#405E88" }}>
                Platform Overview
              </h3>
              <p
                className="mt-1 text-sm leading-6"
                style={{ color: "#4F6687" }}
              >
                HunarHub helps local micro-entrepreneurs connect with customers,
                showcase their skills, sell handmade products and manage service
                requests from one platform.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
