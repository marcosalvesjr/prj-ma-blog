import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import { Code2, ArrowLeft, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { postSchema, type PostFormValues } from "./schamas/postSchema";
import { useAuth } from "@/context/AuthContext";

export default function NewPost() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", content: "", slug: "" },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const onSubmit = async (values: PostFormValues) => {
    if (!user) return;

    const { error } = await supabase.from("posts").insert([
      {
        title: values.title,
        content: values.content,
        slug: values.slug,
        author_id: user.id,
      },
    ]);

    if (error) {
      alert("Erro ao publicar: " + error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-none">
        <CardHeader className="space-y-4 pt-8">
          {/* Logo & Voltar */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </button>
            <div className="bg-blue-600 p-2 rounded-xl shadow-md">
              <Code2 className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
              Novo Artigo
            </CardTitle>
            <CardDescription className="text-base">
              Compartilhe seu conhecimento com a comunidade do MA Blog.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Título do Post
              </label>
              <Controller
                control={form.control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ex: Como configurar o Supabase"
                    className="h-11 focus-visible:ring-blue-600"
                    onChange={(e) => {
                      field.onChange(e);
                      form.setValue("slug", generateSlug(e.target.value));
                    }}
                  />
                )}
              />
              {form.formState.errors.title && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                URL Amigável (Slug)
              </label>
              <Controller
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly
                    className="h-11 bg-gray-50 text-gray-500 cursor-not-allowed border-dashed"
                  />
                )}
              />
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Conteúdo do Artigo
              </label>
              <Controller
                control={form.control}
                name="content"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Comece a escrever aqui..."
                    className="min-h-[200px] focus-visible:ring-blue-600 resize-none p-4"
                  />
                )}
              />
              {form.formState.errors.content && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="pb-8">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                "Publicando..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Publicar Artigo
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}