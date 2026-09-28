import { apiRequest } from './api'
import { mapDailyStatus, mapGuessResponse } from '../utils/apiMappers'

// GET /api/daily
export async function getDailyStatus() {
  const data = await apiRequest('/api/daily')
  return mapDailyStatus(data)
}

// POST /api/daily/start
export async function startDaily() {
  const data = await apiRequest('/api/daily/start', { method: 'POST' })
  return mapDailyStatus(data)
}

// POST /api/daily/guess — body: { value }. No gameId needed; the backend
// tracks the caller's game for today.
export async function submitDailyGuess(value) {
  const data = await apiRequest('/api/daily/guess', {
    method: 'POST',
    body: { value },
  })
  return mapGuessResponse(data)
}

// GET /api/daily/leaderboard?date=YYYY-MM-DD
// Returned as-is (rank, username, guessCount, completedAt, isCurrentUser,
// totalPlayers, entries, currentUserEntry) — no enum fields to normalize here.
export function getLeaderboard(date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : ''
  return apiRequest(`/api/daily/leaderboard${query}`)
}