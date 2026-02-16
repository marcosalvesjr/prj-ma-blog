import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface HeroSectionProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Bem-vindo ao <span className="text-blue-600">MA Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra artigos sobre desenvolvimento web, tecnologias modernas e melhores práticas
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
