import { fetchProducts } from "./productSearchService.js";

/**
 * Convert price string like "₹1,34,900" → 134900
 */
const parsePrice = (price) => {
  if (!price) return null;

  if (typeof price === "number") return price;

  return Number(
    price
      .toString()
      .replace(/[^0-9]/g, "")
  );
};

const normalize = (p) => {
  const rawPrice =
    p.offer?.price ||
    (Array.isArray(p.typical_price_range)
      ? p.typical_price_range[0]
      : null);

  return {
    title: p.product_title,

    store: p.offer?.store_name || "Unknown",

    price: rawPrice,
    priceValue: parsePrice(rawPrice), // 🔥 IMPORTANT

    rating: Number(p.product_rating) || 0,
    reviews: Number(p.product_num_reviews) || 0,

    image: Array.isArray(p.product_photos)
      ? p.product_photos[0]
      : null,

    url: p.offer?.offer_page_url || p.product_page_url
  };
};

export const aggregateProducts = async (query, page = 1, sortBy = "BEST") => {
  let allProducts = [];

  // Fetch 2 pages (can increase later)
  for (let p = 1; p <= 2; p++) {
    const products = await fetchProducts(query, p);
    allProducts.push(...products);
  }

  // Normalize
  let normalized = allProducts.map(normalize);

  // 🧠 BACKEND SORTING (FIX)
  if (sortBy === "LOWEST_PRICE") {
    normalized = normalized
      .filter(p => p.priceValue !== null)
      .sort((a, b) => a.priceValue - b.priceValue);
  }

  if (sortBy === "TOP_RATED") {
    normalized = normalized.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews - a.reviews;
    });
  }

  // BEST = no sorting (API relevance)

  return normalized;
};
