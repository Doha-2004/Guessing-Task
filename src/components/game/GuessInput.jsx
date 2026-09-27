import { Send } from 'lucide-react'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'

export default function GuessInput({ guess, setGuess, onSubmit, error, min, max, disabled }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <Input
        id="guess-input"
        label={`Your guess (${min}–${max})`}
        type="number"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
        error={error}
        placeholder={`Enter a number between ${min} and ${max}`}
        min={min}
        max={max}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled}>
        <Send size={16} aria-hidden="true" />
        Submit Guess
      </Button>
    </form>
  )
}
