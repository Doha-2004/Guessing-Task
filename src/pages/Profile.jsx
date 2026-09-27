import { User, Trophy, Gamepad2, CheckCircle2, Flame, Star } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/common/Card.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import { useAuth } from '../hooks/useAuth'
import { getStats } from '../utils/stats'

export default function Profile() {
  const { currentUser } = useAuth()
  const stats = getStats(currentUser?.id)

  const winRate =
    stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0

  return (
    <PageContainer>
      <Card className="profile-header">
        <div className="profile-avatar">
          <User size={28} aria-hidden="true" />
        </div>
        <div>
          <h1>{currentUser?.name}</h1>
          <p>{currentUser?.email}</p>
          <p className="profile-member-since">
            Member since {new Date(currentUser?.id).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </Card>

      <section className="stats-grid">
        <StatsCard icon={Trophy} label="Best Score" value={stats.bestScore} />
        <StatsCard icon={Gamepad2} label="Games Played" value={stats.gamesPlayed} />
        <StatsCard icon={CheckCircle2} label="Games Won" value={stats.gamesWon} />
        <StatsCard icon={Flame} label="Current Streak" value={stats.dailyStreak} />
      </section>

      <Card className="profile-performance">
        <h2 className="section-title">
          <Star size={18} aria-hidden="true" />
          Performance
        </h2>
        <div className="performance-row">
          <span>Win rate</span>
          <span>{winRate}%</span>
        </div>
        <div className="performance-bar">
          <div className="performance-bar-fill" style={{ width: `${winRate}%` }} />
        </div>
        <div className="performance-row">
          <span>Best streak</span>
          <span>{stats.bestStreak} days</span>
        </div>
      </Card>
    </PageContainer>
  )
}
