import Icon from '../../../components/ui/Icon'

export default function HabitsHero({
  user,
  completedCount,
  totalCount,
  remainingCount,
  metrics,
  copy,
}) {
  return (
    <section className="card-ambient relative overflow-hidden rounded-xl p-6 lg:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-secondary-container/30 blur-2xl"
      />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/80 px-3 py-1 text-label-sm font-bold text-on-secondary-container">
            <Icon name="verified" className="text-sm" filled />
            {copy.heroBadge}
          </span>
          <span className="hidden text-label-sm text-outline sm:inline">
            {copy.heroUpdated}
          </span>
        </div>

        <h2 className="text-headline-lg font-extrabold tracking-tight text-on-surface">
          Constancia Diaria, {user.firstName}
        </h2>
        <p className="mt-2 max-w-xl text-body-lg text-on-surface-variant">
          Has completado{' '}
          <strong className="font-bold text-primary">
            {completedCount} de {totalCount} hábitos
          </strong>{' '}
          programados para hoy.{' '}
          {remainingCount > 0
            ? `¡A solo ${remainingCount} de tu meta óptima antes de las 22:00!`
            : '¡Meta diaria completada! Mantén este ritmo.'}
        </p>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-outline-variant/60 pt-6 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${metric.iconBgClass} ${metric.iconClass}`}
            >
              <Icon name={metric.icon} className="text-xl" filled />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-headline-sm font-bold text-on-surface">
                {metric.value}
              </span>
              <span className="block truncate text-label-sm text-outline">
                {metric.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
