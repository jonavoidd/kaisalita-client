import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? <>{children}</> : <Navigate to={"/login"} replace />;
};
