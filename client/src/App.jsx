import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
