
import React, { useEffect, useState } from "react";
import {
  Package,
  Search,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ShoppingBag,
  CalendarDays,
  User,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const navigate = useNavigate();

  const defaultOrders = [
    {
      id: "HH-1001",
      customer: "Simran Kaur",
      product: "Handmade Craft",
      amount: 1200,
      date: "20 Aug 2026",
      status: "Pending",
    },
    {
      id: "HH-1002",
      customer: "Rahul Sharma",
      product: "Handmade Pottery",
      amount: 850,
      date: "19 Aug 2026",
      status: "Confirmed",
    },
    {
      id: "HH-1003",
      customer: "Neha Verma",
      product: "Traditional Product",
      amount: 1500,
      date: "18 Aug 2026",
      status: "Shipped",
    },
    {
      id: "HH-1004",
      customer: "Aman Singh",
      product: "Handmade Decor",
      amount: 1100,
      date: "17 Aug 2026",
      status: "Delivered",
    },
    {
      id: "HH-1005",
      customer: "Priya Sharma",
      product: "Handmade Craft",
      amount: 1200,
      date: "16 Aug 2026",
      status: "Cancelled",
    },
  ];

  // ================= ORDERS =================

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("hunarhubOrders");

    if (savedOrders) {
      return JSON.parse(savedOrders);
    }

    return defaultOrders;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ================= SAVE ORDERS =================

  useEffect(() => {
    localStorage.setItem("hunarhubOrders", JSON.stringify(orders));
  }, [orders]);

  // ================= UPDATE STATUS =================

  const updateStatus = (id, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );
  };

  // ================= SEARCH + FILTER =================

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.product.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ================= SUMMARY =================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          wrapper:
            "border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] text-[#A96F14]",
          icon: "text-[#C58A25]",
        };

      case "Confirmed":
        return {
          wrapper:
            "border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]",
          icon: "text-[var(--color-blue)]",
        };

      case "Shipped":
        return {
          wrapper:
            "border border-[#D8CEF0] bg-[#F1EEFA] text-[#665A9E]",
          icon: "text-[#7668AE]",
        };

      case "Delivered":
        return {
          wrapper:
            "border border-[var(--color-green-border)] bg-[var(--color-green-soft)] text-[var(--color-green-dark)]",
          icon: "text-[var(--color-success)]",
        };

      case "Cancelled":
        return {
          wrapper:
            "border border-[var(--color-red-border)] bg-[var(--color-red)] text-[#C85A5A]",
          icon: "text-[var(--color-error)]",
        };

      default:
        return {
          wrapper:
            "border border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-muted)]",
          icon: "text-[var(--color-muted)]",
        };
    }
  };

  // ================= STATUS ICON =================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={15} />;

      case "Confirmed":
        return <CheckCircle size={15} />;

      case "Shipped":
        return <Truck size={15} />;

      case "Delivered":
        return <CheckCircle size={15} />;

      case "Cancelled":
        return <XCircle size={15} />;

      default:
        return <Package size={15} />;
    }
  };

  // ================= VIEW ORDER =================

  const handleViewOrder = (order) => {
    navigate(`/entrepreneur/orders/${order.id}`, {
      state: {
        order,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ================= HEADER ================= */}

      <div className="border-b border-[var(--color-border-light)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
              <ShoppingBag size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-[var(--color-body)]">
                Manage customer orders and track their status.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ================= SUMMARY ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Orders */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-blue)] shadow-[var(--shadow-soft)]">
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-blue-dark)]">
                  Total Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Pending Orders */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[#C58A25] shadow-[var(--shadow-soft)]">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#A96F14]">
                  Pending Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {pendingOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Completed Orders */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-green-border)] bg-[var(--color-green-soft)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-success)] shadow-[var(--shadow-soft)]">
                <CheckCircle size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-green-dark)]">
                  Completed Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {completedOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Cancelled Orders */}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-red-border)] bg-[var(--color-red)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-error)] shadow-[var(--shadow-soft)]">
                <XCircle size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#C85A5A]">
                  Cancelled Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                  {cancelledOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order, customer or product..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-light-text)] focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />
            </div>

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* ================= RESULT INFO ================= */}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-heading)]">
              Customer Orders
            </h2>

            <p className="mt-0.5 text-sm text-[var(--color-muted)]">
              Showing {filteredOrders.length} of {totalOrders} orders
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] sm:flex">
            <Package size={14} />
            {filteredOrders.length} Results
          </div>
        </div>

        {/* ================= ORDERS TABLE ================= */}

        <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-soft)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Update
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--color-border-light)]">
                {filteredOrders.map((order) => {
                  const statusStyle = getStatusStyle(order.status);

                  return (
                    <tr
                      key={order.id}
                      className="transition hover:bg-[var(--color-surface-soft)]"
                    >
                      {/* Order ID */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-peach)] text-[var(--color-primary)]">
                            <Package size={17} />
                          </div>

                          <span className="text-sm font-bold text-[var(--color-heading)]">
                            {order.id}
                          </span>
                        </div>
                      </td>

                      {/* Customer */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-blue-light)] text-[var(--color-blue)]">
                            <User size={15} />
                          </div>

                          <span className="text-sm font-medium text-[var(--color-body)]">
                            {order.customer}
                          </span>
                        </div>
                      </td>

                      {/* Product */}

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[var(--color-body)]">
                          {order.product}
                        </span>
                      </td>

                      {/* Amount */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary-dark)]">
                          <IndianRupee size={14} />
                          {Number(order.amount).toLocaleString("en-IN")}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                          <CalendarDays
                            size={15}
                            className="text-[var(--color-blue)]"
                          />
                          {order.date}
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
                        >
                          <span className={statusStyle.icon}>
                            {getStatusIcon(order.status)}
                          </span>

                          {order.status}
                        </span>
                      </td>

                      {/* Update Status */}

                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value)
                          }
                          className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-2.5 py-2 text-xs font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* View */}

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] px-3 py-2 text-xs font-bold text-[var(--color-blue-dark)] transition hover:bg-[#DCE9FC]"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ================= NO ORDERS ================= */}

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
                <Package size={30} />
              </div>

              <p className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                No orders found
              </p>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>

        {/* ================= NOTE ================= */}

        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--color-blue)]">
              <Package size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--color-blue-dark)]">
                Order Management
              </p>

              <p className="mt-1 text-sm leading-6 text-[#4D6895]">
                You can search orders, filter them by status, update order
                status and view complete order details.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
