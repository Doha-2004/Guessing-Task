import { Send } from 'lucide-react'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import ErrorMessage from '../common/ErrorMessage.jsx'

// No min/max here on purpose: the guess can be any whole number.
// type="text" (not "number") so we can show our own clear messages for
// empty / non-numeric / decimal input instead of the browser silently
// swallowing them — validation itself lives in utils/validation.js.
export default function GuessInput({
  guess,
  setGuess,
  onSubmit,
  error,
  disabled = false,
  disabledMessage,
  isSubmitting = false,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <>
      {disabled && <ErrorMessage message={disabledMessage} />}
      <form className="guess-form" onSubmit={handleSubmit}>
        <Input
          id="guess-input"
          label="Your guess"
          type="text"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          error={error}
          placeholder="Enter your guess"
          autoComplete="off"
          disabled={disabled || isSubmitting}
        />
        <Button type="submit" disabled={disabled || isSubmitting} isLoading={isSubmitting}>
          <Send size={16} aria-hidden="true" />
          {isSubmitting ? 'Submitting...' : 'Submit Guess'}
        </Button>
      </form>
    </>
  )
}
