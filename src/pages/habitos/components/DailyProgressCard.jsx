import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

const RADIUS = 50
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function DailyProgressCard({
  progress,
  completedCount,
  totalCount,
  categories,
}) {
  const dashOffset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <section className="card-ambient flex flex-col justify-between rounded-xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-label-lg font-bold text-on-surface">
          Cumplimiento General
        </h2>
        <span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm font-bold text-on-secondary-container">
          Hoy
        </span>
      </div>

      <div className="relative flex items-center justify-center py-4">
        <svg
          className="h-36 w-36 -rotate-90"
          viewBox="0 0 120 120"
          role="img"
          aria-label={`Cumplimiento general: ${progress}%`}
        >
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="transparent"
            stroke="#f2f3ff"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="transparent"
            stroke="#006948"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-headline-lg font-extrabold leading-none text-primary">
            {progress}%
          </span>
          <span className="mt-1 text-label-sm font-medium text-outline">
            {completedCount} de {totalCount} hábitos
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-outline-variant/50 pt-4">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between gap-2 text-label-sm">
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span
                  className={clsx(
                    'inline-block h-2 w-2 rounded-full',
                    category.dotClass,
                  )}
                />
                {category.label}
              </span>
              <span
                className={clsx(
                  'font-bold',
                  category.progress === 100
                    ? 'text-primary'
                    : category.textClass,
                )}
              >
                {category.progress}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-low">
              <div
                role="progressbar"
                aria-label={`${category.label}: ${category.progress}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={category.progress}
                className={clsx(
                  'h-full rounded-full transition-all duration-500',
                  category.barClass,
                )}
                style={{ width: `${category.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-label-sm text-outline">
        <Icon name="insights" className="text-[16px] text-primary" />
        {completedCount === totalCount
          ? 'Protocolo diario completado.'
          : `Te quedan ${Math.max(totalCount - completedCount, 0)} hábitos para cerrar el día.`}
      </p>
    </section>
  )
}
