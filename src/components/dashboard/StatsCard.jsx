export default function StatsCard({ icon: Icon, label, value }) {
  return (
    <div className="stats-card">
      {Icon && <Icon size={20} aria-hidden="true" />}
      <div>
        <span className="stats-card-value">{value}</span>
        <span className="stats-card-label">{label}</span>
      </div>
    </div>
  )
}
