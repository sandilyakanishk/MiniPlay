import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import GameCard from '../components/GameCard'
import { gamesList } from '../data/gamesList'

export default function Games() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filteredGames = useMemo(() => {
    return gamesList.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory
      const matchesQuery = `${game.name} ${game.description} ${game.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <section className="section-wrap py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#FF6B9D]">All games</p>
        <h1 className="font-display text-5xl font-extrabold leading-tight text-[#1F2937]">
          Pick a mini-game and jump in.
        </h1>
      </div>
      <div className="mb-7 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="play-card flex min-h-12 items-center gap-3 rounded-2xl px-4">
          <Search className="text-slate-400" size={20} />
          <input
            className="min-h-12 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
            value={query}
            placeholder="Search games"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}
