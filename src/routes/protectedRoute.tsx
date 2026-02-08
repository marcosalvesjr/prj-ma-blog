import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase"; // Seu cliente do Supabase
import type { Session } from "@supabase/supabase-js";

export function ProtectedRoute() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Ouve mudanças na autenticação (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Carregando...</div>;

  // Se não houver sessão, manda para o login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Se houver sessão, renderiza as rotas filhas (Outlet)
  return <Outlet />;
}