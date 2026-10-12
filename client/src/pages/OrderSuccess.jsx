
import React from "react";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">

        {/* ================= SUCCESS CARD ================= */}
        <div
          className="w-full rounded-3xl border bg-white p-8 text-center sm:p-12"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >

          {/* Success Icon */}
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--color-green)" }}
          >
            <CheckCircle
              className="h-12 w-12"
              style={{ color: "var(--color-green-dark)" }}
            />
          </div>

          {/* Heading */}
          <h1
            className="mt-6 text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-heading)" }}
          >
            Order Placed Successfully!
          </h1>

          <p
            className="mx-auto mt-3 max-w-lg text-sm leading-6 sm:text-base"
            style={{ color: "var(--color-muted)" }}
          >
            Thank you for your order. Your order has been received and will
            be processed shortly.
          </p>

          {/* ================= ORDER DETAILS ================= */}
          <div
            className="mx-auto mt-8 max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--color-peach)",
              borderColor: "var(--color-peach-light)",
            }}
          >

            <div
              className="flex items-center justify-between border-b pb-4"
              style={{ borderColor: "rgba(239, 131, 84, 0.18)" }}
            >
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Order ID
              </span>

              <span
                className="font-semibold"
                style={{ color: "var(--color-heading)" }}
              >
                #HH10245
              </span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Total Amount
              </span>

              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-primary-dark)" }}
              >
                ₹4743
              </span>
            </div>

          </div>

          {/* ================= ORDER STATUS ================= */}
          <div
            className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border p-5 text-left"
            style={{
              backgroundColor: "#EAF2FF",
              borderColor: "#D4E1F5",
            }}
          >

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Package
                className="h-6 w-6"
                style={{ color: "#5B7DB1" }}
              />
            </div>

            <div>
              <h2
                className="font-semibold"
                style={{ color: "var(--color-heading)" }}
              >
                Order is being processed
              </h2>

              <p
                className="mt-1 text-sm leading-5"
                style={{ color: "var(--color-muted)" }}
              >
                We'll keep you updated about your order.
              </p>
            </div>

          </div>

          {/* ================= BUTTONS ================= */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#4D7A45",
                boxShadow:
                  "0 7px 20px rgba(77, 122, 69, 0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3F6839";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4D7A45";
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </button>

            {/* View Orders */}
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="rounded-xl border px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#5B7DB1",
                color: "#4D6895",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#EAF2FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
            >
              View My Orders
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
