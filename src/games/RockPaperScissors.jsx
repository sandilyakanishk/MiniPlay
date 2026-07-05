import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'

const choices = [
  { id: 'rock', label: 'Rock', beats: 'scissors' },
  { id: 'paper', label: 'Paper', beats: 'rock' },
  { id: 'scissors', label: 'Scissors', beats: 'paper' },
]

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [round, setRound] = useState(null)
  const [revealing, setRevealing] = useState(false)
  const matchOver = playerScore >= 3 || computerScore >= 3

  const play = (choice) => {
    if (revealing || matchOver) return
    setRevealing(true)
    const computer = choices[Math.floor(Math.random() * choices.length)]

    window.setTimeout(() => {
      let result = 'Tie round'
      if (choice.beats === computer.id) {
        result = 'You win the round'
        setPlayerScore((score) => score + 1)
      } else if (computer.beats === choice.id) {
        result = 'Computer wins the round'
        setComputerScore((score) => score + 1)
      }
      setRound({ player: choice.label, computer: computer.label, result })
      setRevealing(false)
    }, 420)
  }

  const reset = () => {
    setPlayerScore(0)
    setComputerScore(0)
    setRound(null)
    setRevealing(false)
  }

  const status = matchOver
    ? playerScore > computerScore
      ? 'You Win'
      : 'Game Over'
    : revealing
      ? 'Revealing...'
      : round?.result || 'Best of five: first to 3'

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold">
          <p>You: {playerScore}</p>
          <p>Computer: {computerScore}</p>
          <p className="text-[#FF6B9D]">{status}</p>
        </div>
        <Button onClick={reset} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {choices.map((choice) => (
          <button
            key={choice.id}
            className="rounded-2xl bg-white p-6 text-center shadow transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#5DC1F0]/30 disabled:opacity-60"
            type="button"
            disabled={revealing || matchOver}
            onClick={() => play(choice)}
          >
            <span className="font-display text-4xl font-extrabold text-[#1F2937]">
              {choice.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-white p-5 text-center shadow">
        <p className={`font-display text-3xl font-extrabold text-[#1F2937] transition ${revealing ? 'scale-105 opacity-60' : ''}`}>
          {round ? `${round.player} vs ${round.computer}` : 'Choose your move'}
        </p>
      </div>
    </div>
  )
}
