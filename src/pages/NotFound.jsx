import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="section-wrap grid min-h-[50vh] place-items-center py-16 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-[#c96f82]">404</p>
        <h1 className="font-display text-4xl font-extrabold text-[#1F2937]">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          That route wandered off the board. Head back to the games and keep playing.
        </p>
        <Button to="/games" className="mt-6">
          Browse Games
        </Button>
      </div>
    </section>
  )
}
