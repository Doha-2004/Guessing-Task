import { Target } from 'lucide-react'

export default function GameHeader({ title, description, attempts }) {
  return (
    <div className="game-header">
      <div className="game-header-title">
        <Target size={22} aria-hidden="true" />
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="game-header-meta">
        <span>Attempts: {attempts}</span>
      </div>
    </div>
  )
}
