import { User, Trophy, Gamepad2, CheckCircle2, Flame, Star } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/common/Card.jsx'
import StatsCard from '../components/dashboard/StatsCard.jsx'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { currentUser } = useAuth()

  const bestScore = currentUser?.bestScore ?? 0
  const gamesPlayed = currentUser?.gamesPlayed ?? 0
  const gamesWon = currentUser?.gamesWon ?? 0
  const dailyStreak = currentUser?.dailyStreak ?? 0
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0

  const memberSince = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })
    : '—'

  return (
    <PageContainer>
      <Card className="profile-header">
        <div className="profile-avatar">
          <User size={28} aria-hidden="true" />
        </div>
        <div>
          <h1>{currentUser?.username}</h1>
          <p>{currentUser?.email}</p>
          <p className="profile-member-since">Member since {memberSince}</p>
        </div>
      </Card>

      <section className="stats-grid">
        <StatsCard icon={Trophy} label="Best Score" value={bestScore} />
        <StatsCard icon={Gamepad2} label="Games Played" value={gamesPlayed} />
        <StatsCard icon={CheckCircle2} label="Games Won" value={gamesWon} />
        <StatsCard icon={Flame} label="Current Streak" value={dailyStreak} />
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
      </Card>
    </PageContainer>
  )
}