import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../components/Button'

const size = 16
const startSnake = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
]
const startDirection = { x: 1, y: 0 }

const sameCell = (a, b) => a.x === b.x && a.y === b.y

function randomFood(snake) {
  const openCells = []
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!snake.some((cell) => sameCell(cell, { x, y }))) openCells.push({ x, y })
    }
  }
  return openCells[Math.floor(Math.random() * openCells.length)]
}

export default function Snake() {
  const [snake, setSnake] = useState(startSnake)
  const [food, setFood] = useState(() => randomFood(startSnake))
  const [direction, setDirection] = useState(startDirection)
  const [status, setStatus] = useState('playing')
  const touchStart = useRef(null)
  const directionRef = useRef(startDirection)

  const score = snake.length - startSnake.length

  const changeDirection = useCallback(
    (nextDirection) => {
      if (status !== 'playing') return
      const current = directionRef.current
      if (current.x + nextDirection.x === 0 && current.y + nextDirection.y === 0) return
      directionRef.current = nextDirection
      setDirection(nextDirection)
    },
    [status],
  )

  const restart = () => {
    directionRef.current = startDirection
    setSnake(startSnake)
    setFood(randomFood(startSnake))
    setDirection(startDirection)
    setStatus('playing')
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      const controls = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const next = controls[event.key]
      if (next) {
        event.preventDefault()
        changeDirection(next)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [changeDirection])

  useEffect(() => {
    if (status !== 'playing') return undefined

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0]
        const nextHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        }
        const hitWall =
          nextHead.x < 0 || nextHead.x >= size || nextHead.y < 0 || nextHead.y >= size
        const ateFood = sameCell(nextHead, food)
        const nextBody = ateFood ? currentSnake : currentSnake.slice(0, -1)
        const hitSelf = nextBody.some((cell) => sameCell(cell, nextHead))

        if (hitWall || hitSelf) {
          setStatus('lost')
          return currentSnake
        }

        const nextSnake = [nextHead, ...nextBody]
        if (ateFood) setFood(randomFood(nextSnake))
        return nextSnake
      })
    }, 140)

    return () => window.clearInterval(timer)
  }, [food, status])

  const cells = useMemo(() => {
    return Array.from({ length: size * size }, (_, index) => ({
      x: index % size,
      y: Math.floor(index / size),
    }))
  }, [])

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStart.current.x
    const dy = touch.clientY - touchStart.current.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
    changeDirection(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) })
  }

  const controls = [
    { label: 'Up', icon: ArrowUp, direction: { x: 0, y: -1 }, slot: 'col-start-2' },
    { label: 'Left', icon: ArrowLeft, direction: { x: -1, y: 0 }, slot: 'col-start-1 row-start-2' },
    { label: 'Down', icon: ArrowDown, direction: { x: 0, y: 1 }, slot: 'col-start-2 row-start-2' },
    { label: 'Right', icon: ArrowRight, direction: { x: 1, y: 0 }, slot: 'col-start-3 row-start-2' },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow">
          <p className="font-bold">Score: {score}</p>
          <p className="font-bold text-[#FF6B9D]">
            {status === 'lost' ? 'Game Over' : `Direction: ${direction.x ? 'Horizontal' : 'Vertical'}`}
          </p>
        </div>
        <div
          className="game-stage mx-auto grid aspect-square w-full max-w-[560px] gap-1 rounded-2xl bg-[#1F2937] p-2 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="application"
          aria-label="Snake board"
        >
          {cells.map((cell) => {
            const segmentIndex = snake.findIndex((part) => sameCell(part, cell))
            const isFood = sameCell(food, cell)
            return (
              <div
                key={`${cell.x}-${cell.y}`}
                className={`aspect-square rounded-md ${
                  segmentIndex === 0
                    ? 'bg-[#FFD93D]'
                    : segmentIndex > 0
                      ? 'bg-[#8BE87E]'
                      : isFood
                        ? 'bg-[#FF6B9D]'
                        : 'bg-white/10'
                }`}
              />
            )
          })}
        </div>
      </div>
      <aside className="grid content-start gap-4">
        <div className="grid grid-cols-3 gap-2">
          {controls.map(({ label, icon: Icon, direction: nextDirection, slot }) => (
            <button
              key={label}
              className={`${slot} grid size-16 place-items-center rounded-2xl bg-white text-[#1F2937] shadow transition hover:scale-105 active:scale-95`}
              type="button"
              aria-label={label}
              onClick={() => changeDirection(nextDirection)}
            >
              <Icon size={26} />
            </button>
          ))}
        </div>
        <Button onClick={restart} variant="yellow">
          Restart Snake
        </Button>
      </aside>
    </div>
  )
}
