import { Clock, User, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  featured: boolean
  views: number
  likes: number
}

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
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
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 relative">
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-gray-700">
            {post.category}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-3 right-3">
            <svg className="h-5 w-5 text-yellow-500 fill-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
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
  )
}
