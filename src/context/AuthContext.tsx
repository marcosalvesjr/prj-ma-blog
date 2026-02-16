import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { login, supabase } from "@/lib/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (params: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
  signOut: async () => {},
  signIn: async () => ({ success: false, error: "Not implemented" }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Buscar sessão inicial
    const fetchSession = async () => {

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };
    fetchSession();

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Limpar subscription ao desmontar
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await login(email, password);
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      } else if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setIsLoading(false);
        return { success: true, error: null };
      }
      setIsLoading(false);
      return { success: false, error: "Erro desconhecido no login" };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Erro ao conectar com servidor" };
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
