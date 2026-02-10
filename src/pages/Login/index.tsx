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
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Digite suas credenciais para acessar o blog.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    {...field}
                    required
                  />
                )}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Senha</label>
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...field}
                    required
                  />
                )}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-3" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
