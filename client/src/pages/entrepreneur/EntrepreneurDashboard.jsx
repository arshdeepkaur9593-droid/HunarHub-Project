
import React from "react";
import {
  Package,
  BriefcaseBusiness,
  ClipboardList,
  IndianRupee,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  CalendarDays,
  Store,
} from "lucide-react";

export default function EntrepreneurDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "12",
      icon: Package,
      description: "Active products",
      iconBg: "bg-[var(--color-blue-light)]",
      iconColor: "text-[var(--color-blue)]",
    },
    {
      title: "Total Services",
      value: "6",
      icon: BriefcaseBusiness,
      description: "Services offered",
      iconBg: "bg-[var(--color-green-soft)]",
      iconColor: "text-[var(--color-green-dark)]",
    },
    {
      title: "Pending Requests",
      value: "8",
      icon: ClipboardList,
      description: "Need your response",
      iconBg: "bg-[var(--color-yellow)]",
      iconColor: "text-[var(--color-warning)]",
    },
    {
      title: "Total Earnings",
      value: "₹24,500",
      icon: IndianRupee,
      description: "This month",
      iconBg: "bg-[var(--color-accent-soft)]",
      iconColor: "text-[var(--color-primary)]",
    },
  ];

  const serviceRequests = [
    {
      id: "#SR-1001",
      customer: "Aman Sharma",
      service: "Custom Stitching",
      date: "20 Aug 2026",
      status: "Pending",
    },
    {
      id: "#SR-1002",
      customer: "Simran Kaur",
      service: "Dress Alteration",
      date: "21 Aug 2026",
      status: "Pending",
    },
    {
      id: "#SR-1003",
      customer: "Rahul Kumar",
      service: "Traditional Kurta",
      date: "22 Aug 2026",
      status: "Accepted",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2041",
      customer: "Neha Singh",
      product: "Handmade Phulkari",
      amount: "₹1,200",
      status: "Completed",
    },
    {
      id: "#ORD-2042",
      customer: "Harpreet Singh",
      product: "Handmade Pottery Set",
      amount: "₹850",
      status: "Processing",
    },
    {
      id: "#ORD-2043",
      customer: "Riya Sharma",
      product: "Embroidered Dupatta",
      amount: "₹1,500",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-sm">
                <Store size={19} />
              </div>

              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              Welcome back, Entrepreneur
            </h1>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Manage your products, services, orders and requests.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ================= STATS ================= */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-[var(--color-light-text)]"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {stat.value}
                </h2>

                <p className="mt-1 text-xs text-[var(--color-light-text)]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                Manage Your Business
              </p>

              <h2 className="mt-1 text-xl font-bold text-[var(--color-heading)]">
                Quick Actions
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Add Product */}
            <button className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-green-border)] hover:shadow-[var(--shadow-card)]">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-green-soft)] p-2.5 text-[var(--color-green-dark)] transition group-hover:bg-[var(--color-green-dark)] group-hover:text-white">
                <Plus size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--color-heading)]">
                  Add Product
                </p>

                <p className="text-xs text-[var(--color-muted)]">
                  List a new product
                </p>
              </div>
            </button>

            {/* Add Service */}
            <button className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-blue-border)] hover:shadow-[var(--shadow-card)]">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-2.5 text-[var(--color-blue)] transition group-hover:bg-[var(--color-blue)] group-hover:text-white">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--color-heading)]">
                  Add Service
                </p>

                <p className="text-xs text-[var(--color-muted)]">
                  Offer a new service
                </p>
              </div>
            </button>

            {/* View Requests */}
            <button className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-yellow-border)] hover:shadow-[var(--shadow-card)]">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-yellow)] p-2.5 text-[var(--color-warning)] transition group-hover:bg-[var(--color-warning)] group-hover:text-white">
                <ClipboardList size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--color-heading)]">
                  View Requests
                </p>

                <p className="text-xs text-[var(--color-muted)]">
                  Manage service requests
                </p>
              </div>
            </button>

            {/* Earnings */}
            <button className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary-light)] hover:shadow-[var(--shadow-card)]">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] p-2.5 text-[var(--color-primary)] transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <IndianRupee size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--color-heading)]">
                  Earnings
                </p>

                <p className="text-xs text-[var(--color-muted)]">
                  Check your earnings
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* ================= SERVICE REQUESTS ================= */}
        <section className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 border-b border-[var(--color-border-light)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-yellow)] text-[var(--color-warning)]">
                  <ClipboardList size={18} />
                </div>

                <h2 className="font-bold text-[var(--color-heading)]">
                  Recent Service Requests
                </h2>
              </div>

              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Manage your latest customer requests.
              </p>
            </div>

            <button className="self-start rounded-[var(--radius-md)] bg-[var(--color-blue-light)] px-3.5 py-2 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:bg-[var(--color-blue-border)]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--color-border-light)] bg-[var(--color-surface-soft)] text-left text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  <th className="px-5 py-3.5">Request</th>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Service</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>

              <tbody>
                {serviceRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-[var(--color-border-light)] transition hover:bg-[var(--color-surface-soft)] last:border-0"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--color-heading)]">
                      {request.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {request.customer}
                    </td>

                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {request.service}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                        <CalendarDays
                          size={15}
                          className="text-[var(--color-blue)]"
                        />
                        {request.date}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {request.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] px-3 py-1.5 text-xs font-semibold text-[var(--color-warning)]">
                          <Clock3 size={13} />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-green-dark)]">
                          <CheckCircle2 size={13} />
                          Accepted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= RECENT ORDERS ================= */}
        <section className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 border-b border-[var(--color-border-light)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
                  <Package size={18} />
                </div>

                <h2 className="font-bold text-[var(--color-heading)]">
                  Recent Orders
                </h2>
              </div>

              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Track your latest product orders.
              </p>
            </div>

            <button className="self-start rounded-[var(--radius-md)] bg-[var(--color-green-soft)] px-3.5 py-2 text-sm font-semibold text-[var(--color-green-dark)] transition hover:bg-[var(--color-green-border)]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--color-border-light)] bg-[var(--color-surface-soft)] text-left text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  <th className="px-5 py-3.5">Order</th>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[var(--color-border-light)] transition hover:bg-[var(--color-surface-soft)] last:border-0"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--color-heading)]">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {order.customer}
                    </td>

                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {order.product}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-[var(--color-primary)]">
                      {order.amount}
                    </td>

                    <td className="px-5 py-4">
                      {order.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-green-dark)]">
                          <CheckCircle2 size={13} />
                          Completed
                        </span>
                      ) : order.status === "Processing" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] px-3 py-1.5 text-xs font-semibold text-[var(--color-blue-dark)]">
                          <Clock3 size={13} />
                          Processing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] px-3 py-1.5 text-xs font-semibold text-[var(--color-warning)]">
                          <Clock3 size={13} />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= AVAILABILITY NOTICE ================= */}
        <section className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue)] shadow-sm">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-heading)]">
                Keep your availability updated
              </h3>

              <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
                Customers can see your availability before placing a service
                request.
              </p>

              <button className="mt-3 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:text-[var(--color-blue)]">
                Manage Availability →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
