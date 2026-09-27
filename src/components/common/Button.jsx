import { Loader2 } from 'lucide-react'

/**
 * Reusable button.
 * variant: "primary" | "secondary" | "ghost"
 */
export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  ...rest
}) {
  const classNames = [
    'btn',
    `btn-${variant}`,
    fullWidth ? 'btn-full' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className="btn-spinner" size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  )
}
