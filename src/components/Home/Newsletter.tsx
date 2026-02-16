import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Newsletter() {
  return (
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
  )
}
