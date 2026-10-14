import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  RefreshCw,
} from "lucide-react";

const API_USERS_URL = import.meta.env.VITE_API_URL;

const API_BASE_URL = API_USERS_URL
  ? API_USERS_URL.replace(/\/api\/users\/?$/, "")
  : "";

const ENDPOINTS = {
  products: "/api/products",
  services: "/api/services",
  orders: "/api/orders/entrepreneur",
  requests: "/api/service-requests/entrepreneur",
};

const getItems = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.items)) return result.data.items;
  if (Array.isArray(result?.data?.products)) return result.data.products;
  if (Array.isArray(result?.data?.services)) return result.data.services;
  if (Array.isArray(result?.data?.orders)) return result.data.orders;
  if (Array.isArray(result?.data?.requests)) return result.data.requests;
  if (Array.isArray(result?.products)) return result.products;
  if (Array.isArray(result?.services)) return result.services;
  if (Array.isArray(result?.orders)) return result.orders;
  if (Array.isArray(result?.requests)) return result.requests;
  return [];
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const getStatus = (item) =>
  item?.status || item?.orderStatus || item?.requestStatus || "Pending";

const getId = (item) =>
  item?._id || item?.id || item?.orderId || item?.requestId || "";

const getErrorMessage = (error) =>
  error instanceof Error ? error.message : "Something went wrong.";

