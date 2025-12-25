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
    priceValue: parsePrice(rawPrice),

    rating: Number(p.product_rating) || 0,
    reviews: Number(p.product_num_reviews) || 0,

    image: Array.isArray(p.product_photos)
      ? p.product_photos[0]
      : null,

    url: p.offer?.offer_page_url || p.product_page_url
  };
};

export default normalize;
