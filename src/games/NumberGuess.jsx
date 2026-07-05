import { RotateCcw, Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'

const makeTarget = () => Math.floor(Math.random() * 100) + 1

export default function NumberGuess() {
  const [target, setTarget] = useState(makeTarget)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('Make your first guess.')
  const [won, setWon] = useState(false)

  const submitGuess = (event) => {
    event.preventDefault()
    const value = Number(guess)
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      setFeedback('Enter a whole number from 1 to 100.')
      return
    }

    setAttempts((count) => count + 1)
    if (value === target) {
      setFeedback(`You Win. ${value} was the secret number.`)
      setWon(true)
    } else {
      setFeedback(value > target ? 'Too high. Try a smaller number.' : 'Too low. Try a bigger number.')
    }
    setGuess('')
  }

  const reset = () => {
    setTarget(makeTarget())
    setGuess('')
    setAttempts(0)
    setFeedback('Make your first guess.')
    setWon(false)
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow">
        <div className="font-bold">
          <p>Attempts: {attempts}</p>
          <p className="text-[#FF6B9D]">{won ? 'You Win' : 'Guess 1 to 100'}</p>
        </div>
        <Button onClick={reset} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>

      <form className="rounded-2xl bg-white p-5 shadow" onSubmit={submitGuess}>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Your guess</span>
          <input
            className="min-h-14 w-full rounded-2xl border border-slate-200 px-4 text-2xl font-bold outline-none transition focus:border-[#5DC1F0] focus:ring-4 focus:ring-[#5DC1F0]/20"
            type="number"
            min="1"
            max="100"
            inputMode="numeric"
            value={guess}
            disabled={won}
            onChange={(event) => setGuess(event.target.value)}
          />
        </label>
        <Button className="mt-4 w-full" type="submit" disabled={won}>
          <Send size={18} /> Submit Guess
        </Button>
      </form>

      <div className="mt-5 rounded-2xl bg-[#FFD93D]/55 p-5 text-center shadow">
        <p className="font-display text-3xl font-extrabold text-[#1F2937]">{feedback}</p>
      </div>
    </div>
  )
}
