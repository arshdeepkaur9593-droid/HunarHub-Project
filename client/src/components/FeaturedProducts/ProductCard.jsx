import { Star, MapPin } from "lucide-react";

function ProductCard({
  image,
  name,
  seller,
  category,
  location,
  price,
  rating,
}) {
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
        <p className="mt-3 text-lg font-bold text-gray-900">{name}</p>

        {/* Seller */}
        <p className="mt-1 text-sm text-gray-700">by {seller}</p>

        {/* Rating & Location */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-700">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-indigo-600">₹{price}</p>

          <button className="rounded-xl border border-blue-600 px-4 py-2 font-medium text-blue-600 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-lg">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
