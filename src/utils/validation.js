// Shared validation helpers for forms and the game input

export function isValidEmail(email) {
  if (!email) return false
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email.trim())
}

export function validateLoginForm({ email, password }) {
  const errors = {}

  if (!email || !email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  }

  return errors
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!email || !email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
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
