import winSticker from '../assets/doodle-decor/win-sticker.webp'
import winStickerPng from '../assets/doodle-decor/win-sticker.png'
import gameOverSticker from '../assets/doodle-decor/game-over-sticker.webp'
import gameOverStickerPng from '../assets/doodle-decor/game-over-sticker.png'

export default function ResultSticker({ type, label }) {
  const isWin = type === 'win'

  return (
    <div className="my-4 flex justify-center">
      <picture>
        <source srcSet={isWin ? winSticker : gameOverSticker} type="image/webp" />
        <img
          className="w-40 rounded-2xl drop-shadow-2xl"
          src={isWin ? winStickerPng : gameOverStickerPng}
          alt={label || (isWin ? 'Win celebration sticker' : 'Game over sticker')}
          width="400"
          height="300"
        />
      </picture>
    </div>
  )
}
