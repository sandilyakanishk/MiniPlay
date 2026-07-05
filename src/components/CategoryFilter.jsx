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
                ? 'bg-sky text-white shadow-lg shadow-sky/20'
                : 'bg-white/8 text-slate-300 ring-1 ring-white/10 hover:bg-white/12 hover:text-white'
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
