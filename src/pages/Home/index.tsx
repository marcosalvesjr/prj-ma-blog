import { useState, useMemo, useEffect } from "react";
import {
  HeroSection,
  StatsSection,
  CategoryFilter,
  FeaturedPosts,
  PostList,
  Newsletter,
  type Post,
} from "@/components/Home";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);

  const isSearching = searchTerm !== "" || selectedCategory !== "Todos";
  const listTitle = isSearching ? "Resultados" : "Artigos Recentes";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        setPosts(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, posts]);

  return (
    <div className="min-h-screenbg-background">
      <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <PostList
          posts={filteredPosts}
          title={listTitle}
          showCount={isSearching}
        />
      </div>
        <Newsletter />
    </div>
  );
}
