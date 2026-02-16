import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostCard, type Post } from './PostCard'

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Artigos em Destaque</h2>
        <Button variant="ghost" className="text-blue-600">
          Ver todos <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="featured" />
        ))}
      </div>
    </section>
  )
}
