import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import Card from '../components/common/Card.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useAuth } from '../hooks/useAuth'
import * as dailyService from '../services/dailyService'
import { ApiError } from '../services/api'
import { getTodayKey } from '../utils/dailyNumber'

function formatCompletedAt(isoString) {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Leaderboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [leaderboard, setLeaderboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true)
    setApiError(null)
    try {
      // GET /api/daily/leaderboard?date=YYYY-MM-DD — today's date, same
      // format the backend's Daily endpoints already use.
      const data = await dailyService.getLeaderboard(getTodayKey())
      setLeaderboard(data)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await logout()
        navigate('/login')
        return
      }
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [logout, navigate])

  useEffect(() => {
    loadLeaderboard()
  }, [loadLeaderboard])

  if (isLoading) {
    return (
      <PageContainer>
        <Loader label="Loading leaderboard..." />
      </PageContainer>
    )
  }

  const entries = leaderboard?.entries ?? []
  const currentUserEntry = leaderboard?.currentUserEntry
  const alreadyListed = entries.some((entry) => entry.isCurrentUser)
  // The API returns the top entries plus, separately, the caller's own rank
  // — if the caller didn't place in the returned list, append their row.
  const rows = alreadyListed || !currentUserEntry ? entries : [...entries, currentUserEntry]

  return (
    <PageContainer>
      <div className="page-heading">
        <Trophy size={22} aria-hidden="true" />
        <h1>Leaderboard</h1>
      </div>

      <ErrorMessage message={apiError} />

      <Card className="leaderboard-card">
        {leaderboard?.totalPlayers != null && (
          <p style={{ padding: '0 20px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            {leaderboard.totalPlayers} {leaderboard.totalPlayers === 1 ? 'player' : 'players'} today
          </p>
        )}

        {rows.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No entries yet"
            description="Be the first to complete today's challenge."
          />
        ) : (
          <>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Guesses</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={`${row.rank}-${row.username}`}
                    className={row.isCurrentUser ? 'leaderboard-row-current' : ''}
                  >
                    <td>#{row.rank}</td>
                    <td>{row.username}{row.isCurrentUser ? ' (You)' : ''}</td>
                    <td>{row.guessCount}</td>
                    <td>{formatCompletedAt(row.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="leaderboard-list">
              {rows.map((row) => (
                <li
                  key={`${row.rank}-${row.username}`}
                  className={`leaderboard-list-item ${
                    row.isCurrentUser ? 'leaderboard-row-current' : ''
                  }`}
                >
                  <span className="leaderboard-list-rank">#{row.rank}</span>
                  <div className="leaderboard-list-details">
                    <span className="leaderboard-list-name">
                      {row.username}
                      {row.isCurrentUser ? ' (You)' : ''}
                    </span>
                    <span className="leaderboard-list-meta">
                      {row.guessCount} guesses · completed {formatCompletedAt(row.completedAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </PageContainer>
  )
}