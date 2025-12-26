import { fetchProducts } from "./productSearchService.js";

/**
 * Convert price string like "₹1,34,900" → 134900
 */
const parsePrice = (price) => {
  if (!price) return null;
  if (typeof price === "number") return price;
  return Number(price.toString().replace(/[^0-9]/g, ""));
};

/**
 * 🧠 AI-style query understanding
 */
const analyzeQuery = (query = "") => {
  const q = query.toLowerCase();

  const budgetMatch = q.match(/under\s?(\d+)\s?k?/);
  const budget = budgetMatch
    ? Number(budgetMatch[1]) * (q.includes("k") ? 1000 : 1)
    : null;

  let intent = "BEST";
  if (q.includes("lowest") || q.includes("cheap")) intent = "LOWEST_PRICE";
  if (q.includes("top rated")) intent = "TOP_RATED";

  return { budget, intent };
};

/**
 * Normalize product
 */
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
    priceValue: parsePrice(rawPrice),
    rating: Number(p.product_rating) || 0,
    reviews: Number(p.product_num_reviews) || 0,
    image: Array.isArray(p.product_photos)
      ? p.product_photos[0]
      : null,
    url: p.offer?.offer_page_url || p.product_page_url
  };
};

/**
 * Trusted platforms
 */
const isTrustedStore = (store = "") => {
  const s = store.toLowerCase();
  return (
    s.includes("amazon") ||
    s.includes("flipkart") ||
    s.includes("myntra")
  );
};

/**
 * AI score
 */
const computeAIScore = (p) => {
  if (!p.priceValue) return 0;

  const priceScore = 1 / p.priceValue;
  const ratingScore = p.rating * 10;
  const reviewScore = Math.log10(p.reviews + 1) * 5;

  return priceScore * 100000 + ratingScore + reviewScore;
};

export const aggregateProducts = async (
  query,
  page = 1,
  sortBy = "BEST"
) => {
  const { budget, intent } = analyzeQuery(query);

  // 🔥 Fetch ONLY one page → no timeout
  const rawProducts = await fetchProducts(query, page);

  if (!rawProducts.length) return [];

  let products = rawProducts.map(normalize);

  /**
   * ✅ FIX 1: Apply trusted store filter ONLY if matches exist
   */
  const trusted = products.filter((p) => isTrustedStore(p.store));
  if (trusted.length > 0) {
    products = trusted;
  }

  /**
   * ✅ FIX 2: Budget filter only if it doesn’t wipe everything
   */
  if (budget) {
    const budgetFiltered = products.filter(
      (p) => p.priceValue && p.priceValue <= budget
    );
    if (budgetFiltered.length > 0) {
      products = budgetFiltered;
    }
  }

  /**
   * Sorting logic
   */
  const effectiveSort =
    sortBy !== "BEST" ? sortBy : intent;

  if (effectiveSort === "LOWEST_PRICE") {
    products = products
      .filter((p) => p.priceValue !== null)
      .sort((a, b) => a.priceValue - b.priceValue);
  }

  if (effectiveSort === "TOP_RATED") {
    products = products.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }

  if (effectiveSort === "BEST") {
    products = products
      .map((p) => ({ ...p, aiScore: computeAIScore(p) }))
      .sort((a, b) => b.aiScore - a.aiScore);
  }

  return products;
};
