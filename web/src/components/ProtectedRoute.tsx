import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="bg-slate-950 min-h-screen text-white">Загрузка...</div>
    );
  if (!user) return <Navigate to="/login" />;

  return children;
};
