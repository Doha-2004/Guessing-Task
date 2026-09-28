import { apiRequest } from './api'
import { mapGameState, mapGuessResponse } from '../utils/apiMappers'

// GET /api/game/current — returns null on 204 (no active game yet).
export async function getCurrentGame() {
  const data = await apiRequest('/api/game/current')
  return data ? mapGameState(data) : null
}

// POST /api/game/start — always creates a fresh game.
export async function startGame() {
  const data = await apiRequest('/api/game/start', { method: 'POST' })
  return mapGameState(data)
}

// POST /api/game/{gameId}/guess — body: { value }
export async function submitGuess(gameId, value) {
  const data = await apiRequest(`/api/game/${gameId}/guess`, {
    method: 'POST',
    body: { value },
  })
  return mapGuessResponse(data)
}