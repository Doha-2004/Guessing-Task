import { ArrowUp, ArrowDown, Check } from 'lucide-react'
import { FEEDBACK_TYPE } from '../../utils/constants'

const FEEDBACK_CONFIG = {
  [FEEDBACK_TYPE.HIGHER]: {
    icon: ArrowUp,
    title: 'Higher',
    description: 'The hidden number is higher than your guess.',
  },
  [FEEDBACK_TYPE.LOWER]: {
    icon: ArrowDown,
    title: 'Lower',
    description: 'The hidden number is lower than your guess.',
  },
  [FEEDBACK_TYPE.CORRECT]: {
    icon: Check,
    title: 'Correct!',
    description: 'You found the hidden number.',
  },
}

export default function GuessFeedback({ feedback }) {
  if (!feedback) return null

  const config = FEEDBACK_CONFIG[feedback]
  if (!config) return null

  const Icon = config.icon

  return (
    <div className={`guess-feedback guess-feedback-${feedback}`} role="status">
      <Icon size={20} aria-hidden="true" />
      <div>
        <p className="guess-feedback-title">{config.title}</p>
        <p className="guess-feedback-description">{config.description}</p>
      </div>
    </div>
  )
}
