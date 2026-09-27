import { GAME_MIN, GAME_MAX } from './constants'

// Returns today's date as YYYY-MM-DD, used both as a seed and a storage key.
export function getTodayKey() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Simple deterministic string hash (djb2). Same input always produces the same output,
// so every player gets the same hidden number on the same date.
function hashString(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return Math.abs(hash)
}

// Generates the deterministic hidden number for today's daily challenge.
export function getDailyNumber(dateKey = getTodayKey()) {
  const hash = hashString(`guessly-${dateKey}`)
  const range = GAME_MAX - GAME_MIN + 1
  return GAME_MIN + (hash % range)
}
