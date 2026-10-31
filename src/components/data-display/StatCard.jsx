export default function StatCard({ stat }) {
  return (
    <article className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${stat.tone}`} aria-hidden="true">{stat.icon}</div>
      <p className="stat-card__label">{stat.label}</p>
      <div className="stat-card__value-row"><strong>{stat.value}</strong><span className={`stat-card__trend stat-card__trend--${stat.tone}`}>{stat.change}</span></div>
    </article>
  )
}
