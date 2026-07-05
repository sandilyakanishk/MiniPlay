import { ChevronDown, RotateCcw } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { getGameById } from '../data/gamesList'

const gameComponents = {
  snake: lazy(() => import('../games/Snake')),
  'tic-tac-toe': lazy(() => import('../games/TicTacToe')),
  'memory-match': lazy(() => import('../games/MemoryMatch')),
  'rock-paper-scissors': lazy(() => import('../games/RockPaperScissors')),
  'number-guess': lazy(() => import('../games/NumberGuess')),
  'whack-a-mole': lazy(() => import('../games/WhackAMole')),
  2048: lazy(() => import('../games/Game2048')),
  'flappy-bird': lazy(() => import('../games/FlappyBird')),
  'simon-says': lazy(() => import('../games/SimonSays')),
  'typing-speed': lazy(() => import('../games/TypingSpeed')),
}

const instructions = {
  snake: 'Use arrow keys, WASD, swipe gestures, or the on-screen pad to steer. Eat food, grow longer, and avoid walls or your own tail.',
  'tic-tac-toe': 'Two players take turns placing X and O. Tap or focus a square and press Enter or Space. First three in a row wins.',
  'memory-match': 'Flip two cards at a time with taps, clicks, or keyboard focus. Match every pair to win with the fewest moves.',
  'rock-paper-scissors': 'Choose rock, paper, or scissors with touch, click, or keyboard focus. First to three round wins takes the match.',
  'number-guess': 'Type a number from 1 to 100, submit it, and use the feedback to narrow down the secret number.',
  'whack-a-mole': 'Tap any mole that pops up across the nine holes before it disappears. You have 60 seconds.',
  2048: 'Use arrow keys or swipe to slide tiles. Matching numbers merge. Reach 2048 or play for your best score.',
  'flappy-bird': 'Tap, click, or press Space to flap through each gap. Avoid the pipes and edges.',
  'simon-says': 'Watch the glowing color sequence, then repeat it by tapping the panels in the same order.',
  'typing-speed': 'Start typing the shown sentence. The timer begins on your first keystroke and stops on a perfect match.',
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
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-400">
        <Link className="hover:text-sky" to="/">
          Home
        </Link>
        <span>/</span>
        <Link className="hover:text-sky" to="/games">
          Games
        </Link>
        <span>/</span>
        <span className="text-slate-100">{game.name}</span>
      </nav>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link className="text-sm font-bold text-[#c96f82]" to="/games">
            Back to Games
          </Link>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-slate-50">
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

      <div className="mb-5 overflow-hidden rounded-2xl bg-[#2A2640] shadow">
        <button
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold text-slate-100 md:hidden"
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
          <p className="text-sm leading-6 text-slate-300">{instructions[game.id]}</p>
        </div>
      </div>

      <div className="play-card rounded-2xl p-3 sm:p-5">
        <Suspense
          fallback={
            <div className="grid min-h-64 place-items-center text-sm font-bold text-slate-300">
              Loading game...
            </div>
          }
        >
          <GameComponent key={restartKey} />
        </Suspense>
      </div>
    </section>
  )
}
