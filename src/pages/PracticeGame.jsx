import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import GameHeader from '../components/game/GameHeader.jsx'
import GuessInput from '../components/game/GuessInput.jsx'
import GuessFeedback from '../components/game/GuessFeedback.jsx'
import GuessHistory from '../components/game/GuessHistory.jsx'
import GameResult from '../components/game/GameResult.jsx'
import Card from '../components/common/Card.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { useGame } from '../hooks/useGame'
import { GAME_STATUS } from '../utils/constants'

export default function PracticeGame() {
  const navigate = useNavigate()
  const {
    guess,
    setGuess,
    attempts,
    guessHistory,
    feedback,
    gameStatus,
    targetNumber,
    minNumber,
    maxNumber,
    bestScore,
    inputError,
    isLoading,
    isSubmitting,
    apiError,
    submitGuess,
    resetGame,
  } = useGame()

  if (isLoading) {
    return (
      <PageContainer>
        <Loader label="Starting game..." />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <GameHeader
        title="Practice Mode"
        description="Find the hidden number using the Higher / Lower hints."
        min={minNumber}
        max={maxNumber}
        attempts={attempts}
      />

      <ErrorMessage message={apiError} />

      {gameStatus === GAME_STATUS.WON ? (
        <GameResult
          targetNumber={targetNumber}
          attempts={attempts}
          score={bestScore}
          onPlayAgain={resetGame}
          onBackToDashboard={() => navigate('/dashboard')}
        />
      ) : (
        <Card className="game-play-card">
          <GuessInput
            guess={guess}
            setGuess={setGuess}
            onSubmit={submitGuess}
            error={inputError}
            min={minNumber}
            max={maxNumber}
            isSubmitting={isSubmitting}
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