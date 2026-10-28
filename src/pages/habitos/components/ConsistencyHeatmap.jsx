import clsx from 'clsx'

const levelClasses = [
  'bg-surface-container-low',
  'bg-secondary-container',
  'bg-primary-fixed-dim',
  'bg-primary/70',
  'bg-primary',
]

export default function ConsistencyHeatmap({ heatmap }) {
  return (
    <section className="card-ambient rounded-xl p-6">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-headline-sm font-bold text-on-surface">
            {heatmap.title}
          </h2>
          <p className="text-body-sm text-outline">{heatmap.subtitle}</p>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-outline">
          <span>Bajo</span>
          {levelClasses.map((levelClass) => (
            <span
              key={levelClass}
              className={clsx(
                'inline-block h-3 w-3 rounded-sm',
                levelClass,
              )}
            />
          ))}
          <span>Óptimo</span>
        </div>
      </div>

      <div
        role="img"
        aria-label="Mapa de consistencia de los últimos 35 días"
        className="grid grid-flow-col grid-rows-5 gap-1.5 overflow-x-auto py-2"
      >
        {heatmap.days.map((day) => (
          <span
            key={day.id}
            title={`${day.dateLabel}: ${day.percentage}%`}
            className={clsx(
              'h-5 w-5 rounded-sm',
              levelClasses[day.level] ?? levelClasses[0],
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-outline">
        {heatmap.rangeLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  )
}
