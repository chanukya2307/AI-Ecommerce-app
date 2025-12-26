import axios from "axios";

export const fetchProducts = async (query, page = 1, sortBy = "BEST") => {
  const sortMap = {
    BEST: "BEST_MATCH",
    LOWEST_PRICE: "LOWEST_PRICE",
    TOP_RATED: "TOP_RATED"
  };

  try {
    const res = await axios.get(
      `https://${process.env.RAPID_API_HOST}/search-v2`,
      {
        params: {
          q: query,
          page,
          limit: 12, // 🔥 reduced from 20
          sort_by: sortMap[sortBy] || "BEST_MATCH",
          country: "IN"
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST
        },
        timeout: 12000 // 🔥 safer timeout
      }
    );

    return res.data?.data?.products || [];
  } catch (error) {
    console.error("❌ Product Search API error:", error.message);
    return []; // graceful fallback
  }
};
