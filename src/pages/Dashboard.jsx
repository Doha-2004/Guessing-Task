import { Trophy, Gamepad2, CheckCircle2, Flame, Calendar } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import WelcomeSection from '../components/dashboard/WelcomeSection.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import GameModeCard from '../components/dashboard/GameModeCard.jsx'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { currentUser } = useAuth()

  // currentUser is the real ProfileResponse from GET /api/auth/me
  // (fetched by AuthContext), so these are live numbers, not mock data.
  const bestScore = currentUser?.bestScore ?? 0
  const gamesPlayed = currentUser?.gamesPlayed ?? 0
  const gamesWon = currentUser?.gamesWon ?? 0
  const dailyStreak = currentUser?.dailyStreak ?? 0

  return (
    <PageContainer>
      <WelcomeSection name={currentUser?.username || 'Player'} />

      <section className="stats-grid">
        <StatsCard icon={Trophy} label="Best Score" value={bestScore} />
        <StatsCard icon={Gamepad2} label="Games Played" value={gamesPlayed} />
        <StatsCard icon={CheckCircle2} label="Games Won" value={gamesWon} />
        <StatsCard icon={Flame} label="Daily Streak" value={dailyStreak} />
      </section>

      <section className="game-modes-grid">
        <GameModeCard
          icon={Gamepad2}
          title="Practice Mode"
          description="Guess a random number and sharpen your intuition with unlimited rounds."
          to="/practice"
          ctaLabel="Start Practice"
        />
        <GameModeCard
          icon={Calendar}
          title="Daily Challenge"
          description="One shared number, once a day. Keep your streak alive."
          to="/daily"
          ctaLabel="Play Today's Challenge"
        />
      </section>
    </PageContainer>
  )
}