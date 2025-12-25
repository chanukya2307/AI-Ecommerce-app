import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Results from "./pages/Results";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/results"
        element={isAuthenticated() ? <Results /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
