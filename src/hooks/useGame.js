import { useCallback, useState } from 'react'
import { GAME_MIN, GAME_MAX, GAME_STATUS, FEEDBACK_TYPE } from '../utils/constants'
import { validateGuess } from '../utils/validation'
import { calculateScore } from '../utils/calculateScore'

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Encapsulates all state and logic for a single guessing game.
 * Pass a fixed `presetTarget` for deterministic modes like the Daily Game;
 * omit it for a fresh random target (Practice mode).
 */
export function useGame({ min = GAME_MIN, max = GAME_MAX, presetTarget = null } = {}) {
  const [targetNumber, setTargetNumber] = useState(
    () => presetTarget ?? generateRandomNumber(min, max)
  )
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IN_PROGRESS)
  const [score, setScore] = useState(0)
  const [inputError, setInputError] = useState(null)

  const submitGuess = useCallback(() => {
    if (gameStatus !== GAME_STATUS.IN_PROGRESS) return

    const validationError = validateGuess(guess, min, max)
    if (validationError) {
      setInputError(validationError)
      return
    }

    setInputError(null)

    const numericGuess = Number(guess)
    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    let result
    if (numericGuess < targetNumber) {
      result = FEEDBACK_TYPE.HIGHER
    } else if (numericGuess > targetNumber) {
      result = FEEDBACK_TYPE.LOWER
    } else {
      result = FEEDBACK_TYPE.CORRECT
    }

    setFeedback(result)
    setGuessHistory((previous) => [...previous, { guess: numericGuess, result }])

    if (result === FEEDBACK_TYPE.CORRECT) {
      const finalScore = calculateScore(nextAttempts)
      setScore(finalScore)
      setGameStatus(GAME_STATUS.WON)
    }

    setGuess('')
  }, [guess, attempts, targetNumber, min, max, gameStatus])

  const resetGame = useCallback(
    (newPresetTarget = null) => {
      setTargetNumber(newPresetTarget ?? generateRandomNumber(min, max))
      setGuess('')
      setAttempts(0)
      setGuessHistory([])
      setFeedback(null)
      setGameStatus(GAME_STATUS.IN_PROGRESS)
      setScore(0)
      setInputError(null)
    },
    [min, max]
  )

  return {
    targetNumber,
    guess,
    setGuess,
    attempts,
    guessHistory,
    feedback,
    gameStatus,
    score,
    inputError,
    submitGuess,
    resetGame,
  }
}
