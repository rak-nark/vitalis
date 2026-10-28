import clsx from 'clsx'

const barStyles = {
  complete: 'bg-primary',
  today: 'border-2 border-dashed border-primary bg-secondary-fixed-dim',
  upcoming: 'bg-surface-container-low',
}

export default function ConsistencyChart({ adherence }) {
  return (
    <section className="card-ambient rounded-xl p-6">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-headline-sm font-bold text-on-surface">
            {adherence.title}
          </h2>
          <p className="text-body-sm text-outline">{adherence.subtitle}</p>
        </div>
        <span className="w-fit shrink-0 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-bold text-on-secondary-container">
          Promedio: {adherence.average}
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 border-b border-outline-variant/60 px-1 pt-4 sm:gap-4 sm:px-4">
        {adherence.days.map((day) => (
          <div
            key={day.id}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-36 w-full items-end justify-center">
              <div
                role="img"
                aria-label={`${day.label}: ${day.percent}% de cumplimiento`}
                className={clsx(
                  'w-full max-w-[42px] rounded-t-lg transition-all duration-500',
                  barStyles[day.state] ?? barStyles.upcoming,
                )}
                style={{ height: `${day.percent}%` }}
              />
            </div>
            <span
              className={clsx(
                'text-label-sm',
                day.state === 'today'
                  ? 'font-bold text-primary'
                  : 'text-outline',
              )}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-label-sm text-outline">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
          Días completados al 100%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-primary bg-secondary-fixed-dim" />
          Día en curso
        </span>
        <span className="font-semibold text-primary">{adherence.trend}</span>
      </div>
    </section>
  )
}
