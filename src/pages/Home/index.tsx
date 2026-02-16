import { useState, useMemo } from 'react'
import {
  HeroSection,
  StatsSection,
  CategoryFilter,
  FeaturedPosts,
  PostList,
  Newsletter,
  type Post,
} from '@/components/Home'

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Como construir aplicações escaláveis com React",
    slug: "como-construir-aplicacoes-escalaveis-react",
    excerpt: "Aprenda as melhores práticas e padrões para criar aplicações React que crescem com seu negócio.",
    author: "João Silva",
    publishedAt: "2024-02-15",
    readTime: "8 min",
    category: "React",
    featured: true,
    views: 1234,
    likes: 89
  },
  {
    id: 2,
    title: "TypeScript: Tipagem forte no frontend",
    slug: "typescript-tipagem-forte-frontend",
    excerpt: "Descubra como o TypeScript pode revolucionar seu desenvolvimento JavaScript com tipagem estática.",
    author: "Maria Santos",
    publishedAt: "2024-02-10",
    readTime: "6 min",
    category: "TypeScript",
    featured: true,
    views: 856,
    likes: 67
  },
  {
    id: 3,
    title: "Design Systems: Criando interfaces consistentes",
    slug: "design-systems-interfaces-consistentes",
    excerpt: "Guia completo para implementar um design system que escala com sua equipe e produtos.",
    author: "Pedro Costa",
    publishedAt: "2024-02-08",
    readTime: "10 min",
    category: "Design",
    featured: false,
    views: 543,
    likes: 45
  },
  {
    id: 4,
    title: "Performance Web: Otimizando aplicações modernas",
    slug: "performance-web-otimizando-aplicacoes",
    excerpt: "Técnicas avançadas para melhorar a performance das suas aplicações web.",
    author: "Ana Oliveira",
    publishedAt: "2024-02-05",
    readTime: "12 min",
    category: "Performance",
    featured: false,
    views: 2341,
    likes: 156
  }
]

export default function Home() {
  const [posts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const featuredPosts = posts.filter(post => post.featured).slice(0, 2)

  const isSearching = searchTerm !== "" || selectedCategory !== "Todos"
  const listTitle = isSearching ? "Resultados" : "Artigos Recentes"

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [searchTerm, selectedCategory, posts])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <StatsSection />
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!isSearching && <FeaturedPosts posts={featuredPosts} />}
        
        <PostList 
          posts={filteredPosts} 
          title={listTitle}
          showCount={isSearching}
        />

        <Newsletter />
      </div>
    </div>
  )
}
