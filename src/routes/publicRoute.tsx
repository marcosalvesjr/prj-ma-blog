import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Se já existir usuário, redireciona para a home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Caso contrário, permite acessar a rota (Login)
  return <Outlet />;
}
