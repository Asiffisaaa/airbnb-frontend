// src/components/AdminProtectedRoute.jsx
import React from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Navigate } from "react-router-dom";


const AdminProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth;

  // ❌ If no token → redirect to admin login
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ If logged in → allow access
  return children;
};

export default AdminProtectedRoute;
