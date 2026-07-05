import { RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const pads = [
  { id: 0, label: 'Coral', className: 'bg-coral' },
  { id: 1, label: 'Sky', className: 'bg-sky' },
  { id: 2, label: 'Lime', className: 'bg-lime' },
  { id: 3, label: 'Yellow', className: 'bg-sunny' },
]

export default function SimonSays() {
  const [sequence, setSequence] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [activePad, setActivePad] = useState(null)
  const [status, setStatus] = useState('ready')
  const [round, setRound] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
  }

  const playSequence = (nextSequence) => {
    setStatus('watch')
    setPlayerIndex(0)
    clearTimers()
    nextSequence.forEach((pad, index) => {
      timers.current.push(
        window.setTimeout(() => setActivePad(pad), 520 * index),
        window.setTimeout(() => setActivePad(null), 520 * index + 310),
      )
    })
    timers.current.push(window.setTimeout(() => setStatus('repeat'), nextSequence.length * 520 + 120))
  }

  const startRound = (baseSequence = []) => {
    const nextSequence = [...baseSequence, Math.floor(Math.random() * pads.length)]
    setSequence(nextSequence)
    setRound(nextSequence.length)
    playSequence(nextSequence)
  }

  const restart = () => {
    clearTimers()
    setSequence([])
    setPlayerIndex(0)
    setActivePad(null)
    setRound(0)
    startRound([])
  }

  useEffect(() => {
    restart()
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pressPad = (padId) => {
    if (status !== 'repeat') return
    setActivePad(padId)
    timers.current.push(window.setTimeout(() => setActivePad(null), 180))

    if (sequence[playerIndex] !== padId) {
      setStatus('lost')
      return
    }

    if (playerIndex === sequence.length - 1) {
      timers.current.push(window.setTimeout(() => startRound(sequence), 520))
    } else {
      setPlayerIndex((index) => index + 1)
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold text-slate-100">
          <p>Round: {round}</p>
          <p className="text-coral">
            {status === 'lost' ? `Game Over. You reached round ${round}` : status === 'watch' ? 'Watch' : 'Repeat'}
          </p>
        </div>
        <Button onClick={restart} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      {status === 'lost' && <ResultSticker type="gameover" />}
      <div className="grid grid-cols-2 gap-4">
        {pads.map((pad) => (
          <button
            key={pad.id}
            className={`aspect-square rounded-2xl ${pad.className} shadow-lg transition active:scale-95 ${
              activePad === pad.id ? 'scale-105 brightness-125 ring-4 ring-white' : 'brightness-90'
            }`}
            type="button"
            aria-label={pad.label}
            onClick={() => pressPad(pad.id)}
          />
        ))}
      </div>
    </div>
  )
}
