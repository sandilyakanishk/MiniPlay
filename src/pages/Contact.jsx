import { Camera, Code2, Mail, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'

const initialForm = { name: '', email: '', message: '' }
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

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (form.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    console.log('MiniPlay contact message:', form)
    setSent(true)
    setForm(initialForm)
  }

  return (
    <section className="section-wrap grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#c96f82]">
          Say hello
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-tight text-slate-50">
          Got an idea for the next mini-game?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
          Send a note, suggest a game, or share a tiny improvement. For v1, this form validates
          locally and shows a confirmation.
        </p>
        <div className="mt-6 flex gap-3">
          {socialLinks.map(({ icon: Icon, label, ariaLabel, href, external }) => (
            <a
              key={label}
              className="grid size-12 place-items-center rounded-2xl bg-white/10 text-slate-100 shadow transition hover:-translate-y-0.5 hover:text-coral"
              href={href}
              aria-label={ariaLabel}
              title={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <Icon size={21} />
            </a>
          ))}
        </div>
      </div>

      <form className="play-card rounded-2xl p-5 sm:p-7" onSubmit={handleSubmit} noValidate>
        {['name', 'email'].map((field) => (
          <label key={field} className="mb-5 block">
            <span className="mb-2 block text-sm font-bold capitalize text-slate-200">{field}</span>
            <input
              className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#171427] px-4 text-slate-100 outline-none transition focus:border-[#6aaecd] focus:ring-4 focus:ring-[#6aaecd]/20"
              type={field === 'email' ? 'email' : 'text'}
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
            />
            {errors[field] && <p className="mt-2 text-sm font-semibold text-rose-600">{errors[field]}</p>}
          </label>
        ))}
        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-bold text-slate-200">Message</span>
          <textarea
            className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-[#171427] px-4 py-3 text-slate-100 outline-none transition focus:border-[#6aaecd] focus:ring-4 focus:ring-[#6aaecd]/20"
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
          {errors.message && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.message}</p>}
        </label>
        <Button type="submit">
          <Send size={18} /> Send Message
        </Button>
        {sent && (
          <p className="mt-4 rounded-2xl bg-[#83c98b]/25 px-4 py-3 text-sm font-bold text-green-100">
            Message sent. Thanks for reaching out.
          </p>
        )}
      </form>
    </section>
  )
}
