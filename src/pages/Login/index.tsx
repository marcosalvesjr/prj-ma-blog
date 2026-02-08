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
import { login } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useState } from "react";
import { set } from "zod";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await login(
        form.getValues("email"),
        form.getValues("password"),
      );
      if (error) {
        alert(error);
        setIsLoading(false);
      } else if (data.session) {
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
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
            </div>
            <div className="space-y-2">
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
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
