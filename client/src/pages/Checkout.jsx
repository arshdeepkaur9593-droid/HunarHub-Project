
import React, { useState } from "react";
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="mb-4 flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-[#EF8354]"
            style={{ color: "#5B7DB1" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </button>

          <p
            className="text-xs font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--color-primary)" }}
          >
            Secure Checkout
          </p>

          <h1
            className="mt-2 text-3xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Checkout
          </h1>

          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            Complete your order details
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-6 lg:col-span-2">

            {/* ================= DELIVERY ADDRESS ================= */}
            <div
              className="rounded-3xl border bg-white p-6 sm:p-8"
              style={{
                borderColor: "var(--color-border-light)",
                boxShadow: "var(--shadow-soft)",
              }}
            >

              <div className="mb-6 flex items-center gap-3">

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--color-peach)" }}
                >
                  <MapPin
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>

                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Delivery Address
                  </h2>

                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Enter your delivery details
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="hunar-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="hunar-input"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Address
                  </label>

                  <textarea
                    rows="3"
                    placeholder="House number, street, area..."
                    className="hunar-input resize-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    className="hunar-input"
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    State
                  </label>

                  <input
                    type="text"
                    placeholder="Enter state"
                    className="hunar-input"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Pincode
                  </label>

                  <input
                    type="text"
                    placeholder="Enter pincode"
                    className="hunar-input"
                  />
                </div>

              </div>
            </div>

            {/* ================= PAYMENT METHOD ================= */}
            <div
              className="rounded-3xl border bg-white p-6 sm:p-8"
              style={{
                borderColor: "var(--color-border-light)",
                boxShadow: "var(--shadow-soft)",
              }}
            >

              <div className="mb-6 flex items-center gap-3">

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--color-green)" }}
                >
                  <CreditCard
                    className="h-5 w-5"
                    style={{ color: "var(--color-green-dark)" }}
                  />
                </div>

                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--color-heading)" }}
                  >
                    Payment Method
                  </h2>

                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Choose your preferred payment method
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                {/* COD */}
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-200"
                  style={{
                    backgroundColor:
                      paymentMethod === "cod"
                        ? "#EEF9E9"
                        : "#FFFFFF",
                    borderColor:
                      paymentMethod === "cod"
                        ? "#BFDDB7"
                        : "var(--color-border)",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4 accent-[#4D7A45]"
                  />

                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Cash on Delivery
                    </p>

                    <p
                      className="text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                {/* Online Payment */}
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-200"
                  style={{
                    backgroundColor:
                      paymentMethod === "online"
                        ? "#EAF2FF"
                        : "#FFFFFF",
                    borderColor:
                      paymentMethod === "online"
                        ? "#B8CBE7"
                        : "var(--color-border)",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4 accent-[#5B7DB1]"
                  />

                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Online Payment
                    </p>

                    <p
                      className="text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Pay securely online
                    </p>
                  </div>
                </label>

              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="lg:col-span-1">

            <div
              className="sticky top-6 rounded-3xl border bg-white p-6"
              style={{
                borderColor: "var(--color-border-light)",
                boxShadow: "var(--shadow-soft)",
              }}
            >

              <div className="flex items-center gap-3">

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--color-peach)" }}
                >
                  <ShoppingBag
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>

                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Order Summary
                </h2>

              </div>

              <div className="mt-6 space-y-4">

                <div
                  className="flex justify-between text-sm"
                  style={{ color: "var(--color-body)" }}
                >
                  <span>Items (7)</span>
                  <span>₹4693</span>
                </div>

                <div
                  className="flex justify-between text-sm"
                  style={{ color: "var(--color-body)" }}
                >
                  <span>Delivery</span>
                  <span>₹50</span>
                </div>

                <div
                  className="border-t pt-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex justify-between">

                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Total
                    </span>

                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--color-primary-dark)" }}
                    >
                      ₹4743
                    </span>

                  </div>
                </div>

              </div>

              {/* Place Order */}
              <button
                type="button"
                onClick={() => navigate("/order-success")}
                className="mt-6 w-full rounded-xl px-5 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#4D7A45",
                  boxShadow:
                    "0 7px 20px rgba(77, 122, 69, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#3F6839";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#4D7A45";
                }}
              >
                Place Order
              </button>

              <p
                className="mt-4 text-center text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                Secure checkout • Easy returns
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;
