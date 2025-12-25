import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        AI Product Recommendation System
      </h1>
      <SearchBar />
    </div>
  );
}
