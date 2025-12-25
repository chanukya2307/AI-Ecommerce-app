import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductList({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No products found 😕
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}
