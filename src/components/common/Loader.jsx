import { Loader2 } from 'lucide-react'

export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <Loader2 className="loader-spinner" size={22} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
