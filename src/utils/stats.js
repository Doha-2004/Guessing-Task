import { getItem, setItem } from './storage'
import { STORAGE_KEYS, DEFAULT_STATS } from './constants'

function statsKey(userId) {
  return `${STORAGE_KEYS.STATS}_${userId}`
}

export function getStats(userId) {
  if (!userId) return DEFAULT_STATS
  return getItem(statsKey(userId), DEFAULT_STATS)
}

export function saveStats(userId, stats) {
  if (!userId) return
  setItem(statsKey(userId), stats)
}

// Merges a completed practice game's result into the player's running stats.
export function recordPracticeResult(userId, score) {
  const current = getStats(userId)

  const updated = {
    ...current,
    gamesPlayed: current.gamesPlayed + 1,
    gamesWon: current.gamesWon + 1,
    bestScore: Math.max(current.bestScore, score),
  }

  saveStats(userId, updated)
  return updated
}

// Merges a completed daily game's result, including streak tracking.
export function recordDailyResult(userId, score, newStreak) {
  const current = getStats(userId)

  const updated = {
    ...current,
    gamesPlayed: current.gamesPlayed + 1,
    gamesWon: current.gamesWon + 1,
    bestScore: Math.max(current.bestScore, score),
    dailyStreak: newStreak,
    bestStreak: Math.max(current.bestStreak, newStreak),
  }

  saveStats(userId, updated)
  return updated
}
