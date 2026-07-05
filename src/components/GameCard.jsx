import { ArrowRight, Play } from 'lucide-react'
import Button from './Button'

export default function GameCard({ game, compact = false }) {
  return (
    <article className="play-card group flex h-full flex-col overflow-hidden rounded-2xl p-4 transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div
        className={`grid ${compact ? 'h-28' : 'h-36'} place-items-center rounded-2xl bg-gradient-to-br ${game.gradient} text-white shadow-inner`}
      >
        <span className="font-display text-4xl font-extrabold tracking-normal drop-shadow-sm">
          {game.thumbnail}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF6B9D]">
              {game.category}
            </p>
            <h3 className="font-display text-2xl font-extrabold leading-tight text-[#1F2937]">
              {game.name}
            </h3>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#FFD93D]/45 text-[#1F2937] transition group-hover:rotate-6">
            <Play size={18} fill="currentColor" />
          </span>
        </div>
        <p className="mb-5 flex-1 text-sm leading-6 text-slate-600">{game.description}</p>
        <Button to={`/games/${game.id}`} variant="blue" className="w-full">
          Play <ArrowRight size={18} />
        </Button>
      </div>
    </article>
  )
}
