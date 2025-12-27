import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
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
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      setError("Invalid credentials 😕");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">

      {/* FLOATING BLOBS */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-black/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      {/* GLASS CARD */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 w-[90%] max-w-md">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-white text-center">
          Welcome Back 🚀
        </h1>
        <p className="text-white/80 text-center mt-2">
          Find the best deals in one search
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="📧 Email address"
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="🔑 Password"
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-200 text-sm text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-lg text-white
              bg-black hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {loading ? "Logging in..." : "Let’s Go 🔥"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-white text-sm text-center mt-6">
          New here?{" "}
          <Link to="/signup" className="font-bold underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
  