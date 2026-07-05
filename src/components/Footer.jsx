import { Camera, Code2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const socialLinks = [
  {
    icon: Code2,
    label: 'GitHub',
    ariaLabel: 'Visit GitHub profile',
    href: 'https://github.com/sandilyakanishk',
    external: true,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    ariaLabel: 'Message on WhatsApp',
    href: 'https://wa.me/917071043805?text=Hi! I found your MiniPlay Hub website and wanted to reach out.',
    external: true,
  },
  {
    icon: Camera,
    label: 'Instagram',
    ariaLabel: 'Visit Instagram',
    href: 'https://www.instagram.com/shubh.__19/',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    ariaLabel: 'Send an email',
    href: 'mailto:youremail@example.com?subject=Hello from MiniPlay Hub',
    external: false,
  },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#171427]/82 py-10 backdrop-blur">
      <div className="section-wrap grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-slate-50">MiniPlay Hub</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
            Fast, colorful browser games for tiny breaks, friendly rivalries, and one-more-round
            energy.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Explore
          </h3>
          <div className="grid gap-2 text-sm font-semibold text-slate-300">
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
            {socialLinks.map(({ icon: Icon, label, ariaLabel, href, external }) => (
              <a
                key={label}
                className="grid size-11 place-items-center rounded-2xl bg-white/10 text-slate-100 shadow transition hover:-translate-y-0.5 hover:text-coral"
                href={href}
                aria-label={ariaLabel}
                title={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
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
