import { RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'

const labels = ['SUN', 'MOON', 'STAR', 'SKY', 'LIME', 'MINT', 'QUIZ', 'PLAY']

function shuffleCards() {
  return [...labels, ...labels]
    .map((label, index) => ({ id: `${label}-${index}`, label, matched: false }))
    .sort(() => Math.random() - 0.5)
}

export default function MemoryMatch() {
  const [cards, setCards] = useState(() => shuffleCards())
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const won = cards.every((card) => card.matched)

  useEffect(() => {
    if (flipped.length !== 2) return undefined

    setLocked(true)
    setMoves((current) => current + 1)
    const [firstIndex, secondIndex] = flipped
    const isMatch = cards[firstIndex].label === cards[secondIndex].label

    const timer = window.setTimeout(() => {
      if (isMatch) {
        setCards((current) =>
          current.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, matched: true } : card,
          ),
        )
      }
      setFlipped([])
      setLocked(false)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [cards, flipped])

  const reset = () => {
    setCards(shuffleCards())
    setFlipped([])
    setMoves(0)
    setLocked(false)
  }

  const revealCard = (index) => {
    if (locked || flipped.length >= 2 || flipped.includes(index) || cards[index].matched || won) {
      return
    }
    setFlipped((current) => [...current, index])
  }

  const palette = useMemo(
    () => ['#d97887', '#5caeca', '#83c98b', '#e8c979', '#9d88c9', '#d98d63', '#79cdb4', '#1F2937'],
    [],
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold">
          <p>Moves: {moves}</p>
          <p className="text-[#c96f82]">{won ? 'You Win' : 'Match every pair'}</p>
        </div>
        <Button onClick={reset} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const isVisible = flipped.includes(index) || card.matched
          return (
            <button
              key={card.id}
              className={`aspect-square rounded-2xl text-center font-display text-sm font-extrabold shadow transition duration-200 sm:text-xl ${
                isVisible
                  ? 'scale-100 text-white'
                  : 'bg-white text-transparent hover:-translate-y-0.5'
              }`}
              style={isVisible ? { backgroundColor: palette[labels.indexOf(card.label)] } : undefined}
              type="button"
              aria-label={isVisible ? card.label : 'Hidden card'}
              onClick={() => revealCard(index)}
            >
              {isVisible ? card.label : 'PLAY'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
