// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ token }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Ensure the child components are rendered via Outlet
  return <Outlet />;
}

export default ProtectedRoute;