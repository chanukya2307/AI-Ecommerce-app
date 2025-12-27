import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch {
      setError("Signup failed 😬");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 relative overflow-hidden">

      {/* BLUR BLOBS */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-0 right-0 animate-pulse" />
      <div className="absolute w-96 h-96 bg-black/20 rounded-full blur-3xl bottom-0 left-0 animate-pulse" />

      {/* CARD */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 w-[90%] max-w-md">

        <h1 className="text-4xl font-extrabold text-white text-center">
          Join the Club ✨
        </h1>
        <p className="text-white/80 text-center mt-2">
          One search. Best prices. All platforms.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            placeholder="👤 Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="📧 Email"
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="🔐 Password"
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-200 text-sm text-center">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-lg text-white
              bg-black hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {loading ? "Creating..." : "Create Account 🚀"}
          </button>
        </form>

        <p className="text-white text-sm text-center mt-6">
          Already a member?{" "}
          <Link to="/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
