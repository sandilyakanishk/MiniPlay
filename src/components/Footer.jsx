import { Camera, Code2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/70 bg-white/65 py-10 backdrop-blur">
      <div className="section-wrap grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#1F2937]">MiniPlay Hub</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Fast, colorful browser games for tiny breaks, friendly rivalries, and one-more-round
            energy.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Explore
          </h3>
          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <Link to="/games">Games</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Social
          </h3>
          <div className="flex gap-3">
            {[
              { icon: Code2, label: 'Code' },
              { icon: MessageCircle, label: 'Chat' },
              { icon: Camera, label: 'Photos' },
              { icon: Mail, label: 'Email' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                className="grid size-11 place-items-center rounded-2xl bg-white text-[#1F2937] shadow transition hover:-translate-y-0.5 hover:text-[#c96f82]"
                href="#"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
