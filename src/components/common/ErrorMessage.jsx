import { AlertCircle } from 'lucide-react'

export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="error-banner" role="alert">
      <AlertCircle size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
