
import { Calendar, User, ArrowRight, Hash } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  author_id: string;
}

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured'
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="group relative flex flex-col h-full border-none bg-white shadow-sm ring-1 ring-gray-200 hover:ring-blue-500/50 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Detalhe visual lateral no hover */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          {/* Badge de Data */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.created_at), "dd MMM yyyy", { locale: ptBR })}
          </div>
          
          {/* Identificador de Slug visual (opcional) */}
          <div className="flex items-center gap-1 text-gray-400 text-xs italic">
            <Hash className="h-3 w-3" />
            {post.slug}
          </div>
        </div>

        <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Preview do Conteúdo */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
          {post.content}
        </p>
      </CardContent>

      <CardFooter className="pt-4 pb-6 flex flex-col gap-4">
        {/* Informação do Autor */}
        <div className="flex items-center gap-2 w-full px-1">
          <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {post.author_id || "Autor do Blog"}
          </span>
        </div>

        {/* Link de Ação */}
        <Link to={`/post/${post.slug}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-blue-100 bg-blue-50/50 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 group/btn transition-all font-bold"
          >
            Ler artigo completo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}