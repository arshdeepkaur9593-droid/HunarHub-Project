
import { useParams } from "react-router-dom";
import products from "../components/FeaturedProducts/productsData";
import { useCart } from "../context/CartContext";
import { MapPin, Star, Phone, ShoppingBag } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--color-peach)" }}
          >
            <ShoppingBag
              className="h-7 w-7"
              style={{ color: "var(--color-primary)" }}
            />
          </div>

          <h1
            className="mt-5 text-2xl font-bold"
            style={{ color: "var(--color-heading)" }}
          >
            Product Not Found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            The product you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  // Check karo product cart me already hai ya nahi
  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ================= PRODUCT CARD ================= */}
        <div
          className="grid gap-8 overflow-hidden rounded-3xl border bg-white p-5 sm:p-8 md:grid-cols-2 md:gap-10"
          style={{
            borderColor: "var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >

          {/* ================= PRODUCT IMAGE ================= */}
          <div
            className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl"
            style={{ backgroundColor: "#EEF9E9" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[360px] w-full object-contain p-6 transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <span
              className="w-fit rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: "#C6BEEE",
                color: "#665A9E",
              }}
            >
              {product.category}
            </span>

            {/* Product Name */}
            <h1
              className="mt-4 text-3xl font-bold leading-tight sm:text-4xl"
              style={{ color: "var(--color-heading)" }}
            >
              {product.name}
            </h1>

            {/* Seller */}
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Seller:{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--color-heading)" }}
              >
                {product.seller}
              </span>
            </p>

            {/* Location */}
            <div
              className="mt-3 flex items-center gap-2 text-sm"
              style={{ color: "var(--color-body)" }}
            >
              <MapPin
                className="h-4 w-4"
                style={{ color: "var(--color-green-dark)" }}
              />
              <span>{product.location}</span>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">

              <div className="flex items-center gap-1">
                <Star
                  className="h-4 w-4"
                  style={{
                    color: "#E5A52B",
                    fill: "#E5A52B",
                  }}
                />

                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  {product.rating}
                </span>
              </div>

              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Customer Rating
              </span>

            </div>

            {/* Divider */}
            <div
              className="my-5 h-px w-full"
              style={{ backgroundColor: "var(--color-border-light)" }}
            />

            {/* Price */}
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--color-primary-dark)" }}
            >
              ₹{product.price}
            </p>

            {/* Description */}
            <p
              className="mt-4 text-sm leading-7 sm:text-base"
              style={{ color: "var(--color-body)" }}
            >
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-4">

              {product.stock ? (
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--color-green)",
                    color: "var(--color-green-dark)",
                  }}
                >
                  ✓ Available in Stock
                </span>
              ) : (
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={{
                    backgroundColor: "#FDEAEA",
                    color: "#C85A5A",
                  }}
                >
                  ✕ Out of Stock
                </span>
              )}

            </div>

            {/* ================= BUTTONS ================= */}
            <div className="mt-7 flex flex-wrap items-center gap-3">

              {/* Contact Seller */}
              <a
                href={`tel:${product.contact}`}
                className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#5B7DB1",
                  boxShadow:
                    "0 6px 18px rgba(91, 125, 177, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#4D6895";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#5B7DB1";
                }}
              >
                <Phone className="h-4 w-4" />
                Contact Seller
              </a>

              {/* Cart Controls */}
              {product.stock &&
                (cartItem ? (
                  <div className="flex items-center gap-3">

                    {/* Minus */}
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border text-xl font-bold transition-all duration-200 hover:bg-[#EAF2FF]"
                      style={{
                        borderColor: "#5B7DB1",
                        color: "#4D6895",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      −
                    </button>

                    {/* Quantity */}
                    <span
                      className="min-w-8 text-center text-lg font-bold"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {cartItem.quantity}
                    </span>

                    {/* Plus */}
                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "#4D7A45",
                        boxShadow:
                          "0 5px 15px rgba(77, 122, 69, 0.16)",
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
                      +
                    </button>

                  </div>
                ) : (
                  /* Add To Cart */
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                ))}

            </div>

            {/* Small Info */}
            <div
              className="mt-6 rounded-2xl border p-4"
              style={{
                backgroundColor: "var(--color-peach)",
                borderColor: "var(--color-peach-light)",
              }}
            >
              <p
                className="text-xs leading-5"
                style={{ color: "var(--color-body)" }}
              >
                Support local entrepreneurs by shopping directly from
                talented sellers on HunarHub.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
