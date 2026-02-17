import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { UserPlus, Code2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });

  const handleRegister = async (values: any) => {
    const result = await signUp(values);

    if (result.success) {
      toast.success("Conta criada com sucesso!", {
        description: "Agora você já pode gerenciar seus artigos.",
        onAutoClose: () => navigate("/"),
      });
    } else {
      toast.error("Erro ao cadastrar", { description: result.error });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-4 pt-8 text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Criar conta</CardTitle>
            <CardDescription>Junte-se à nossa comunidade de autores.</CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={form.handleSubmit(handleRegister)}>
          <CardContent className="space-y-4">
            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Nome Completo</label>
              <Controller
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <Input placeholder="Seu nome" className="h-11" {...field} required />
                )}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input type="email" placeholder="exemplo@email.com" className="h-11" {...field} required />
                )}
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Senha</label>
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Input type="password" placeholder="••••••••" className="h-11" {...field} required />
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Criar minha conta"}
            </Button>
            <p className="text-sm text-center text-gray-500">
              Já tem uma conta? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Entre aqui</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}