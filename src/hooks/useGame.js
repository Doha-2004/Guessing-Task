import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as gameService from '../services/gameService'
import { useAuth } from './useAuth'
import { GAME_STATUS } from '../utils/constants'
import { validateGuess } from '../utils/validation'
import { ApiError } from '../services/api'

/**
 * Drives the Practice Game page against the real backend.
 * The backend is the source of truth: this hook only calls
 * /api/game/start, /api/game/current and /api/game/{id}/guess and mirrors
 * whatever they return — it does not decide Higher/Lower/Correct itself.
 */
export function useGame() {
  const { logout, refreshCurrentUser } = useAuth()
  const navigate = useNavigate()

  const [game, setGame] = useState(null)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [lastResult, setLastResult] = useState(null) // last GuessResponse (for bestScore / isNewPersonalBest)
  const [inputError, setInputError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const handleUnauthorized = useCallback(async () => {
    await logout()
    navigate('/login')
  }, [logout, navigate])

  const loadGame = useCallback(async () => {
    setIsLoading(true)
    setApiError(null)
    try {
      const current = await gameService.getCurrentGame()
      const active = current ?? (await gameService.startGame())
      setGame(active)
      setFeedback(null)
      setLastResult(null)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await handleUnauthorized()
        return
      }
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [handleUnauthorized])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  async function submitGuess() {
    if (isSubmitting) return

    // Tell the user why nothing happens instead of silently ignoring Submit.
    if (!game || game.status !== GAME_STATUS.IN_PROGRESS) {
      setInputError("This game isn't active, so guesses can't be submitted.")
      return
    }

    const validationError = validateGuess(guess)
    if (validationError) {
      setInputError(validationError)
      return
    }
    setInputError(null)
    setApiError(null)
    setIsSubmitting(true)

    try {
      const result = await gameService.submitGuess(game.gameId, Number(guess))
      setFeedback(result.direction)
      setLastResult(result)
      setGame((previous) => ({
        ...previous,
        guessCount: result.guessCount,
        guesses: result.guesses,
        status: result.isWon ? GAME_STATUS.WON : previous.status,
        targetNumber: result.targetNumber ?? previous.targetNumber,
      }))
      setGuess('')

      if (result.isWon) {
        // Same as the Daily game: bestScore / gamesPlayed / gamesWon live on
        // the user's profile, so refresh it or Dashboard/Profile show old stats.
        await refreshCurrentUser()
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await handleUnauthorized()
        return
      }
      setApiError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function resetGame() {
    await loadGame()
  }

  return {
    game,
    guess,
    setGuess,
    attempts: game?.guessCount ?? 0,
    guessHistory: game?.guesses ?? [],
    feedback,
    gameStatus: game?.status ?? GAME_STATUS.IN_PROGRESS,
    isGameActive: game?.status === GAME_STATUS.IN_PROGRESS,
    targetNumber: game?.targetNumber ?? null,
    bestScore: lastResult?.bestScore ?? null,
    isNewPersonalBest: lastResult?.isNewPersonalBest ?? false,
    inputError,
    isLoading,
    isSubmitting,
    apiError,
    submitGuess,
    resetGame,
  }
}