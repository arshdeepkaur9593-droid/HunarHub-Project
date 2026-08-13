import React from "react";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Cart() {

    const navigate = useNavigate();

  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Delivery charge
  const deliveryCharge = cartItems.length > 0 ? 50 : 0;

  // Final total
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
              <ShoppingBag className="h-6 w-6 text-indigo-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>

              {cartItems.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
              <ShoppingBag className="h-10 w-10 text-indigo-600" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven't added anything to your cart yet. Explore our products
              and find something you love.
            </p>

            <button
              type="button"
               onClick={() => navigate("/")}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Products */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-28 rounded-xl bg-gray-100 object-cover sm:h-32 sm:w-32"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                        {item.category}
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        by {item.seller}
                      </p>

                      <p className="mt-3 text-lg font-bold text-indigo-600">
                        ₹{item.price}
                      </p>

                      {/* Quantity + Remove */}
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        {/* Quantity */}
                        <div className="flex items-center rounded-xl border border-gray-200">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-gray-600 transition hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="w-10 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-indigo-600 transition hover:bg-indigo-50"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-500">Item Total</p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Summary */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalItems})</span>

                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>

                    <span>₹{deliveryCharge}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <span className="text-xl font-bold text-indigo-600">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Secure checkout • Easy returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
