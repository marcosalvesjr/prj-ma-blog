import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Post } from "@/components/Home";



export default function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
    *,
    profiles (
      full_name
    )
  `,
        )
        .eq("slug", slug)
        .single();

      if (error || !data) {
        navigate("/"); // Redireciona se o post não existir
      } else {
        setPost(data);
      }
      setIsLoading(false);
      window.scrollTo(0, 0);
    }

    fetchPost();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Navegação Superior / Header do Post */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-12 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100/50 -ml-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o blog
          </Button>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {post.profiles?.full_name.charAt(0) || <User className="h-4 w-4" />}
              </div>
              <span className="font-semibold text-gray-900">
                {post.profiles?.full_name || "Autor do Blog"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.created_at), "dd 'de' MMMM, yyyy", {
                locale: ptBR,
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />5 min de leitura
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Artigo */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose prose-blue max-w-none">
          {/* white-space: pre-wrap garante que as quebras de linha do banco sejam respeitadas */}
          <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
            {post.content}
          </p>
        </article>

        {/* Footer do Artigo */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
          </div>

          <div className="text-sm text-gray-500 italic">
            MA Blog — Transformando código em conhecimento.
          </div>
        </div>
      </main>
    </div>
  );
}
