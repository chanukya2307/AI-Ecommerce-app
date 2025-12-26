import { aggregateProducts } from "../services/aggregatorService.js";

const ALLOWED_SORTS = ["BEST", "LOWEST_PRICE", "TOP_RATED"];

export const searchProducts = async (req, res) => {
  try {
    let {
      query,
      page = 1,
      sortBy = "BEST"
    } = req.body;

    // ✅ Validate query
    if (!query || typeof query !== "string") {
      return res.status(400).json({
        error: "Search query is required"
      });
    }

    // ✅ Normalize page
    page = Number(page);
    if (isNaN(page) || page < 1) page = 1;

    // ✅ Normalize sortBy (defensive coding)
    if (!ALLOWED_SORTS.includes(sortBy)) {
      sortBy = "BEST";
    }

    const products = await aggregateProducts(
      query,
      page,
      sortBy
    );

    return res.json(products);

  } catch (error) {
    console.error("❌ Search API error:", error);

    return res.status(500).json({
      error: "Failed to fetch products"
    });
  }
};
