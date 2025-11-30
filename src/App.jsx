// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Reservations from "./pages/Reservations";

// ⭐ NEW ADMIN IMPORTS ⭐
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="/reservations" element={<Reservations />} />

      {/* ⭐ NEW ADMIN ROUTES ⭐ */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
