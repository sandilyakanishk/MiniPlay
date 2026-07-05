import { ArrowDown, Gamepad2, Sparkle, Star } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'
import CategoryFilter from '../components/CategoryFilter'
import GameCard from '../components/GameCard'
import { gamesList } from '../data/gamesList'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const featuredGames = gamesList.filter((game) => game.featured)
  const popularGames =
    activeCategory === 'All'
      ? gamesList
      : gamesList.filter((game) => game.category === activeCategory)

  return (
    <>
      <section className="section-wrap relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <Sparkle className="sparkle left-2 top-16 text-[#FFD93D] animate-floaty" size={32} />
        <Star className="sparkle right-6 top-24 text-[#FF6B9D] animate-floaty" size={28} />
        <div>
          <p className="mb-4 inline-flex rounded-2xl bg-white/75 px-4 py-2 text-sm font-bold text-[#FF6B9D] shadow">
            Instant browser fun, no downloads
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-normal text-[#1F2937] sm:text-6xl lg:text-7xl">
            MiniPlay Hub
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            A cheerful collection of bite-sized mini-games built for quick plays, touch screens,
            keyboards, and friendly rematches.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/games" className="animate-pulse-pop">
              Play Now <ArrowDown size={18} />
            </Button>
            <Button to="/about" variant="ghost">
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-4 top-6 size-24 rounded-full bg-[#FFD93D]/70 blur-xl" />
          <div className="absolute -right-4 bottom-8 size-28 rounded-full bg-[#8BE87E]/60 blur-xl" />
          <div className="play-card relative rounded-2xl p-5">
            <div className="grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-[#5DC1F0] via-[#B48DE0] to-[#FF6B9D] text-white">
              <Gamepad2 size={118} strokeWidth={1.5} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {['Puzzle', 'Arcade', 'Classic'].map((label) => (
                <div key={label} className="rounded-2xl bg-white p-3 text-center text-xs font-bold">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#FF6B9D]">
              Start here
            </p>
            <h2 className="font-display text-4xl font-extrabold text-[#1F2937]">
              Featured Games
            </h2>
          </div>
          <Button to="/games" variant="yellow">
            View All Games
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} compact />
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <div className="play-card rounded-2xl p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5DC1F0]">
                Browse by mood
              </p>
              <h2 className="font-display text-4xl font-extrabold text-[#1F2937]">Categories</h2>
            </div>
            <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
