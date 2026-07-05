import snakeIcon from '../assets/game-icons/snake.png'
import ticTacToeIcon from '../assets/game-icons/tic-tac-toe.png'
import memoryMatchIcon from '../assets/game-icons/memory-match.png'
import rockPaperScissorsIcon from '../assets/game-icons/rock-paper-scissors.png'
import numberGuessIcon from '../assets/game-icons/number-guess.png'

export const categories = ['All', 'Puzzle', 'Arcade', 'Classic', 'Quiz']

export const gamesList = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Guide the growing snake, grab snacks, and avoid crashes.',
    category: 'Arcade',
    thumbnail: snakeIcon,
    thumbnailAlt: 'Snake game icon',
    gradient: 'from-[#7bcf88] to-[#56aeca]',
    featured: true,
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    description: 'A bright local two-player duel on a classic 3x3 board.',
    category: 'Classic',
    thumbnail: ticTacToeIcon,
    thumbnailAlt: 'Tic-Tac-Toe game icon',
    gradient: 'from-[#d97887] to-[#d99e63]',
    featured: true,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip tiles, remember icons, and clear the board in fewer moves.',
    category: 'Puzzle',
    thumbnail: memoryMatchIcon,
    thumbnailAlt: 'Memory Match game icon',
    gradient: 'from-[#9d88c9] to-[#69a9cf]',
    featured: true,
  },
  {
    id: 'rock-paper-scissors',
    name: 'Rock Paper Scissors',
    description: 'Pick your move and beat the computer in quick-fire rounds.',
    category: 'Classic',
    thumbnail: rockPaperScissorsIcon,
    thumbnailAlt: 'Rock Paper Scissors game icon',
    gradient: 'from-[#e2bd68] to-[#d98d63]',
    featured: true,
  },
  {
    id: 'number-guess',
    name: 'Number Guess',
    description: 'Find the secret number from 1 to 100 with smart clues.',
    category: 'Quiz',
    thumbnail: numberGuessIcon,
    thumbnailAlt: 'Number Guess game icon',
    gradient: 'from-[#5caebe] to-[#83c98b]',
    featured: false,
  },
]

export const getGameById = (gameId) => gamesList.find((game) => game.id === gameId)
