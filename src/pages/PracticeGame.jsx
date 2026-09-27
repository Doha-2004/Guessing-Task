import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import GameHeader from '../components/game/GameHeader.jsx'
import GuessInput from '../components/game/GuessInput.jsx'
import GuessFeedback from '../components/game/GuessFeedback.jsx'
import GuessHistory from '../components/game/GuessHistory.jsx'
import GameResult from '../components/game/GameResult.jsx'
import Card from '../components/common/Card.jsx'
import { useGame } from '../hooks/useGame'
import { useAuth } from '../hooks/useAuth'
import { GAME_MIN, GAME_MAX, GAME_STATUS } from '../utils/constants'
import { recordPracticeResult } from '../utils/stats'
import { useEffect, useRef } from 'react'

export default function PracticeGame() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const {
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
  } = useGame({ min: GAME_MIN, max: GAME_MAX })

  const hasRecordedWin = useRef(false)

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WON && !hasRecordedWin.current) {
      recordPracticeResult(currentUser?.id, score)
      hasRecordedWin.current = true
    }
  }, [gameStatus, score, currentUser])

  function handlePlayAgain() {
    hasRecordedWin.current = false
    resetGame()
  }

  return (
    <PageContainer>
      <GameHeader
        title="Practice Mode"
        description="Find the hidden number using the Higher / Lower hints."
        min={GAME_MIN}
        max={GAME_MAX}
        attempts={attempts}
      />

      {gameStatus === GAME_STATUS.WON ? (
        <GameResult
          targetNumber={targetNumber}
          attempts={attempts}
          score={score}
          onPlayAgain={handlePlayAgain}
          onBackToDashboard={() => navigate('/dashboard')}
        />
      ) : (
        <Card className="game-play-card">
          <GuessInput
            guess={guess}
            setGuess={setGuess}
            onSubmit={submitGuess}
            error={inputError}
            min={GAME_MIN}
            max={GAME_MAX}
          />
          <GuessFeedback feedback={feedback} />
        </Card>
      )}

      <Card>
        <h2 className="section-title">Guess History</h2>
        <GuessHistory history={guessHistory} />
      </Card>
    </PageContainer>
  )
}
