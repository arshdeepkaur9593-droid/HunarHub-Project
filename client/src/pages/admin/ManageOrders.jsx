
import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Package,
  Clock,
  CheckCircle,
  IndianRupee,
  User,
  MapPin,
  X,
  Download,
} from "lucide-react";

export default function ManageOrders() {
  const defaultOrders = [
    {
      id: "HH1024",
      customer: "Gurpreet Kaur",
      product: "Handmade Pottery Set",
      entrepreneur: "Harpreet Singh",
      amount: 1200,
      date: "20 Aug 2026",
      status: "Completed",
      location: "Mohali",
    },
    {
      id: "HH1023",
      customer: "Aman Singh",
      product: "Traditional Kurta",
      entrepreneur: "Simran Kaur",
      amount: 1800,
      date: "19 Aug 2026",
      status: "Processing",
      location: "Chandigarh",
    },
    {
      id: "HH1022",
      customer: "Simran Kaur",
      product: "Handmade Dupatta",
      entrepreneur: "Manpreet Kaur",
      amount: 950,
      date: "18 Aug 2026",
      status: "Completed",
      location: "Panchkula",
    },
    {
      id: "HH1021",
      customer: "Navjot Singh",
      product: "Leather Shoes",
      entrepreneur: "Rajveer Singh",
      amount: 2200,
      date: "17 Aug 2026",
      status: "Pending",
      location: "Chandigarh",
    },
    {
      id: "HH1020",
      customer: "Riya Sharma",
      product: "Custom Stitching",
      entrepreneur: "Simran Kaur",
      amount: 800,
      date: "16 Aug 2026",
      status: "Cancelled",
      location: "Mohali",
    },
  ];

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("hunarhubAdminOrders");

    return savedOrders ? JSON.parse(savedOrders) : defaultOrders;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ================= SAVE ORDERS =================

  useEffect(() => {
    localStorage.setItem(
      "hunarhubAdminOrders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // ================= UPDATE STATUS =================

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  // ================= DELETE ORDER =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== id)
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder(null);
    }
  };

  // ================= SEARCH + FILTER =================

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.product.toLowerCase().includes(searchText) ||
      order.entrepreneur.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ================= STATISTICS =================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) => total + Number(order.amount),
      0
    );

  // ================= EXPORT CSV =================

  const exportCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No orders available to export.");
      return;
    }

    const headers = [
      "Order ID",
      "Customer",
      "Product",
      "Entrepreneur",
      "Amount",
      "Order Date",
      "Status",
      "Location",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.product,
      order.entrepreneur,
      order.amount,
      order.date,
      order.status,
      order.location,
    ]);

    const csvRows = [headers, ...rows];

    const csvContent = csvRows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.download = `hunarhub-orders-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ================= HEADER ================= */}

      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Admin Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)]">
                Manage Orders
              </h1>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Monitor and manage all marketplace orders.
              </p>
            </div>

            {/* EXPORT */}

            <button
              onClick={exportCSV}
              className="flex w-fit items-center justify-center gap-2 rounded-xl border border-[var(--color-green-border)] bg-[var(--color-green)] px-4 py-2.5 text-sm font-semibold text-[var(--color-green-dark)] transition hover:bg-[#E3F5DC]"
            >
              <Download size={18} />
              Export CSV
            </button>

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= SUMMARY ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/70 p-3 text-[var(--color-blue)]">
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-blue)]">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-[var(--color-heading)]">
                  {totalOrders}
                </p>
              </div>

            </div>
          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-[var(--color-yellow-border)] bg-[var(--color-yellow)] p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/70 p-3 text-[var(--color-warning)]">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-warning)]">
                  Pending
                </p>

                <p className="text-2xl font-bold text-[var(--color-heading)]">
                  {pendingOrders}
                </p>
              </div>

            </div>
          </div>

          {/* PROCESSING */}

          <div className="rounded-2xl border border-[var(--color-blue-border)] bg-[var(--color-blue-light)] p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/70 p-3 text-[var(--color-blue)]">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-blue)]">
                  Processing
                </p>

                <p className="text-2xl font-bold text-[var(--color-heading)]">
                  {processingOrders}
                </p>
              </div>

            </div>
          </div>

          {/* COMPLETED */}

          <div className="rounded-2xl border border-[var(--color-green-border)] bg-[var(--color-green)] p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/70 p-3 text-[var(--color-success)]">
                <CheckCircle size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-green-dark)]">
                  Completed
                </p>

                <p className="text-2xl font-bold text-[var(--color-heading)]">
                  {completedOrders}
                </p>
              </div>

            </div>
          </div>

          {/* REVENUE */}

          <div className="rounded-2xl border border-[#D8CEF5] bg-[#F2EEFF] p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/70 p-3 text-[#665A9E]">
                <IndianRupee size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#665A9E]">
                  Revenue
                </p>

                <p className="text-xl font-bold text-[var(--color-heading)]">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-soft)] sm:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-light-text)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order, customer, product..."
              className="hunar-input w-full pl-10"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

        </div>

        {/* ================= ORDERS ================= */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">

          <div className="border-b border-[var(--color-border-light)] p-6">

            <h2 className="text-lg font-bold text-[var(--color-heading)]">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Review and manage marketplace orders.
            </p>

          </div>

          <div className="divide-y divide-[var(--color-border-light)]">

            {filteredOrders.map((order) => (

              <div
                key={order.id}
                className="p-5 transition hover:bg-[var(--color-surface-soft)]"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* ORDER INFO */}

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary-dark)]">
                      <Package size={22} />
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-bold text-[var(--color-heading)]">
                          #{order.id}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.status === "Completed"
                              ? "bg-[var(--color-green)] text-[var(--color-green-dark)]"
                              : order.status === "Processing"
                                ? "bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]"
                                : order.status === "Pending"
                                  ? "bg-[var(--color-yellow)] text-[var(--color-warning)]"
                                  : "bg-[var(--color-red)] text-[var(--color-error)]"
                          }`}
                        >
                          {order.status}
                        </span>

                      </div>

                      <p className="mt-1 font-semibold text-[var(--color-body)]">
                        {order.product}
                      </p>

                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        Customer: {order.customer}
                      </p>

                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        Entrepreneur: {order.entrepreneur}
                      </p>

                    </div>
                  </div>

                  {/* AMOUNT + DATE */}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">

                    <div>
                      <p className="text-xs text-[var(--color-light-text)]">
                        Order Date
                      </p>

                      <p className="text-sm font-semibold text-[var(--color-body)]">
                        {order.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-light-text)]">
                        Amount
                      </p>

                      <p className="font-bold text-[var(--color-primary-dark)]">
                        ₹{Number(order.amount).toLocaleString("en-IN")}
                      </p>
                    </div>

                  </div>

                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border-light)] pt-5">

                  {/* VIEW */}

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-body)] transition hover:border-[var(--color-blue)] hover:bg-[var(--color-blue-light)] hover:text-[var(--color-blue)]"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {/* STATUS */}

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-semibold text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>

                  {/* DELETE */}

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-red-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-error)] transition hover:bg-[var(--color-red)]"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ================= EMPTY ================= */}

          {filteredOrders.length === 0 && (

            <div className="p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
                <Package size={30} />
              </div>

              <p className="mt-4 text-lg font-semibold text-[var(--color-heading)]">
                No orders found
              </p>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Try changing your search or status filter.
              </p>

            </div>

          )}

        </section>

      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedOrder && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-dark)]">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[var(--color-border-light)] p-5">

              <div>

                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-[var(--color-heading)]">
                  #{selectedOrder.id}
                </h2>

              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl p-2 text-[var(--color-muted)] transition hover:bg-[var(--color-peach)] hover:text-[var(--color-primary-dark)]"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="space-y-5 p-5">

              {/* PRODUCT */}

              <div className="flex items-center gap-4 rounded-2xl bg-[var(--color-peach)] p-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[var(--color-primary)]">
                  <Package size={22} />
                </div>

                <div>

                  <p className="text-xs text-[var(--color-primary-dark)]">
                    Product
                  </p>

                  <p className="font-semibold text-[var(--color-heading)]">
                    {selectedOrder.product}
                  </p>

                </div>

              </div>

              {/* DETAILS */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="flex gap-3">

                  <User
                    size={19}
                    className="mt-0.5 text-[var(--color-blue)]"
                  />

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Customer
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-body)]">
                      {selectedOrder.customer}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <User
                    size={19}
                    className="mt-0.5 text-[var(--color-green-dark)]"
                  />

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Entrepreneur
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-body)]">
                      {selectedOrder.entrepreneur}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <MapPin
                    size={19}
                    className="mt-0.5 text-[var(--color-primary)]"
                  />

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-body)]">
                      {selectedOrder.location}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <IndianRupee
                    size={19}
                    className="mt-0.5 text-[var(--color-primary-dark)]"
                  />

                  <div>
                    <p className="text-xs text-[var(--color-light-text)]">
                      Amount
                    </p>

                    <p className="text-sm font-semibold text-[var(--color-body)]">
                      ₹
                      {Number(
                        selectedOrder.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

              </div>

              {/* STATUS */}

              <div>

                <p className="mb-2 text-xs font-semibold text-[var(--color-light-text)]">
                  Order Status
                </p>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedOrder.id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-body)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end border-t border-[var(--color-border-light)] p-5">

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-[var(--color-heading)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
