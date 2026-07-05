import { RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from '../components/Button'

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return null
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const winner = useMemo(() => getWinner(board), [board])
  const isDraw = !winner && board.every(Boolean)
  const status = winner ? `Player ${winner} wins` : isDraw ? 'Draw game' : `Player ${currentPlayer}'s turn`

  const playMove = (index) => {
    if (board[index] || winner || isDraw) return
    setBoard((current) => {
      const next = [...current]
      next[index] = currentPlayer
      return next
    })
    setCurrentPlayer((player) => (player === 'X' ? 'O' : 'X'))
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow">
        <p className="font-bold text-[#1F2937]">{status}</p>
        <Button onClick={reset} variant="yellow">
          <RotateCcw size={18} /> Reset
        </Button>
      </div>
      <div className="grid aspect-square grid-cols-3 gap-3">
        {board.map((value, index) => (
          <button
            key={index}
            className="grid place-items-center rounded-2xl bg-white font-display text-6xl font-extrabold text-[#1F2937] shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#6aaecd]/30"
            type="button"
            aria-label={`Square ${index + 1}${value ? ` occupied by ${value}` : ''}`}
            onClick={() => playMove(index)}
          >
            <span className={value === 'O' ? 'text-[#5caeca]' : 'text-[#d97887]'}>
              {value}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
