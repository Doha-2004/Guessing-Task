import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/common/Card.jsx'
import { useAuth } from '../hooks/useAuth'
import { getStats } from '../utils/stats'
import { MOCK_LEADERBOARD } from '../utils/constants'

export default function Leaderboard() {
  const { currentUser } = useAuth()
  const stats = getStats(currentUser?.id)

  // Swap the mock "You" row for the current user's real stats, then re-sort by score.
  const rows = useMemo(() => {
    const withRealUser = MOCK_LEADERBOARD.map((row) =>
      row.name === 'You'
        ? {
            ...row,
            name: currentUser?.name || 'You',
            score: stats.bestScore || row.score,
            wins: stats.gamesWon || row.wins,
            streak: stats.dailyStreak || row.streak,
            isCurrentUser: true,
          }
        : row
    )

    return [...withRealUser]
      .sort((a, b) => b.score - a.score)
      .map((row, index) => ({ ...row, rank: index + 1 }))
  }, [currentUser, stats])

  return (
    <PageContainer>
      <div className="page-heading">
        <Trophy size={22} aria-hidden="true" />
        <h1>Leaderboard</h1>
      </div>

      <Card className="leaderboard-card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Wins</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.rank}-${row.name}`}
                className={row.isCurrentUser ? 'leaderboard-row-current' : ''}
              >
                <td>#{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.score}</td>
                <td>{row.wins}</td>
                <td>{row.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="leaderboard-list">
          {rows.map((row) => (
            <li
              key={`${row.rank}-${row.name}`}
              className={`leaderboard-list-item ${
                row.isCurrentUser ? 'leaderboard-row-current' : ''
              }`}
            >
              <span className="leaderboard-list-rank">#{row.rank}</span>
              <div className="leaderboard-list-details">
                <span className="leaderboard-list-name">{row.name}</span>
                <span className="leaderboard-list-meta">
                  {row.score} pts · {row.wins} wins · {row.streak} day streak
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </PageContainer>
  )
}
