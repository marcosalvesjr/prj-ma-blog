import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Code2, ArrowLeft } from "lucide-react";

export default function Login() {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    const result = await signIn(values);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Erro ao fazer login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-4 pt-8 text-center">
          {/* Logo Branding */}
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <Code2 className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-base">
              Acesse sua conta para gerenciar seus artigos.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={form.handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg animate-in fade-in zoom-in duration-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 ml-1"
              >
                Email
              </label>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    className="h-11 focus-visible:ring-blue-600"
                    {...field}
                    required
                  />
                )}
              />
              {form.formState.errors.email && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 focus-visible:ring-blue-600"
                    {...field}
                    required
                  />
                )}
              />
              {form.formState.errors.password && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <Button
              type="submit"
              className="mt-5 w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar na plataforma"}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Não tem uma conta?{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline"
                onClick={() => navigate("/register")}
              >
                Crie uma agora
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
