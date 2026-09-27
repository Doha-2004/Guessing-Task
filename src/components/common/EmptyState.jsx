export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={32} strokeWidth={1.5} aria-hidden="true" />}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  )
}
