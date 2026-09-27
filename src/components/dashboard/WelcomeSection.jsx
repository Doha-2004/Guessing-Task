import { useNavigate } from 'react-router-dom'
import { Gamepad2, Calendar } from 'lucide-react'
import Button from '../common/Button.jsx'

export default function WelcomeSection({ name }) {
  const navigate = useNavigate()

  return (
    <section className="welcome-section">
      <p className="welcome-eyebrow">Welcome back, {name}</p>
      <h1>Ready for your next guess?</h1>
      <p className="welcome-subtitle">
        Challenge yourself, improve your score, and keep your streak alive.
      </p>
      <div className="welcome-actions">
        <Button onClick={() => navigate('/practice')}>
          <Gamepad2 size={18} aria-hidden="true" />
          Start Practice
        </Button>
        <Button variant="secondary" onClick={() => navigate('/daily')}>
          <Calendar size={18} aria-hidden="true" />
          Play Today's Challenge
        </Button>
      </div>
    </section>
  )
}
