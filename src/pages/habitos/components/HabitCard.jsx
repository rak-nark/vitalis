import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'
import { useHabitCard } from '../hooks/useHabitCard'
import HabitCheckbox from './HabitCheckbox'

export default function HabitCard({ habit, onToggle }) {
  const { expanded, toggleExpanded, detailId } = useHabitCard(
    habit.id,
    'desktop-habit',
  )
  const completed = habit.completed
  const hasProgressBar =
    habit.showProgressBar && typeof habit.progress === 'number'
  const progressLabel = habit.progressLabel || habit.scheduleLabel
  const statusLabel = completed ? habit.completedLabel : progressLabel
  const statusIcon = completed
    ? 'check_circle'
    : (habit.metaIcon ?? 'schedule')

  return (
    <article
      className={clsx(
        'card-ambient rounded-xl p-5 transition-all duration-200',
        completed && 'opacity-95',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3.5">
          <HabitCheckbox
            completed={completed}
            onToggle={() => onToggle(habit.id)}
            label={
              completed
                ? `Marcar "${habit.title}" como pendiente`
                : `Marcar "${habit.title}" como completado`
            }
            className="mt-0.5"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-label-lg font-bold text-on-surface">
                {habit.title}
              </h3>
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-label-sm font-semibold',
                  habit.badgeClass,
                )}
              >
                {habit.badge}
              </span>
            </div>

            <p className="mt-1 text-body-sm text-on-surface-variant">
              {habit.detail}
            </p>

            {hasProgressBar ? (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-label-sm">
                  <span className="text-outline">
                    {completed ? 'Progreso de hoy' : 'Objetivo'}
                  </span>
                  <span
                    className={clsx(
                      'font-bold',
                      habit.progressTextClass ?? 'text-primary',
                    )}
                  >
                    {progressLabel} · {habit.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
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
            ) : (
              <div
                className={clsx(
                  'mt-3 flex items-center gap-2 text-label-sm',
                  completed ? 'text-primary' : 'font-semibold text-amber-800',
                )}
              >
                <Icon name={statusIcon} className="text-sm" />
                <span>{statusLabel}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3">
          {habit.streakDays > 0 ? (
            <span className="flex items-center gap-1 rounded-md border border-amber-200/60 bg-amber-50 px-2.5 py-1 text-label-sm font-bold text-amber-600">
              <Icon
                name="local_fire_department"
                className="text-sm"
                filled
              />
              {habit.streakDays} d
            </span>
          ) : (
            <span className="rounded-md bg-secondary-container px-2.5 py-1 text-label-sm font-bold text-on-secondary-container">
              Nuevo
            </span>
          )}

          <button
            type="button"
            onClick={toggleExpanded}
            aria-label={
              expanded
                ? `Ocultar detalle de ${habit.title}`
                : `Ver detalle de ${habit.title}`
            }
            aria-expanded={expanded}
            aria-controls={detailId}
            className="rounded-lg p-1 text-outline transition-colors hover:bg-surface-container-low hover:text-on-surface"
          >
            <Icon
              name={expanded ? 'expand_less' : 'expand_more'}
              className="text-lg"
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div
          id={detailId}
          className="mt-4 rounded-lg border border-outline-variant/40 bg-surface-container-low/70 p-3 text-body-sm text-on-surface-variant"
        >
          {habit.mobileTip}
        </div>
      )}
    </article>
  )
}
