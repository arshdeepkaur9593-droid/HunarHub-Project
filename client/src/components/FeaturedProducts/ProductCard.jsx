
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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

function ProductCard({
  id,
  image,
  name,
  seller,
  category,
  location,
  price,
  rating,
  colorIndex = 0,
}) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const cartItem = cartItems.find(
    (item) => item.id === id
  );

  const colors = cardColors[colorIndex % cardColors.length];

  return (
    <div
      className="group overflow-hidden rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-2"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        boxShadow: "var(--shadow-soft)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "var(--shadow-card)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "var(--shadow-soft)";
      }}
    >
      {/* Product Image */}
      <div
        className="flex h-52 items-center justify-center overflow-hidden"
        style={{
          backgroundColor: colors.imageBg,
        }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-44 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span
          className="inline-flex rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold"
          style={{
            color: "var(--color-heading)",
          }}
        >
          {category}
        </span>

        {/* Product Name */}
        <p
          className="mt-3 text-lg font-bold"
          style={{
            color: "var(--color-heading)",
          }}
        >
          {name}
        </p>

        {/* Seller */}
        <p
          className="mt-1 text-sm"
          style={{
            color: "var(--color-muted)",
          }}
        >
          by {seller}
        </p>

        {/* Rating & Location */}
        <div
          className="mt-3 flex items-center justify-between text-sm"
          style={{
            color: "var(--color-body)",
          }}
        >
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star
              className="h-4 w-4"
              style={{
                fill: "#E5A52B",
                color: "#E5A52B",
              }}
            />
            <span>{rating}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1">
            <MapPin
              className="h-4 w-4"
              style={{
                color: "#4D7A45",
              }}
            />
            <span>{location}</span>
          </div>
        </div>

        {/* Price & Buttons */}
        <div className="mt-4 flex items-center justify-between gap-2">

          {/* Price */}
          <p
            className="text-xl font-bold"
            style={{
              color: "var(--color-primary-dark)",
            }}
          >
            ₹{price}
          </p>

          <div className="flex items-center gap-2">

            {/* VIEW BUTTON - BLUE */}
            <Link
              to={`/products/${id}`}
              className="rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: "#5B7DB1",
                backgroundColor: "#EAF2FF",
                color: "#4D6895",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "#5B7DB1";
                e.currentTarget.style.color =
                  "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "#EAF2FF";
                e.currentTarget.style.color =
                  "#4D6895";
              }}
            >
              View
            </Link>

            {/* CART CONTROLS */}
            {cartItem ? (
              <div className="flex items-center gap-2">

                {/* MINUS - BLUE */}
                <button
                  type="button"
                  onClick={() => decreaseQuantity(id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-lg font-bold transition-all duration-200"
                  style={{
                    borderColor: "#5B7DB1",
                    backgroundColor: "#EAF2FF",
                    color: "#4D6895",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "#5B7DB1";
                    e.currentTarget.style.color =
                      "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "#EAF2FF";
                    e.currentTarget.style.color =
                      "#4D6895";
                  }}
                >
                  −
                </button>

                {/* Quantity */}
                <span
                  className="min-w-5 text-center font-semibold"
                  style={{
                    color: "var(--color-heading)",
                  }}
                >
                  {cartItem.quantity}
                </span>

                {/* PLUS - GREEN */}
                <button
                  type="button"
                  onClick={() => increaseQuantity(id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#4D7A45",
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              /* ADD TO CART - BLUE */
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id,
                    image,
                    name,
                    seller,
                    category,
                    location,
                    price,
                    rating,
                  })
                }
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#5B7DB1",
                  boxShadow:
                    "0 6px 18px rgba(91, 125, 177, 0.20)",
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
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
