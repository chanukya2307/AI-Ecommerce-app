import { aggregateProducts } from "../services/aggregatorService.js";

export const searchProducts = async (req, res) => {
  try {
    const {
      query,
      page = 1,
      sortBy = "BEST"
    } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        error: "Search query is required"
      });
    }

    // Normalize sortBy to avoid frontend mismatches
    const normalizedSort =
      sortBy === "LOWEST_PRICE" || sortBy === "TOP_RATED"
        ? sortBy
        : "BEST";

    const products = await aggregateProducts(
      query,
      page,
      normalizedSort
    );

    return res.json(products);

  } catch (error) {
    console.error("❌ Search API error:", error.message);

    return res.status(500).json({
      error: "Failed to fetch products"
    });
  }
};
