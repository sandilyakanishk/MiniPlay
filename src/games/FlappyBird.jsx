import { RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const width = 360
const height = 480
const birdX = 80
const birdSize = 24

export default function FlappyBird() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stateRef = useRef(null)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('ready')

  const resetState = useCallback(() => {
    stateRef.current = {
      birdY: 210,
      velocity: 0,
      pipes: [{ x: 390, gapY: 170, passed: false }],
      lastPipe: 0,
      score: 0,
      status: 'playing',
    }
    setScore(0)
    setStatus('playing')
  }, [])

  const flap = useCallback(() => {
    if (!stateRef.current || stateRef.current.status !== 'playing') {
      resetState()
      return
    }
    stateRef.current.velocity = -7
  }, [resetState])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    resetState()

    const draw = () => {
      const state = stateRef.current
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#171427'
      context.fillRect(0, 0, width, height)

      if (state.status === 'playing') {
        state.velocity += 0.35
        state.birdY += state.velocity
        state.lastPipe += 1
        if (state.lastPipe > 95) {
          state.pipes.push({ x: width + 40, gapY: 110 + Math.random() * 220, passed: false })
          state.lastPipe = 0
        }
        state.pipes.forEach((pipe) => {
          pipe.x -= 2.4
          if (!pipe.passed && pipe.x + 52 < birdX) {
            pipe.passed = true
            state.score += 1
            setScore(state.score)
          }
        })
        state.pipes = state.pipes.filter((pipe) => pipe.x > -70)

        const hitWall = state.birdY < 0 || state.birdY + birdSize > height
        const hitPipe = state.pipes.some((pipe) => {
          const inX = birdX + birdSize > pipe.x && birdX < pipe.x + 52
          const inGap = state.birdY > pipe.gapY && state.birdY + birdSize < pipe.gapY + 130
          return inX && !inGap
        })
        if (hitWall || hitPipe) {
          state.status = 'lost'
          setStatus('lost')
        }
      }

      context.fillStyle = '#83c98b'
      state.pipes.forEach((pipe) => {
        context.fillRect(pipe.x, 0, 52, pipe.gapY)
        context.fillRect(pipe.x, pipe.gapY + 130, 52, height - pipe.gapY - 130)
      })
      context.fillStyle = '#f0d48a'
      context.beginPath()
      context.arc(birdX + birdSize / 2, state.birdY + birdSize / 2, birdSize / 2, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = '#1F2937'
      context.beginPath()
      context.arc(birdX + 16, state.birdY + 8, 3, 0, Math.PI * 2)
      context.fill()
      animationRef.current = window.requestAnimationFrame(draw)
    }

    animationRef.current = window.requestAnimationFrame(draw)
    return () => window.cancelAnimationFrame(animationRef.current)
  }, [resetState])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        flap()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [flap])

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold text-slate-100">
          <p>Score: {score}</p>
          <p className="text-coral">{status === 'lost' ? 'Game Over' : 'Tap to flap'}</p>
        </div>
        <Button onClick={resetState} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      {status === 'lost' && <ResultSticker type="gameover" />}
      <button
        className="game-stage block w-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky/30"
        type="button"
        aria-label="Flap"
        onClick={flap}
      >
        <canvas
          ref={canvasRef}
          className="aspect-[3/4] w-full rounded-2xl shadow-inner"
          width={width}
          height={height}
        />
      </button>
    </div>
  )
}
