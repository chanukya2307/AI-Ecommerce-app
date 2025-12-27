import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
