import { BookOpen, TrendingUp, User, Star } from 'lucide-react'

interface StatsSectionProps {
  articles?: number
  reads?: number
  authors?: number
  rating?: number
}

export function StatsSection({ 
  articles = 150, 
  reads = 50000, 
  authors = 25, 
  rating = 4.9 
}: StatsSectionProps) {
  const stats = [
    { icon: BookOpen, label: 'Artigos', value: `${articles}+`, color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Leituras', value: `${(reads / 1000).toFixed(0)}K+`, color: 'text-green-600' },
    { icon: User, label: 'Autores', value: `${authors}+`, color: 'text-purple-600' },
    { icon: Star, label: 'Avaliação', value: rating.toString(), color: 'text-yellow-600' },
  ]

  return (
    <section className="py-8 px-4 bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
