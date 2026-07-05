import { RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const holeCount = 9
const duration = 60

export default function WhackAMole() {
  const [activeHole, setActiveHole] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [status, setStatus] = useState('playing')
  const moleTimerRef = useRef(null)
  const clockRef = useRef(null)

  const clearTimers = () => {
    window.clearTimeout(moleTimerRef.current)
    window.clearInterval(clockRef.current)
  }

  const restart = () => {
    clearTimers()
    setActiveHole(null)
    setScore(0)
    setTimeLeft(duration)
    setStatus('playing')
  }

  useEffect(() => {
    if (status !== 'playing') return undefined

    clockRef.current = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearTimers()
          setStatus('finished')
          setActiveHole(null)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(clockRef.current)
  }, [status])

  useEffect(() => {
    if (status !== 'playing') return undefined

    const popMole = () => {
      setActiveHole(Math.floor(Math.random() * holeCount))
      const speed = Math.max(420, 1050 - (duration - timeLeft) * 10)
      moleTimerRef.current = window.setTimeout(popMole, speed)
    }

    popMole()
    return () => window.clearTimeout(moleTimerRef.current)
  }, [status, timeLeft])

  const whack = (index) => {
    if (status !== 'playing' || index !== activeHole) return
    setScore((value) => value + 1)
    setActiveHole(null)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold text-slate-100">
          <p>Score: {score}</p>
          <p>Time: {timeLeft}s</p>
          <p className="text-coral">{status === 'finished' ? 'Final Score' : 'Tap the mole'}</p>
        </div>
        <Button onClick={restart} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      {status === 'finished' && <ResultSticker type="win" label="Final score celebration sticker" />}

      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: holeCount }, (_, index) => (
          <button
            key={index}
            className="grid aspect-square min-h-24 place-items-center rounded-2xl bg-[#171427] shadow-inner ring-1 ring-white/10 transition active:scale-95"
            type="button"
            aria-label={index === activeHole ? 'Whack mole' : 'Empty hole'}
            onClick={() => whack(index)}
          >
            <span
              className={`grid size-16 place-items-center rounded-full border-4 border-[#1F2937] bg-[#8b6a54] text-3xl shadow-lg transition duration-150 ${
                index === activeHole ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-75 opacity-0'
              }`}
            >
              o
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
