export function interpretQuery(text) {
  const lower = text.toLowerCase();

  return {
    product: lower.match(/iphone|samsung|laptop|shoes/)?.[0] || text,
    maxPrice: lower.match(/under\s?(\d+)/)?.[1] || null,
    wantsOffers: lower.includes("offer") || lower.includes("discount"),
    wantsBest: lower.includes("best"),
  };
}
