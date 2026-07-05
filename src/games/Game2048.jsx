import { RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const boardSize = 4
const emptyBoard = () => Array.from({ length: boardSize }, () => Array(boardSize).fill(0))

function addRandomTile(board) {
  const empty = []
  board.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (!value) empty.push([rowIndex, columnIndex])
    })
  })
  if (empty.length === 0) return board
  const next = board.map((row) => [...row])
  const [row, column] = empty[Math.floor(Math.random() * empty.length)]
  next[row][column] = Math.random() < 0.9 ? 2 : 4
  return next
}

function newBoard() {
  return addRandomTile(addRandomTile(emptyBoard()))
}

function slideLine(line) {
  const values = line.filter(Boolean)
  const merged = []
  let gained = 0

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const value = values[index] * 2
      merged.push(value)
      gained += value
      index += 1
    } else {
      merged.push(values[index])
    }
  }

  while (merged.length < boardSize) merged.push(0)
  return { line: merged, gained }
}

function moveBoard(board, direction) {
  const next = emptyBoard()
  let gained = 0

  for (let index = 0; index < boardSize; index += 1) {
    let line
    if (direction === 'left' || direction === 'right') {
      line = board[index]
      if (direction === 'right') line = [...line].reverse()
      const result = slideLine(line)
      gained += result.gained
      next[index] = direction === 'right' ? result.line.reverse() : result.line
    } else {
      line = board.map((row) => row[index])
      if (direction === 'down') line = [...line].reverse()
      const result = slideLine(line)
      gained += result.gained
      const column = direction === 'down' ? result.line.reverse() : result.line
      column.forEach((value, rowIndex) => {
        next[rowIndex][index] = value
      })
    }
  }

  const changed = JSON.stringify(board) !== JSON.stringify(next)
  return { board: changed ? addRandomTile(next) : board, gained, changed }
}

function hasMoves(board) {
  if (board.some((row) => row.some((value) => value === 0))) return true
  return ['left', 'right', 'up', 'down'].some((direction) => moveBoard(board, direction).changed)
}

const tileColor = (value) => {
  const colors = {
    0: 'bg-[#171427] text-transparent',
    2: 'bg-[#efe2c2] text-[#1E1B2E]',
    4: 'bg-[#f0d48a] text-[#1E1B2E]',
    8: 'bg-[#d98d63] text-white',
    16: 'bg-[#d97887] text-white',
    32: 'bg-[#c96f82] text-white',
    64: 'bg-[#9d88c9] text-white',
    128: 'bg-[#5caeca] text-white',
    256: 'bg-[#83c98b] text-[#1E1B2E]',
    512: 'bg-[#6aaecd] text-white',
    1024: 'bg-[#e8c979] text-[#1E1B2E]',
    2048: 'bg-[#ffd86b] text-[#1E1B2E]',
  }
  return colors[value] || 'bg-[#ffef9a] text-[#1E1B2E]'
}

export default function Game2048() {
  const [board, setBoard] = useState(() => newBoard())
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('miniplay-2048-best') || 0))
  const [status, setStatus] = useState('playing')
  const touchStart = useRef(null)

  const makeMove = useCallback(
    (direction) => {
      if (status === 'lost') return
      setBoard((current) => {
        const result = moveBoard(current, direction)
        if (!result.changed) return current

        const nextScore = score + result.gained
        setScore(nextScore)
        if (nextScore > best) {
          setBest(nextScore)
          localStorage.setItem('miniplay-2048-best', String(nextScore))
        }
        if (result.board.some((row) => row.includes(2048))) setStatus('won')
        else if (!hasMoves(result.board)) setStatus('lost')
        return result.board
      })
    },
    [best, score, status],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      const keys = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
      if (!keys[event.key]) return
      event.preventDefault()
      makeMove(keys[event.key])
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [makeMove])

  const restart = () => {
    setBoard(newBoard())
    setScore(0)
    setStatus('playing')
  }

  const cells = useMemo(() => board.flat(), [board])

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStart.current.x
    const dy = touch.clientY - touchStart.current.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
    makeMove(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up')
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="flex flex-wrap gap-4 font-bold text-slate-100">
          <p>Score: {score}</p>
          <p>Best: {best}</p>
          <p className="text-coral">{status === 'won' ? 'You Win' : status === 'lost' ? 'Game Over' : 'Merge tiles'}</p>
        </div>
        <Button onClick={restart} variant="yellow">
          <RotateCcw size={18} /> Restart
        </Button>
      </div>
      {status === 'won' && <ResultSticker type="win" />}
      {status === 'lost' && <ResultSticker type="gameover" />}
      <div
        className="game-stage grid aspect-square grid-cols-4 gap-3 rounded-2xl bg-[#120f1f] p-3"
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={handleTouchEnd}
      >
        {cells.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className={`grid place-items-center rounded-2xl font-display text-3xl font-extrabold shadow ${tileColor(value)}`}
          >
            {value || ''}
          </div>
        ))}
      </div>
    </div>
  )
}
