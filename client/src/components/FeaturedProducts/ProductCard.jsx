import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({
  id,
  image,
  name,
  seller,
  category,
  location,
  price,
  rating,
}) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Check karo ye product cart me already hai ya nahi
  const cartItem = cartItems.find(
    (item) => item.id === id
  );

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl">

      {/* Product Image */}
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="mx-auto h-44 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-600">
          {category}
        </span>

        {/* Product Name */}
        <p className="mt-3 text-lg font-bold text-gray-900">
          {name}
        </p>

        {/* Seller */}
        <p className="mt-1 text-sm text-gray-700">
          by {seller}
        </p>

        {/* Rating & Location */}
        <div className="mt-3 flex items-center justify-between text-sm">

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-700">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

        </div>

        {/* Price & Buttons */}
        <div className="mt-4 flex items-center justify-between gap-2">

          {/* Price */}
          <p className="text-xl font-bold text-indigo-600">
            ₹{price}
          </p>

          <div className="flex items-center gap-2">

            {/* View */}
            <Link
              to={`/products/${id}`}
              className="rounded-lg border border-indigo-600 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
            >
              View
            </Link>

            {/* Cart Controls */}
            {cartItem ? (
              <div className="flex items-center gap-2">

                {/* Minus */}
                <button
                  type="button"
                  onClick={() => decreaseQuantity(id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-600 text-lg font-bold text-indigo-600 hover:bg-indigo-50"
                >
                  −
                </button>

                {/* Quantity */}
                <span className="min-w-5 text-center font-semibold">
                  {cartItem.quantity}
                </span>

                {/* Plus */}
                <button
                  type="button"
                  onClick={() => increaseQuantity(id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white hover:bg-indigo-700"
                >
                  +
                </button>

              </div>
            ) : (
              /* Add To Cart */
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
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
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