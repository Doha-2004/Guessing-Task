export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  ...rest
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
