// Converts the backend's PascalCase enums and response shapes into the
// lower-case strings the existing UI components already expect
// (GuessFeedback, GuessHistory, GameResult, etc. were built around
// 'higher' | 'lower' | 'correct' and 'in-progress' | 'won' | 'abandoned').

import { GAME_STATUS } from './constants'

export function mapGameStatus(apiStatus) {
  switch (apiStatus) {
    case 'Won':
      return GAME_STATUS.WON
    case 'Abandoned':
      return GAME_STATUS.ABANDONED
    case 'InProgress':
    default:
      return GAME_STATUS.IN_PROGRESS
  }
}

export function mapGuessRecord(record) {
  return {
    guess: record.value,
    result: (record.direction || '').toLowerCase(),
  }
}

// Shared by /api/game/{id}/guess and /api/daily/guess — both return a
// GuessResponse with the same shape.
export function mapGuessResponse(response) {
  return {
    direction: (response.direction || '').toLowerCase(),
    message: response.message,
    guessCount: response.guessCount,
    guesses: (response.guesses || []).map(mapGuessRecord),
    isWon: response.isWon,
    targetNumber: response.targetNumber ?? null,
    isNewPersonalBest: Boolean(response.isNewPersonalBest),
    bestScore: response.bestScore ?? null,
  }
}

// GameStateResponse (Practice mode: /api/game/start, /api/game/current)
export function mapGameState(game) {
  return {
    gameId: game.gameId,
    mode: game.mode,
    status: mapGameStatus(game.status),
    minNumber: game.minNumber,
    maxNumber: game.maxNumber,
    guessCount: game.guessCount,
    guesses: (game.guesses || []).map(mapGuessRecord),
    targetNumber: game.targetNumber ?? null,
    createdAt: game.createdAt,
    completedAt: game.completedAt ?? null,
  }
}

// DailyStatusResponse (/api/daily, /api/daily/start)
export function mapDailyStatus(daily) {
  return {
    date: daily.date,
    status: mapGameStatus(daily.status),
    hasStarted: daily.hasStarted,
    gameId: daily.gameId ?? null,
    minNumber: daily.minNumber,
    maxNumber: daily.maxNumber,
    guessCount: daily.guessCount,
    guesses: (daily.guesses || []).map(mapGuessRecord),
    targetNumber: daily.targetNumber ?? null,
    resetsAtUtc: daily.resetsAtUtc,
    shareText: daily.shareText ?? null,
  }
}