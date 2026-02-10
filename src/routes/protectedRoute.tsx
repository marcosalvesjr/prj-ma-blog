import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // 1. Enquanto o Contexto está verificando o Supabase, mostramos um loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Se não houver usuário, redireciona para o login
  // O 'state' serve para sabermos de onde o usuário veio e mandá-lo de volta após o login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Se estiver logado, renderiza o conteúdo da rota
  return <Outlet />;
}