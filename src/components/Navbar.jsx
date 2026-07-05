import { Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-2xl px-4 py-2 text-sm font-bold transition ${
      isActive ? 'bg-[#FFD93D] text-[#1F2937]' : 'text-slate-700 hover:bg-white/80'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <nav className="section-wrap flex min-h-20 items-center justify-between gap-4">
        <NavLink className="flex items-center gap-3" to="/" onClick={() => setIsOpen(false)}>
          <span className="grid size-12 place-items-center rounded-2xl bg-[#FF6B9D] text-white shadow-lg shadow-[#FF6B9D]/25">
            <Sparkles size={24} />
          </span>
          <span className="font-display text-2xl font-extrabold text-[#1F2937]">
            MiniPlay Hub
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} className={linkClass} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="grid size-11 place-items-center rounded-2xl bg-white text-[#1F2937] shadow md:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="section-wrap grid gap-2 pb-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              className={linkClass}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
