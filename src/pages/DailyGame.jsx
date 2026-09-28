import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import GameHeader from '../components/game/GameHeader.jsx'
import GuessInput from '../components/game/GuessInput.jsx'
import GuessFeedback from '../components/game/GuessFeedback.jsx'
import GuessHistory from '../components/game/GuessHistory.jsx'
import GameResult from '../components/game/GameResult.jsx'
import Card from '../components/common/Card.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { useAuth } from '../hooks/useAuth'
import * as dailyService from '../services/dailyService'
import { ApiError } from '../services/api'
import { GAME_STATUS } from '../utils/constants'
import { validateGuess } from '../utils/validation'

export default function DailyGame() {
  const navigate = useNavigate()
  const { currentUser, refreshCurrentUser, logout } = useAuth()

  const [daily, setDaily] = useState(null)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [inputError, setInputError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const handleUnauthorized = useCallback(async () => {
    await logout()
    navigate('/login')
  }, [logout, navigate])

  const loadDaily = useCallback(async () => {
    setIsLoading(true)
    setApiError(null)
    try {
      const status = await dailyService.getDailyStatus()
      // Only call /start when today's challenge hasn't begun yet — if it's
      // already won or in progress, /api/daily already gave us everything.
      const active =
        status.hasStarted || status.status === GAME_STATUS.WON
          ? status
          : await dailyService.startDaily()
      setDaily(active)
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
    loadDaily()
  }, [loadDaily])

  async function handleSubmitGuess() {
    if (!daily || daily.status !== GAME_STATUS.IN_PROGRESS || isSubmitting) return

    const validationError = validateGuess(guess, daily.minNumber, daily.maxNumber)
    if (validationError) {
      setInputError(validationError)
      return
    }
    setInputError(null)
    setApiError(null)
    setIsSubmitting(true)

    try {
      const result = await dailyService.submitDailyGuess(Number(guess))
      setFeedback(result.direction)
      setLastResult(result)
      setDaily((previous) => ({
        ...previous,
        guessCount: result.guessCount,
        guesses: result.guesses,
        status: result.isWon ? GAME_STATUS.WON : previous.status,
        targetNumber: result.targetNumber ?? previous.targetNumber,
      }))
      setGuess('')

      if (result.isWon) {
        // ProfileResponse.dailyStreak is the only place the streak lives —
        // refresh it so the banner below reflects today's win.
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

  if (isLoading) {
    return (
      <PageContainer>
        <Loader label="Loading today's challenge..." />
      </PageContainer>
    )
  }

  const isComplete = daily?.status === GAME_STATUS.WON
  const streak = currentUser?.dailyStreak ?? 0

  return (
    <PageContainer>
      <GameHeader
        title="Today's Challenge"
        description="Guess today's hidden number."
        min={daily?.minNumber}
        max={daily?.maxNumber}
        attempts={daily?.guessCount ?? 0}
      />

      <ErrorMessage message={apiError} />

      <Card className="daily-streak-banner">
        <Flame size={20} aria-hidden="true" />
        <span>
          Current Streak: <strong>{streak}</strong> {streak === 1 ? 'Day' : 'Days'}
        </span>
      </Card>

      {isComplete ? (
        <>
          <Card className="game-result-heading">
            <h2>Daily Challenge Complete!</h2>
            <p>Come back tomorrow for a brand new number.</p>
          </Card>
          <GameResult
            targetNumber={daily?.targetNumber}
            attempts={daily?.guessCount ?? 0}
            score={lastResult?.bestScore ?? currentUser?.bestScore ?? null}
            onBackToDashboard={() => navigate('/dashboard')}
            showPlayAgain={false}
          />
        </>
      ) : (
        <Card className="game-play-card">
          <GuessInput
            guess={guess}
            setGuess={setGuess}
            onSubmit={handleSubmitGuess}
            error={inputError}
            min={daily?.minNumber}
            max={daily?.maxNumber}
            isSubmitting={isSubmitting}
          />
          <GuessFeedback feedback={feedback} />
        </Card>
      )}

      <Card>
        <h2 className="section-title">Guess History</h2>
        <GuessHistory history={daily?.guesses ?? []} />
      </Card>
    </PageContainer>
  )
}