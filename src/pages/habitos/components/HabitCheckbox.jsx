import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function HabitCheckbox({
  completed,
  onToggle,
  label,
  className,
  sizeClass = 'h-7 w-7',
  radiusClass = 'rounded-lg',
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={completed}
      aria-label={label}
      className={clsx(
        'flex shrink-0 items-center justify-center transition-all duration-150 active:scale-90',
        radiusClass,
        sizeClass,
        completed
          ? 'bg-primary text-on-primary shadow-sm hover:scale-105'
          : 'border-2 border-outline-variant bg-surface-container-lowest hover:border-primary',
        className,
      )}
    >
      {completed && <Icon name="check" className="text-lg" />}
    </button>
  )
}
