import { RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from '../components/Button'
import ResultSticker from '../components/ResultSticker'

const sentences = [
  'Mini games make tiny breaks feel brighter.',
  'Quick fingers can beat a clever timer.',
  'Play instantly and chase a better score.',
  'A calm mind wins the next round.',
  'Every tap can start a new challenge.',
]

const pickSentence = (previous) => {
  let next = sentences[Math.floor(Math.random() * sentences.length)]
  while (previous && next === previous) next = sentences[Math.floor(Math.random() * sentences.length)]
  return next
}

export default function TypingSpeed() {
  const [sentence, setSentence] = useState(() => pickSentence())
  const [typed, setTyped] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [finishedAt, setFinishedAt] = useState(null)

  const result = useMemo(() => {
    if (!startedAt || !finishedAt) return null
    const minutes = Math.max((finishedAt - startedAt) / 60000, 1 / 60000)
    const correctCharacters = typed
      .split('')
      .filter((character, index) => character === sentence[index]).length
    return {
      wpm: Math.round(sentence.trim().split(/\s+/).length / minutes),
      accuracy: Math.round((correctCharacters / sentence.length) * 100),
    }
  }, [finishedAt, sentence, startedAt, typed])

  const restart = () => {
    setSentence((current) => pickSentence(current))
    setTyped('')
    setStartedAt(null)
    setFinishedAt(null)
  }

  const updateTyped = (value) => {
    if (finishedAt) return
    if (!startedAt && value.length > 0) setStartedAt(Date.now())
    setTyped(value)
    if (value === sentence) setFinishedAt(Date.now())
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950/35 p-4 shadow">
        <div className="font-bold text-slate-100">
          <p>{result ? `WPM: ${result.wpm} - Accuracy: ${result.accuracy}%` : 'Type the sentence exactly'}</p>
          <p className="text-coral">{result ? 'You Win' : 'Timer starts on first key'}</p>
        </div>
        <Button onClick={restart} variant="yellow">
          <RotateCcw size={18} /> Try Again
        </Button>
      </div>
      {result && <ResultSticker type="win" />}
      <div className="rounded-2xl bg-[#171427] p-5 shadow-inner">
        <p className="mb-4 rounded-2xl bg-white/8 p-4 text-lg font-semibold leading-8 text-slate-100">
          {sentence}
        </p>
        <textarea
          className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-[#100d1c] px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky focus:ring-4 focus:ring-sky/20"
          value={typed}
          placeholder="Start typing..."
          disabled={Boolean(result)}
          onChange={(event) => updateTyped(event.target.value)}
        />
      </div>
    </div>
  )
}
