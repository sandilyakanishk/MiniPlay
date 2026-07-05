import { ChevronDown, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { getGameById } from '../data/gamesList'
import Snake from '../games/Snake'
import TicTacToe from '../games/TicTacToe'
import MemoryMatch from '../games/MemoryMatch'
import RockPaperScissors from '../games/RockPaperScissors'
import NumberGuess from '../games/NumberGuess'

const gameComponents = {
  snake: Snake,
  'tic-tac-toe': TicTacToe,
  'memory-match': MemoryMatch,
  'rock-paper-scissors': RockPaperScissors,
  'number-guess': NumberGuess,
}

const instructions = {
  snake: 'Use arrow keys, WASD, swipe gestures, or the on-screen pad to steer. Eat food, grow longer, and avoid walls or your own tail.',
  'tic-tac-toe': 'Two players take turns placing X and O. Tap or focus a square and press Enter or Space. First three in a row wins.',
  'memory-match': 'Flip two cards at a time with taps, clicks, or keyboard focus. Match every pair to win with the fewest moves.',
  'rock-paper-scissors': 'Choose rock, paper, or scissors with touch, click, or keyboard focus. First to three round wins takes the match.',
  'number-guess': 'Type a number from 1 to 100, submit it, and use the feedback to narrow down the secret number.',
}

export default function GamePage() {
  const { gameId } = useParams()
  const [restartKey, setRestartKey] = useState(0)
  const [showInstructions, setShowInstructions] = useState(false)
  const game = getGameById(gameId)
  const GameComponent = gameComponents[gameId]

  if (!game || !GameComponent) {
    return <Navigate to="/games" replace />
  }

  return (
    <section className="section-wrap py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link className="text-sm font-bold text-[#FF6B9D]" to="/games">
            Back to Games
          </Link>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-[#1F2937]">
            {game.name}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button to="/games" variant="ghost">
            Back
          </Button>
          <Button variant="yellow" onClick={() => setRestartKey((key) => key + 1)}>
            <RotateCcw size={18} /> Restart
          </Button>
        </div>
      </div>

      <div className="mb-5 overflow-hidden rounded-2xl bg-white/80 shadow">
        <button
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold md:hidden"
          type="button"
          onClick={() => setShowInstructions((value) => !value)}
        >
          Instructions
          <ChevronDown
            className={`transition ${showInstructions ? 'rotate-180' : ''}`}
            size={20}
          />
        </button>
        <div className={`${showInstructions ? 'block' : 'hidden'} px-5 pb-5 md:block md:p-5`}>
          <p className="text-sm leading-6 text-slate-600">{instructions[game.id]}</p>
        </div>
      </div>

      <div className="play-card rounded-2xl p-3 sm:p-5">
        <GameComponent key={restartKey} />
      </div>
    </section>
  )
}
