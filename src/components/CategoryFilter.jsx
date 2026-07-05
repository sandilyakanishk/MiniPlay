import { categories } from '../data/gamesList'

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            className={`min-h-11 rounded-2xl px-4 py-2 text-sm font-bold transition duration-200 ${
              isActive
                ? 'bg-[#1F2937] text-white shadow-lg shadow-slate-500/20'
                : 'bg-white/80 text-slate-700 ring-1 ring-white hover:bg-white'
            }`}
            type="button"
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
