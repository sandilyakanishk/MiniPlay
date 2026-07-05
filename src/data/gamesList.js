import snakeIcon from '../assets/doodle-icons/snake.webp'
import snakeIconPng from '../assets/doodle-icons/snake.png'
import ticTacToeIcon from '../assets/doodle-icons/tic-tac-toe.webp'
import ticTacToeIconPng from '../assets/doodle-icons/tic-tac-toe.png'
import memoryMatchIcon from '../assets/doodle-icons/memory-match.webp'
import memoryMatchIconPng from '../assets/doodle-icons/memory-match.png'
import rockPaperScissorsIcon from '../assets/doodle-icons/rock-paper-scissors.webp'
import rockPaperScissorsIconPng from '../assets/doodle-icons/rock-paper-scissors.png'
import numberGuessIcon from '../assets/doodle-icons/number-guess.webp'
import numberGuessIconPng from '../assets/doodle-icons/number-guess.png'
import whackAMoleIcon from '../assets/doodle-icons/whack-a-mole.webp'
import whackAMoleIconPng from '../assets/doodle-icons/whack-a-mole.png'
import tile2048Icon from '../assets/doodle-icons/2048.webp'
import tile2048IconPng from '../assets/doodle-icons/2048.png'
import flappyBirdIcon from '../assets/doodle-icons/flappy-bird.webp'
import flappyBirdIconPng from '../assets/doodle-icons/flappy-bird.png'
import simonSaysIcon from '../assets/doodle-icons/simon-says.webp'
import simonSaysIconPng from '../assets/doodle-icons/simon-says.png'
import typingSpeedIcon from '../assets/doodle-icons/typing-speed.webp'
import typingSpeedIconPng from '../assets/doodle-icons/typing-speed.png'

export const categories = ['All', 'Puzzle', 'Arcade', 'Classic', 'Quiz']

export const gamesList = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Guide the growing snake, grab snacks, and avoid crashes.',
    category: 'Arcade',
    thumbnail: snakeIcon,
    thumbnailFallback: snakeIconPng,
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
    thumbnailFallback: ticTacToeIconPng,
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
    thumbnailFallback: memoryMatchIconPng,
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
    thumbnailFallback: rockPaperScissorsIconPng,
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
    thumbnailFallback: numberGuessIconPng,
    thumbnailAlt: 'Number Guess game icon',
    gradient: 'from-[#5caebe] to-[#83c98b]',
    featured: false,
  },
  {
    id: 'whack-a-mole',
    name: 'Whack-a-Mole',
    description: 'Tap quick as moles pop up faster across nine holes.',
    category: 'Arcade',
    thumbnail: whackAMoleIcon,
    thumbnailFallback: whackAMoleIconPng,
    thumbnailAlt: 'Whack-a-Mole game icon',
    gradient: 'from-[#8fd39a] to-[#d98d63]',
    featured: false,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Swipe and merge number tiles toward the legendary 2048.',
    category: 'Puzzle',
    thumbnail: tile2048Icon,
    thumbnailFallback: tile2048IconPng,
    thumbnailAlt: '2048 game icon',
    gradient: 'from-[#e8c979] to-[#9d88c9]',
    featured: false,
  },
  {
    id: 'flappy-bird',
    name: 'Flappy Bird',
    description: 'Tap or press space to flap through shifting gaps.',
    category: 'Arcade',
    thumbnail: flappyBirdIcon,
    thumbnailFallback: flappyBirdIconPng,
    thumbnailAlt: 'Flappy Bird game icon',
    gradient: 'from-[#5caeca] to-[#83c98b]',
    featured: false,
  },
  {
    id: 'simon-says',
    name: 'Simon Says',
    description: 'Repeat the glowing color pattern as it grows each round.',
    category: 'Classic',
    thumbnail: simonSaysIcon,
    thumbnailFallback: simonSaysIconPng,
    thumbnailAlt: 'Simon Says game icon',
    gradient: 'from-[#d97887] to-[#5caeca]',
    featured: false,
  },
  {
    id: 'typing-speed',
    name: 'Typing Speed',
    description: 'Type a short sentence to measure WPM and accuracy.',
    category: 'Quiz',
    thumbnail: typingSpeedIcon,
    thumbnailFallback: typingSpeedIconPng,
    thumbnailAlt: 'Typing Speed Test game icon',
    gradient: 'from-[#9d88c9] to-[#5caeca]',
    featured: false,
  },
]

export const getGameById = (gameId) => gamesList.find((game) => game.id === gameId)
