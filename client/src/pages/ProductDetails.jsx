import { useParams } from "react-router-dom";
import products from "../components/FeaturedProducts/productsData";
import { useCart } from "../context/CartContext";

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
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Product Not Found
        </h1>
      </div>
    );
  }

  // Check karo product cart me already hai ya nahi
  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">

          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="h-[450px] w-full rounded-2xl bg-gray-100 object-contain"
            />
          </div>

          {/* Product Details */}
          <div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Seller */}
            <p className="mt-3 text-gray-600">
              Seller:{" "}
              <span className="font-semibold text-gray-900">
                {product.seller}
              </span>
            </p>

            {/* Category */}
            <p className="mt-2 text-gray-600">
              Category: {product.category}
            </p>

            {/* Location */}
            <p className="mt-2 text-gray-600">
              Location: {product.location}
            </p>

            {/* Price */}
            <p className="mt-4 text-2xl font-bold text-indigo-600">
              ₹{product.price}
            </p>

            {/* Description */}
            <p className="mt-4 leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Rating */}
            <p className="mt-3 text-gray-700">
              Rating ⭐ {product.rating}
            </p>

            {/* Stock */}
            <p className="mt-3">
              {product.stock ? (
                <span className="font-medium text-green-600">
                  ✅ Available in Stock
                </span>
              ) : (
                <span className="font-medium text-red-600">
                  ❌ Out of Stock
                </span>
              )}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              {/* Contact Seller */}
              <a
                href={`tel:${product.contact}`}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Contact Seller
              </a>

              {/* Cart Controls */}
              {product.stock && (
                cartItem ? (
                  <div className="flex items-center gap-3">

                    {/* Minus */}
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-green-600 text-xl font-bold text-green-600 hover:bg-green-50"
                    >
                      −
                    </button>

                    {/* Quantity */}
                    <span className="min-w-8 text-center text-lg font-bold">
                      {cartItem.quantity}
                    </span>

                    {/* Plus */}
                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-xl font-bold text-white hover:bg-green-700"
                    >
                      +
                    </button>

                  </div>
                ) : (
                  /* Add To Cart */
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                )
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;