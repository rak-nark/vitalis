import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function MobileWeekStrip({
  week,
  selectedDayId,
  onSelectDay,
}) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-label-md font-bold text-on-surface">
          {week.label}
        </span>
        <span className="flex items-center gap-0.5 text-label-sm font-semibold text-primary">
          {week.trendLabel}
          <Icon name="trending_up" className="text-[14px]" />
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 rounded-xl border border-outline-variant/20 bg-surface-container-low p-1">
        {week.days.map((day) => {
          const isSelected = day.id === selectedDayId

          return (
            <button
              key={day.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${day.label} ${day.date}: ${day.completed} de ${day.total} hábitos completados`}
              onClick={() => onSelectDay(day.id)}
              className={clsx(
                'flex flex-col items-center justify-between rounded-lg px-1 py-2 text-center transition-all active:scale-95',
                day.isToday
                  ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/30'
                  : isSelected
                    ? 'border-2 border-primary bg-secondary-container/30'
                    : day.status === 'complete'
                      ? 'border border-outline-variant/30 bg-surface-container-lowest'
                      : 'border border-transparent opacity-75 hover:bg-surface-container-lowest',
              )}
            >
              <span
                className={clsx(
                  'text-[10px] font-bold',
                  day.isToday
                    ? 'text-secondary-container'
                    : isSelected
                      ? 'text-primary'
                      : 'text-on-surface-variant',
                )}
              >
                {day.shortLabel}
              </span>
              <span
                className={clsx(
                  'my-0.5 text-body-md font-bold',
                  day.isToday
                    ? 'text-on-primary'
                    : isSelected
                      ? 'text-primary'
                      : 'text-on-surface',
                )}
              >
                {day.date}
              </span>

              {day.isToday ? (
                <span className="rounded-full bg-primary-container px-1 py-0.5 text-[9px] font-bold text-on-primary">
                  {day.completed}/{day.total}
                </span>
              ) : day.status === 'complete' ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary-container text-primary">
                  <Icon name="check" className="text-[11px]" />
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
