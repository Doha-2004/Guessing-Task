import { useNavigate } from 'react-router-dom'
import Card from '../common/Card.jsx'

export default function GameModeCard({ icon: Icon, title, description, to, ctaLabel }) {
  const navigate = useNavigate()

  return (
    <Card className="game-mode-card">
      <Icon size={26} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" className="game-mode-cta" onClick={() => navigate(to)}>
        {ctaLabel}
      </button>
    </Card>
  )
}
