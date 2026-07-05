import { ArrowDown, MousePointer2, Sparkle, Star, Trophy, Zap } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'
import CategoryFilter from '../components/CategoryFilter'
import GameCard from '../components/GameCard'
import { gamesList } from '../data/gamesList'
import heroMascot from '../assets/doodle-decor/hero-mascot.webp'
import heroMascotPng from '../assets/doodle-decor/hero-mascot.png'
import decorStickers from '../assets/doodle-decor/decor-stickers.webp'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const featuredGames = gamesList.filter((game) => game.featured)
  const popularGames =
    activeCategory === 'All'
      ? gamesList
      : gamesList.filter((game) => game.category === activeCategory)
  const gameOfTheDay = gamesList[new Date().getDay() % gamesList.length]
  const steps = [
    { icon: MousePointer2, title: 'Pick a game', text: 'Choose from arcade, puzzle, classic, or quiz picks.' },
    { icon: Zap, title: 'Play instantly', text: 'No downloads, no login, just browser-friendly play.' },
    { icon: Trophy, title: 'Beat your score', text: 'Restart fast and chase cleaner rounds.' },
  ]
  const tickerItems = [
    'Tiny breaks count',
    'Snake players fear corners',
    '2048 rewards calm swipes',
    'Simon Says loves focus',
    'Typing speed starts with rhythm',
  ]

  return (
    <>
      <section className="section-wrap relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <Sparkle className="sparkle left-2 top-16 text-[#e8c979] animate-floaty" size={32} />
        <Star className="sparkle right-6 top-24 text-[#c96f82] animate-floaty" size={28} />
        <img
          className="pointer-events-none absolute right-0 top-8 hidden w-44 opacity-30 lg:block"
          src={decorStickers}
          alt=""
          aria-hidden="true"
        />
        <div>
          <p className="mb-4 inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-coral shadow">
            Instant browser fun, no downloads
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-normal text-slate-50 sm:text-6xl lg:text-7xl">
            MiniPlay Hub
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
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
          <div className="absolute -left-4 top-6 size-24 rounded-full bg-coral/25 blur-xl" />
          <div className="absolute -right-4 bottom-8 size-28 rounded-full bg-lime/20 blur-xl" />
          <div className="play-card relative overflow-hidden rounded-2xl p-5">
            <picture>
              <source srcSet={heroMascot} type="image/webp" />
              <img
                className="animate-floaty mx-auto aspect-square w-full max-w-sm object-cover"
                src={heroMascotPng}
                alt="Doodle gamepad mascot for MiniPlay Hub"
                width="600"
                height="480"
              />
            </picture>
            <div className="mt-4 grid grid-cols-3 gap-3 text-slate-100">
              {['Puzzle', 'Arcade', 'Classic'].map((label) => (
                <div key={label} className="rounded-2xl bg-white/8 p-3 text-center text-xs font-bold">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['10 Games', 'Instant Play', 'No Downloads', '100% Free'].map((stat) => (
            <div key={stat} className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-center font-display text-xl font-extrabold text-slate-50">
              {stat}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky">Three taps to fun</p>
          <h2 className="font-display text-4xl font-extrabold text-slate-50">How it works</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="play-card rounded-2xl p-5">
              <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-white/10 text-sunny">
                <Icon size={26} />
              </span>
              <p className="text-sm font-bold text-coral">0{index + 1}</p>
              <h3 className="font-display text-2xl font-extrabold text-slate-50">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <div className="play-card grid gap-5 rounded-2xl p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sunny">Game of the Day</p>
            <h2 className="font-display text-4xl font-extrabold text-slate-50">{gameOfTheDay.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{gameOfTheDay.description}</p>
          </div>
          <Button to={`/games/${gameOfTheDay.id}`}>Play Spotlight</Button>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-white/5 py-4">
        <div className="animate-ticker flex w-max gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>* {item}</span>
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#c96f82]">
              Start here
            </p>
            <h2 className="font-display text-4xl font-extrabold text-slate-50">
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
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5caeca]">
                Browse by mood
              </p>
              <h2 className="font-display text-4xl font-extrabold text-slate-50">Categories</h2>
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
