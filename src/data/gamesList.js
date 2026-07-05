export const categories = ['All', 'Puzzle', 'Arcade', 'Classic', 'Quiz']

export const gamesList = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Guide the growing snake, grab snacks, and avoid crashes.',
    category: 'Arcade',
    thumbnail: 'S',
    gradient: 'from-[#8BE87E] to-[#5DC1F0]',
    featured: true,
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    description: 'A bright local two-player duel on a classic 3x3 board.',
    category: 'Classic',
    thumbnail: 'XO',
    gradient: 'from-[#FF6B9D] to-[#FFD93D]',
    featured: true,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip tiles, remember icons, and clear the board in fewer moves.',
    category: 'Puzzle',
    thumbnail: 'MM',
    gradient: 'from-[#B48DE0] to-[#5DC1F0]',
    featured: true,
  },
  {
    id: 'rock-paper-scissors',
    name: 'Rock Paper Scissors',
    description: 'Pick your move and beat the computer in quick-fire rounds.',
    category: 'Classic',
    thumbnail: 'RPS',
    gradient: 'from-[#FFD93D] to-[#FF9F68]',
    featured: true,
  },
  {
    id: 'number-guess',
    name: 'Number Guess',
    description: 'Find the secret number from 1 to 100 with smart clues.',
    category: 'Quiz',
    thumbnail: '42',
    gradient: 'from-[#5DC1F0] to-[#8BE87E]',
    featured: false,
  },
]

export const getGameById = (gameId) => gamesList.find((game) => game.id === gameId)
