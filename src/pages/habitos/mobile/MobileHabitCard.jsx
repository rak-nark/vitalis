import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'
import HabitCheckbox from '../components/HabitCheckbox'

export default function MobileHabitCard({ habit, onToggle }) {
  const completed = habit.completed
  const hasProgressBar =
    habit.showProgressBar && typeof habit.progress === 'number'
  const detailLabel = completed
    ? habit.completedLabel
    : hasProgressBar
      ? habit.detail
      : habit.mobileDetail

  return (
    <article
      className={clsx(
        'rounded-xl border bg-surface-container-lowest p-3.5 shadow-sm transition-all',
        completed
          ? 'border-secondary/20'
          : 'border-outline-variant/40',
        !completed && hasProgressBar && 'ring-1 ring-primary/20',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <HabitCheckbox
          completed={completed}
          onToggle={() => onToggle(habit.id)}
          label={
            completed
              ? `Marcar "${habit.title}" como pendiente`
              : `Marcar "${habit.title}" como completado`
          }
          sizeClass="h-6 w-6"
          radiusClass="rounded-md"
          className="mt-0.5"
        />

        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <span
              className={clsx(
                'rounded-full px-2 py-0.5 text-label-sm font-semibold',
                habit.badgeClass,
              )}
            >
              {habit.badge}
            </span>
            {habit.streakDays > 0 && (
              <span className="text-body-sm font-bold text-primary">
                🔥 {habit.streakDays} d
              </span>
            )}
          </div>

          <h3
            className={clsx(
              'text-body-lg font-bold text-on-surface',
              completed && 'line-through opacity-80',
            )}
          >
            {habit.title}
          </h3>
          <p className="mt-0.5 text-body-sm text-on-surface-variant">
            {detailLabel}
          </p>
        </div>

        <div
          className={clsx(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            habit.iconBgClass,
            habit.iconClass,
          )}
        >
          <Icon name={habit.icon} className="text-[18px]" />
        </div>
      </div>

      {hasProgressBar && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between gap-2 text-label-sm">
            <span className="text-on-surface-variant">
              {habit.progressLabel}
            </span>
            <span className="font-bold text-primary">
              {habit.progress}%
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-surface-container">
            <div
              role="progressbar"
              aria-label={`${habit.title}: ${habit.progress}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={habit.progress}
              className={clsx(
                'h-full rounded-full transition-all duration-500',
                habit.progressBarClass,
              )}
              style={{ width: `${habit.progress}%` }}
            />
          </div>
        </div>
      )}
    </article>
  )
}