export default function EntrepreneurDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    products: [],
    services: [],
    orders: [],
    requests: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    if (!API_BASE_URL) {
      setError(
        "VITE_API_URL is missing. Set it to your backend /api/users URL in Vercel environment variables."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await Promise.all(
        Object.entries(ENDPOINTS).map(async ([key, endpoint]) => {
          const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          });

          const result = await response.json().catch(() => ({}));

          if (!response.ok) {
            throw new Error(
              result?.message || `Unable to load ${key}.`
            );
          }

          if (result?.success === false) {
            throw new Error(result?.message || `Unable to load ${key}.`);
          }

          return [key, getItems(result)];
        })
      );

      setData(Object.fromEntries(results));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const stats = useMemo(() => {
    const earnings = data.orders
      .filter((order) =>
        ["completed", "delivered"].includes(
          String(getStatus(order)).toLowerCase()
        )
      )
      .reduce(
        (total, order) =>
          total +
          Number(order.totalAmount ?? order.amount ?? order.total ?? 0),
        0
      );

    const pendingRequests = data.requests.filter((request) =>
      ["pending", "requested"].includes(
        String(getStatus(request)).toLowerCase()
      )
    ).length;

    return [
      {
        title: "Total Products",
        value: data.products.length,
        icon: Package,
        description: "Products returned by the API",
        iconBg: "bg-[var(--color-blue-light)]",
        iconColor: "text-[var(--color-blue)]",
      },
      {
        title: "Total Services",
        value: data.services.length,
        icon: BriefcaseBusiness,
        description: "Services returned by the API",
        iconBg: "bg-[var(--color-green-soft)]",
        iconColor: "text-[var(--color-green-dark)]",
      },
      {
        title: "Pending Requests",
        value: pendingRequests,
        icon: ClipboardList,
        description: "Requests awaiting a response",
        iconBg: "bg-[var(--color-yellow)]",
        iconColor: "text-[var(--color-warning)]",
      },
      {
        title: "Total Earnings",
        value: formatMoney(earnings),
        icon: IndianRupee,
        description: "Completed and delivered orders",
        iconBg: "bg-[var(--color-accent-soft)]",
        iconColor: "text-[var(--color-primary)]",
      },
    ];
  }, [data]);

  const quickActions = [
    {
      title: "Add Product",
      description: "List a new product",
      icon: Plus,
      className: "bg-[var(--color-green-soft)] text-[var(--color-green-dark)]",
      hoverClass: "hover:border-[var(--color-green-border)]",
      path: "/entrepreneur/add-product",
    },
    {
      title: "Add Service",
      description: "Offer a new service",
      icon: BriefcaseBusiness,
      className: "bg-[var(--color-blue-light)] text-[var(--color-blue)]",
      hoverClass: "hover:border-[var(--color-blue-border)]",
      path: "/entrepreneur/add-service",
    },
    {
      title: "View Requests",
      description: "Manage service requests",
      icon: ClipboardList,
      className: "bg-[var(--color-yellow)] text-[var(--color-warning)]",
      hoverClass: "hover:border-[var(--color-yellow-border)]",
      path: "/entrepreneur/service-requests",
    },
    {
      title: "Earnings",
      description: "Check your earnings",
      icon: IndianRupee,
      className: "bg-[var(--color-accent-soft)] text-[var(--color-primary)]",
      hoverClass: "hover:border-[var(--color-primary-light)]",
      path: "/entrepreneur/earnings",
    },
  ];

  const recentRequests = data.requests.slice(0, 5);
  const recentOrders = data.orders.slice(0, 5);

  const renderStatus = (status) => {
    const normalized = String(status).toLowerCase();

    if (["accepted", "completed", "delivered"].includes(normalized)) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-green-border)] bg-[var(--color-green-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-green-dark)]">
          <CheckCircle2 size={13} />
          {status}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] px-3 py-1.5 text-xs font-semibold text-[var(--color-warning)]">
        <Clock3 size={13} />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
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

          <button
            type="button"
            onClick={() => navigate("/entrepreneur/add-product")}
            className="hidden items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="font-semibold">Dashboard data could not be loaded.</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={loadDashboard}
              className="mt-3 inline-flex items-center gap-2 font-semibold underline"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {loading && (
          <p className="mb-6 text-sm text-[var(--color-muted)]">
            Loading dashboard data...
          </p>
        )}

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
                  {loading ? "—" : stat.value}
                </h2>

                <p className="mt-1 text-xs text-[var(--color-light-text)]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-8">
          <p className="text-sm font-semibold text-[var(--color-primary)]">
            Manage Your Business
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--color-heading)]">
            Quick Actions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className={`group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${action.hoverClass}`}
                >
                  <div
                    className={`rounded-[var(--radius-md)] p-2.5 transition group-hover:bg-[var(--color-primary)] group-hover:text-white ${action.className}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[var(--color-heading)]">
                      {action.title}
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

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

            <button
              type="button"
              onClick={() => navigate("/entrepreneur/service-requests")}
              className="self-start rounded-[var(--radius-md)] bg-[var(--color-blue-light)] px-3.5 py-2 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:bg-[var(--color-blue-border)]"
            >
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
                {!loading && recentRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-sm text-[var(--color-muted)]"
                    >
                      No service requests found.
                    </td>
                  </tr>
                )}

                {recentRequests.map((request) => (
                  <tr
                    key={getId(request)}
                    className="border-b border-[var(--color-border-light)] transition hover:bg-[var(--color-surface-soft)] last:border-0"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--color-heading)]">
                      {request.requestNumber ||
                        request.reference ||
                        getId(request) ||
                        "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {request.customer?.name ||
                        request.user?.name ||
                        request.customerName ||
                        "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {request.service?.title ||
                        request.service?.name ||
                        request.serviceName ||
                        "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                        <CalendarDays
                          size={15}
                          className="text-[var(--color-blue)]"
                        />
                        {formatDate(
                          request.createdAt || request.date || request.requestDate
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {renderStatus(getStatus(request))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

            <button
              type="button"
              onClick={() => navigate("/entrepreneur/orders")}
              className="self-start rounded-[var(--radius-md)] bg-[var(--color-green-soft)] px-3.5 py-2 text-sm font-semibold text-[var(--color-green-dark)] transition hover:bg-[var(--color-green-border)]"
            >
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
                {!loading && recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-sm text-[var(--color-muted)]"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}

                {recentOrders.map((order) => (
                  <tr
                    key={getId(order)}
                    className="border-b border-[var(--color-border-light)] transition hover:bg-[var(--color-surface-soft)] last:border-0"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--color-heading)]">
                      {order.orderNumber ||
                        order.orderId ||
                        getId(order) ||
                        "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {order.customer?.name ||
                        order.user?.name ||
                        order.customerName ||
                        "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-body)]">
                      {order.items?.[0]?.product?.name ||
                        order.items?.[0]?.name ||
                        order.product?.name ||
                        order.productName ||
                        "—"}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-[var(--color-primary)]">
                      {formatMoney(
                        order.totalAmount ?? order.amount ?? order.total
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {renderStatus(getStatus(order))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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
              <button
                type="button"
                onClick={() => navigate("/entrepreneur/availability")}
                className="mt-3 text-sm font-semibold text-[var(--color-blue-dark)] transition hover:text-[var(--color-blue)]"
              >
                Manage Availability →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}