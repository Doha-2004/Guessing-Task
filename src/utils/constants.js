// App-wide constants for Guessly

export const GAME_MIN = 1
export const GAME_MAX = 100

export const STARTING_SCORE = 1000
export const MIN_SCORE = 100
export const SCORE_PENALTY_PER_ATTEMPT = 50

export const GAME_STATUS = {
  IN_PROGRESS: 'in-progress',
  WON: 'won',
  ABANDONED: 'abandoned',
}

export const FEEDBACK_TYPE = {
  HIGHER: 'higher',
  LOWER: 'lower',
  CORRECT: 'correct',
}

export const STORAGE_KEYS = {
  USERS: 'guessly_users',
  CURRENT_USER: 'guessly_user',
  STATS: 'guessly_stats',
  DAILY_GAME: 'guessly_daily_game',
  GAME_HISTORY: 'guessly_game_history',
}

export const DEFAULT_STATS = {
  bestScore: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  dailyStreak: 0,
  bestStreak: 0,
}

// Mock leaderboard data. "You" gets swapped for the current user at render time.
export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Player One', score: 980, wins: 42, streak: 12 },
  { rank: 2, name: 'Player Two', score: 920, wins: 39, streak: 9 },
  { rank: 3, name: 'You', score: 870, wins: 35, streak: 7 },
  { rank: 4, name: 'Player Four', score: 810, wins: 30, streak: 5 },
  { rank: 5, name: 'Player Five', score: 760, wins: 27, streak: 3 },
  { rank: 6, name: 'Player Six', score: 705, wins: 22, streak: 2 },
  { rank: 7, name: 'Player Seven', score: 640, wins: 18, streak: 1 },
]
