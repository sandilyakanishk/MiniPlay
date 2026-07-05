import { RotateCcw, Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const makeTarget = (previousTarget) => {
  let nextTarget = Math.floor(Math.random() * 100) + 1
  while (previousTarget && nextTarget === previousTarget) {
    nextTarget = Math.floor(Math.random() * 100) + 1
  }
  return nextTarget
}

export default function NumberGuess() {
  const [target, setTarget] = useState(() => makeTarget())
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('Make your first guess.')
  const [error, setError] = useState('')
  const [won, setWon] = useState(false)

  const submitGuess = (event) => {
    event.preventDefault()
    const value = Number(guess)
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      setError('Enter a whole number from 1 to 100.')
      return
    }

    setError('')
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
    setTarget((currentTarget) => makeTarget(currentTarget))
    setGuess('')
    setAttempts(0)
    setFeedback('Make your first guess.')
    setError('')
    setWon(false)
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="font-bold text-slate-100">
          <p>Attempts: {attempts}</p>
          <p className="text-[#c96f82]">{won ? 'You Win' : 'Guess 1 to 100'}</p>
        </div>
        <Button onClick={reset} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      {won && <ResultSticker type="win" />}

      <form className="rounded-2xl bg-[#171427] p-5 shadow" onSubmit={submitGuess}>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-200">Your guess</span>
          <input
            className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#100d1c] px-4 text-2xl font-bold text-slate-100 outline-none transition focus:border-[#6aaecd] focus:ring-4 focus:ring-[#6aaecd]/20"
            type="number"
            min="1"
            max="100"
            inputMode="numeric"
            value={guess}
            disabled={won}
            onChange={(event) => {
              setGuess(event.target.value)
              if (error) setError('')
            }}
          />
        </label>
        {error && <p className="mt-2 text-sm font-semibold text-rose-600">{error}</p>}
        <Button className="mt-4 w-full" type="submit" disabled={won}>
          <Send size={18} /> Submit Guess
        </Button>
      </form>

      <div className="mt-5 rounded-2xl bg-sunny/90 p-5 text-center shadow">
        <p className="font-display text-3xl font-extrabold text-[#1F2937]">{feedback}</p>
      </div>
    </div>
  )
}
