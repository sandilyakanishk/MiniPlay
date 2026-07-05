import { Rocket, SmilePlus, Trophy } from 'lucide-react'

export default function About() {
  const sections = [
    {
      icon: SmilePlus,
      title: 'What this site is',
      text: 'MiniPlay Hub is a lightweight playground of browser games that start instantly and run entirely in React state.',
    },
    {
      icon: Trophy,
      title: 'Why it is fun',
      text: 'Each game is small enough for a quick break, but polished enough for rematches on desktop, tablet, or phone.',
    },
    {
      icon: Rocket,
      title: 'Future plans',
      text: 'The structure leaves room for leaderboards, sound effects, daily challenges, score saving, and a PWA wrapper.',
    },
  ]

  return (
    <section className="section-wrap py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5DC1F0]">
          About MiniPlay
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-tight text-[#1F2937]">
          A cheerful digital playground for quick games.
        </h1>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sections.map(({ icon: Icon, title, text }) => (
          <article key={title} className="play-card rounded-2xl p-6">
            <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-[#FFD93D]/70">
              <Icon size={28} />
            </span>
            <h2 className="font-display text-3xl font-extrabold text-[#1F2937]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
