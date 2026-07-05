import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const size = 16
const gridWidth = size
const gridHeight = size
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
  const pendingDirectionRef = useRef(startDirection)

  const score = snake.length - startSnake.length

  const changeDirection = useCallback(
    (nextDirection) => {
      if (status !== 'playing') return
      const current = directionRef.current
      if (current.x + nextDirection.x === 0 && current.y + nextDirection.y === 0) return
      pendingDirectionRef.current = nextDirection
      setDirection(nextDirection)
    },
    [status],
  )

  const restart = () => {
    directionRef.current = startDirection
    pendingDirectionRef.current = startDirection
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
        directionRef.current = pendingDirectionRef.current
        const nextHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        }
        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= gridWidth ||
          nextHead.y < 0 ||
          nextHead.y >= gridHeight
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
    return Array.from({ length: gridWidth * gridHeight }, (_, index) => ({
      x: index % gridWidth,
      y: Math.floor(index / gridWidth),
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
    changeDirection(
      Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) },
    )
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
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 text-slate-100 shadow">
          <p className="font-bold">Score: {score}</p>
          <p className="font-bold text-[#c96f82]">
            {status === 'lost' ? 'Game Over' : `Direction: ${direction.x ? 'Horizontal' : 'Vertical'}`}
          </p>
        </div>
        {status === 'lost' && <ResultSticker type="gameover" />}
        <div
          className="game-stage mx-auto grid aspect-square w-full max-w-[560px] gap-1 rounded-2xl bg-[#120f1f] p-2 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))` }}
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
                    ? 'bg-[#e8c979]'
                    : segmentIndex > 0
                      ? 'bg-[#83c98b]'
                      : isFood
                        ? 'bg-[#d97887]'
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
              className={`${slot} grid size-16 place-items-center rounded-2xl bg-[#171427] text-slate-100 shadow transition hover:scale-105 active:scale-95`}
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
