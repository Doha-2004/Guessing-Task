import { STARTING_SCORE, MIN_SCORE, SCORE_PENALTY_PER_ATTEMPT } from './constants'

/**
 * Calculates the score for a completed game based on how many attempts it took.
 * The first attempt keeps the full starting score; every attempt after that
 * removes a fixed penalty, down to a guaranteed minimum.
 *
 * @param {number} attempts - number of guesses it took to win (1-indexed)
 * @returns {number} the final score, never below MIN_SCORE
 */
export function calculateScore(attempts) {
  if (!attempts || attempts < 1) return STARTING_SCORE

  const score = STARTING_SCORE - (attempts - 1) * SCORE_PENALTY_PER_ATTEMPT
  return Math.max(MIN_SCORE, score)
}
