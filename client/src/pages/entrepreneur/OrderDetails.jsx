
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  Calendar,
  CreditCard,
  MapPin,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Save,
  IndianRupee,
} from "lucide-react";

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialOrder = location.state?.order;

  const [order, setOrder] = useState(initialOrder);
  const [newStatus, setNewStatus] = useState(initialOrder?.status || "");

  useEffect(() => {
    if (initialOrder) {
      setOrder(initialOrder);
      setNewStatus(initialOrder.status);
    }
  }, [initialOrder]);

  // Order nahi mila
  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-peach)] text-[var(--color-primary)]">
            <Package size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[var(--color-heading)]">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            The order details could not be loaded.
          </p>

          <button
            onClick={() => navigate("/entrepreneur/orders")}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // Status update
  const handleStatusUpdate = () => {
    const savedOrders =
      JSON.parse(localStorage.getItem("hunarhubOrders")) || [];

    const updatedOrders = savedOrders.map((item) =>
      item.id === order.id
        ? {
            ...item,
            status: newStatus,
          }
        : item,
    );

    localStorage.setItem(
      "hunarhubOrders",
      JSON.stringify(updatedOrders),
    );

    const updatedOrder = {
      ...order,
      status: newStatus,
    };

    setOrder(updatedOrder);

    alert(`Order status updated to ${newStatus}`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[var(--color-yellow)] text-[var(--color-warning)] border border-[var(--color-yellow-border)]";

      case "Confirmed":
        return "bg-[var(--color-blue-light)] text-[var(--color-blue-dark)] border border-[var(--color-blue-border)]";

      case "Shipped":
        return "bg-[#F1EEFF] text-[#665A9E] border border-[#D9D2F4]";

      case "Delivered":
        return "bg-[var(--color-green-soft)] text-[var(--color-green-dark)] border border-[var(--color-green-border)]";

      case "Cancelled":
        return "bg-[var(--color-red)] text-[var(--color-error)] border border-[var(--color-red-border)]";

      default:
        return "bg-[var(--color-surface-soft)] text-[var(--color-muted)] border border-[var(--color-border)]";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={17} />;

      case "Confirmed":
        return <CheckCircle size={17} />;

      case "Shipped":
        return <Truck size={17} />;

      case "Delivered":
        return <CheckCircle size={17} />;

      case "Cancelled":
        return <XCircle size={17} />;

      default:
        return <Package size={17} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-peach-light)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/entrepreneur/orders")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-body)] transition hover:text-[var(--color-primary-dark)]"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Entrepreneur Panel
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                Order Details
              </h1>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Order #{order.id}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                order.status,
              )}`}
            >
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product Information */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] pb-4">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-3 text-[var(--color-blue-dark)]">
                  <Package size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[var(--color-heading)]">
                    Product Information
                  </h2>

                  <p className="text-sm text-[var(--color-muted)]">
                    Details of the ordered product
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Product
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-heading)]">
                    {order.product}
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Order ID
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-heading)]">
                    {order.id}
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-peach)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">
                    Amount
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xl font-bold text-[var(--color-primary-dark)]">
                    <IndianRupee size={18} />
                    {Number(order.amount).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-blue-dark)]">
                    Order Date
                  </p>

                  <div className="mt-1 flex items-center gap-2 font-semibold text-[var(--color-heading)]">
                    <Calendar
                      size={16}
                      className="text-[var(--color-blue-dark)]"
                    />
                    {order.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] pb-4">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-green-soft)] p-3 text-[var(--color-green-dark)]">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[var(--color-heading)]">
                    Customer Information
                  </h2>

                  <p className="text-sm text-[var(--color-muted)]">
                    Customer details for this order
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Customer Name
                  </p>

                  <p className="mt-1 font-semibold text-[var(--color-heading)]">
                    {order.customer}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-light-text)]">
                    Payment
                  </p>

                  <div className="mt-1 flex items-center gap-2 font-semibold text-[var(--color-heading)]">
                    <CreditCard
                      size={16}
                      className="text-[var(--color-green-dark)]"
                    />
                    Online Payment
                  </div>
                </div>

                <div className="rounded-[var(--radius-md)] bg-[var(--color-green-soft)] p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-green-dark)]">
                    Delivery Address
                  </p>

                  <div className="mt-1 flex items-start gap-2 font-semibold text-[var(--color-heading)]">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-[var(--color-green-dark)]"
                    />

                    <span>Sector 17, Chandigarh, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Progress */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <div>
                <h2 className="font-bold text-[var(--color-heading)]">
                  Order Progress
                </h2>

                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Track the order journey from placement to delivery.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                {/* Placed */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[var(--color-yellow)] p-2.5 text-[var(--color-warning)]">
                    <Clock size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-[var(--color-heading)]">
                      Order Placed
                    </p>

                    <p className="text-sm text-[var(--color-muted)]">
                      Customer placed the order.
                    </p>
                  </div>
                </div>

                {/* Confirmed */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[var(--color-blue-light)] p-2.5 text-[var(--color-blue-dark)]">
                    <CheckCircle size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-[var(--color-heading)]">
                      Order Confirmed
                    </p>

                    <p className="text-sm text-[var(--color-muted)]">
                      Order has been confirmed by the entrepreneur.
                    </p>
                  </div>
                </div>

                {/* Shipped */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#F1EEFF] p-2.5 text-[#665A9E]">
                    <Truck size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-[var(--color-heading)]">
                      Shipped
                    </p>

                    <p className="text-sm text-[var(--color-muted)]">
                      Product has been shipped to the customer.
                    </p>
                  </div>
                </div>

                {/* Delivered */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[var(--color-green-soft)] p-2.5 text-[var(--color-green-dark)]">
                    <CheckCircle size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-[var(--color-heading)]">
                      Delivered
                    </p>

                    <p className="text-sm text-[var(--color-muted)]">
                      Product delivered successfully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-peach)] p-3 text-[var(--color-primary-dark)]">
                  <IndianRupee size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-[var(--color-heading)]">
                    Order Summary
                  </h2>

                  <p className="text-sm text-[var(--color-muted)]">
                    Payment breakdown
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted)]">
                    Product
                  </span>

                  <span className="font-semibold text-[var(--color-heading)]">
                    ₹{Number(order.amount).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted)]">
                    Delivery
                  </span>

                  <span className="font-semibold text-[var(--color-heading)]">
                    ₹50
                  </span>
                </div>

                <div className="border-t border-[var(--color-border-light)] pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[var(--color-heading)]">
                      Total
                    </span>

                    <span className="text-lg font-bold text-[var(--color-primary-dark)]">
                      ₹
                      {(Number(order.amount) + 50).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* UPDATE STATUS */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-blue-light)] p-3 text-[var(--color-blue-dark)]">
                  <Truck size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[var(--color-heading)]">
                    Update Order Status
                  </h2>

                  <p className="text-sm text-[var(--color-muted)]">
                    Change the current order status.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-[var(--color-body)]">
                  Order Status
                </label>

                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

                <button
                  onClick={handleStatusUpdate}
                  disabled={newStatus === order.status}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 py-3 text-sm font-semibold text-white transition ${
                    newStatus === order.status
                      ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-light-text)]"
                      : "bg-[var(--color-green-dark)] hover:opacity-90"
                  }`}
                >
                  <Save size={17} />
                  Update Status
                </button>
              </div>
            </div>

            {/* Current Status */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-medium text-[var(--color-muted)]">
                Current Status
              </p>

              <div
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                  order.status,
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </div>
            </div>

            {/* Back */}
            <button
              onClick={() => navigate("/entrepreneur/orders")}
              className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-body)] shadow-[var(--shadow-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
