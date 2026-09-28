import { PartyPopper, RotateCcw, Home } from 'lucide-react'
import Button from '../common/Button.jsx'
import Card from '../common/Card.jsx'

export default function GameResult({
  targetNumber,
  attempts,
  score,
  onPlayAgain,
  onBackToDashboard,
  playAgainLabel = 'Play Again',
  showPlayAgain = true,
}) {
  return (
    <Card className="game-result">
      <PartyPopper size={32} aria-hidden="true" />
      <h2>You Got It!</h2>
      <p>
        The number was <strong>{targetNumber}</strong>.
      </p>

      <div className="game-result-stats">
        <div>
          <span className="game-result-value">{attempts}</span>
          <span className="game-result-label">Attempts</span>
        </div>
        <div>
          <span className="game-result-value">{score ?? '—'}</span>
          <span className="game-result-label">Best Score</span>
        </div>
      </div>

      <div className="game-result-actions">
        {showPlayAgain && (
          <Button onClick={onPlayAgain}>
            <RotateCcw size={16} aria-hidden="true" />
            {playAgainLabel}
          </Button>
        )}
        <Button variant="secondary" onClick={onBackToDashboard}>
          <Home size={16} aria-hidden="true" />
          Back to Dashboard
        </Button>
      </div>
    </Card>
  )
}