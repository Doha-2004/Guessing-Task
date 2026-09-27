import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircleHelp } from 'lucide-react'
import Input from '../components/common/Input.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { useAuth } from '../hooks/useAuth'
import { validateLoginForm, hasErrors } from '../utils/validation'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(field) {
    return (event) => {
      setFormValues((previous) => ({ ...previous, [field]: event.target.value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError(null)

    const errors = validateLoginForm(formValues)
    setFieldErrors(errors)

    if (hasErrors(errors)) return

    setIsSubmitting(true)
    try {
      await login(formValues)
      navigate('/dashboard')
    } catch (error) {
      setFormError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <CircleHelp size={28} aria-hidden="true" />
          <span>Guessly</span>
        </div>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to keep your streak going.</p>

        <ErrorMessage message={formError} />

        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange('email')}
            error={fieldErrors.email}
            placeholder="you@example.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleChange('password')}
            error={fieldErrors.password}
            placeholder="Enter your password"
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  )
}
