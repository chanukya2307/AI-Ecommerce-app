import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/results", { state: { query } });
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border p-2"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4">
        Search
      </button>
    </div>
  );
}
