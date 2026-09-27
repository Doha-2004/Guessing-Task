import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircleHelp } from 'lucide-react'
import Input from '../components/common/Input.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { useAuth } from '../hooks/useAuth'
import { validateRegisterForm, hasErrors } from '../utils/validation'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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

    const errors = validateRegisterForm(formValues)
    setFieldErrors(errors)

    if (hasErrors(errors)) return

    setIsSubmitting(true)
    try {
      await register(formValues)
      navigate('/login')
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
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join Guessly and start guessing.</p>

        <ErrorMessage message={formError} />

        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="name"
            label="Name"
            autoComplete="name"
            value={formValues.name}
            onChange={handleChange('name')}
            error={fieldErrors.name}
            placeholder="Your name"
          />
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
            autoComplete="new-password"
            value={formValues.password}
            onChange={handleChange('password')}
            error={fieldErrors.password}
            placeholder="At least 6 characters"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={formValues.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={fieldErrors.confirmPassword}
            placeholder="Re-enter your password"
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </Button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
