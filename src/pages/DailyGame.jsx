import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer.jsx'
import GameHeader from '../components/game/GameHeader.jsx'
import GuessInput from '../components/game/GuessInput.jsx'
import GuessFeedback from '../components/game/GuessFeedback.jsx'
import GuessHistory from '../components/game/GuessHistory.jsx'
import GameResult from '../components/game/GameResult.jsx'
import Card from '../components/common/Card.jsx'
import { useAuth } from '../hooks/useAuth'
import { getItem, setItem } from '../utils/storage'
import { STORAGE_KEYS, GAME_MIN, GAME_MAX, GAME_STATUS, FEEDBACK_TYPE } from '../utils/constants'
import { getDailyNumber, getTodayKey } from '../utils/dailyNumber'
import { validateGuess } from '../utils/validation'
import { calculateScore } from '../utils/calculateScore'
import { recordDailyResult } from '../utils/stats'

function dailyStorageKey(userId) {
  return `${STORAGE_KEYS.DAILY_GAME}_${userId}`
}

function getYesterdayKey(todayKey) {
  const date = new Date(todayKey)
  date.setDate(date.getDate() - 1)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const DEFAULT_RECORD = {
  date: null,
  gameStatus: GAME_STATUS.IN_PROGRESS,
  attempts: 0,
  guessHistory: [],
  score: 0,
  streak: 0,
  lastCompletedDate: null,
}

export default function DailyGame() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const todayKey = useMemo(() => getTodayKey(), [])
  const targetNumber = useMemo(() => getDailyNumber(todayKey), [todayKey])

  const [record, setRecord] = useState(DEFAULT_RECORD)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [inputError, setInputError] = useState(null)

  useEffect(() => {
    if (!currentUser) return

    const stored = getItem(dailyStorageKey(currentUser.id), DEFAULT_RECORD)

    if (stored.date === todayKey) {
      setRecord(stored)
    } else {
      // A new day: reset today's progress but keep the streak metadata intact.
      const freshRecord = {
        ...DEFAULT_RECORD,
        date: todayKey,
        streak: stored.streak || 0,
        lastCompletedDate: stored.lastCompletedDate || null,
      }
      setRecord(freshRecord)
      setItem(dailyStorageKey(currentUser.id), freshRecord)
    }
  }, [currentUser, todayKey])

  function persist(nextRecord) {
    setRecord(nextRecord)
    setItem(dailyStorageKey(currentUser.id), nextRecord)
  }

  function handleSubmitGuess() {
    if (record.gameStatus !== GAME_STATUS.IN_PROGRESS) return

    const validationError = validateGuess(guess, GAME_MIN, GAME_MAX)
    if (validationError) {
      setInputError(validationError)
      return
    }
    setInputError(null)

    const numericGuess = Number(guess)
    const nextAttempts = record.attempts + 1

    let result
    if (numericGuess < targetNumber) {
      result = FEEDBACK_TYPE.HIGHER
    } else if (numericGuess > targetNumber) {
      result = FEEDBACK_TYPE.LOWER
    } else {
      result = FEEDBACK_TYPE.CORRECT
    }

    setFeedback(result)
    const nextHistory = [...record.guessHistory, { guess: numericGuess, result }]

    if (result === FEEDBACK_TYPE.CORRECT) {
      const finalScore = calculateScore(nextAttempts)
      const yesterdayKey = getYesterdayKey(todayKey)
      const continuesStreak = record.lastCompletedDate === yesterdayKey
      const newStreak = continuesStreak ? record.streak + 1 : 1

      const nextRecord = {
        ...record,
        attempts: nextAttempts,
        guessHistory: nextHistory,
        gameStatus: GAME_STATUS.WON,
        score: finalScore,
        streak: newStreak,
        lastCompletedDate: todayKey,
      }

      persist(nextRecord)
      recordDailyResult(currentUser.id, finalScore, newStreak)
    } else {
      persist({ ...record, attempts: nextAttempts, guessHistory: nextHistory })
    }

    setGuess('')
  }

  const isComplete = record.gameStatus === GAME_STATUS.WON

  return (
    <PageContainer>
      <GameHeader
        title="Today's Challenge"
        description="Guess today's hidden number."
        min={GAME_MIN}
        max={GAME_MAX}
        attempts={record.attempts}
      />

      <Card className="daily-streak-banner">
        <Flame size={20} aria-hidden="true" />
        <span>
          Current Streak: <strong>{record.streak}</strong> {record.streak === 1 ? 'Day' : 'Days'}
        </span>
      </Card>

      {isComplete ? (
        <>
          <Card className="game-result-heading">
            <h2>Daily Challenge Complete!</h2>
            <p>Come back tomorrow for a brand new number.</p>
          </Card>
          <GameResult
            targetNumber={targetNumber}
            attempts={record.attempts}
            score={record.score}
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
            min={GAME_MIN}
            max={GAME_MAX}
          />
          <GuessFeedback feedback={feedback} />
        </Card>
      )}

      <Card>
        <h2 className="section-title">Guess History</h2>
        <GuessHistory history={record.guessHistory} />
      </Card>
    </PageContainer>
  )
}
