import Icon from '../../../components/ui/Icon'
import { useMobileHabitRow } from '../hooks/useMobileHabitRow'

export default function MobileHabitRow({ habit, onToggle }) {
  const { expanded, toggleExpanded, detailId } = useMobileHabitRow(habit.id)
  const completed = habit.completed

  return (
    <div className="py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-start gap-3">
          <button
            type="button"
            onClick={() => onToggle(habit.id)}
            aria-pressed={completed}
            aria-label={
              completed
                ? `Marcar "${habit.title}" como pendiente`
                : `Marcar "${habit.title}" como completado`
            }
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform active:scale-90 ${
              completed
                ? 'bg-primary text-on-primary'
                : 'border-2 border-outline/50 text-transparent hover:border-primary'
            }`}
          >
            <Icon
              name="check"
              className={completed ? 'text-[16px]' : 'text-[14px]'}
            />
          </button>

          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls={detailId}
            className="min-w-0 flex-1 text-left"
          >
            <p
              className={`text-body-md font-semibold text-on-surface ${
                completed ? 'line-through opacity-75' : ''
              }`}
            >
              {habit.title}
            </p>
            <p
              className={`text-label-sm ${
                completed
                  ? 'text-outline'
                  : 'font-semibold text-tertiary-container'
              }`}
            >
              {habit.mobileDetail}
            </p>
          </button>
        </div>

        <button
          type="button"
          onClick={toggleExpanded}
          aria-label={expanded ? 'Ocultar detalle' : 'Mostrar detalle'}
          aria-expanded={expanded}
          aria-controls={detailId}
          className="mt-0.5 rounded-full p-1 text-outline transition-colors hover:text-primary"
        >
          <Icon
            name="expand_more"
            className={`text-[20px] transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {expanded && (
        <div
          id={detailId}
          className="mt-2 rounded-lg bg-surface-container/50 p-2.5 text-body-sm text-on-surface-variant"
        >
          {habit.mobileTip}
        </div>
      )}
    </div>
  )
}
