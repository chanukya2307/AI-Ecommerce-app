import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductList from "../components/ProductList";

export default function Results() {
  const { state } = useLocation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("BEST");

  const fetchResults = async (nextPage = 1, reset = false) => {
    setLoading(true);

    const res = await API.post("/search", {
      query: state.query,
      page: nextPage,
      sortBy
    });

    setProducts((prev) =>
      reset ? res.data : [...prev, ...res.data]
    );

    setLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchResults(1, true);
  }, [state.query, sortBy]);

  return (
    <div className="p-6">

      {/* 🔍 Heading */}
      <h2 className="text-2xl font-bold mb-4">
        Results for "{state.query}"
      </h2>

      {/* 🧭 SORT BAR */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {[
          { key: "BEST", label: "Best Match" },
          { key: "LOW_PRICE", label: "Lowest Price" },
          { key: "HIGH_RATING", label: "Top Rated" }
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition
              ${
                sortBy === s.key
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 🛍️ Products */}
      <ProductList products={products} loading={loading} />

      {/* ⏬ Load More */}
      {!loading && products.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              const next = page + 1;
              setPage(next);
              fetchResults(next);
            }}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
