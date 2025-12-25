export default function ProductCard({ product }) {
  const platformName =
    product.store ||
    product.platform ||
    "Store";

  const formattedPrice =
    typeof product.priceValue === "number"
      ? `₹${product.priceValue.toLocaleString()}`
      : product.price || "Price not available";

  return (
    <div className="relative group bg-white border rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* 🏪 PLATFORM BADGE */}
      <span className="absolute top-3 left-3 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
        {platformName}
      </span>

      {/* 🖼️ Product Image */}
      <div className="h-40 flex items-center justify-center">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 🏷️ Title */}
      <h3 className="font-semibold mt-3 text-gray-800 text-sm line-clamp-2">
        {product.title}
      </h3>

      {/* 💰 Price */}
      <p className="text-green-600 font-bold text-lg mt-1">
        {formattedPrice}
      </p>

      {/* ⭐ Rating */}
      {product.rating > 0 && (
        <p className="text-sm text-gray-600 mt-1">
          ⭐ {product.rating}
          {product.reviews ? ` (${product.reviews})` : ""}
        </p>
      )}

      {/* 🔗 CTA BUTTON */}
      <a
        href={product.url}
        target="_blank"
        rel="noreferrer"
        className="block mt-4 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition font-medium"
      >
        View on {platformName}
      </a>

      {/* 🔥 HOVER QUICK VIEW (DESKTOP ONLY) */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-between p-4 rounded-xl">

        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="h-32 mx-auto object-contain"
        />

        <div>
          <h4 className="font-semibold text-sm line-clamp-2">
            {product.title}
          </h4>

          <p className="text-green-600 font-bold mt-1">
            {formattedPrice}
          </p>

          {product.rating > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              ⭐ {product.rating} • {product.reviews || 0} reviews
            </p>
          )}

          <p className="text-xs text-gray-500 mt-1">
            Available on {platformName}
          </p>
        </div>

        <a
          href={product.url}
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white text-center py-2 rounded-md text-sm hover:bg-gray-800 transition"
        >
          View on {platformName}
        </a>
      </div>
    </div>
  );
}
