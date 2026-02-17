import { PostCard, type Post } from "./PostCard";

interface PostListProps {
  posts: Post[];
  title?: string;
  showCount?: boolean;
}

export function PostList({
  posts,
  title = "Artigos Recentes",
  showCount = true,
}: PostListProps) {
  console.log(title);
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {showCount && (
          <span className="text-sm text-gray-500">
            {posts.length} artigo{posts.length !== 1 ? "s" : ""} encontrado
            {posts.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg mb-2">
            Nenhum artigo encontrado
          </div>
          <div className="text-gray-500">
            Tente ajustar sua busca ou categoria
          </div>
        </div>
      )}
    </section>
  );
}
