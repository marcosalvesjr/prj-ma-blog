import { useState, useEffect } from 'react'
import { Search, Calendar, Clock, User, ArrowRight, Star, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Mock data - substituir com dados reais do Supabase
const mockPosts = [
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

const categories = ["Todos", "React", "TypeScript", "Design", "Performance", "Node.js", "CSS"]

export default function Home() {
  const [posts] = useState(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const featuredPosts = posts.filter(post => post.featured).slice(0, 2)

  useEffect(() => {
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

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, posts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Bem-vindo ao <span className="text-blue-600">Blog Dev</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra artigos sobre desenvolvimento web, tecnologias modernas e melhores práticas
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Artigos</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Leituras</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Autores</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Avaliação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Posts */}
        {searchTerm === "" && selectedCategory === "Todos" && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Artigos em Destaque</h2>
              <Button variant="ghost" className="text-blue-600">
                Ver todos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-sm font-medium mb-2 bg-blue-600 px-3 py-1 rounded-full inline-block">
                          {post.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{post.views} visualizações</span>
                        <span className="text-red-500">❤️ {post.likes}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Ler mais <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {searchTerm || selectedCategory !== "Todos" ? "Resultados" : "Artigos Recentes"}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-gray-700">
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-3 right-3">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs">{post.views} views</span>
                        <span className="text-red-500 text-xs">❤️ {post.likes}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 text-xs p-0 h-auto">
                        Ler mais <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-2">Nenhum artigo encontrado</div>
              <div className="text-gray-500">Tente ajustar sua busca ou categoria</div>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Receba os melhores artigos sobre desenvolvimento web diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              className="bg-white/20 border-white/30 text-white placeholder-white/70"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Inscrever-se
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}