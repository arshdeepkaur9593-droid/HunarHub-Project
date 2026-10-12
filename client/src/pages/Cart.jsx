
import React from "react";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Delivery charge
  const deliveryCharge = cartItems.length > 0 ? 50 : 0;

  // Final total
  const total = subtotal + deliveryCharge;

  const cardColors = [
    {
      bg: "#EEF9E9",
      border: "#D9EED2",
      imageBg: "#E3F4DD",
    },
    {
      bg: "#C6BEEE",
      border: "#B5AADF",
      imageBg: "#D9D3F3",
    },
    {
      bg: "#FFE8D4",
      border: "#F3D0B5",
      imageBg: "#FFE1C7",
    },
    {
      bg: "#FFEEE4",
      border: "#F7D8C7",
      imageBg: "#FFE5D7",
    },
  ];

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= PAGE HEADING ================= */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--color-peach)" }}
            >
              <ShoppingBag
                className="h-6 w-6"
                style={{ color: "var(--color-primary)" }}
              />
            </div>

            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "var(--color-heading)" }}
              >
                My Cart
              </h1>

              {cartItems.length > 0 && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"} in your cart
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ================= EMPTY CART ================= */}
        {cartItems.length === 0 ? (
          <div
            className="rounded-3xl border px-6 py-16 text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-green)" }}
            >
              <ShoppingBag
                className="h-10 w-10"
                style={{ color: "var(--color-green-dark)" }}
              />
            </div>

            <h2
              className="mt-6 text-2xl font-bold"
              style={{ color: "var(--color-heading)" }}
            >
              Your cart is empty
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-6"
              style={{ color: "var(--color-muted)" }}
            >
              You haven't added anything to your cart yet. Explore our
              products and find something you love.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#4D7A45",
                boxShadow: "0 6px 18px rgba(77, 122, 69, 0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3F6839";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4D7A45";
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (

          /* ================= CART CONTENT ================= */
          <div className="grid gap-8 lg:grid-cols-3">

            {/* ================= CART PRODUCTS ================= */}
            <div className="space-y-4 lg:col-span-2">

              {cartItems.map((item, index) => {
                const colors =
                  cardColors[index % cardColors.length];

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      boxShadow: "var(--shadow-soft)",
                    }}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                      {/* Product Image */}
                      <div className="shrink-0">
                        <div
                          className="overflow-hidden rounded-xl"
                          style={{
                            backgroundColor: colors.imageBg,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-28 w-28 object-cover sm:h-32 sm:w-32"
                          />
                        </div>
                      </div>

                      {/* Product Information */}
                      <div className="flex-1">

                        <span
                          className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.65)",
                            color: "var(--color-heading)",
                          }}
                        >
                          {item.category}
                        </span>

                        <h2
                          className="mt-2 text-lg font-bold"
                          style={{ color: "var(--color-heading)" }}
                        >
                          {item.name}
                        </h2>

                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          by {item.seller}
                        </p>

                        <p
                          className="mt-3 text-lg font-bold"
                          style={{ color: "var(--color-primary-dark)" }}
                        >
                          ₹{item.price}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="mt-4 flex flex-wrap items-center gap-4">

                          {/* Quantity */}
                          <div
                            className="flex items-center overflow-hidden rounded-xl border bg-white"
                            style={{
                              borderColor: "var(--color-border)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center text-lg font-bold transition hover:bg-[#EAF2FF]"
                              style={{ color: "#4D6895" }}
                            >
                              −
                            </button>

                            <span
                              className="w-10 text-center font-semibold"
                              style={{
                                color: "var(--color-heading)",
                              }}
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center text-lg font-bold text-white transition hover:bg-[#3F6839]"
                              style={{
                                backgroundColor: "#4D7A45",
                              }}
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                            style={{ color: "#C85A5A" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                "#A83F3F";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                "#C85A5A";
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>

                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-left sm:text-right">
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Item Total
                        </p>

                        <p
                          className="mt-1 text-xl font-bold"
                          style={{ color: "var(--color-heading)" }}
                        >
                          ₹{item.price * item.quantity}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* ================= ORDER SUMMARY ================= */}
            <div className="lg:col-span-1">

              <div
                className="sticky top-6 rounded-2xl border bg-white p-6"
                style={{
                  borderColor: "var(--color-border-light)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >

                <p
                  className="text-xs font-bold uppercase tracking-[0.08em]"
                  style={{ color: "var(--color-primary)" }}
                >
                  Your Order
                </p>

                <h2
                  className="mt-2 text-xl font-bold"
                  style={{ color: "var(--color-heading)" }}
                >
                  Order Summary
                </h2>

                {/* Summary */}
                <div className="mt-6 space-y-4">

                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "var(--color-body)" }}
                  >
                    <span>Items ({totalItems})</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "var(--color-body)" }}
                  >
                    <span>Delivery</span>
                    <span>₹{deliveryCharge}</span>
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
                        style={{
                          color: "var(--color-primary-dark)",
                        }}
                      >
                        ₹{total}
                      </span>

                    </div>
                  </div>

                </div>

                {/* Checkout */}
                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
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
        )}
      </div>
    </main>
  );
}

export default Cart;
