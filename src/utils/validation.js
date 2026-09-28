// Shared validation helpers for forms and the game input.
// The username/password pattern checks mirror the backend's own
// RegisterRequest schema so the user gets instant feedback instead of
// waiting on a 400 response for something we can already tell will fail.

export function isValidEmail(email) {
  if (!email) return false
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email.trim())
}

// Backend pattern: ^[A-Za-z0-9_.-]+$, length 3–50
export function isValidUsername(username) {
  if (!username) return false
  const usernamePattern = /^[A-Za-z0-9_.-]+$/
  return (
    username.length >= 3 && username.length <= 50 && usernamePattern.test(username)
  )
}

// Backend pattern: at least one lowercase, one uppercase, one digit, one
// special character, minimum length 8.
export function isValidPassword(password) {
  if (!password) return false
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
  return passwordPattern.test(password)
}

// The backend's field is called "login" (not "email") — it appears to
// accept either a username or an email, so we only check it's non-empty.
export function validateLoginForm({ login, password }) {
  const errors = {}

  if (!login || !login.trim()) {
    errors.login = 'Email or username is required.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  }

  return errors
}

export function validateRegisterForm({ username, email, password, confirmPassword }) {
  const errors = {}

  if (!username || !username.trim()) {
    errors.username = 'Username is required.'
  } else if (!isValidUsername(username.trim())) {
    errors.username =
      'Username must be 3-50 characters and can only contain letters, numbers, dots, underscores and dashes.'
  }

  if (!email || !email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (!isValidPassword(password)) {
    errors.password =
      'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a special character.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export function validateGuess(value, min, max) {
  if (value === '' || value === null || value === undefined) {
    return 'Enter a number before guessing.'
  }

  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return 'Guesses must be a number.'
  }

  if (!Number.isInteger(numericValue)) {
    return 'Guesses must be a whole number.'
  }

  if (numericValue < min || numericValue > max) {
    return `Enter a number between ${min} and ${max}.`
  }

  return null
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}