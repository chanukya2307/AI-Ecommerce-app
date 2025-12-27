import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate("/results", {
      state: { query }
    });
  };

  const quickSearch = (text) => {
    navigate("/results", {
      state: { query: text }
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6">

        {/* HERO */}
        <div className="max-w-3xl w-full text-center mt-24">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the <span className="text-green-600">best products</span><br />
            across Amazon, Flipkart & more
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            AI-powered product comparison based on price, reviews & offers
          </p>

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex items-center bg-white shadow-lg rounded-full overflow-hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. best iPhone under 70000"
              className="flex-1 px-6 py-4 outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition"
            >
              Search
            </button>
          </form>

          {/* QUICK CHIPS */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              "Best iPhone under 70000",
              "Top rated shoes",
              "Cheap laptops",
              "Best earbuds with offers"
            ].map((text) => (
              <button
                key={text}
                onClick={() => quickSearch(text)}
                className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-100 transition"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-20 w-full max-w-5xl">
          <p className="text-center text-sm text-gray-500 mb-4">
            Trusted platforms we compare
          </p>

          <div className="flex justify-center items-center gap-10 opacity-80">
            <span className="font-semibold text-lg">Amazon</span>
            <span className="font-semibold text-lg">Flipkart</span>
            <span className="font-semibold text-lg">Myntra</span>
          </div>
        </div>
      </div>
    </>
  );
}
