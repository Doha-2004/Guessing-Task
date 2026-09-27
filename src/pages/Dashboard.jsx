import { useEffect, useState } from 'react'
import { Trophy, Gamepad2, CheckCircle2, Flame, Calendar } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import WelcomeSection from '../components/dashboard/WelcomeSection.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import GameModeCard from '../components/dashboard/GameModeCard.jsx'
import { useAuth } from '../hooks/useAuth'
import { getStats } from '../utils/stats'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState(getStats(currentUser?.id))

  useEffect(() => {
    setStats(getStats(currentUser?.id))
  }, [currentUser])

  return (
    <PageContainer>
      <WelcomeSection name={currentUser?.name?.split(' ')[0] || 'Player'} />

      <section className="stats-grid">
        <StatsCard icon={Trophy} label="Best Score" value={stats.bestScore} />
        <StatsCard icon={Gamepad2} label="Games Played" value={stats.gamesPlayed} />
        <StatsCard icon={CheckCircle2} label="Games Won" value={stats.gamesWon} />
        <StatsCard icon={Flame} label="Daily Streak" value={stats.dailyStreak} />
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
